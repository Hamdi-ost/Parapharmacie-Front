import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProduitsComponent } from './produits.component';
import { SharedModuleModule } from 'app/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ProduitsComponent }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProduitsComponent]
})
export class ProduitModule { }
