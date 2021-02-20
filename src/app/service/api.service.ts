import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";
import {Observable} from "rxjs/index";
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  apiURL = environment.apiURL;

  login(loginPayload) {
    return this.http.post<any>(this.apiURL + 'login.php', loginPayload);
  }

  getUsers() {
    return this.http.get<any>(this.apiURL + 'user-list.php');
  }

  getUserById(id: number) {
    return this.http.get<User>(this.apiURL + 'get-user.php?id=' + id);
  }

  createUser(user: User) {
    return this.http.post<any>(this.apiURL + 'create-user.php', user);
  }

  updateUser(user: User) {
    return this.http.post<any>(this.apiURL + 'update-user.php', user);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(this.apiURL + 'delete-user.php?id=' + id);
  }

  setUploadInfo(info) {
    return this.http.post<any>(this.apiURL + 'set-upload-info.php', info);
  }
}
