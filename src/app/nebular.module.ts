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
  NbMenuModule,
  NbInputModule,
  NbTooltipModule,
  NbStepperModule,
  NbProgressBarModule,
} from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbListModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
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
    NbMenuModule,
    NbInputModule,
    NbTooltipModule,
    NbStepperModule,
    Ng2SmartTableModule,
    NbProgressBarModule,
  ],
})
export class NebularModule {}
