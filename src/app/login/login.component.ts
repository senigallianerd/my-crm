import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private apiService: ApiService,
    private toaster: Toaster) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }

    this.apiService.login(loginPayload).subscribe(data => {
      if(data && data.username) {
        window.localStorage.setItem('token', data.username);
        this.router.navigate(['list-user']);
      }else {
        this.invalidLogin = true;   
        this.loginError();
      }
    },err =>{
      this.loginError();
    });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  loginError(){
    this.toaster.open({
      text: 'Login Error',
      position: 'top-right',
      duration: 3000,
      type: 'warning'
    });
  }



}
