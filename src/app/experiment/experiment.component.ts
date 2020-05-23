import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NbMenuItem, NbToastrService, NbMenuService, NbDialogService, NbComponentStatus } from '@nebular/theme';
import { DatabaseService } from '../core/services/database/database.service';
import { TranslateService } from '@ngx-translate/core';
import { Experiment, Test, Group, Subject } from '../core/models/entities';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit {

  current: Experiment;
  name:string;
  description:string;

  tests: NbMenuItem[] = [];

   subjects: NbMenuItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
    private menuService: NbMenuService,
    private dialogService: NbDialogService
  ) { }

  idExperimento: number;

  ngOnInit(): void {
    this.idExperimento = this.route.snapshot.params['id'];
    this.getExperiment();
  }

  getExperiment() {
    this.databaseService.getExperimentData(this.idExperimento)
    .then(experiment => {
      this.current = experiment
      this.name = this.current.name;
      this.description = this.current.description

      this.tests = experiment.tests.map((element) => {
        return {
          title: element.name,
          icon: 'flask'
        }
      });
      this.menuService.addItems(this.tests, 'menu');

      this.subjects = experiment.groups.map((element) => {
        return {
          title: element.name,
          icon: 'users',
          children: element.subjects.map((subject) => {
            return {
              title: subject.name,
              icon: 'user-cicle'
            }
          })
        }
      });
      this.menuService.addItems(this.tests, 'menu');

    })
    .catch((error) => {

        console.log(error)
        let title: string = this.translate.instant('ERROR')
        let message: string = this.translate.instant('DATABASE-ERROR')

        this.showToast(
          'danger',
          title,
          message
        )
      });
  }

  showToast(status: NbComponentStatus, title, content) {
    this.toastrService.show(content, title, { status });
  }
  
}
