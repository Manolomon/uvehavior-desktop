import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { HomeRoutingModule } from './home/home-routing.module';
import { ExperimentRoutingModule } from './experiment/experiment-routing.module';
import { AnnotateRoutingModule } from './annotate/annotate-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    HomeRoutingModule,
    ExperimentRoutingModule,
    AnnotateRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
