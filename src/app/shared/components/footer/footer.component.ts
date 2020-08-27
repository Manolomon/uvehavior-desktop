import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span>
      {{ 'FOOTER' | translate }}
      <b>
        <a draggable="false" href="https://github.com/Manolomon/uvehavior-desktop" target="_blank">
          <i class="fab fa-github repository"></i>
        </a>
      </b>
    </span>
    <span class="contact">
      <b>Contact: <i class="email">uvehavior@gmail.com</i></b>
    </span>
  `,
})
export class FooterComponent {}
