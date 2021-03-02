import { Component, OnInit , Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {User} from "../../model/user.model";
import {ApiService} from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  users: User[];
  selectedUser;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: Toaster) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      link: [],
      userId: [],
      userData: []
    });
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.apiService.getUserById(id)
    .subscribe( data => {
      this.editForm.setValue(data);
      this.getUsers(data['userId']);
    });

  }

  onSelectedChange(event){
    debugger
  }

  getUsers(userId){
    this.apiService.getUsers()
    .subscribe( data => {
      this.users = data;
      this.selectedUser = this.users.find((u) => u.id==userId)
    });
  }

  goHome(){
    this.router.navigate(['list-user']);
  }

  onSubmit() {
    const dataToSend = this.editForm.value;
    dataToSend.userId = this.editForm.value.userId.id
    this.apiService.updateUser(dataToSend)
      .pipe(first())
      .subscribe(
        data => {
          console.log('user updated');
          this.toaster.open({
            text: 'User updated',
            position: 'top-right',
            duration: 3000,
            type: 'success'
          });
        },
        error => {
          alert(error);
        });
  }

}
