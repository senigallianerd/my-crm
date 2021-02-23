import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import {User} from "../../model/user.model";

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
  users: User[];
  selectedUser;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      link: [''],
      user: ['']
    });
    this.getUsers();
  }

  getUsers(){
    this.apiService.getUsers()
    .subscribe( data => {
      this.users = data;
      this.selectedUser = this.users[0];
    });
  }

  onSelectedChange(event){
    debugger
  }

  goHome(){
    this.router.navigate(['list-user']);
  }

  onSubmit() {
    if (this.addForm.invalid) {
      this.toaster.open({
        text: "Errore nel form di salvataggio",
        position: 'top-right',
        duration: 3000,
        type: 'info'
      });
      return;
    }
    let userForm = this.addForm.value;
    userForm = {...userForm, userId: this.addForm.value.user.id, userData: this.addForm.value.user.surname };
    this.apiService.createUser(userForm)
      .subscribe( data => {
        if(data){
          console.log('user created');
          this.toaster.open({
            text: 'User created',
            position: 'top-right',
            duration: 3000,
            type: 'success'
          });
        }
      });
  }

}
