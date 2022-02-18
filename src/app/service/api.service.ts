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

  getComuni(prov) {
    return this.http.get<any>(this.apiURL + 'get-comuni.php?prov=' + prov);
  }

  getCAPfromComune(comune){
    return this.http.get<any>(this.apiURL + 'get-cap.php?comune=' + comune);
  }

  getProvince() {
    return this.http.get<any>(this.apiURL + 'get-province.php');
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

  getNotesByUserId(userId: number) {
    return this.http.get<any>(this.apiURL + 'get-notes.php?userId=' + userId);
  }

  getUserByName(inputValue: string) {
    return this.http.get<any>(this.apiURL + 'get-user.php?inputValue=' + inputValue );
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

  updateUploadInfo(doc) {
    return this.http.post<any>(this.apiURL + 'update-upload-info.php', doc);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(this.apiURL + 'delete-user.php?id=' + id);
  }

  deleteInsurance(id: number) {
    return this.http.delete<any>(this.apiURL + 'delete-insurance.php?id=' + id);
  }

  deleteNote(id: number) {
    return this.http.delete<any>(this.apiURL + 'delete-note.php?id=' + id);
  }

  setUploadInfo(info) {
    return this.http.post<any>(this.apiURL + 'set-upload-info.php', info);
  }

  addNote(note) {
    return this.http.post<any>(this.apiURL + 'add-note.php', note);
  }

  editNote(note) {
    return this.http.post<any>(this.apiURL + 'update-note.php', note);
  }

  getPolicy() {
    return this.http.get<Policy[]>(this.apiURL + 'get-policy.php');
  }

  getCompagnie() {
    return this.http.get<any>(this.apiURL + 'get-compagnie.php');
  }

  getSinistri() {
    return this.http.get<any>(this.apiURL + 'get-sinistri.php');
  }

  getListaPreventivi() {
    return this.http.get<any>(this.apiURL + 'get-lista-preventivi.php');
  }

  getListaDocs() {
    return this.http.get<any>(this.apiURL + 'get-lista-docs.php');
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

  editUploadInfo(info) {
    return this.http.post<any>(this.apiURL + 'edit-upload-info.php', info);
  }

}
