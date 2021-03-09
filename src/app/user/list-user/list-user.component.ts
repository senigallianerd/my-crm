import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../model/user.model";
import {ApiService} from "../../service/api.service";
import Swal from 'sweetalert2';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: User[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router, 
    private apiService: ApiService,
    private storage: LocalStorageService) { }

  ngOnInit() {
    this.apiService.getUsers()
      .subscribe( data => {
        this.users = data;
        this.dtTrigger.next();
      });
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Do you want delete User?',
      showDenyButton: true,
      confirmButtonText: `Ok`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUser(user.id)
        .subscribe( data => {
          this.users = this.users.filter(u => u !== user);
        })
      }
    })
  };

  findUser(user){
    const name = user.match(/[A-Z][a-z]+/g)[0] || '';
    const surname = user.match(/[A-Z][a-z]+/g)[1] || '';
    this.apiService.getUserByName(name,surname)
    .subscribe( data => {
      this.users = data;
    });
  }

  editUser(user: User) {
    this.router.navigate(['edit-user/'+user.id]);
  };

  addUser() {
    this.router.navigate(['add-user']);
  };

  userDetail(id){
    this.router.navigate(['user/'+id]);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
