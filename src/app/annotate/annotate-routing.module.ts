import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AnnotateComponent } from './annotate.component';

const routes: Routes = [
  {
    path: 'annotate',
    component: AnnotateComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnotateRoutingModule {}
