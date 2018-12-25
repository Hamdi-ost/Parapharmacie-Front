import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { SharedModuleModule } from 'app/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UsersComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [UsersComponent]
})
export class UserModule { }
