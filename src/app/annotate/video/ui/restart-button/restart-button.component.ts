import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'restart-button',
  templateUrl: './restart-button.component.html',
  styleUrls: ['./restart-button.component.scss'],
})
export class RestartButtonComponent {
  @Output() onRestart = new EventEmitter<boolean>();

  restart() {
    this.onRestart.emit(true);
  }
}
