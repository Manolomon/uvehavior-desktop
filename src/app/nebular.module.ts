import { NgModule } from '@angular/core';

import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbListModule,
  NbActionsModule,
  NbToggleModule,
  NbButtonModule,
  NbToastrModule,
  NbIconModule
} from '@nebular/theme';

@NgModule({
  imports: [
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbListModule,
    NbToastrModule.forRoot()
  ],
  exports: [
    NbThemeModule,
    NbLayoutModule,
    NbCardModule,
    NbListModule,
    NbActionsModule,
    NbToggleModule,
    NbButtonModule,
    NbToastrModule,
    NbIconModule
  ]
})
export class NebularModule { }