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
  back: boolean;

  constructor(private router: Router, 
    private apiService: ApiService,
    private storage: LocalStorageService) { }

  ngOnInit() {
    this.initUsers(true);
  }

  initUsers(init?){
    this.apiService.getUsers()
      .subscribe( data => {
        this.users = data;
        if(init)
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
    const name = user.match(/[A-Z][a-z]+/g)[0];
    const surname = user.match(/[A-Z][a-z]+/g)[1];
    this.apiService.getUserByName(name,surname)
    .subscribe( data => {
      this.users = data;
      this.back = true;
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

  goBack(){
    this.back = false;
    this.initUsers();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
