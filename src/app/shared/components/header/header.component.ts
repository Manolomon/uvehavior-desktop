import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  themeSwitch:boolean;
  currentTheme: string;

  constructor(private themeService: NbThemeService) {
    this.currentTheme = this.themeService.currentTheme
    this.themeSwitch = (this.currentTheme === 'dark')
  }

  ngOnInit() {
  }

  switchTheme(){
    if(this.themeSwitch) {
      this.themeService.changeTheme('default');
    } else {
      this.themeService.changeTheme('dark');
    }
  }
}
