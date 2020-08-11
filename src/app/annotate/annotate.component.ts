import { Component, OnInit, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { HeaderService } from '../core/services/header.service';
import { TranslateService } from '@ngx-translate/core';
import { NbDialogService, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Location } from '@angular/common';
import { AnnotateDialogComponent } from '../shared/components/dialogs/annotate-dialog/annotate-dialog.component';
import { Subject, Test, Behavior, BehaviorEvaluation, Evaluation, Annotation } from '../core/models/entities';
import * as path from 'path';
import { DatabaseService } from '../core/services/database/database.service';
import { ReportDialogComponent } from '../shared/components/dialogs/report-dialog/report-dialog.component';

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
  headerSubscription: any;
  video: HTMLVideoElement;
  analysisTime = 0;
  play = false;
  analysisStartTime: number;
  lastTimeOffSet = 0;
  currentTimeOffset = 0;

  selectedSubjectId: number;
  subject: Subject;
  groupName: string;
  test: Test;
  duration = 0;
  behaviors: Behavior[];
  src = './assets/videoPlaceholder.mp4';
  ngclass = 'mat-video-responsive';
  videoName: string;

  evaluation: Evaluation;
  current: BehaviorEvaluation;
  previous: BehaviorEvaluation;
  behaviorsEvaluation: BehaviorEvaluation[] = [];

  constructor(
    private renderer: Renderer2,
    public headerService: HeaderService,
    private translate: TranslateService,
    private dialogService: NbDialogService,
    private location: Location,
    private databaseService: DatabaseService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.headerSubscription = this.headerService.headerEvent.subscribe(() => {
      this.exitEvaluation();
    });
  }
  ngOnDestroy() {
    this.headerSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.video = this.matVideo.getVideoTag();
    this.dialogService
      .open(AnnotateDialogComponent, {
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.subject = result.subject;
          this.test = result.test;
          this.groupName = result.groupName;
          this.src = path.join('file://', result.filePath);
          this.videoName = result.filename;
          this.behaviors = result.behaviors;
          this.duration = result.test.duration;
          this.loadVideo();
          this.initiateBehaviors();
        }
      });
  }

  loadVideo() {
    this.renderer.listen(this.video, 'timeupdate', () => this.updateTime());

    this.renderer.listen(this.video, 'play', () => this.setVideoPlayback(true));
    this.renderer.listen(this.video, 'pause', () => this.setVideoPlayback(false));
    this.renderer.listen(this.video, 'ended', () => this.finishAnalysis());
  }

  initiateBehaviors() {
    this.behaviors.map((behavior) => {
      let be = new BehaviorEvaluation();
      be.latency = 0;
      be.frequency = 0;
      be.totalTime = 0;
      be.behavior = behavior;
      be.annotations = [];
      this.behaviorsEvaluation.push(be);
    });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.analysisStartTime && this.play && this.analysisTime <= this.duration) {
      const pressedKey = event.key.toUpperCase();
      this.behaviors.some((item) => item.associatedKey === pressedKey && this.logBehavior(item));
    }
  }

  startAnalysis() {
    if (!this.video.paused) {
      this.analysisStartTime = this.video.currentTime;
    }
  }

  logBehavior(pressedBehavior) {
    this.current = this.behaviorsEvaluation.find((item) => item.behavior === pressedBehavior);
    let annotation = new Annotation();
    annotation.timeLog = this.analysisTime;
    this.current.annotations.push(annotation);
    this.current.latency = this.current.annotations[0].timeLog;
    this.current.frequency = this.current.annotations.length;

    if (this.previous != undefined) {
      this.previous.totalTime += this.analysisTime - this.lastTimeOffSet;
      //this.lastTimeOffSet = this.previous.annotations[this.previous.annotations.length - 1].timeLog;
    }
    this.lastTimeOffSet = this.analysisTime;
    this.previous = this.current;
  }

  exitEvaluation() {
    this.setVideoPlayback(false);
    const title: string = this.translate.instant('DELETE-EXPERIMENT');
    const body: string = this.translate.instant('DELETE-EXPERIMENT-CONFIRMATION');

    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: {
          title: title,
          body: body,
        },
      })
      .onClose.subscribe((result) => result && this.location.back());
  }

  finishAnalysis() {
    this.setVideoPlayback(false);
    this.saveEvaluation();
  }

  saveEvaluation() {
    this.current.totalTime += this.analysisTime - this.current.annotations[this.current.annotations.length - 1].timeLog;
    const evaluation = new Evaluation();

    evaluation.videoPath = this.videoName;
    evaluation.finishingTime = this.analysisTime >= this.duration ? this.duration : this.analysisTime;
    evaluation.behaviorEvaluations = this.behaviorsEvaluation;
    evaluation.subject = this.subject;

    this.databaseService.connection
      .then(() => this.databaseService.saveEvaluation(evaluation))
      .then(() => {
        const title: string = this.translate.instant('SUCCESS');
        const message: string = this.translate.instant('EXPERIMENT-SAVED');

        this.showToast('success', title, message);
      })
      .then(() => {
        this.showReport();
      });
  }

  showToast(status: NbComponentStatus, title, content) {
    this.toastrService.show(content, title, { status });
  }

  showReport() {
    this.dialogService
      .open(ReportDialogComponent, {
        closeOnBackdropClick: false,
        closeOnEsc: false,
        context: {
          behaviorsEvaluated: this.behaviorsEvaluation,
        },
      })
      .onClose.subscribe((result) => {
        if (result.exit) {
          this.location.back();
        }
        if (result.restart) {
          this.restart();
        }
      });
  }

  restart() {}

  //#region Player Controls

  setVideoPlayback(value: boolean) {
    if (this.play !== value) {
      this.toggleVideoPlayback();
    }
  }

  toggleVideoPlayback(): void {
    this.play = !this.play;
    this.updateVideoPlayback();
  }

  updateVideoPlayback(): void {
    this.play ? this.video.play() : this.video.pause();
  }

  @HostListener('document:keydown.space', ['$event'])
  pauseEvent(event: KeyboardEvent) {
    this.toggleVideoPlayback();
    event.preventDefault();
  }

  updateTime() {
    this.analysisTime = this.video.currentTime - this.analysisStartTime;
    if (this.analysisTime >= this.test.duration) {
      this.setVideoPlayback(false);
    }
  }

  //#endregion
}
