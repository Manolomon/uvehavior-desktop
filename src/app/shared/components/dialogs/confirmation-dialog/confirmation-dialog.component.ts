import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {


  title: string;
  body: string;

  constructor(protected ref: NbDialogRef<ConfirmationDialogComponent>) {

  }

  cancel() {
    this.ref.close();
  }

  confirm() {
    this.ref.close(true);
  }

}
