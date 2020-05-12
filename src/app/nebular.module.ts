import { NgModule } from '@angular/core';

import {
  NbThemeModule,
  NbThemeService,
  NbLayoutModule,
  NbCardModule,
  NbListModule,
  NbActionsModule,
  NbToggleModule,
  NbButtonModule
} from '@nebular/theme';

@NgModule({
  imports: [
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbListModule,
  ],
  exports: [
    NbThemeModule,
    NbThemeService,
    NbLayoutModule,
    NbCardModule,
    NbListModule,
    NbActionsModule,
    NbToggleModule,
    NbButtonModule
  ]
})
export class NebularModule { }