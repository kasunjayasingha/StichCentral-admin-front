import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {AppComponent} from "./app.component";
import {CustomersComponent} from "./layout/pages/customers/customers.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ViewAppoinmentComponent} from "./layout/pages/view-appoinment/view-appoinment.component";

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
       component: DashboardComponent,
      },
      {
        path:'view-customers',
        loadChildren: () => import('./layout/pages/customers/customers.module').then(m => m.CustomersModule)
      },
      {
        path: 'view-appointment',
        loadChildren: () => import('./layout/pages/view-appoinment/view-appoinment.module').then(m => m.ViewAppoinmentModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
