import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";
import Swal from 'sweetalert2';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-insurance',
  templateUrl: './list-insurance.component.html',
  styleUrls: ['./list-insurance.component.scss']
})
export class ListInsuranceComponent implements OnInit {

  insurances = [];
  back: boolean;

  constructor(private router: Router,
    private apiService: ApiService,
    private storage: LocalStorageService) {
   
  }

  ngOnInit() {
    this.initInsurances();
  }

  initInsurances() {
    this.apiService.getInsurances()
      .subscribe(data => {
        this.insurances = data;
      });
  }

  deleteInsurance(insurance) {
    Swal.fire({
      title: 'Do you want delete Insurance?',
      showDenyButton: true,
      confirmButtonText: `Ok`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteInsurance(insurance.id)
          .subscribe(data => {
            this.insurances = this.insurances.filter(u => u !== insurance);
          })
      }
    })
  };

  editInsurance(insurance) {
    this.router.navigate(['edit-insurance/' + insurance.id]);
  };

  addInsurance() {
    this.router.navigate(['add-insurance']);
  };

  insuranceDetail(id) {
    this.router.navigate(['insurance/' + id]);
  }

  ngOnDestroy(): void {
  }
}
