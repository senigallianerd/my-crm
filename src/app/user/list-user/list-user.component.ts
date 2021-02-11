import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../model/user.model";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
   /* if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getUsers()
      .subscribe( data => {
        this.users = data.result;
      });*/
    this.users = [{'id':1,'name':'Francesco','surname':'Cini','age':999},
                  {'id':2,'name':'Mattia','surname':'Mazzoli','age':999}]
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    window.localStorage.removeItem("editUser");
    window.localStorage.setItem("editUser", JSON.stringify(user));
    this.router.navigate(['edit-user/'+user.id]);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}
