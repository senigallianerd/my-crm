import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../model/user.model";
import { ApiService } from "../../service/api.service";
import Swal from 'sweetalert2';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { faUserPlus, faEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  faUserPlus = faUserPlus;
  faEdit = faEdit;
  faUserTimes = faUserTimes;

  @HostListener('click', ['$event']) 
  onClick(e) {
      if(e.target.tagName==='A' && e.target.className === 'link'){
        this.findUser(e.target.text)
        e.preventDefault();
        e.stopPropagation();
      }
    }

  users: User[];
  dtOptions: DataTables.Settings = {
    order: [1, 'asc'],
    pageLength: 25,
    language: {
      "lengthMenu": "Mostra _MENU_ record per pagina",
      "zeroRecords": "0 Risultati",
      "info": "Mostra pagina _PAGE_ di _PAGES_",
      "infoEmpty": "No record disponibili",
      "infoFiltered": "(filtered from _MAX_ total records)",
      "search": "Ricerca",
      "paginate": {
        "previous": "precedente",
        "next": "prossima",
        "first": "prima",
        "last": "ultima"
      }
    }
  };
  dtTrigger: Subject<any> = new Subject<any>();
  back: boolean;

  constructor(private router: Router,
    private apiService: ApiService,
    private storage: LocalStorageService) {
   
  }

  ngOnInit() {
    this.initUsers(true);
  }

  findUser(user) {
    const nome = user.match(/[A-Z][a-z]+/g)[0];
    const cognome = user.match(/[A-Z][a-z]+/g)[1];
    this.apiService.getUserByName(nome, cognome)
      .subscribe(data => {
        this.users = data;
        this.back = true;
      });
  }

  initUsers(init?) {
    this.apiService.getUsers()
      .subscribe(data => {
        this.users = data;
        if(init)
          this.dtTrigger.next();
      });
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Vuoi cancellare il cliente?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUser(user.id)
          .subscribe(data => {
            this.users = this.users.filter(u => u !== user);
          })
      }
    })
  };

  editUser(user: User) {
    this.router.navigate(['edit-user/' + user.id]);
  };

  addUser() {
    this.router.navigate(['add-user']);
  };

  userDetail(id) {
    this.router.navigate(['user/' + id]);
  }

  goBack() {
    this.back = false;
    this.initUsers();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
