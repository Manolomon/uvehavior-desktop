import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from '../../../../core/models/entities';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss'],
})
export class SubjectDialogComponent {
  currentSubject: Subject;

  constructor(protected ref: NbDialogRef<SubjectDialogComponent>) {}

  ngOnInit() {}

  cancel() {
    this.ref.close();
  }

  submitTest() {}
}
