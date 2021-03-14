import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.scss']
})
export class AddInsuranceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private apiService: ApiService,
    private toaster: Toaster) { }
    private insurances;

  addForm: FormGroup;
  selectedInsurance;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      type: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.getInsurances();
  }

  getInsurances(){
    this.apiService.getInsurances()
    .subscribe( data => {
      this.insurances = data;
      this.selectedInsurance = this.insurances[0];
    });
  }

  onSelectedChange(event){
  }

  goHome(){
    this.router.navigate(['list-user']);
  }

  onSubmit() {
    if (this.addForm.invalid) {
      this.toaster.open({
        text: "Errore nel form di salvataggio",
        position: 'top-right',
        duration: 3000,
        type: 'info'
      });
      return;
    }
    debugger
    let insuranceForm = this.addForm.value;
    this.apiService.createInsurance(insuranceForm)
      .subscribe( data => {
        if(data){
          console.log('insurance created');
          this.toaster.open({
            text: 'Insurance created',
            position: 'top-right',
            duration: 3000,
            type: 'success'
          });
        }
      });
  }

}
