import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent, HeaderComponent, PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NebularModule } from '../nebular.module';
import { AddExperimentComponent } from './components/dialogs/add-experiment/add-experiment.component';
import { AddTestComponent } from './components/dialogs/add-test/add-test.component';
import { AddGroupComponent } from './components/dialogs/add-group/add-group.component';

@NgModule({
  declarations: [
    PageNotFoundComponent, 
    WebviewDirective,
    FooterComponent,
    HeaderComponent,
    AddExperimentComponent,
    AddTestComponent,
    AddGroupComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
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
