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
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
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


  constructor(private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private insuranceService: InsuranceService,
    private apiService: ApiService,
    private toaster: Toaster) {
  }

  ngOnInit() {
    this.uploadData = new Policy(this.user.id, '', '', '', '');
    this.getInsurances(this.user.id);
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
        this.uploadData.fileName = res['fileName'];
        this.uploadData.tipoDoc = this.tipoDoc;
        this.uploadData.sottotipoDoc = this.sottotipoDoc;
        this.apiService.setUploadInfo(this.uploadData).subscribe(data => {
          if (data) {
            this.uploading = false;
            setTimeout(() => this.getInsurances(this.user.id), 5);
            this.toaster.open({
              text: 'Upload completed',
              position: 'top-right',
              duration: 3000,
              type: 'success'
            });
          }
        })
      }, (err) => {
        this.toaster.open({
          text: 'Upload error',
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
    this.apiService.deletePolicy(file.id).subscribe(data => {
      this.getInsurances(this.user.id);
      if (data) {
        this.toaster.open({
          text: 'File deleted',
          position: 'top-right',
          duration: 3000,
          type: 'success'
        });

      }
      else
        this.toaster.open({
          text: 'Delete file error',
          position: 'top-right',
          duration: 3000,
          type: 'warning'
        });
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
}
