import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['list-user']);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    console.log('logout')
  }

}
