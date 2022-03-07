import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { User } from "../../model/user.model";
import { UserService } from '../user.service';
import { Tag } from "../../model/tag.model"
import { TypeContact } from "../../model/type.contact";
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

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

  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  addForm: FormGroup;
  users: User[];
  selectedUser;
  singleDatePickerOptions = { displayFormat:'dd/MM/yyyy' };
  dataNascita;
  dataScadenzaCartaIdentita;
  tags: Tag[] = [];
  tipoContatti: TypeContact[];
  selectedTag;
  selectedTag1;
  selectedTipoContatto;
  selectedTipoContatto2;
  province;
  selectedProvincia;
  comuni;
  selectedComune;
  selectedCAP;
  blockName;
  blockCity;
  blockAnagrafica;
  blockCompany;
  blockContact;
  blockOther;
  blockInternal;
  blockData = true;

  ngOnInit() {
    this.initValues();
    this.addForm = this.formBuilder.group({
      id: [],
      nome: [''],
      cognome: ['', Validators.required],
      azienda: [''],
      collaboratore: [''],
      collaboratore1: [''],
      tipoContatto: [''],
      tipoContatto2: [''],
      cellulare: [''],
      telCasa: [''],
      telUfficio: [''],
      fax: [''],
      email: [''],
      secondaEmail: [''],
      PEC: [''],
      dataNascita: [''],
      provincia: [''],
      comune: [''],
      CAP: [''],
      indirizzoResidenza: [''],
      civico: [''],
      occupazione: [''],
      codiceFiscale: [''],
      cartaIdentita: [''],
      dataScadenzaCartaIdentita: [''],
      partitaIva: [''],
      sdi: [''],
      iban: [''],
      hobby: [''],
      note: [''],
      datiAggiuntivi: [''],
      datiRaw: ['']
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
    this.userService.initProvince().subscribe(values => {
      this.province = values;
      setTimeout(()=>$('#prov-default-value').attr('selected','true'),200);

    });    
  }

  toggleBlock(block) {
    if (block === 'name')
      this.blockName = !this.blockName
    else if (block === 'city')
      this.blockCity = !this.blockCity;
    else if (block === 'anagrafica')
      this.blockAnagrafica = !this.blockAnagrafica;
    else if (block === 'company')
      this.blockCompany = !this.blockCompany;
    else if (block === 'contact')
      this.blockContact = !this.blockContact;
    else if (block === 'other')
      this.blockOther = !this.blockOther;
    else if (block === 'data')
      this.blockData = !this.blockData;
    else
      this.blockInternal = !this.blockInternal;
  }

  selectTipoContatto() {
    this.addForm.value.tipoContatto = this.selectedTipoContatto;
   }

  selectTipoContatto2() {
    this.addForm.value.tipoContatto2 = this.selectedTipoContatto2;
   }

  selectTag() { }

  selectTag1() { }

  selectProvincia() {
    const prov = this.selectedProvincia;
    this.userService.initComuni(prov).subscribe(values => {
      this.comuni = values;
      setTimeout(()=>$('#comune-default-value').attr('selected','true'),200);
    }); 
   }

   selectComune() {
    const comune = this.selectedComune;
    this.userService.getCAPfromComune(comune).subscribe(value => {
      this.selectedCAP = value;
    }); 
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
    //this.addForm.value.dataNascita = new Date(event)
  }

  onChangeDataScadenzaIdentita(event) {
    //this.addForm.value.dataScadenzaCartaIdentita = new Date(event)
  }

  checkValidation(): boolean{
    if(this.addForm.value.email){
      const validateEmail = this.userService.validateEmail(this.addForm.value.email);
      if(!validateEmail){
        this.toaster.open({
          text: "Errore nel formato della email",
          position: 'top-right',
          duration: 3000,
          type: 'info'
        });
        return false;
      }
    }
    if(this.addForm.value.secondaEmail){
      const validateEmail = this.userService.validateEmail(this.addForm.value.secondaEmail);
      if(!validateEmail){
        this.toaster.open({
          text: "Errore nel formato della seconda email",
          position: 'top-right',
          duration: 3000,
          type: 'info'
        });
        return false;
      }
    }
    if(this.addForm.value.PEC){
      const validateEmail = this.userService.validateEmail(this.addForm.value.PEC);
      if(!validateEmail){
        this.toaster.open({
          text: "Errore nel formato della PEC email",
          position: 'top-right',
          duration: 3000,
          type: 'info'
        });
        return false;
      }
    }
    if(this.addForm.value.partitaIva){
      const validatePIVA = this.userService.validatePartitaIva(this.addForm.value.partitaIva);
      if(!validatePIVA){
        this.toaster.open({
          text: "Errore nel formato della partita IVA",
          position: 'top-right',
          duration: 3000,
          type: 'info'
        });
        return false;
      }
    }
    if(this.addForm.value.codiceFiscale){
      const validateCodiceFiscale = this.userService.validateCodiceFiscale(this.addForm.value.codiceFiscale);
      if(!validateCodiceFiscale){
        this.toaster.open({
          text: "Errore nel formato del codice fiscale",
          position: 'top-right',
          duration: 3000,
          type: 'info'
        });
        return false;
      }
    }                 
    return true;
  }

  insertDate(){
    this.addForm.value.dataNascita = moment(document.getElementById('dataNascita')['value'],'DD/MM/YYYY');
    this.addForm.value.dataScadenzaCartaIdentita = moment(document.getElementById('dataScadenzaCartaIdentita')['value'],'DD/MM/YYYY');
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
    const validForm = this.checkValidation();
    if(!validForm)
      return;

    this.insertDate();
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
          this.router.navigate(['list-user']);
        }
      });
  }

}
