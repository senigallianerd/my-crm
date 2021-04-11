import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import {User} from "../../model/user.model";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private apiService: ApiService,
    private toaster: Toaster) { }

  addForm: FormGroup;
  users: User[];
  selectedUser;
  singleDatePickerOptions;
  singleDate;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      azienda: [''],
      collaboratore: [''],
      cellulare: [''],
      telCasa: [''],
      telUfficio: [''],
      email: [''],
      secondaEmail: [''],
      PEC: [''],
      dataNascita: [''],
      indirizzoResidenza: [''],
      occupazione: [''],
      codiceFiscale: [''],
      cartaIdentita: [''],
      partitaIva: [''],
      sdi: [''],
      iban: [''],
      hobby: [''],
      note: ['']
    });
    this.getUsers();
  }

  getUsers(){
    this.apiService.getUsers()
    .subscribe( data => {
      this.users = data;
      this.selectedUser = this.users[0];
    });
  }

  onSelectedChange(event){
  }

  goHome(){
    this.router.navigate(['list-user']);
  }

  onChangeSingle(event){
    debugger
    this.addForm.value.dataNascita = event;
  }

  onSubmit() {
    debugger
    if (this.addForm.invalid) {
      this.toaster.open({
        text: "Errore nel form di salvataggio",
        position: 'top-right',
        duration: 3000,
        type: 'info'
      });
      return;
    }
    let userForm = this.addForm.value;
    this.apiService.createUser(userForm)
      .subscribe( data => {
        if(data){
          console.log('cliente creato');
          this.toaster.open({
            text: 'Cliente creato',
            position: 'top-right',
            duration: 3000,
            type: 'success'
          });
        }
      });
  }

}
