import { Component, OnInit , Inject} from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first} from "rxjs/operators";
import { User} from "../../model/user.model";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../user.service';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

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
  singleDatePickerOptions;
  dataNascita;
  dataScadenzaCartaIdentita;
  user: User;
  selectedTag;
  selectedTipoContatto;
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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private toaster: Toaster) { }

  ngOnInit() {
    this.initValues();
    this.user = this.route.snapshot.data['user'];
    this.dataNascita = this.user && this.user.dataNascita ? new Date(this.user.dataNascita) : '';
    this.dataScadenzaCartaIdentita = this.user && this.user.dataScadenzaCartaIdentita ? new Date(this.user.dataScadenzaCartaIdentita) : '';
    this.editForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      azienda: [''],
      collaboratore: [''],
      cellulare: [''],
      tipoContatto: [''],
      telCasa: [''],
      telUfficio: [''],
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
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.apiService.getUserById(id)
    .subscribe( data => {
      this.editForm.setValue(data);
    });
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
  }

  selectTipoContatto(){
    this.editForm.value.tipoContatto =  this.selectedTipoContatto;
  }

  selectTag(){
    this.editForm.value.collaboratore = this.selectedTag;
  }

  onChangeDataNascita(event){
    this.editForm.value.dataNascita = new Date(event)
  }

  onChangeDataScadenzaIdentita(event){
    this.editForm.value.dataScadenzaCartaIdentita = new Date(event)
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

  onSubmit() {
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
