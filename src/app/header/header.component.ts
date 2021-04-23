import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentPage: string;
  visible: boolean = true;

  constructor( private router: Router,
    private storage: LocalStorageService) { }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentPage = e.url.replace('/','')
        this.visible = (this.currentPage.indexOf('login')>= 0 || 
                        this.currentPage=='' ||
                       this.currentPage.indexOf('add-insurance')>= 0) ? false : true;
      }
    });
  }

  goTo(route){
      this.router.navigate([route]);
  }

  logout(){
    this.storage.clear('user');
    this.router.navigate(['login']);
    console.log('logout')
  }

}
