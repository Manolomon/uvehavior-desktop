import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Test } from '../../../../core/models/entities';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss']
})
export class TestDialogComponent {

  settings = {
    add: {
      addButtonContent: '<i class="fas fa-plus fa-xs"></i>',
      createButtonContent: '<i class="fas fa-check fa-xs"></i>',
      cancelButtonContent: '<i class="fas fa-times fa-xs"></i>',
    },
    edit: {
      editButtonContent: '<i class="fas fa-edit fa-xs"></i>',
      saveButtonContent: '<i class="fas fa-check fa-xs"></i>',
      cancelButtonContent: '<i class="fas fa-times fa-xs"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-trash fa-xs"></i>',
      confirmDelete: true,
    },
    columns: {
      subject_name: {
        title: 'Behavior Name',
        type: 'string',
        editable: false,
      },
      key: {
        title: 'Key Binding',
        type: 'string',
        editable: true,
      },
    },
    sortDirection: 'desc',
    pager: {
      perPage: 3
    }
  };

  settings2 = {
    actions: {
      columnTitle: '',
      add: false,
      edit: {
        editButtonContent: '<i class="fas fa-edit fa-xs"></i>',
        saveButtonContent: '<i class="fas fa-check fa-xs"></i>',
        cancelButtonContent: '<i class="fas fa-times fa-xs"></i>',
      },
      delete: false,
      custom: [],
      position: 'left',
    },
    columns: {
      subject_name: {
        title: 'Behavior Name',
        type: 'string',
      },
      code: {
        title: 'Code Name',
        type: 'string',
      },
      key: {
        title: 'Key Binding',
        type: 'string',
      },
    },
    sortDirection: 'desc',
    pager: {
      perPage: 3
    }
  };

  testForm: FormGroup;

  name: string;
  description: string;
  duration: number;
  editMode: boolean;

  source: LocalDataSource = new LocalDataSource();

  constructor(protected ref: NbDialogRef<TestDialogComponent>) {
    this.testForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.maxLength(2500)]),
      duration: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    })
  }

  ngOnInit() {
    if (this.editMode) {
      this.testForm.get('name').setValue(this.name)
      this.testForm.get('description').setValue(this.description)
      this.testForm.get('duration').setValue(this.duration)
    }
  }

  cancel() {
    this.ref.close();
  }

  submitTest() {
    const newTest = new Test();

    newTest.name = this.testForm.get('name').value;
    newTest.description = this.testForm.get('description').value;
    newTest.duration = this.testForm.get('duration').value;
    this.source.getAll()
      .then((subjects) => {
        newTest.behaviors = subjects.map((element) => {
          return {
            name: element.subject_name,
            associatedKey: element.key
          }
        })
      });

    console.log(newTest)

    this.ref.close(newTest);

    //this.ref.close(this.testForm.value);
  }

  onDeleteConfirm(event): void {
    event.confirm.resolve();
  }

}
