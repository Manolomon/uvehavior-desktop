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
  ngOnDestroy() {
    delete(this.experiments)
    delete(this.menuService)
    console.log(this.experiments)
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
    this.experiments = [];
    this.databaseService.getLatestExperiments()
      .then(exps => {
        console.log(exps)
        for (var experiment of exps) {
          this.menuService.addItems([{
            title: experiment.ExperimentName,
            icon: 'clipboard-list',
            link: `../experiment/${experiment.Id}`
          }], 'menu');
        }
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

    experiment.ExperimentName = name;
    experiment.Description = description;
    experiment.DateCreation = new Date();
    experiment.DateLastModify = new Date();

    this.databaseService
      .connection
      .then(() => experiment.save())
      .then(() => {
        this.getExperiments();
      })
      .then(() => {
        console.log("Se agregó")
      })
  }

}
