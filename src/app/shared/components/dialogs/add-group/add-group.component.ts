import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {

  groupForm: FormGroup;

  name: string;
  description: string;
  editMode: boolean;

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
    this.ref.close(this.groupForm.value);
  }

}
