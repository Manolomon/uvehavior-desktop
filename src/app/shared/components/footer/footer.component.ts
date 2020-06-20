import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span>
      {{ 'FOOTER' | translate }}
      <b>
        <a href="https://github.com/Manolomon/uvehavior/issues" target="_blank">
          <i class="fab fa-github repository"></i>
        </a>
      </b>
    </span>
  `,
})
export class FooterComponent {}
