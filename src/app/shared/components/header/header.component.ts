import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  themeSwitch = false;
  currentTheme = 'default';

  constructor(private themeService: NbThemeService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
  }

  switchTheme(){
    if(this.themeSwitch) {
      this.themeService.changeTheme('default');
    } else {
      this.themeService.changeTheme('dark');
    }
  }
}
