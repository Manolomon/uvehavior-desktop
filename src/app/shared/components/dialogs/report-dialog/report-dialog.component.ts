import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { BehaviorEvaluation } from '../../../../core/models/entities';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss'],
})
export class ReportDialogComponent {
  behaviorsEvaluated: BehaviorEvaluation[];
  constructor(protected ref: NbDialogRef<ReportDialogComponent>) {}

  ngOnInit() {}

  exit() {
    this.ref.close({ exit: true });
  }

  restart() {
    this.ref.close({ restart: true });
  }
}
