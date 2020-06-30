import { Component, OnInit, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { HeaderService } from '../core/services/header.service';
import { TranslateService } from '@ngx-translate/core';
import { NbDialogService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Location } from '@angular/common';
import { AnnotateDialogComponent } from '../shared/components/dialogs/annotate-dialog/annotate-dialog.component';
import { Subject, Test, Behavior } from '../core/models/entities';
import * as path from 'path';

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

  subject: Subject;
  test: Test;
  duration = 0;
  behaviors: Behavior[];
  videoPath: string;
  videoName: string;

  analysisTime = 0;
  running = false;
  analysisStartTime = 0;

  behaviorsEvaluation = [
    { id: 1, behaviorName: 'Swimming', key: '1', latency: 13.8637, frequency: 4, totalTime: 13.1286235 },
    { id: 2, behaviorName: 'Resting', key: '2', latency: 20.86237, frequency: 8, totalTime: 56.1298743 },
  ];

  log = [];

  constructor(
    private renderer: Renderer2,
    public headerService: HeaderService,
    private translate: TranslateService,
    private dialogService: NbDialogService,
    private location: Location
  ) {}

  ngOnInit() {
    this.headerService.headerEvent.subscribe(() => {
      this.exitEvaluation();
    });
  }

  ngAfterViewInit(): void {
    this.dialogService
      .open(AnnotateDialogComponent, { closeOnBackdropClick: false, closeOnEsc: false })
      .onClose.subscribe((result) => {
        console.log(result);
        this.subject = result.subject;
        this.test = result.test;
        this.behaviors = result.behaviors;
        this.videoPath = 'https://s3.amazonaws.com/swarm-website-uploads/SWARM+MAIN+VIDEO.mp4';
        this.videoName = result.filename;
      });
    console.log(this.videoPath);
    this.loadVideo();
  }

  loadVideo() {
    this.video = this.matVideo.getVideoTag();
    this.renderer.listen(this.video, 'ended', () => this.videoEnd());
    this.renderer.listen(this.video, 'timeupdate', () => this.updateTime());
    this.renderer.listen(this.video, 'paused', () => this.toggleVideoPlayback());
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(this.videoPath);
    if (this.analysisStartTime && this.running && this.analysisTime <= this.duration) {
      const pressedKey = event.key.toUpperCase();
      this.behaviorsEvaluation.some((item) => item.key === pressedKey && this.logBehavior(item.id));
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
    var actual = this.behaviorsEvaluation.find((item) => item.id === behaviorId);
    actual.latency = this.analysisTime;
    this.log.push({
      behaviorId: behaviorId,
      time: this.analysisTime,
    });
    console.log(this.log);
  }

  exitEvaluation() {
    const title: string = this.translate.instant('DELETE-EXPERIMENT');
    const body: string = this.translate.instant('DELETE-EXPERIMENT-CONFIRMATION');

    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: {
          title: title,
          body: body,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.location.back();
        }
      });
  }
}
