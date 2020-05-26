import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NebularModule } from '../nebular.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule,
    SharedModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    NebularModule
  ]
})
export class HomeModule { }
