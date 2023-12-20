import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {SidebarModule} from 'primeng/sidebar';
import {BadgeModule} from 'primeng/badge';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RippleModule} from 'primeng/ripple';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {RouterModule} from '@angular/router';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {AppConfigModule} from './config/config.module';
import {AppSidebarComponent} from "./app.sidebar.component";
import {AppLayoutComponent} from "./app.layout.component";
import {CustomersComponent} from './pages/customers/customers.component';
import {ViewAppoinmentComponent} from './pages/view-appoinment/view-appoinment.component';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {AddOrderDetailsComponent} from './pages/view-appoinment/add-order-details/add-order-details.component';
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {CalendarModule} from "primeng/calendar";
import {OrdersViewComponent} from './pages/orders-view/orders-view.component';
import {UsersComponent} from './pages/users/users.component';
import {AddDesignComponent} from './pages/add-design/add-design.component';

@NgModule({
  declarations: [
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppLayoutComponent,
    CustomersComponent,
    ViewAppoinmentComponent,
    AddOrderDetailsComponent,
    OrdersViewComponent,
    UsersComponent,
    AddDesignComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    AppConfigModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule,
    ReactiveFormsModule
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule {
}
