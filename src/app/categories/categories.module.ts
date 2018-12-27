import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { SharedModuleModule } from 'app/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: CategoriesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [CategoriesComponent]
})
export class CategoriesModule { }
