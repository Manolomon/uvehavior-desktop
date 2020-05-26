import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject, Group } from '../../../../core/models/entities';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {

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
        title: 'Subjet Name',
        type: 'number',
      },
    },
    sortDirection: 'desc',
    pager: {
      perPage: 3
    }
  };

  groupForm: FormGroup;

  name: string;
  description: string;
  editMode: boolean;
  subjects: Subject[];

  source: LocalDataSource = new LocalDataSource();

  constructor(protected ref: NbDialogRef<AddGroupComponent>) {
    console.log(ref)
    this.groupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.maxLength(2500)]),
    });
  }

  ngOnInit(){
    if(this.editMode){
      this.groupForm.get('name').setValue(this.name)
      this.groupForm.get('description').setValue(this.description)
    }
  }

  cancel() {
    this.ref.close();
  }

  submitGroup() {
    const newGroup = new Group();

    newGroup.name = this.groupForm.get('name').value;
    newGroup.description = this.groupForm.get('description').value;
    this.source.getAll()
      .then((subjects) => {
        newGroup.subjects = subjects.map((element) => {
          return {
            name: element.subject_name
          }
        })
      });

    console.log(newGroup)

    this.ref.close(newGroup);
  }

  onDeleteConfirm(event): void {
      event.confirm.resolve();
  }

}