import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { SmartComponent } from './smart/smart.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'basic', component: BasicComponent },
  { path: 'smart', component: SmartComponent }
];


@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [BasicComponent, SmartComponent]
})
export class TablesModule { }
