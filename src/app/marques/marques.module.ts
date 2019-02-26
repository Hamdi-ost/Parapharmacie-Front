import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModuleModule } from 'app/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { MarquesComponent } from './marques.component';


const routes: Routes = [
  { path: '', component: MarquesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [MarquesComponent]
})
export class MarquesModule { }
