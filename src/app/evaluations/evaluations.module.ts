import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationsComponent } from './evaluations.component';
import { NebularModule } from '../nebular.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [EvaluationsComponent],
  imports: [CommonModule, NebularModule, TranslateModule, BrowserAnimationsModule],
})
export class EvaluationsModule {}
