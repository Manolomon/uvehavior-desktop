import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotateComponent } from './annotate.component';
import { NebularModule } from '../nebular.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [AnnotateComponent],
  imports: [
    CommonModule,
    NebularModule,
    TranslateModule
  ]
})
export class AnnotateModule { }
