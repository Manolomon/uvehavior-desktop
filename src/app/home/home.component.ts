import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../core/services/database/database.service'
import { Experiment } from '../model/experiment.entity'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  experiments: Experiment[] = [];

  constructor(private databaseService: DatabaseService) {
    //this.getExperiments();
    this.addExperiment();
  }

  getExperiments() {
    this.databaseService
      .connection
      .then(() => Experiment.find())
      .then(experiments => {
        this.experiments = experiments;
      })
  }

  addExperiment() {
    const experiment = new Experiment();

    experiment.ExperimentName = "Concentración Zarzamora (polifenoles)";
    experiment.Description = `- Análisis estadístico ANOVA de una vía
    - Prieba post hoc Student Newman Keuls`;

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
