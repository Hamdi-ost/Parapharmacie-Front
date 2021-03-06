import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { StatsComponent } from './stats/stats.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    FlashMessagesModule.forRoot(),
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    DashboardHomeComponent,
    TasksComponent,
    StatsComponent
  ]
})
export class DashboardModule { }
