import { Component, OnInit, Inject, HostListener, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../model/user.model";
import { ApiService } from "../../service/api.service";
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { faUserPlus, faEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../../environments/environment';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  apiURL = environment.apiURL;
  dtTrigger = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  faUserPlus = faUserPlus;
  faEdit = faEdit;
  faUserTimes = faUserTimes;
  dtInstance: Promise<DataTables.Api>;
  users: User[];
  dtOptions: DataTables.Settings = {};
  back: boolean;

  @HostListener('click', ['$event']) 
  onClick(e) {
      if(e.target.tagName==='A' && e.target.className === 'link'){
        this.findUser(e.target.text)
        e.preventDefault();
        e.stopPropagation();
      }
    }

  constructor(private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private http: HttpClient) {  }

    ngOnInit(): void {
      this.spinner.show();
      this.dtOptions = {
        pagingType: 'full_numbers',
        responsive: true,
        serverSide: true,
        processing: true,
        ajax: (dataTablesParameters: any, callback) => {
          this.http
            .post<DataTablesResponse>(
              this.apiURL + 'get-user-server.php',
              dataTablesParameters, {}
            ).subscribe(resp => {
              this.users = resp.data;
              this.spinner.hide();
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            });
        },
        columns: [{ data: 'id' }, { data: 'cognome' }, { data: 'nome' }],
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
    }

    ngAfterViewInit(): void {
      this.dtElement.dtTrigger.next()
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
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
