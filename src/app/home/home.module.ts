import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModuleModule } from 'app/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { CalendarComponent } from '../calendar/calendar.component';


const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [HomeComponent, CalendarComponent]
})
export class HomeModule { }
