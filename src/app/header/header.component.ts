import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router,
    private storage: LocalStorageService) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['list-user']);
  }

  logout(){
    this.storage.clear('user');
    this.router.navigate(['login']);
    console.log('logout')
  }

}
