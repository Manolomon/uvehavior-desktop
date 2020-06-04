import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent {

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
      code: {
        title: 'Code Name',
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
      edit: false,
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

  constructor(protected ref: NbDialogRef<AddTestComponent>) {
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
    this.ref.close(this.testForm.value);
  }

  onDeleteConfirm(event): void {
    event.confirm.resolve();
  }

}
