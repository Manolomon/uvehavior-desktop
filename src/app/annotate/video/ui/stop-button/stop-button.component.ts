import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'stop-button',
  templateUrl: './stop-button.component.html',
  styleUrls: ['./stop-button.component.scss'],
})
export class StopButtonComponent {
  @Input() analysisStarted = false;
  @Output() stop = new EventEmitter<boolean>();
}
