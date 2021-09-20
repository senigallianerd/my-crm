import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { faSignOutAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { environment } from '../../environments/environment';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentPage: string;
  faSignOutAlt = faSignOutAlt
  faAddressCard = faAddressCard;
  isSmartphone: boolean;


  constructor( private router: Router,
    private storage: LocalStorageService) { }


    ngOnInit() {
      this.isSmartphone = environment.isSmartphone;
      this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentPage = e.url.replace('/','');
        this.currentPage = this.currentPage || 'login';
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
