import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../core/services/database/database.service';
import { Experiment } from '../core/models/experiment.entity';
import { NbToastrService, NbComponentStatus, NbMenuService, NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  experiments: NbMenuItem[] = [];

  constructor(
    private databaseService: DatabaseService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
    private menuService: NbMenuService) {
    this.getExperiments();
    //this.addExperiment();
  }

  showToast(status: NbComponentStatus, title, content) {
    this.toastrService.show(content, title, { status });
  }

  getExperiments() {
    this.databaseService.getLatestExperiments()
      .then(experiments => {
        console.log(experiments)
        for (var experiment of experiments) {
          this.menuService.addItems([{
            title: experiment.ExperimentName,
            icon: 'clipboard-list',
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

  addExperiment() {
    const experiment = new Experiment();

    experiment.ExperimentName = "Concentración Zarzamora (polifenoles)";
    experiment.Description = `- Análisis estadístico ANOVA de una vía
    - Prieba post hoc Student Newman Keuls`;
    experiment.DateCreation = new Date()

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
