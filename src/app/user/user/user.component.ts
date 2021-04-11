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
  fileList: Policy[] = [];
  uploadData: Policy;
  uploading: boolean = false;

  constructor(private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: Toaster) {
    }

    ngOnInit() {
      this.uploadData = new Policy(this.selectedInsurance, this.user.id, '','' );
      this.getUserPolicy(this.user.id);
      this.getInsurances();
    }

    getInsurances(){
      this.apiService.getInsurances().subscribe(data => {
        this.insurances = data;
        debugger
        this.selectedInsurance = this.insurances[0];
        this.uploadData.insuranceId = this.insurances[0].id;
       })
    }

    selectInsurance(selectedInsurance:any){
      debugger
      this.uploadData.insuranceId =this.selectedInsurance.id;
    }

    getUserPolicy(userId){
      this.apiService.getUserPolicy(userId).subscribe(data => {
        debugger
        this.fileList = data;
       })
    }

   public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);
  }

  uploadFile(){
      this.uploading = true;
      debugger
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
            this.getUserPolicy(this.user.id)
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
    debugger
    this.apiService.deletePolicy(file.id).subscribe(data => {
      if (data) {
        this.toaster.open({
          text: 'File deleted',
          position: 'top-right',
          duration: 3000,
          type: 'success'
        });
        this.getUserPolicy(this.user.id)
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
    this.uploadData.expirationDate = new Date(event);
  }

  goHome() {
    this.router.navigate(['list-user']);
  }
}
