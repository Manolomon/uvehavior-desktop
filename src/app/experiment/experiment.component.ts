import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbDialogService, NbComponentStatus } from '@nebular/theme';
import { DatabaseService } from '../core/services/database/database.service';
import { TranslateService } from '@ngx-translate/core';
import { Experiment, Group } from '../core/models/entities';
import { ExperimentDialogComponent } from '../shared/components/dialogs/experiment-dialog/experiment-dialog.component';
import { TestDialogComponent } from '../shared/components/dialogs/test-dialog/test-dialog.component';
import { GroupDialogComponent } from '../shared/components/dialogs/group-dialog/group-dialog.component';
import { ConfirmationDialogComponent } from '../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { SubjectDialogComponent } from '../shared/components/dialogs/subject-dialog/subject-dialog.component';
import { ExperimentService } from '../core/services/experiment.service';
import { CSVExportService } from '../core/services/csv-export.service';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss'],
})
export class ExperimentComponent implements OnInit {
  current: Experiment;
  idExperiment: number;
  name: string;
  description: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
    private dialogService: NbDialogService,
    private experimentService: ExperimentService,
    private csvExport: CSVExportService
  ) {}

  ngOnInit(): void {
    this.idExperiment = this.route.snapshot.params['id'];
    this.getExperiment();
  }

  getExperiment() {
    this.databaseService
      .getExperimentData(this.idExperiment)
      .then((experiment) => {
        this.current = experiment;
        this.experimentService.currentExperiment = this.current;
        this.name = this.current.name;
        this.description = this.current.description;
      })
      .catch((error) => {
        const title: string = this.translate.instant('ERROR');
        const message: string = this.translate.instant('DATABASE-ERROR');

        this.showToast('danger', title, message);
      });
  }

  clickDeleteExperiment() {
    const title: string = this.translate.instant('DELETE-EXPERIMENT');
    const body: string = this.translate.instant('DELETE-EXPERIMENT-CONFIRMATION');

    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: {
          title: title,
          body: body,
        },
      })
      .onClose.subscribe((result) => result && this.deleteExperiment());
  }

  deleteExperiment() {
    this.databaseService.connection
      .then(() => this.current.remove())
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .then(() => {
        const title: string = this.translate.instant('SUCCESS');
        const message: string = this.translate.instant('EXPERIMENT-DELETED');

        this.showToast('success', title, message);
      });
  }

  exportExperiment() {
    this.databaseService.downloadExperiment(this.current.idExperiment).then((experiment) => {
      this.csvExport.generateCSV(experiment, 'experiment', [
        'group',
        'subject',
        'test',
        'date',
        'analysisTime',
        'behavior',
        'latency',
        'frequency',
        'totalTime',
      ]);
    });
  }

  showToast(status: NbComponentStatus, title, content) {
    this.toastrService.show(content, title, { status });
  }

  editExperiment() {
    this.dialogService
      .open(ExperimentDialogComponent, {
        context: {
          name: this.current.name,
          description: this.current.description,
          editMode: true,
        },
      })
      .onClose.subscribe(
        (newExperiment) =>
          newExperiment &&
          this.databaseService.connection
            .then(
              () => (this.current.name = newExperiment.name),
              (this.current.description = newExperiment.description)
            )
            .then(() => this.current.save())
            .then(() => {
              const title: string = this.translate.instant('SUCCESS');
              const message: string = this.translate.instant('EXPERIMENT-SAVED');

              this.showToast('success', title, message);
            })
            .then(() => {
              this.getExperiment();
            })
      );
  }

  newTest() {
    this.dialogService
      .open(TestDialogComponent, { context: { editMode: false } })
      .onClose.subscribe((newTest) => newTest && this.saveTest(newTest));
  }

  chartsAndEvaluations() {
    this.router.navigate([`experiment-evaluations/${this.idExperiment}`]);
  }

  saveTest(test) {
    test.experiment = this.current;
    this.databaseService.connection
      .then(() => test.save())
      .then(() => {
        this.getExperiment();
      })
      .then(() => {
        const title: string = this.translate.instant('SUCCESS');
        const message: string = this.translate.instant('EXPERIMENT-SAVED');

        this.showToast('success', title, message);
      });
  }

  addGroup() {
    this.dialogService
      .open(GroupDialogComponent, {
        context: {
          editMode: false,
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((newGroup) => newGroup && this.saveGroup(newGroup));
  }

  saveGroup(newGroup: Group) {
    newGroup.experiment = this.current;
    this.databaseService.connection
      .then(() => newGroup.save())
      .then(() => {
        this.getExperiment();
      })
      .then(() => {
        const title: string = this.translate.instant('SUCCESS');
        const message: string = this.translate.instant('EXPERIMENT-SAVED');

        this.showToast('success', title, message);
      });
  }

  editGroup(group) {
    this.dialogService
      .open(GroupDialogComponent, {
        context: {
          editMode: true,
          currentGroup: group,
        },
      })
      .onClose.subscribe((editedGroup) => {
        if (editedGroup) {
          this.databaseService.connection
            .then(() => editedGroup.save())
            .then(() => {
              const title: string = this.translate.instant('SUCCESS');
              const message: string = this.translate.instant('EXPERIMENT-SAVED');

              this.showToast('success', title, message);
            })
            .then(() => this.getExperiment());
        } else {
          this.getExperiment();
        }
      });
  }

  editTest(test) {
    this.dialogService
      .open(TestDialogComponent, {
        context: {
          editMode: true,
          currentTest: test,
        },
      })
      .onClose.subscribe((editedTest) => {
        if (editedTest) {
          this.databaseService.connection
            .then(() => editedTest.save())
            .then(() => {
              const title: string = this.translate.instant('SUCCESS');
              const message: string = this.translate.instant('EXPERIMENT-SAVED');

              this.showToast('success', title, message);
            })
            .then(() => this.getExperiment());
        } else {
          this.getExperiment();
        }
      });
  }

  showSubject(subject) {
    this.dialogService
      .open(SubjectDialogComponent, {
        context: {
          currentSubject: subject,
        },
      })
      .onClose.subscribe((evaluations) => {
        if (!evaluations.cancel) {
          if (evaluations.evaluations) {
            this.router.navigate([`evaluations/${subject.idSubject}`]);
          } else {
            this.router.navigate([`annotate/${subject.idSubject}`]);
          }
        }
      });
  }
}
