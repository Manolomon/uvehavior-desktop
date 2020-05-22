import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../core/services/database/database.service';
import { Experiment } from '../core/models/experiment.entity';
import { NbToastrService, NbComponentStatus, NbMenuService, NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NbDialogService } from '@nebular/theme';
import { AddExperimentComponent } from '../shared/components/dialogs/add-experiment/add-experiment.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  experiments: NbMenuItem[] = [];

  constructor(
    private databaseService: DatabaseService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
    private menuService: NbMenuService,
    private dialogService: NbDialogService) {
    //this.addExperiment();
  }

  ngOnInit() {
    this.getExperiments();
  }

  showToast(status: NbComponentStatus, title, content) {
    this.toastrService.show(content, title, { status });
  }

  newExperiment() {
    this.dialogService.open(AddExperimentComponent)
      .onClose.subscribe(newExperiment => newExperiment &&
        this.saveExperiment(newExperiment.name, newExperiment.description));
  }

  getExperiments() {
    this.databaseService.getLatestExperiments()
      .then(exps => {
        this.experiments = exps.map((element) => {
          return {
            title: element.name,
            icon: 'clipboard-list',
            link: `../experiment/${element.id}`
          }
        });
        this.menuService.addItems(this.experiments, 'menu');
      }).catch((error) => {
        let title: string = this.translate.instant('ERROR')
        let message: string = this.translate.instant('DATABASE-ERROR')

        this.showToast(
          'danger',
          title,
          message
        )
      });
  }

  saveExperiment(name, description) {
    const experiment = new Experiment();

    experiment.name = name;
    experiment.description = description;
    experiment.creationDate = new Date();
    experiment.lastModifiedDate = new Date();

    this.databaseService
      .connection
      .then(() => experiment.save())
      .then(() => {
        this.getExperiments();
      })
      .then(() => {
        let title: string = this.translate.instant('SUCCESS')
        let message: string = this.translate.instant('EXPERIMENT-SAVED')

        this.showToast(
          'success',
          title,
          message
        )
      })
  }
}