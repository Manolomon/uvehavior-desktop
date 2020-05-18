import { Component, OnInit, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input()
  currentPage: string

  themeSwitch: boolean;

  constructor(private themeService: NbThemeService) {
  }

  ngOnInit() {
    this.themeSwitch = (this.themeService.currentTheme === 'default ')
    console.log(this.themeSwitch)
  }

  switchTheme(){
    if(this.themeSwitch) {
      this.themeService.changeTheme('default');
    } else {
      this.themeService.changeTheme('dark');
    }
  }
}
