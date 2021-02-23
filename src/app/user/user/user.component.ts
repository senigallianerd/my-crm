import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../model/user.model";
import { Policy } from "../../model/policy.model";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { environment } from '../../../environments/environment';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  options = ['vita','auto','scooter'];
  type = this.options[0];
  fileList: Policy[] = [];
  uploadData: Policy;
  uploading: boolean = false;

  constructor(private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: Toaster) {
    }

    ngOnInit() {
      this.uploadData = new Policy(this.type, this.user.id, '','' );
      this.getUserPolicy(this.user.id);
    }

    getUserPolicy(userId){
      this.apiService.getUserPolicy(userId).subscribe(data => {
        this.fileList = data;
       })
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
        if((file.size/1048576)<=20)
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

  onSelectedChange(event){
    this.uploadData.type = event;
  }

  onChangeSingle(event){
    this.uploadData.expirationDate = new Date(event);
  }

  goHome() {
    this.router.navigate(['list-user']);
  }
}
