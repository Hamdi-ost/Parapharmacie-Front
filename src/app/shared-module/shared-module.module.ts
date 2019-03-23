import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartComponent } from '../tables/smart/smart.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule
  ],
  declarations: [SmartComponent],
  exports: [SmartComponent]
})
export class SharedModuleModule { }
