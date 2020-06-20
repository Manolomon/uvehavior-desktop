import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentComponent } from './experiment.component';
import { NebularModule } from '../nebular.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ExperimentComponent],
  imports: [CommonModule, NebularModule, TranslateModule],
})
export class ExperimentModule {}
