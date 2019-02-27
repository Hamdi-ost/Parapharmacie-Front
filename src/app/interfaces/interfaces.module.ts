import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ComponentsRoutingModule } from './interfaces-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ],
  declarations: [SliderComponent, ProductHomeComponent]
})
export class InterfacesModule { }
