import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfacesComponent } from './interfaces.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: InterfacesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InterfacesComponent]
})
export class InterfacesModule { }
