import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'restart-button',
  templateUrl: './restart-button.component.html',
  styleUrls: ['./restart-button.component.scss'],
})
export class RestartButtonComponent {
  @Input() analysisStarted = false;
  @Output() restart = new EventEmitter<boolean>();
}
