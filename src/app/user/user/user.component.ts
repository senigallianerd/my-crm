import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../model/user.model";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { FileUploader, FileLikeObject, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  user: User;
  public uploader: FileUploader = new FileUploader({
    url: environment.apiURL + 'upload',
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf','doc','xls','compress'],
    authToken: 'Bearer '+localStorage.getItem('token'),
    });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: Toaster) { }

    ngOnInit() {
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
      this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
      this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  
       const id = parseInt(this.route.snapshot.paramMap.get('id'))
       this.apiService.getUserById(id)
         .subscribe(data => {
           this.user = data;
         });
   }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); 
    console.log('item uploaded',data);
    this.toaster.open({
      text: 'Item uploaded',
      position: 'top-right',
      duration: 3000,
      type: 'success'
    });
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = JSON.parse(response); 
    console.log('error on item upload',error);
    this.toaster.open({
      text: 'Upload error',
      position: 'top-right',
      duration: 3000,
      type: 'warning'
    });
  }

   public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);
  }


  goHome() {
    this.router.navigate(['list-user']);
  }


}
