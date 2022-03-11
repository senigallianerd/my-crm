import { Component, OnInit , Inject} from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first} from "rxjs/operators";
import { User} from "../../model/user.model";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../user.service';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  users: User[];
  selectedUser;
  editForm: FormGroup;
  singleDatePickerOptions = { displayFormat:'dd/MM/yyyy' }
  dataNascita;
  dataScadenzaCartaIdentita;
  user: User;
  selectedTag;
  selectedTag1;
  selectedTipoContatto;
  selectedTipoContatto2;
  tags:any = [];
  tipoContatti:any = [];
  blockName;
  blockCity;
  blockAnagrafica;
  blockCompany;
  blockContact;
  blockOther;
  blockInternal;
  blockData = true;
  formChanged = false;
  selectedProvincia;
  province;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private toaster: Toaster) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    this.initValues();
    this.dataNascita = this.user && this.user.dataNascita ? new Date(this.user.dataNascita) : '';
    this.dataScadenzaCartaIdentita = ''; 
    this.editForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      azienda: [''],
      collaboratore: [''],
      collaboratore1: [''],
      cellulare: [''],
      tipoContatto: [''],
      tipoContatto2: [''],
      telCasa: [''],
      telUfficio: [''],
      fax: [''],
      email: [''],
      secondaEmail: [''],
      PEC: [''],
      comune: [''],
      provincia: [''],
      CAP:  [''],
      indirizzoResidenza: [''],
      civico: [''],
      occupazione: [''],
      dataNascita: [''],
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
    try{
      this.editForm.setValue(this.route.snapshot.data['user']);
    }
    catch(e){ };

    this.selectProvincia();
    this.editForm.valueChanges.subscribe(values => {
      if(values.id)
        this.formChanged = true;
      else
        this.formChanged = false;
    })
  }

  onFocusOutEventScadenza(){
    this.formChanged = true;
  }

  onFocusOutEventNascita(){
    this.formChanged = true;
  }

  toggleBlock(block){
    if(block==='name')
      this.blockName = !this.blockName
    else if(block==='city')
      this.blockCity = !this.blockCity;
    else if(block==='anagrafica')
      this.blockAnagrafica = !this.blockAnagrafica;
    else if(block==='company')
      this.blockCompany = !this.blockCompany;
    else if(block==='contact')
      this.blockContact = !this.blockContact;
    else if(block==='other')
      this.blockOther = !this.blockOther;
    else if(block==='data')
      this.blockData = !this.blockData;
    else
      this.blockInternal = !this.blockInternal;
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
    });   
    this.selectedTag = this.user.collaboratore;
    this.selectedTag1 = this.user.collaboratore1;
    this.selectedTipoContatto = this.user.tipoContatto;
    this.selectedTipoContatto2 = this.user.tipoContatto2;
  }

  selectTipoContatto(){
    this.editForm.value.tipoContatto =  this.selectedTipoContatto;
  }

  selectTipoContatto2(){
    this.editForm.value.tipoContatto2 =  this.selectedTipoContatto2;
  }

  selectTag(){
    this.editForm.value.collaboratore = this.selectedTag;
  }

  selectTag1(){
    this.editForm.value.collaboratore1 = this.selectedTag1;
  }

  onChangeDataNascita(event){
    //this.editForm.value.dataNascita = new Date(event)
  }

  onChangeDataScadenzaIdentita(event){
    //this.editForm.value.dataScadenzaCartaIdentita = new Date(event)
  }

  onSelectedChange(event){
  }

  getUsers(userId){
    this.apiService.getUsers()
    .subscribe( data => {
      this.users = data;
      this.selectedUser = this.users.find((u) => u.id==userId)
    });
  }

  goHome(){
    this.router.navigate(['list-user']);
  }

  selectProvincia(){
    this.selectedProvincia = this.user.provincia;
  }

  insertDate(){
    this.editForm.value.dataNascita = moment(document.getElementById('dataNascita')['value'],'DD/MM/YYYY');
    this.editForm.value.dataScadenzaCartaIdentita = ''; 
  }

  onSubmit() {
    this.insertDate();
    const dataToSend = this.editForm.value;
    this.apiService.updateUser(dataToSend)
      .pipe(first())
      .subscribe(
        data => {
          if(data){
            console.log('user updated');
            this.toaster.open({
              text: 'Aggiornamento completato',
              position: 'top-right',
              duration: 3000,
              type: 'success'
            });
            this.router.navigate(['user/' + this.user.id]);
          }
          else{
            alert("Error")
          }

        },
        error => {
          alert(error);
        });
  }

}
