import { Component, OnInit, HostListener, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class AnnotateComponent implements OnInit {
  @ViewChild('video', { static: false }) matVideo: any;
  video: HTMLVideoElement;
  currentTime: number;
  running: boolean = false;
  analysisStartTime: number;

  behaviors = [
    { name: 'no c', key: 'N' },
    { name: 'si c', key: 'S' },
  ];

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.video = this.matVideo.getVideoTag();
    this.renderer.listen(this.video, 'ended', () => (this.running = false));
    this.renderer.listen(this.video, 'timeupdate', () => this.updateTime());
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.running) {
      const pressedKey = event.key.toUpperCase();
      const runningTime = this.video.currentTime - this.analysisStartTime;
      console.log('1: ' + this.currentTime);
      this.behaviors.some((item) => item.key === pressedKey && console.log(item.name + ': ' + runningTime));
    }
  }

  @HostListener('document:keyup.space', ['$event'])
  pauseEvent(event: KeyboardEvent) {
    console.log('Espacio');
    this.toggleVideoPlayback();
    event.preventDefault();
  }

  clickButton() {
    if (!this.video.paused) {
      this.running = true;
      this.analysisStartTime = this.video.currentTime;
    }
  }

  toggleVideoPlayback(): void {
    if (this.video.paused) {
      this.video.play();
      this.running = true;
    } else {
      this.video.pause();
      this.running = false;
    }
  }

  updateTime() {
    this.currentTime = this.video.currentTime;
  }
}
