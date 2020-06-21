import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject, Group } from '../../../../core/models/entities';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
})
export class GroupDialogComponent {
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
      subjectName: {
        title: 'Subjet Name',
        type: 'string',
      },
    },
    sortDirection: 'desc',
    pager: {
      perPage: 3,
    },
  };

  groupForm: FormGroup;

  name: string;
  description: string;
  editMode: boolean;
  subjects: Subject[];

  source: LocalDataSource = new LocalDataSource();

  constructor(protected ref: NbDialogRef<GroupDialogComponent>) {
    this.groupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.maxLength(2500)]),
    });
  }

  ngOnInit() {
    if (this.editMode) {
      this.groupForm.get('name').setValue(this.name);
      this.groupForm.get('description').setValue(this.description);
    }
  }

  cancel() {
    this.ref.close();
  }

  submitGroup() {
    const newGroup = new Group();

    newGroup.name = this.groupForm.get('name').value;
    newGroup.description = this.groupForm.get('description').value;
    this.source.getAll().then((subjects) => {
      newGroup.subjects = subjects.map((element) => {
        return {
          name: element.subjectName,
        };
      });
    });

    this.ref.close(newGroup);
  }

  onCreateConfirm(event): void {
    if (event.newData['subjectName'].trim().length > 0) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (event.newData['subjectName'].trim().length > 0) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    event.confirm.resolve();
  }
}
