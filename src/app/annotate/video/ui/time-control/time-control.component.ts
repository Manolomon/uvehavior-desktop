import { Component, Input } from '@angular/core';

@Component({
  selector: 'time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.scss'],
})
export class TimeControlComponent {
  @Input() video: HTMLVideoElement;

  constructor() {}
}
