import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Test, Behavior } from '../../../../core/models/entities';
import { SmartTableKeyInputComponent } from './smart-table-key-input.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DatabaseService } from '../../../../core/services/database/database.service';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss'],
  entryComponents: [SmartTableKeyInputComponent],
})
export class TestDialogComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class="fas fa-plus fa-xs"></i>',
      createButtonContent: '<i class="fas fa-check fa-xs"></i>',
      cancelButtonContent: '<i class="fas fa-times fa-xs"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="fas fa-edit fa-xs"></i>',
      saveButtonContent: '<i class="fas fa-check fa-xs"></i>',
      cancelButtonContent: '<i class="fas fa-times fa-xs"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-trash fa-xs"></i>',
      confirmDelete: true,
    },
    columns: {
      behaviorName: {
        title: 'Behavior Name',
        type: 'string',
        editable: true,
      },
      key: {
        title: 'Key Binding',
        type: 'html',
        editor: { type: 'custom', component: SmartTableKeyInputComponent },
        editable: true,
        width: '10%',
      },
    },
    sortDirection: 'desc',
    pager: {
      perPage: 3,
    },
  };

  testForm: FormGroup;

  currentTest: Test;
  editMode: boolean;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    protected ref: NbDialogRef<TestDialogComponent>,
    private dialogService: NbDialogService,
    private databaseService: DatabaseService
  ) {
    this.testForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.maxLength(2500)]),
      duration: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
  }

  ngOnInit() {
    if (this.editMode) {
      this.testForm.get('name').setValue(this.currentTest.name);
      this.testForm.get('description').setValue(this.currentTest.description);
      this.testForm.get('duration').setValue(this.currentTest.duration);
      this.currentTest.behaviors.map((element) => {
        this.source.add({
          id: element.idBehavior,
          behaviorName: element.name,
          key: element.associatedKey,
        });
      });
    }
  }

  cancel() {
    this.ref.close();
  }

  submitTest() {
    if (!this.editMode) {
      this.currentTest = new Test();
    }

    this.currentTest.name = this.testForm.get('name').value;
    this.currentTest.description = this.testForm.get('description').value;
    this.currentTest.duration = this.testForm.get('duration').value;
    this.source.getAll().then((subjects) => {
      this.currentTest.behaviors = subjects.map((element) => {
        return {
          idBehavior: element.id,
          name: element.behaviorName,
          associatedKey: element.key,
          idTestId: this.currentTest.idTest,
        };
      });
    });

    this.ref.close(this.currentTest);
  }

  onDeleteConfirm(event): void {
    if (this.editMode) {
      let behavior = this.currentTest.behaviors.find((behavior) => behavior.idBehavior == event.data.id);
      this.dialogService
        .open(ConfirmationDialogComponent, {
          context: {
            title: 'Delete Behavior',
            body: 'This action would affect every evaluation made on this behavior',
          },
        })
        .onClose.subscribe((result) => {
          if (result) {
            this.deleteBehavior(behavior);
            event.confirm.resolve();
          }
        });
    } else {
      event.confirm.resolve();
    }
  }

  onCreateConfirm(event): void {
    if (event.newData['behaviorName'].trim().length > 0 && event.newData['key'].length > 0) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event): void {
    if (event.newData['behaviorName'].trim().length > 0 && event.newData['key'].length > 0) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  deleteBehavior(behavior: Behavior) {
    this.databaseService.deleteBehaviorRecords(behavior);
  }

  clickDeleteTest() {
    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: {
          title: 'Delete Test',
          body: 'This action would affect every evaluation made on this test',
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.deleteTest();
        }
      });
  }

  deleteTest() {
    this.databaseService.connection.then(() => {
      this.currentTest.behaviors.map((behavior) => this.deleteBehavior(behavior));
      this.currentTest.remove().then(() => this.cancel());
    });
  }
}
