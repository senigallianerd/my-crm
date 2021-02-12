import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private apiService: ApiService,
    private toaster: Toaster) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  goHome(){
    this.router.navigate(['list-user']);
  }

  onSubmit() {
    this.apiService.createUser(this.addForm.value)
      .subscribe( data => {
        if(data){
          console.log('user created');
          console.log('user created');
          this.toaster.open({
            text: 'User updated',
            position: 'top-right',
            duration: 3000,
            type: 'success'
          });
        }
      });
  }

}
