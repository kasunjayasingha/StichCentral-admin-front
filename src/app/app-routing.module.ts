import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {AppComponent} from "./app.component";
import {CustomersComponent} from "./layout/pages/customers/customers.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ViewAppoinmentComponent} from "./layout/pages/view-appoinment/view-appoinment.component";
import {OrdersViewComponent} from "./layout/pages/orders-view/orders-view.component";
import {LoginComponent} from "./login/login.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AddDesignComponent} from "./layout/pages/add-design/add-design.component";
import {authguardGuard} from "./guards/authguard.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'stichcentral',
    canActivate: [authguardGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'view-customers',
        loadChildren: () => import('./layout/pages/customers/customers.module').then(m => m.CustomersModule)
      },
      {
        path: 'view-appointment',
        loadChildren: () => import('./layout/pages/view-appoinment/view-appoinment.module').then(m => m.ViewAppoinmentModule)
      },
      {
        path: 'view-orders',
        component: OrdersViewComponent,
      },
      {
        path: 'view-users',
        loadChildren: () => import('./layout/pages/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'add-design',
        component: AddDesignComponent,
      },


    ]
  },
  {
    path: 'add-design',
    canActivate: [authguardGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: AddDesignComponent,
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
