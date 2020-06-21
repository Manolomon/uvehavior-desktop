import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuItem, NbToastrService, NbMenuService, NbDialogService, NbComponentStatus } from '@nebular/theme';
import { DatabaseService } from '../core/services/database/database.service';
import { TranslateService } from '@ngx-translate/core';
import { Experiment, Group } from '../core/models/entities';
import { ExperimentDialogComponent } from '../shared/components/dialogs/experiment-dialog/experiment-dialog.component';
import { TestDialogComponent } from '../shared/components/dialogs/test-dialog/test-dialog.component';
import { GroupDialogComponent } from '../shared/components/dialogs/group-dialog/group-dialog.component';
import { filter } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { SubjectDialogComponent } from '../shared/components/dialogs/subject-dialog/subject-dialog.component';

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

  tests: NbMenuItem[] = [];

  subjects: NbMenuItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
    private menuService: NbMenuService,
    private dialogService: NbDialogService
  ) {
    this.menuService
      .onItemClick()
      .pipe(filter(({ tag }) => tag === 'subjects'))
      .subscribe((event) => {
        const selectedSubjectId = event.item.data;
        this.showSubject(
          this.current.groups
            .find((group) => group.idGroup === selectedSubjectId.groupId)
            .subjects.find((subject) => subject.idSubject === selectedSubjectId.id)
        );
      });

    this.menuService
      .onItemClick()
      .pipe(filter(({ tag }) => tag === 'tests'))
      .subscribe((event) => {
        const selectedTestId = event.item.data.id;
        this.editTest(this.current.tests.find((x) => x.idTest === selectedTestId));
      });
  }

  ngOnInit(): void {
    this.idExperiment = this.route.snapshot.params['id'];
    this.getExperiment();
  }

  getExperiment() {
    this.databaseService
      .getExperimentData(this.idExperiment)
      .then((experiment) => {
        this.current = experiment;
        this.name = this.current.name;
        this.description = this.current.description;

        this.tests = experiment.tests.map((element) => {
          return {
            title: element.name,
            icon: 'flask',
            data: {
              id: element.idTest,
            },
          };
        });
        this.menuService.addItems(this.tests, 'tests');

        this.subjects = experiment.groups.map((element) => {
          return {
            title: element.name,
            icon: 'users',

            children: element.subjects.map((subject) => {
              return {
                title: subject.name,
                icon: 'user-circle',
                data: {
                  id: subject.idSubject,
                  groupId: element.idGroup,
                },
              };
            }),
          };
        });
        this.menuService.addItems(this.subjects, 'subjects');
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

  addSubject() {}

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

  editTest(test) {
    this.dialogService
      .open(TestDialogComponent, {
        context: {
          editMode: true,
          currentTest: test,
        },
      })
      .onClose.subscribe(
        (editedTest) =>
          editedTest &&
          this.databaseService.connection
            .then(() => editedTest.save())
            .then(() => {
              this.getExperiment();
            })
            .then(() => {
              const title: string = this.translate.instant('SUCCESS');
              const message: string = this.translate.instant('EXPERIMENT-SAVED');

              this.showToast('success', title, message);
            })
      );
  }

  showSubject(subject) {
    this.dialogService.open(SubjectDialogComponent, {
      context: {
        currentSubject: subject,
      },
    });
  }
}
