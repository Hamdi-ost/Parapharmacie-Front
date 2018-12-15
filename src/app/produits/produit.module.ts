import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProduitsComponent } from './produits.component';
import { SharedModuleModule } from 'app/shared-module/shared-module.module';


const routes: Routes = [
  { path: '', component: ProduitsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProduitsComponent]
})
export class ProduitModule { }
