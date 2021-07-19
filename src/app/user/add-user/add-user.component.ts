import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { User } from "../../model/user.model";
import { UserService } from '../user.service';
import { Tag } from "../../model/tag.model"
import { TypeContact } from "../../model/type.contact";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private userService: UserService,
    private toaster: Toaster) { }

  addForm: FormGroup;
  users: User[];
  selectedUser;
  singleDatePickerOptions;
  dataNascita;
  dataScadenzaCartaIdentita;
  tags: Tag[] = [];
  tipoContatti: TypeContact[];
  selectedTag;
  selectedTipoContatto;

  ngOnInit() {
    this.initValues();
    this.addForm = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      azienda: [''],
      collaboratore: [''],
      tipoContatto: [''],
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
      dataScadenzaCartaIdentita: [''],
      partitaIva: [''],
      sdi: [''],
      iban: [''],
      hobby: [''],
      note: ['']
    });
    this.getUsers();
  }

  initValues(){
    this.userService.initTags().subscribe(values => {
      this.tags = values;
    });
    this.userService.initTipoContatti().subscribe(values => {
      this.tipoContatti = values;
    });
  }

  selectTipoContatto() {

  }

  selectTag() {

  }

  getUsers() {
    this.apiService.getUsers()
      .subscribe(data => {
        this.users = data;
        this.selectedUser = this.users[0];
      });
  }

  onSelectedChange(event) {
  }

  goHome() {
    this.router.navigate(['list-user']);
  }

  onChangeDataNascita(event) {
    this.addForm.value.dataNascita = new Date(event)
  }

  onChangeDataScadenzaIdentita(event) {
    this.addForm.value.dataScadenzaCartaIdentita = new Date(event)
  }

  onSubmit() {
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
      .subscribe(data => {
        if (data) {
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
