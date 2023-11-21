import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers.component";
import {ViewCustomersComponent} from "./view-customers/view-customers.component";
import {ViewCustomerProfileComponent} from "./view-customer-profile/view-customer-profile.component";

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      {
        path: '',
        component: ViewCustomersComponent,
      },
      {
        path: 'view-customer-profile',
        component: ViewCustomerProfileComponent,
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
