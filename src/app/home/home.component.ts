import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../core/services/database/database.service';
import { Experiment } from '../core/models/entities';
import { NbToastrService, NbComponentStatus, NbMenuService, NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NbDialogService } from '@nebular/theme';
import { ExperimentDialogComponent } from '../shared/components/dialogs/experiment-dialog/experiment-dialog.component';
import { ExperimentService } from '../core/services/experiment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  experiments: NbMenuItem[] = [];

  imageObject: Array<object> = [
    {
      image: 'assets/img/rat_1.png',
      thumbImage: 'assets/img/rat_1.png',
    },
    {
      image: 'assets/img/rat_2.png',
      thumbImage: 'assets/img/rat_2.png',
    },
    {
      image: 'assets/img/rat_3.png',
      thumbImage: 'assets/img/rat_3.png',
    },
    {
      image: 'assets/img/rat_4.png',
      thumbImage: 'assets/img/rat_4.png',
    },
  ];

  constructor(
    private databaseService: DatabaseService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
    private menuService: NbMenuService,
    private dialogService: NbDialogService,
    private experimentService: ExperimentService
  ) {}

  ngOnInit() {
    this.getExperiments();
    this.experimentService.currentExperiment = null;
  }

  showToast(status: NbComponentStatus, title, content) {
    this.toastrService.show(content, title, { status });
  }

  newExperiment() {
    this.dialogService
      .open(ExperimentDialogComponent, { context: { editMode: false } })
      .onClose.subscribe(
        (newExperiment) => newExperiment && this.saveExperiment(newExperiment.name, newExperiment.description)
      );
  }

  getExperiments() {
    this.databaseService
      .getLatestExperiments()
      .then((exps) => {
        this.experiments = exps.map((element) => {
          return {
            title: element.name,
            icon: 'clipboard-list',
            link: `../experiment/${element.idExperiment}`,
          };
        });
        this.menuService.addItems(this.experiments, 'menu');
      })
      .catch((error) => {
        const title: string = this.translate.instant('ERROR');
        const message: string = this.translate.instant('DATABASE-ERROR');

        this.showToast('danger', title, message);
      });
  }

  saveExperiment(name, description) {
    const experiment = new Experiment();

    experiment.name = name;
    experiment.description = description;

    this.databaseService.connection
      .then(() => experiment.save())
      .then(() => {
        this.getExperiments();
      })
      .then(() => {
        const title: string = this.translate.instant('SUCCESS');
        const message: string = this.translate.instant('EXPERIMENT-SAVED');

        this.showToast('success', title, message);
      });
  }
}
