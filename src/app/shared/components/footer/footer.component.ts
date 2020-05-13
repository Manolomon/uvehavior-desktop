import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span>
      {{ 'FOOTER' | translate }}
      <b>
        <a href="https://github.com/Manolomon/uvehavior" target="_blank">
          <i class="fab fa-github repository"></i>
        </a>
      </b>
    </span>
  `,
})
export class FooterComponent {
}
