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

  log = [{ behaviorName: 'Swiming', key: '1', latency: 13.8, frequency: 4, totalTime: 13.12 }];

  settings = {
    hideSubHeader: true,
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      custom: [],
      position: 'left',
    },
    columns: {
      behaviorName: {
        title: 'Behavior',
        type: 'string',
        width: '10%',
      },
      key: {
        title: 'Key',
        type: 'string',
        width: '10%',
      },
      latency: {
        title: 'Latency',
        type: 'number',
        width: '10%',
      },
      frequency: {
        title: 'Frequency',
        type: 'number',
        width: '10%',
      },
      totalTime: {
        title: 'Time',
        type: 'number',
        width: '1rem',
      },
    },
  };

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
