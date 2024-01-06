import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChartModule} from 'primeng/chart';
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {ProgressBarModule} from "primeng/progressbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BlockUIModule} from 'primeng/blockui';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {SplitterModule} from 'primeng/splitter';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {BadgeModule} from 'primeng/badge';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {LoginComponent} from './login/login.component';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {NotFoundComponent} from './not-found/not-found.component';
import {AppLayoutModule} from "./layout/app.layout.module";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AppLayoutModule,
    ChartModule,
    MenuModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    ProgressBarModule,
    FormsModule,
    BlockUIModule,
    ToastModule,
    CalendarModule,
    SplitterModule,
    BadgeModule,
    SweetAlert2Module.forRoot(),
    ConfirmDialogModule,
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
