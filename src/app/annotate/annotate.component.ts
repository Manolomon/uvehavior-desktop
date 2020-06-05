import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { MatVideoComponent } from 'mat-video/lib/video.component';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.scss']
})
export class AnnotateComponent implements OnInit {

  @ViewChild('video', { static: false }) matVideo: any;
  video: HTMLVideoElement;
  currentTime: number;
  
  constructor(private renderer: Renderer2) { }

  ngOnInit(){}
  
  ngAfterViewInit(): void {

    this.video = this.matVideo.getVideoTag();
    //this.currentTime =  this.matVideo.time;

    // Use Angular renderer or addEventListener to listen for standard HTML5 video events
    
    this.renderer.listen(this.video, 'ended', () => console.log('video ended'));
    this.video.addEventListener('ended', () => console.log('video ended'));
  }

  clickButton(){
    console.log(this.video.currentTime);
  }

}
