import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    ViewCustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    TableModule
  ]
})
export class CustomersModule { }
