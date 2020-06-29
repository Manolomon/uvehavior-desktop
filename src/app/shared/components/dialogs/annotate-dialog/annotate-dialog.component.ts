import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from '../../../../core/models/entities';

@Component({
  selector: 'app-annotate-dialog',
  templateUrl: './annotate-dialog.component.html',
  styleUrls: ['./annotate-dialog.component.scss'],
})
export class AnnotateDialogComponent {
  currentSubject: Subject;

  constructor(protected ref: NbDialogRef<AnnotateDialogComponent>) {}

  ngOnInit() {}

  cancel() {
    this.ref.close();
  }

  submitTest() {}
}
