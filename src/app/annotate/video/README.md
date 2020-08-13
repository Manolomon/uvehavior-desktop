**July 2020 - This project is no longer maintained**

> This is a custom version of the module [mat-video](https://github/nkoehler/mat-video) made by @nkoehler

# mat-video is an Angular 8/9+ video player using Material

[![npm version](https://badge.fury.io/js/mat-video.svg)](https://badge.fury.io/js/mat-video)
[![Build Status](https://travis-ci.org/nkoehler/mat-video.svg?branch=master)](https://travis-ci.org/nkoehler/mat-video)
[![Maintainability](https://api.codeclimate.com/v1/badges/46fb1a751d60d0f8b316/maintainability)](https://codeclimate.com/github/nkoehler/mat-video/maintainability)

**mat-video** is an Angular component for playing videos. It has all the features you would expect from a standard video player, all in an extremely light package. The video player is designed to be flexible and easy to use; you can be up and running in less than 5 minutes!

It was built for modern browsers using _TypeScript_, _CSS3_ and _HTML5_ with _Angular & Material 8/9+_.

See the [changelog](https://github.com/nkoehler/mat-video/blob/master/CHANGELOG.md) for recent changes.

If you wish to contribute, please fill out the [pull request template](https://github.com/nkoehler/mat-video/blob/master/CONTRIBUTING.md). For issues, please fill out the [issue template](https://github.com/nkoehler/mat-video/blob/master/ISSUE_TEMPLATE.md) before submitting.

## Features

- Native _HTML5_ video player
- Easy to use
- Play/Pause
- Seeking
- Volume
- Autoplay
- Preload
- Looping
- Scaling
- Fullscreen
- Download
- Buffering spinners
- Poster image
- Subtitles and text tracks
- Multiple media sources
- Customizable controls
- Material theming
- Keyboard shortcuts
- Fixed and responsive sizing
- Supports Chrome, Firefox, Safari, and Edge

## Installation

**mat-video** requires [Angular Material](https://material.angular.io/guide/getting-started) as a peer dependency, including animations and a theme.

```
ng add @angular/material
```

To use **mat-video** in your project install it via [npm](https://www.npmjs.com/package/mat-video):

```
npm install --save mat-video
```

Add the following to your module:

```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';

@NgModule({
  imports: [BrowserAnimationsModule, MatVideoModule],
})
export class AppModule {}
```

## Usage

A minimal example is quite simple, in your HTML file:

```html
<mat-video src="localOrRemoteVideo.mp4"></mat-video>
```

A slightly more customized example, in your HTML file:

```html
<mat-video
  title="My Tutorial Title"
  [autoplay]="true"
  [preload]="true"
  [fullscreen]="true"
  [download]="false"
  color="accent"
  spinner="spin"
  poster="image.jpg"
>
  <source matVideoSource src="tutorial.mp4" type="video/mp4" />
  <source src="tutorial.webm" type="video/webm" />
  <track matVideoTrack src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English" />
  <track src="subtitles_no.vtt" kind="subtitles" srclang="no" label="Norwegian" />
</mat-video>
```

## API

| Attribute          | Type                                       | Description                                                                            | Default   |
| ------------------ | ------------------------------------------ | -------------------------------------------------------------------------------------- | --------- |
| _src_              | **string, MediaStream, MediaSource, Blob** | Path, URL, or `srcObject` for a video                                                  | _null_    |
| _title_            | **string**                                 | Title for the video                                                                    | _null_    |
| _autoplay_         | **boolean**                                | Whether the video should autoplay                                                      | _false_   |
| _preload_          | **boolean**                                | Whether the video should preload                                                       | _true_    |
| _loop_             | **boolean**                                | Whether the video should loop                                                          | _false_   |
| _time_             | **number** (two-way bindable)              | Get or set the timestamp of the video                                                  | _0_       |
| _muted_            | **boolean** (two-way bindable)             | Get or set whether the video is muted                                                  | _false_   |
| _quality_          | **boolean**                                | Whether the video will have a quality indicator                                        | _true_    |
| _download_         | **boolean**                                | Whether the video will have a download option                                          | _false_   |
| _fullscreen_       | **boolean**                                | Whether the video will have a fullscreen option                                        | _true_    |
| _playsinline_      | **boolean**                                | Whether the video should play inline                                                   | _false_   |
| _showFrameByFrame_ | **boolean**                                | Whether the video will display frame-by-frame controls                                 | _false_   |
| _keyboard_         | **boolean**                                | Whether the player will have keyboard shortcuts                                        | _true_    |
| _overlay_          | **boolean**                                | Force the overlay/controls to be shown or hidden                                       | _null_    |
| _color_            | **ThemePalette**                           | Material theme color palette for the sliders                                           | _primary_ |
| _spinner_          | **string**                                 | Use 'spin', 'dot', 'split-ring', 'hourglass', or pass your own buffering spinner class | _spin_    |
| _poster_           | **string**                                 | Path or URL to a poster image                                                          | _null_    |

In addition, [source](https://www.w3schools.com/tags/tag_source.asp) and [track](https://www.w3schools.com/tags/tag_track.asp) elements are supported by **mat-video**.

The **_matVideoSource_** attribute can be used on the _source_ tag to automatically reload the video when the source changes.

The **_matVideoTrack_** attribute can be used on the _track_ tag to automatically reload the video when the track changes.

## Events

Listening to video events can be accomplished by directly accessing the video tag within **mat-video**.

In your HTML file:

```html
<mat-video #video src="localOrRemoteVideo.mp4"></mat-video>
```

In your TS file:

```typescript
export class SampleComponent implements OnInit {
  @ViewChild('video') matVideo: MatVideoComponent;
  video: HTMLVideoElement;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.video = this.matVideo.getVideoTag();

    // Use Angular renderer or addEventListener to listen for standard HTML5 video events

    this.renderer.listen(this.video, 'ended', () => console.log('video ended'));
    this.video.addEventListener('ended', () => console.log('video ended'));
  }
}
```

This API feature is considered experimental, and is subject to change.

## Compatibility

**mat-video** supports the last two major Angular versions. Previous versions of **mat-video** support older versions of Angular.

| mat-video Version | Angular Version    |
| ----------------- | ------------------ |
| 1.0.0 - 2.7.2     | Angular 5, 6, 7, 8 |
| 2.8.0+            | Angular 8, 9       |

## Credits

**mat-video** is an open-source project developed by Nicholas Koehler.

Special thanks:

- [mediapack-me](https://github.com/mediapack-me) for responsive assistance.
- [buu700](https://github.com/buu700) for several features and fixes.
- [fabiomartino](https://github.com/fabiomartino) for modernizing project structure.
