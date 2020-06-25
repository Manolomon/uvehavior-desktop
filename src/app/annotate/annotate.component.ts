import { Component, OnInit, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { HeaderService } from '../core/services/header.service';

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
  analysisTime: number = 0;
  running: boolean = false;
  analysisStartTime: number = 0;
  testDuration: number = 13;

  behaviors = [
    { id: 1, behaviorName: 'Swimming', key: '1', latency: 13.8637, frequency: 4, totalTime: 13.1286235 },
    { id: 2, behaviorName: 'Resting', key: '2', latency: 20.86237, frequency: 8, totalTime: 56.1298743 },
  ];

  log = [];

  constructor(private renderer: Renderer2, public headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.headerEvent.subscribe(() => {
      console.log('Rip');
    });
  }

  ngAfterViewInit(): void {
    this.video = this.matVideo.getVideoTag();
    this.renderer.listen(this.video, 'ended', () => this.videoEnd());
    this.renderer.listen(this.video, 'timeupdate', () => this.updateTime());
    this.renderer.listen(this.video, 'paused', () => this.toggleVideoPlayback());
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.analysisStartTime && this.running && this.analysisTime <= this.testDuration) {
      const pressedKey = event.key.toUpperCase();
      this.behaviors.some((item) => item.key === pressedKey && this.logBehavior(item.id));
    }
  }

  @HostListener('document:keydown.space', ['$event'])
  pauseEvent(event: KeyboardEvent) {
    this.toggleVideoPlayback();
    event.preventDefault();
  }

  clickButton() {
    if (!this.video.paused) {
      this.running = true;
      this.analysisStartTime = this.video.currentTime;
      console.log('Analysis started');
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
    this.analysisTime = this.video.currentTime - this.analysisStartTime;
  }

  videoEnd() {
    this.running = false;
  }

  logBehavior(behaviorId) {
    var actual = this.behaviors.find((item) => item.id === behaviorId);
    actual.latency = this.analysisTime;
    this.log.push({
      behaviorId: behaviorId,
      time: this.analysisTime,
    });
    console.log(this.log);
  }
}
