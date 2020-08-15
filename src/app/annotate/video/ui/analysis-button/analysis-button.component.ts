import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'analysis-button',
  templateUrl: './analysis-button.component.html',
  styleUrls: ['./analysis-button.component.scss'],
})
export class AnalysisButtonComponent {
  @Output() onRestart = new EventEmitter<boolean>();
}
