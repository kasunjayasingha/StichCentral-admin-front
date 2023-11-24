import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAppoinmentRoutingModule } from './view-appoinment-routing.module';
import { ViewTableComponent } from './view-table/view-table.component';
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ViewTableComponent
  ],
  imports: [
    CommonModule,
    ViewAppoinmentRoutingModule,
    SharedModule,
    TableModule,
    DropdownModule,
    FormsModule
  ]
})
export class ViewAppoinmentModule { }
