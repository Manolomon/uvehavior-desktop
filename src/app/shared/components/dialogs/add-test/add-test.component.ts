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

  cancel() {
    this.ref.close();
  }

  submitTest() {
    console.log("YUFJHDS")
    this.ref.close(this.testForm.value);
  }

}
