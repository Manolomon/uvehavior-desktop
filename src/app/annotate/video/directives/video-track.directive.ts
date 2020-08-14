import { Directive, ElementRef, Host, Input, OnChanges, SimpleChanges } from '@angular/core';

import { VideoPlayerComponent } from '../video-player.component';

@Directive({
  selector: '[videoTrack]',
})
export class VideoTrackDirective implements OnChanges {
  @Input() src: string = null;
  @Input() kind: string = null;
  @Input() srclang: string = null;
  @Input() label: string = null;

  private init = true;
  private video: VideoPlayerComponent;
  private track: HTMLTrackElement;

  constructor(@Host() private videoPlayerComponent: VideoPlayerComponent, private el: ElementRef) {
    this.video = videoPlayerComponent;
    this.track = el.nativeElement;
    this.init = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.track.src = this.src;
    this.track.kind = this.kind;
    this.track.srclang = this.srclang;
    this.track.label = this.label;

    if (!this.init) {
      this.video.load();
    }
  }
}
