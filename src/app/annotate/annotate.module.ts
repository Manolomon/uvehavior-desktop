import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotateComponent } from './annotate.component';
import { NebularModule } from '../nebular.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { HeaderService } from '../core/services/header.service';
import { CSVExportService } from '../core/services/csv-export.service';

@NgModule({
  declarations: [AnnotateComponent],
  imports: [CommonModule, NebularModule, TranslateModule, BrowserAnimationsModule, MatVideoModule],
  providers: [HeaderService, CSVExportService],
})
export class AnnotateModule {}
