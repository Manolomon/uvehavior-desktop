import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentComponent } from './experiment.component';
import { NebularModule } from '../nebular.module';


@NgModule({
  declarations: [ExperimentComponent],
  imports: [
    CommonModule,
    NebularModule
  ]
})
export class ExperimentModule { }
