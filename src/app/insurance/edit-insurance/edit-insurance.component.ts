import { Component, OnInit , Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {ApiService} from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-edit-insurance',
  templateUrl: './edit-insurance.component.html',
  styleUrls: ['./edit-insurance.component.scss']
})
export class EditInsuranceComponent implements OnInit {

  insurances = [];
  selectedInsurance;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: Toaster) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [''],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.apiService.getInsuranceById(id)
    .subscribe( data => {
      this.editForm.setValue(data);
    });

  }

  onSelectedChange(event){
    debugger
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
              text: 'Insurance updated',
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
