import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductHomeComponent } from './product-home/product-home.component';
import { SliderComponent } from './slider/slider.component';



const routes: Routes = [
  { path: 'productsHome', component: ProductHomeComponent },
  { path: 'sliders', component: SliderComponent },
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ComponentsRoutingModule { }
