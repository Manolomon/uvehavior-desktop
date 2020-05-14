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
  NbIconModule,
  NbDialogModule,
  NbMenuModule
} from '@nebular/theme';

@NgModule({
  imports: [
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbListModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot()
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
    NbIconModule,
    NbDialogModule,
    NbMenuModule
  ]
})
export class NebularModule { }