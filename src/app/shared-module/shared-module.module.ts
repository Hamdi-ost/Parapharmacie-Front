import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartComponent } from '../tables/smart/smart.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule
  ],
  declarations: [SmartComponent],
  exports: [SmartComponent]
})
export class SharedModuleModule { }
