import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-experiment-dialog',
  templateUrl: './experiment-dialog.component.html',
  styleUrls: ['./experiment-dialog.component.scss']
})
export class ExperimentDialogComponent {

  experimentForm: FormGroup;

  name: string;
  description: string;
  editMode: boolean;

  constructor(protected ref: NbDialogRef<ExperimentDialogComponent>) {
    this.experimentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.maxLength(2500)]),
    });
  }

  ngOnInit(){
    if(this.editMode){
      this.experimentForm.get('name').setValue(this.name)
      this.experimentForm.get('description').setValue(this.description)
    }
  }

  cancel() {
    this.ref.close();
  }

  submitExperiment() {
    this.ref.close(this.experimentForm.value);
  }

}
