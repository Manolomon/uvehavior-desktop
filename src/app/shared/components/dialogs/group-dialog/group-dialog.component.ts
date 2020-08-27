import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject, Group } from '../../../../core/models/entities';
import { DatabaseService } from '../../../../core/services/database/database.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
  currentGroup: Group;

  editMode: boolean;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    protected ref: NbDialogRef<GroupDialogComponent>,
    private dialogService: NbDialogService,
    private databaseService: DatabaseService
  ) {
    this.groupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.maxLength(2500)]),
    });
  }

  ngOnInit() {
    if (this.editMode) {
      this.groupForm.get('name').setValue(this.currentGroup.name);
      this.groupForm.get('description').setValue(this.currentGroup.description);
      this.currentGroup.subjects.map((element) => {
        this.source.add({
          id: element.idSubject,
          subjectName: element.name,
        });
      });
    }
  }

  cancel() {
    this.ref.close();
  }

  submitGroup() {
    if (!this.editMode) {
      this.currentGroup = new Group();
    }

    this.currentGroup.name = this.groupForm.get('name').value;
    this.currentGroup.description = this.groupForm.get('description').value;
    this.source.getAll().then((subjects) => {
      this.currentGroup.subjects = subjects.map((element) => {
        return {
          name: element.subjectName,
          idSubject: element.id,
        };
      });
    });

    this.ref.close(this.currentGroup);
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
    if (this.editMode) {
      let subject = this.currentGroup.subjects.find((subject) => subject.idSubject == event.data.id);
      this.dialogService
        .open(ConfirmationDialogComponent, {
          context: {
            title: 'Delete Subject',
            body: 'This action would affect every evaluation made on this subject',
          },
        })
        .onClose.subscribe((result) => {
          if (result) {
            this.deleteSubject(subject);
            event.confirm.resolve();
          }
        });
    } else {
      event.confirm.resolve();
    }
  }

  deleteSubject(subject: Subject) {
    this.databaseService.connection.then(() => {
      subject.remove();
    });
  }

  clickDeleteGroup() {
    this.databaseService.connection.then(() => {
      this.currentGroup.remove().then(() => this.cancel());
    });
  }
}
