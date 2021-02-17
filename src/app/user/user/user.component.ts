import { Component, OnInit , Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/user.model";
import {ApiService} from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: Toaster) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.apiService.getUserById(id)
    .subscribe( data => {
      debugger
      this.user = data;
    });
  }

  goHome(){
    this.router.navigate(['list-user']);
  }


}
