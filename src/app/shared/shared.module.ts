import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent, HeaderComponent, PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NebularModule } from '../nebular.module';
import { ExperimentDialogComponent } from './components/dialogs/experiment-dialog/experiment-dialog.component';
import { TestDialogComponent } from './components/dialogs/test-dialog/test-dialog.component';
import { GroupDialogComponent } from './components/dialogs/group-dialog/group-dialog.component';
import { SubjectDialogComponent } from './components/dialogs/subject-dialog/subject-dialog.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AnnotateDialogComponent } from './components/dialogs/annotate-dialog/annotate-dialog.component';
import { ReportDialogComponent } from './components/dialogs/report-dialog/report-dialog.component';
import { ChartDialogComponent } from './components/dialogs/chart-dialog/chart-dialog.component';
import { SmartTableKeyInputComponent } from './components/dialogs/test-dialog/smart-table-key-input.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    FooterComponent,
    HeaderComponent,
    ExperimentDialogComponent,
    TestDialogComponent,
    GroupDialogComponent,
    SubjectDialogComponent,
    ConfirmationDialogComponent,
    AnnotateDialogComponent,
    ReportDialogComponent,
    ChartDialogComponent,
    SmartTableKeyInputComponent,
  ],
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, NebularModule, NgxEchartsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, FooterComponent, HeaderComponent],
})
export class SharedModule {}
