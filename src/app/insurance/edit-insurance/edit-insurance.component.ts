import { Component, OnInit , Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { InsuranceService } from '../insurance.service';

@Component({
  selector: 'app-edit-insurance',
  templateUrl: './edit-insurance.component.html',
  styleUrls: ['./edit-insurance.component.scss']
})
export class EditInsuranceComponent implements OnInit {

  insurances = [];
  selectedInsurance;
  editForm: FormGroup;
  singleDatePickerOptions = { displayFormat:'dd/MM/yyyy' }
  singleDate;
  insurance;
  rami;
  compagnie;
  selectedRamo;
  selectedCompagnia;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private insuranceService: InsuranceService,
    private toaster: Toaster) { }

  ngOnInit() {
    this.insurance = this.route.snapshot.data['insurance'];
    this.rami = this.insuranceService.getRami();
    this.compagnie = this.insuranceService.getCompagnie();
    this.selectedRamo = this.insurance['ramo'];
    this.selectedCompagnia = this.insurance['compagnia'];
    this.singleDate = this.insurance && this.insurance.data ? new Date(this.insurance.data) : '';
    this.editForm = this.formBuilder.group({
      id: [''],
      numero: ['', Validators.required],
      ramo: [''],
      compagnia: [''],
      targa: [''],
      data: [''],
      frazionamento: [''],
      premioAnnuale: [''],
      premioRata: [''],
      fattura: [''],
      note: ['']
    });
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.apiService.getInsuranceById(id)
    .subscribe( data => {
      this.editForm.setValue(data);
    });
  }

  onChangeSingle(event){
    this.editForm.value.data = new Date(event)
  }

  onSelectedChange(event){
  }

  selectCompagnia(){
    this.editForm.value.compagnia =  this.selectedCompagnia;
  }

  selectRamo(){
    this.editForm.value.ramo = this.selectedRamo;
  }

  getInsurances(userId){
    this.apiService.getInsurances()
    .subscribe( data => {
      this.insurances = data;
      this.selectedInsurance = this.insurances.find((u) => u.id==userId)
    });
  }

  goHome(){
    this.router.navigate(['list-user']);
  }

  onSubmit() {
    const dataToSend = this.editForm.value;
    this.apiService.updateInsurance(dataToSend)
      .pipe(first())
      .subscribe(
        data => {
          if(data){
            console.log('insurance updated');
            this.toaster.open({
              text: 'Aggiornamento completato',
              position: 'top-right',
              duration: 3000,
              type: 'success'
            });
          }
          else{
            alert("Error")
          }
        },
        error => {
          alert(error);
        });
  }

}
