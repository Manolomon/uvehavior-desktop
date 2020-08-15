import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NebularModule } from '../../nebular.module';

import { VideoSourceDirective } from './directives/video-source.directive';
import { VideoTrackDirective } from './directives/video-track.directive';
import { SecondsToTimePipe } from './pipes/seconds-to-time.pipe';
import { EventService } from './services/event.service';
import { FullscreenService } from './services/fullscreen.service';

import { FullscreenButtonComponent } from './ui/fullscreen-button/fullscreen-button.component';
import { PlayButtonComponent } from './ui/play-button/play-button.component';
import { TimeControlComponent } from './ui/time-control/time-control.component';
import { RestartButtonComponent } from './ui/restart-button/restart-button.component';
import { AnalysisButtonComponent } from './ui/analysis-button/analysis-button.component';

import { VideoPlayerComponent } from './video-player.component';

@NgModule({
  declarations: [
    SecondsToTimePipe,
    VideoPlayerComponent,
    PlayButtonComponent,
    FullscreenButtonComponent,
    RestartButtonComponent,
    AnalysisButtonComponent,
    TimeControlComponent,
    VideoSourceDirective,
    VideoTrackDirective,
  ],
  imports: [CommonModule, NebularModule],
  exports: [VideoPlayerComponent, VideoSourceDirective, VideoTrackDirective],
  providers: [FullscreenService, EventService],
})
export class VideoPlayerModule {}
