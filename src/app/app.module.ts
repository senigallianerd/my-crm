import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserComponent } from './user/user/user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { HeaderComponent } from './header/header.component';
import {routing} from "./app.routing";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {ApiService} from "./service/api.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./core/interceptor";
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { AuthGuard } from './auth.guard';
import { FileUploadModule } from 'ng2-file-upload';
import {UserResolver} from "./user/user/user.resolver";
import {CalendarResolver} from "./calendar/calendar.resolver";
import { NgxDatePickerModule } from '@ngx-tiny/date-picker';
import { LocalStorageService } from 'ngx-webstorage';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    HeaderComponent,
    UserComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,

    }),
    routing,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastNotificationsModule,
    FileUploadModule,
    NgxDatePickerModule
  ],
  providers: [ApiService, 
    AuthGuard,
    UserResolver,
    CalendarResolver,
    LocalStorageService,
    LoginService,
    {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
