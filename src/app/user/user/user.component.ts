import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../model/user.model";
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
  user: User;
  index;
  model;
  singleDatePickerOptions;
  singleDate;
  uploadData;
  options = ['vita','auto','scooter'];
  type;

  constructor(private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: Toaster) {
    }

    ngOnInit() {
      this.user = this.route.snapshot.data['user'];
      this.uploadData = {expirationDate:new Date(), userId:this.user.id, type:'',fileName:''}
    }

   public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);
  }

  uploadFile(){
      this.http.post(environment.apiURL + 'upload.php',this.file_data)
      .subscribe(res => {
        this.uploadData.fileName = res['fileName'];
        this.apiService.setUploadInfo(this.uploadData).subscribe(data => {
          if(data)
            this.toaster.open({
              text: 'Upload completed',
              position: 'top-right',
              duration: 3000,
              type: 'success'
            });
         })
      //send success response
      }, (err) => {
        this.toaster.open({
          text: 'Upload error',
          position: 'top-right',
          duration: 3000,
          type: 'warning'
        });
      //send error response
    });
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
    this.uploadData.date = new Date(event);
  }

  goHome() {
    this.router.navigate(['list-user']);
  }
}
