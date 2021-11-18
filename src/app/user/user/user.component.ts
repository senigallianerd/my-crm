import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../model/user.model";
import { Policy } from "../../model/policy.model";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { environment } from '../../../environments/environment';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { InsuranceService } from '../../insurance/insurance.service';
import { map } from 'rxjs/operators';
import { faChevronDown, faChevronUp, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faWindowClose = faWindowClose
  faEdit = faEdit;
  file = new FormControl('');
  file_data: any = ''
  user: User = this.route.snapshot.data['user'];
  index;
  model;
  singleDatePickerOptions;
  singleDate;
  insurances;
  selectedInsurance;
  fileList: any = [];
  noteList: any = [];
  uploadData: Policy;
  uploading: boolean = false;
  sottotipoDoc;
  sottotipoDocs;
  tipoDocs;
  tipoDoc;
  previousSearch: string;
  dtOptions: DataTables.Settings = {};
  blockName;
  blockCity;
  blockAnagrafica;
  blockCompany;
  blockContact;
  blockOther;
  blockInternal;
  blockData = true;
  frazionamentoSemestrale = false;
  targa;
  noteText;
  noteTitle;
  noteSection;
  docSection;
  noteReadOnly = false;
  noteDoc;
  numero;
  premioRata;

  constructor(private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private insuranceService: InsuranceService,
    private apiService: ApiService,
    private toaster: Toaster) {
  }

  ngOnInit() {
    this.uploadData = new Policy(this.user.id, '', '', '', '',false,'','');
    this.getInsurances(this.user.id);
    this.getNotes(this.user.id);
    this.getCompagnie();
    this.getTipoDocs();
    this.initDtOptions();
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

  onSelectChange(type) {
    if (type === 'documento')
      this.getListaDocs();
    else if (type === 'polizza')
      this.getCompagnie();
    else if (type === 'preventivo')
      this.getListaPreventivi();
  }

  initDtOptions() {
    this.dtOptions = {
      searching: false,
      paging: false,
      info: false
    };
  }

  getInsurances(userId) {
    this.apiService.getInsuranceByUserId(userId).subscribe(data => {
      this.fileList = data;
    })
  }

  getNotes(userId){
    this.apiService.getNotesByUserId(userId).subscribe(data => {
      this.noteList = data;
    })
  }

  orderBy(value) {
    const desc = this.previousSearch === value;
    this.fileList = this.fileList.sort(function (a, b) {
      if(desc)
        return b[value].localeCompare(a[value])
      else
       return a[value].localeCompare(b[value])
    });
    this.previousSearch = value;
  }

  getTipoDocs() {
    this.apiService.getTipoDocs().pipe(
      map(data => data.map(({ nome }) => nome))).subscribe(data => {
        this.tipoDocs = data;
        this.tipoDoc = this.tipoDocs[0];
      })
  }

  getCompagnie() {
    this.insuranceService.getCompagnie().subscribe(data => {
      this.sottotipoDocs = data;
      this.sottotipoDoc = data[0];
    })
  }

  getListaPreventivi() {
    this.insuranceService.getListaPreventivi().subscribe(data => {
      this.sottotipoDocs = data;
      this.sottotipoDoc = data[0];
    })
  }

  getListaDocs() {
    this.insuranceService.getListaDocs().subscribe(data => {
      this.sottotipoDocs = data;
      this.sottotipoDoc = data[0];
    })
  }

  selectSottoTipoDoc() {
    this.uploadData.sottotipoDoc = this.sottotipoDoc;
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);
  }

  uploadFile() {
    this.uploading = true;
    this.http.post(environment.apiURL + 'upload.php', this.file_data)
      .subscribe(res => {
        console.log('UPLOAD su cartella effettuato correttamente',res)
        this.uploadData.fileName = res['fileName'];
        this.uploadData.tipoDoc = this.tipoDoc;
        this.uploadData.sottotipoDoc = this.sottotipoDoc;
        this.uploadData.targa = this.targa;
        this.uploadData.frazionamentoSemestrale = this.frazionamentoSemestrale;
        this.uploadData.note = this.noteDoc;
        this.uploadData.numero = this.numero;
        this.uploadData.premioRata = this.premioRata;
        debugger
        this.apiService.setUploadInfo(this.uploadData).subscribe(data => {
          if (data) {
            console.log('SET UPLOAD INFO completato')
            this.uploading = false;
            setTimeout(() => this.getInsurances(this.user.id), 5);
            this.toaster.open({
              text: 'Caricamento completato',
              position: 'top-right',
              duration: 3000,
              type: 'success'
            });
          }
        },(err) => {
          console.log('UPLOAD Error',err)
          this.toaster.open({
            text: 'Errore Caricamento',
            position: 'top-right',
            duration: 3000,
            type: 'warning'
          });
        })
      }, (err) => {
        console.log('UPLOAD Error',err)
        this.toaster.open({
          text: 'Errore Caricamento',
          position: 'top-right',
          duration: 3000,
          type: 'warning'
        });
      });
  }

  getFile(fileName) {
    window.open(environment.policyURL + fileName)
  }

  deleteFile(file) {
    Swal.fire({
      title: 'Vuoi cancellare il documento?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deletePolicy(file.id).subscribe(data => {
          this.getInsurances(this.user.id);
          if (data) {
            this.toaster.open({
              text: 'File cancellato',
              position: 'top-right',
              duration: 3000,
              type: 'success'
            });
    
          }
          else
            this.toaster.open({
              text: 'Errore nella cancellazione',
              position: 'top-right',
              duration: 3000,
              type: 'warning'
            });
        })
      }
    })
  }

  deleteNote(note) {
    Swal.fire({
      title: 'Vuoi cancellare la Nota?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteNote(note.id).subscribe(data => {
          this.getNotes(this.user.id);
          if (data) {
            this.toaster.open({
              text: 'File cancellato',
              position: 'top-right',
              duration: 3000,
              type: 'success'
            });
    
          }
          else
            this.toaster.open({
              text: 'Errore nella cancellazione',
              position: 'top-right',
              duration: 3000,
              type: 'warning'
            });
        })
      }
    })
  }

  fileChange(index, event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      console.log('finfo', file.name, file.size, file.type);
      //max file size is 20mb
      if ((file.size / 1048576) <= 50) {
        let formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('ts', new Date().toISOString())
        this.file_data = formData
      } else {
        console.log('Errore dimensione file')
      }
    }
  }

  onChangeSingle(event) {
    this.uploadData.data = new Date(event);
  }

  goHome() {
    this.router.navigate(['list-user']);
  }

  editUser() {
    this.router.navigate(['edit-user/' + this.user.id]);
  };

  showHideNote(){
    this.noteReadOnly = false;
    this.noteSection = !this.noteSection;
    this.noteText = '';
    this.noteTitle = '';
  }

  showHideDoc(){
    this.docSection = !this.docSection;
  }

  showNote(note){
    this.noteSection = true;
    this.noteReadOnly = true;
    this.noteText = note.testo;
    this.noteTitle = note.titolo;
  }

  addNote() {
    if(!this.noteText && !this.noteTitle){
      this.toaster.open({
        text: 'Errore su inserimento nota',
        position: 'top-right',
        duration: 3000,
        type: 'warning'
      });
      return;
    }
    const noteObj = {'title':this.noteTitle, 'text':this.noteText,'date':new Date(),'userId':this.user.id}
    this.apiService.addNote(noteObj).subscribe(data => {
      if(data){
        this.getNotes(this.user.id);
        this.toaster.open({
          text: 'Nota inserita',
          position: 'top-right',
          duration: 3000,
          type: 'success'
        });
        this.noteSection = this.noteText = this.noteTitle = '';
      }
      else
        this.toaster.open({
          text: 'Errore su inserimento nota',
          position: 'top-right',
          duration: 3000,
          type: 'warning'
        });
    })
  }
}
