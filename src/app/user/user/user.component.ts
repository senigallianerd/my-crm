import { Component, OnInit, Inject, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../model/user.model";
import { Policy } from "../../model/policy.model";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { environment } from '../../../environments/environment';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ModalComponent } from 'src/app/modal';
import { Subscription } from 'rxjs';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  @ViewChild('componentInsideModal') componentInsideModal: ModalComponent;
  file=new FormControl('');
  file_data:any=''
  user: User = this.route.snapshot.data['user'];
  index;
  model;
  singleDatePickerOptions;
  singleDate;
  insurances;
  selectedInsurance;
  fileList = [];
  userId;
  private subscription: Subscription;

  constructor(private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: Toaster) {
    }

    ngOnInit() {
      this.userId = this.route.snapshot.params['id'];
      this.getUserInsurances(this.user.id);
      this.getInsurances();
      this.subscription = this.apiService.onUpdate.subscribe( res => {
        this.getUserInsurances(this.user.id);
      })
    }

    getInsurances(){
      this.apiService.getInsurances().subscribe(data => {
        this.insurances = data;
       })
    }


    getUserInsurances(userId){
      this.apiService.getUserInsurances(userId).subscribe(data => {
        this.fileList = data;
       })
    }

   public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);
  }

  updatePolicy(policy) {
    this.router.navigate(['edit-insurance/' + policy.id]);
  }

  getFile(fileName){
    window.open(environment.policyURL + fileName)
  }

  deletePolicy(policy) {
    this.apiService.deletePolicy(policy.id).subscribe(data => {
      if (data) {
        this.toaster.open({
          text: 'File deleted',
          position: 'top-right',
          duration: 3000,
          type: 'success'
        });
        this.getUserInsurances(this.user.id)
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

  goHome() {
    this.router.navigate(['list-user']);
  }
}
