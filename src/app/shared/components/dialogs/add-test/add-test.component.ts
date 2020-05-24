import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent {

  testForm: FormGroup;

  name: string;
  description: string;
  duration: number;
  editMode: boolean;

  constructor(protected ref: NbDialogRef<AddTestComponent>) {
    this.testForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.maxLength(2500)]),
      duration: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    })
  }

  ngOnInit(){
    if(this.editMode){
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

}
