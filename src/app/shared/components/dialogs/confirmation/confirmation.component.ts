import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {


  title: string;
  body: string;

  constructor(protected ref: NbDialogRef<ConfirmationComponent>) {

  }

  cancel() {
    this.ref.close();
  }

  confirm() {
    this.ref.close(true);
  }

}
