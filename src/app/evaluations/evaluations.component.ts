import { Component, OnInit } from '@angular/core';
import { Evaluation, Experiment, Test } from '../core/models/entities';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../core/services/database/database.service';
import { NbDialogService, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { CSVExportService } from '../core/services/csv-export.service';
import { ChartDialogComponent } from '../shared/components/dialogs/chart-dialog/chart-dialog.component';
import { NameEvaluationDialogComponent } from '../shared/components/dialogs/name-evaluation-dialog/name-evaluation-dialog.component';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss'],
})
export class EvaluationsComponent implements OnInit {
  idSubject: number;
  idExperiment: number;
  selectedEvaluations = [];
  evaluations: Evaluation[];
  tests: Test[];

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
    private csvExport: CSVExportService,
    private dialogService: NbDialogService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url.split('/')[1] === 'evaluations') {
      this.idSubject = this.route.snapshot.params['id'];
      this.getSubjectEvaluations();
    } else {
      this.idExperiment = this.route.snapshot.params['idExperiment'];
      this.getExperimentEvaluations();
    }
  }

  getSubjectEvaluations() {
    this.databaseService
      .getSubjectEvaluations(this.idSubject)
      .then((subject) => {
        this.evaluations = subject.evaluations;
      })
      .catch((error) => {
        const title: string = this.translate.instant('ERROR');
        const message: string = this.translate.instant('DATABASE-ERROR');

        this.showToast('danger', title, message);
      });
  }

  getExperimentEvaluations() {
    this.databaseService
      .getExperimentEvaluations(this.idExperiment)
      .then((evaluations) => {
        this.evaluations = evaluations;
      })
      .catch((error) => {
        const title: string = this.translate.instant('ERROR');
        const message: string = this.translate.instant('DATABASE-ERROR');

        this.showToast('danger', title, message);
      });
  }

  /*getExperimentEvaluations2() {
    this.databaseService.getExperimentEvaluations(3).then((experiment) => {
      let hola = experiment.groups.reduce(
        (prev, group) =>
          prev.concat({
            groupName: group.name,
            subject: group.subjects,
          }),
        []
      );
      console.log(hola);
    });
  }*/

  showToast(status: NbComponentStatus, title, content) {
    this.toastrService.show(content, title, { status });
  }

  downloadLog(evaluation) {
    this.databaseService.downloadTimelog(evaluation.idEvaluation).then((log) => {
      let calculatedLog = log.map((element, index) => {
        return {
          behavior: element.behavior,
          timeLog: element.timeLog,
          duration:
            index < log.length - 1
              ? log[index + 1].timeLog - element.timeLog
              : evaluation.finishingTime - element.timeLog,
        };
      });
      this.csvExport.generateCSV(calculatedLog, 'behaviorLog', ['behavior', 'timeLog', 'duration']);
    });
  }

  plotEvaluation(evaluation) {
    this.databaseService.downloadTimelog(evaluation.idEvaluation).then((log) => {
      this.dialogService
        .open(ChartDialogComponent, {
          closeOnBackdropClick: false,
          context: {
            log: [
              {
                evaluation: evaluation.name ? evaluation.name : 'Evaluation',
                testDuration: evaluation.finishingTime,
                log: log,
              },
            ],
          },
        })
        .onClose.subscribe();
    });
  }

  getMultipleLogs() {
    let promises = [];

    this.selectedEvaluations.map((evaluation, index) => {
      promises.push(
        this.databaseService.downloadTimelog(evaluation.idEvaluation).then(function (result) {
          return {
            evaluation: evaluation.name ? evaluation.name : `Evaluation ${index + 1}`,
            testDuration: evaluation.finishingTime,
            log: result,
          };
        })
      );
    });

    Promise.all(promises).then((logs) => this.plotMultiLogs(logs));
  }

  plotMultiLogs(logs) {
    this.dialogService
      .open(ChartDialogComponent, {
        closeOnBackdropClick: false,
        context: {
          log: logs,
        },
      })
      .onClose.subscribe();
  }

  selectEvaluation(evaluation) {
    const index = this.selectedEvaluations.indexOf(evaluation);
    index < 0 ? this.selectedEvaluations.push(evaluation) : this.selectedEvaluations.splice(index, 1);
  }

  editName(evaluation: Evaluation) {
    this.dialogService
      .open(NameEvaluationDialogComponent, {
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((result) => {
        evaluation.name = result;

        evaluation.save().then(() => this.getSubjectEvaluations());
      });
  }
}
