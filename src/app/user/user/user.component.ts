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

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  file=new FormControl('');
  file_data:any=''
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
  insurance;
  compagnie;
  compagnia;

  constructor(private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private insuranceService: InsuranceService,
    private apiService: ApiService,
    private toaster: Toaster) {
    }

    ngOnInit() {
      this.uploadData = new Policy(this.selectedInsurance, this.user.id, '','','' );
      this.getInsurances(this.user.id);
      this.getCompagnie();
    }

    getInsurances(userId){
      this.apiService.getInsuranceByUserId(userId).subscribe(data => {
        this.fileList = data;
       })
    }

    getCompagnie(){
      this.insuranceService.getCompagnie().subscribe(data => {
        this.compagnie = data;
       })
    }

    selectInsurance(){
      this.uploadData.compagnia =this.selectedInsurance;
    }

   public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);
  }

  uploadFile(){
      this.uploading = true;
      this.http.post(environment.apiURL + 'upload.php',this.file_data)
      .subscribe(res => {
        this.uploadData.fileName = res['fileName'];
        this.apiService.setUploadInfo(this.uploadData).subscribe(data => {
          if(data){
            this.uploading = false;
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

  getFile(fileName){
    window.open(environment.policyURL + fileName)
  }

  deleteFile(file) {
    this.apiService.deletePolicy(file.id).subscribe(data => {
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

  fileChange(index,event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        const file = fileList[0];
        console.log('finfo',file.name,file.size,file.type);
        //max file size is 20mb
        if((file.size/1048576)<=50)
        {
          let formData = new FormData();
          formData.append('file', file, file.name);
          formData.append('ts',new Date().toISOString())
          this.file_data=formData
        }else{
          console.log('Errore dimensione file')
        }
    }
  }

  onChangeSingle(event){
    this.uploadData.scadenzaAnnuale = new Date(event);
  }

  goHome() {
    this.router.navigate(['list-user']);
  }
}
