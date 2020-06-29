import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import { HeaderService } from '../../../core/services/header.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  themeSwitch: boolean;
  currentTheme: string;

  constructor(
    private themeService: NbThemeService,
    public router: Router,
    public headerService: HeaderService,
    private _location: Location
  ) {
    this.currentTheme = this.themeService.currentTheme;
    this.themeSwitch = this.currentTheme === 'dark';
  }

  ngOnInit() {}

  switchTheme() {
    if (this.themeSwitch) {
      this.themeService.changeTheme('default');
    } else {
      this.themeService.changeTheme('dark');
    }
  }

  cancelClick() {
    this.headerService.emitHeaderBind();
  }

  back() {
    this._location.back();
  }
}
