import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent, HeaderComponent, PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { NebularModule } from '../nebular.module';

@NgModule({
  declarations: [
    PageNotFoundComponent, 
    WebviewDirective,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NebularModule
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule {}
