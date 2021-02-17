import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../model/user.model";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

function readBase64(file): Promise<any> {
  var reader  = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener("error", function (event) {
      reject(event);
    }, false);

    reader.readAsDataURL(file);
  });
  return future;
}

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  user: User;
  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/api/upload',
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf'],
    authToken: 'Bearer '+localStorage.getItem('token'),
    });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: Toaster) { }

    ngOnInit() {
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
       const id = parseInt(this.route.snapshot.paramMap.get('id'))
       this.apiService.getUserById(id)
         .subscribe(data => {
           this.user = data;
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
