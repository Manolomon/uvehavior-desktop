import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationsComponent } from './evaluations.component';

const routes: Routes = [
  {
    path: 'evaluations',
    component: EvaluationsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationsRoutingModule {}
