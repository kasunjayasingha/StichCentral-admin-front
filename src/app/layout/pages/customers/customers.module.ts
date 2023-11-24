import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import { ViewCustomerProfileComponent } from './view-customer-profile/view-customer-profile.component';
import {ChipModule} from "primeng/chip";


@NgModule({
  declarations: [
    ViewCustomersComponent,
    ViewCustomerProfileComponent
  ],
    imports: [
        CommonModule,
        CustomersRoutingModule,
        SharedModule,
        TableModule,
        ChipModule
    ]
})
export class CustomersModule { }
