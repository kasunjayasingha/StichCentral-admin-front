import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAppoinmentRoutingModule } from './view-appoinment-routing.module';
import { ViewTableComponent } from './view-table/view-table.component';
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    ViewTableComponent
  ],
  imports: [
    CommonModule,
    ViewAppoinmentRoutingModule,
    SharedModule,
    TableModule
  ]
})
export class ViewAppoinmentModule { }
