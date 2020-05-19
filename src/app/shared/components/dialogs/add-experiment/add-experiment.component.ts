import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-add-experiment',
  templateUrl: './add-experiment.component.html',
  styleUrls: ['./add-experiment.component.scss']
})
export class AddExperimentComponent {

  experimentForm: FormGroup;

  name: string;
  text: string;

  constructor(protected ref: NbDialogRef<AddExperimentComponent>) {
    this.experimentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2500)]),
    })
  }

  cancel() {
    this.ref.close();
  }

  submitExperiment() {
    console.log("YUFJHDS")
    this.ref.close(this.experimentForm.value);
  }

}
