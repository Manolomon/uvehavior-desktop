import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NebularModule } from '../../nebular.module';

import { MatVideoSourceDirective } from './directives/mat-video-source.directive';
import { MatVideoTrackDirective } from './directives/mat-video-track.directive';
import { SecondsToTimePipe } from './pipes/seconds-to-time.pipe';
import { EventService } from './services/event.service';
import { FullscreenService } from './services/fullscreen.service';

import { MatFullscreenButtonComponent } from './ui/mat-fullscreen-button/mat-fullscreen-button.component';
import { MatPlayButtonComponent } from './ui/mat-play-button/mat-play-button.component';
import { MatTimeControlComponent } from './ui/mat-time-control/mat-time-control.component';

import { MatVideoComponent } from './video.component';

@NgModule({
  declarations: [
    SecondsToTimePipe,
    MatVideoComponent,
    MatPlayButtonComponent,
    MatFullscreenButtonComponent,
    MatTimeControlComponent,
    MatVideoSourceDirective,
    MatVideoTrackDirective,
  ],
  imports: [CommonModule, NebularModule],
  exports: [MatVideoComponent, MatVideoSourceDirective, MatVideoTrackDirective],
  providers: [FullscreenService, EventService],
})
export class MatVideoModule {}
