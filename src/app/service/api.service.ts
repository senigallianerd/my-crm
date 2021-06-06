import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";
import {Policy} from "../model/policy.model";
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

  getInsurances() {
    return this.http.get<any>(this.apiURL + 'insurance-list.php');
  }

  getUserById(id: number) {
    return this.http.get<User>(this.apiURL + 'get-user.php?id=' + id);
  }

  getInsuranceById(id: number) {
    return this.http.get<any>(this.apiURL + 'get-insurance.php?id=' + id);
  }

  getInsuranceByUserId(userId: number) {
    return this.http.get<any>(this.apiURL + 'get-insurance.php?userId=' + userId);
  }

  getUserByName(nome:string, cognome: string) {
    return this.http.get<any>(this.apiURL + 'get-user.php?nome=' + nome + '&cognome='+cognome);
  }

  createUser(user: User) {
    return this.http.post<any>(this.apiURL + 'add-user.php', user);
  }

  createInsurance(insurance) {
    return this.http.post<any>(this.apiURL + 'add-insurance.php', insurance);
  }

  updateUser(user: User) {
    return this.http.post<any>(this.apiURL + 'update-user.php', user);
  }

  updateInsurance(insurance) {
    return this.http.post<any>(this.apiURL + 'update-insurance.php', insurance);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(this.apiURL + 'delete-user.php?id=' + id);
  }

  deleteInsurance(id: number) {
    return this.http.delete<any>(this.apiURL + 'delete-insurance.php?id=' + id);
  }

  setUploadInfo(info) {
    return this.http.post<any>(this.apiURL + 'set-upload-info.php', info);
  }

  getPolicy() {
    return this.http.get<Policy[]>(this.apiURL + 'get-policy.php');
  }

  getCompagnie() {
    return this.http.get<any>(this.apiURL + 'get-compagnie.php');
  }

  getCollaboratore() {
    return this.http.get<any>(this.apiURL + 'get-collaboratore.php');
  }

  getTipoContatto() {
    return this.http.get<any>(this.apiURL + 'get-tipo-contatti.php');
  }

  getTipoDocs() {
    return this.http.get<any>(this.apiURL + 'get-tipo-docs.php');
  }

  getRami() {
    return this.http.get<any>(this.apiURL + 'get-rami.php');
  }

  deletePolicy(policyId: number) {
    return this.http.get<Policy[]>(this.apiURL + 'delete-policy.php?policyId=' + policyId);
  }


}
