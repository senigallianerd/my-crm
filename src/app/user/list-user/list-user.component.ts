import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../model/user.model";
import {ApiService} from "../../service/api.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Do you want delete User?',
      showDenyButton: true,
      confirmButtonText: `Ok`,
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiService.deleteUser(user.id)
        .subscribe( data => {
          this.users = this.users.filter(u => u !== user);
        })
      }
    })
  };

  editUser(user: User) {
    window.localStorage.removeItem("editUser");
    window.localStorage.setItem("editUser", JSON.stringify(user));
    this.router.navigate(['edit-user/'+user.id]);
  };

  addUser() {
    this.router.navigate(['add-user']);
  };

  userDetail(id){
    this.router.navigate(['user/'+id]);
  }
}
