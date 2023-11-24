import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewAppoinmentComponent} from "./view-appoinment.component";
import {AddOrderDetailsComponent} from "./add-order-details/add-order-details.component";
import {ViewTableComponent} from "./view-table/view-table.component";

const routes: Routes = [
  {
    path: '',
    component: ViewAppoinmentComponent,
    children: [
      {
        path: '',
        component: ViewTableComponent,
      },
      {
        path: 'add-order-details',
        component: AddOrderDetailsComponent,
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAppoinmentRoutingModule { }
