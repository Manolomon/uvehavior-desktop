import { Component, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class AnnotateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('Key');
  }

  ngAfterViewInit(): void {}

  clickButton() {}
}
