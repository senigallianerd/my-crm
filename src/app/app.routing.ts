import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AddUserComponent } from "./user/add-user/add-user.component";
import { UserComponent } from "./user/user/user.component";
import { UserResolver } from "./user/user/user.resolver";
import { EditUserResolver } from "./user/edit-user/edit-user.resolver";
import { EditInsuranceResolver } from "./insurance/edit-insurance/edit-insurance.resolver";

import { AddInsuranceComponent } from "./insurance/add-insurance/add-insurance.component";
import { ListInsuranceComponent } from "./insurance/list-insurance/list-insurance.component";
import { EditInsuranceComponent } from "./insurance/edit-insurance/edit-insurance.component";

import { CalendarResolver } from "./calendar/calendar.resolver";
import { ListUserComponent } from "./user/list-user/list-user.component";
import { EditUserComponent } from "./user/edit-user/edit-user.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  {
    path: 'user/:id', component: UserComponent, canActivate: [AuthGuard],
    resolve: {
      user: UserResolver
    }
  },
  { path: 'list-user', component: ListUserComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard],
    resolve: {
      user: EditUserResolver
    }
  },
  { path: 'add-insurance', component: AddInsuranceComponent, canActivate: [AuthGuard] },
  { path: 'list-insurance', component: ListInsuranceComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-insurance/:id', component: EditInsuranceComponent, canActivate: [AuthGuard],
    resolve: {
      insurance: EditInsuranceResolver
    }
  },

  {
    path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard],
    resolve: {
      calendar: CalendarResolver
    }
  },
  { path: '', component: LoginComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true })
