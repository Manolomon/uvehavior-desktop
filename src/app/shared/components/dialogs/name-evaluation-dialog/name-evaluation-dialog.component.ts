import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-name-evaluation-dialog',
  templateUrl: './name-evaluation-dialog.component.html',
  styleUrls: ['./name-evaluation-dialog.component.scss'],
})
export class NameEvaluationDialogComponent implements OnInit {
  evaluationName: string;

  constructor(protected ref: NbDialogRef<NameEvaluationDialogComponent>) {}

  ngOnInit() {}

  cancel() {
    this.ref.close();
  }

  submitName() {
    this.ref.close(this.evaluationName);
  }
}
