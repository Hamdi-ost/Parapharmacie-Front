import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ComponentsRoutingModule } from './interfaces-routing.module';
import { SharedModuleModule } from 'app/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    SharedModuleModule,
    FormsModule
  ],
  declarations: [SliderComponent, ProductHomeComponent]
})
export class InterfacesModule { }
