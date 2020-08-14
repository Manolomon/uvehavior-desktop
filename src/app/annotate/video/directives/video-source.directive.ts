import { Directive, ElementRef, Host, Input, OnChanges, SimpleChanges } from '@angular/core';

import { VideoPlayerComponent } from '../video-player.component';

@Directive({
  selector: '[videoSource]',
})
export class VideoSourceDirective implements OnChanges {
  @Input() src: string = null;
  @Input() type: string = null;

  private init = true;
  private video: VideoPlayerComponent;
  private source: HTMLSourceElement;

  constructor(@Host() private videoPlayerComponent: VideoPlayerComponent, private el: ElementRef) {
    this.video = videoPlayerComponent;
    this.source = el.nativeElement;
    this.init = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.source.src = this.src;
    this.source.type = this.type;

    if (!this.init) {
      this.video.load();
    }
  }
}
