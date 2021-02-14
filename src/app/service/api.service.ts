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
    return this.http.post<any>(this.apiURL + 'token/generate-token', loginPayload);
  }

  getUsers() {
    return this.http.get<any>(this.apiURL + 'user-list');
  }

  getUserById(id: number) {
    return this.http.get<any>(this.apiURL + 'get-user/' + id);
  }

  createUser(user: User) {
    return this.http.post<any>(this.apiURL + 'create-user', user);
  }

  updateUser(user: User) {
    return this.http.post<any>(this.apiURL + 'update-user/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(this.apiURL + 'delete-user/' + id);
  }
}
