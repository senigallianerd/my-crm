import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./user/add-user/add-user.component";
import {UserComponent} from "./user/user/user.component";
import {UserResolver} from "./user/user/user.resolver";
import {ListUserComponent} from "./user/list-user/list-user.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard],
    resolve: {
    user: UserResolver
  } },
  { path: 'list-user', component: ListUserComponent, canActivate: [AuthGuard]},
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard]},  
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes,{ useHash: true })
