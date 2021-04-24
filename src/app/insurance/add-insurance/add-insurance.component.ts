import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { InsuranceService } from '../insurance.service';
import { Policy } from 'src/app/model/policy.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.scss']
})
export class AddInsuranceComponent implements OnInit {

  @Input() userId;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private insuranceService: InsuranceService,
    private apiService: ApiService,
    private toaster: Toaster) { }

  private insurances;
  private fileName;

  addForm: FormGroup;
  selectedInsurance;
  singleDatePickerOptions;
  singleDate;
  rami;
  compagnie;
  selectedRamo;
  selectedCompagnia;
  file = new FormControl('');
  file_data: any = '';
  uploading: boolean = false;

  ngOnInit() {
    this.rami = this.insuranceService.getRami();
    this.compagnie = this.insuranceService.getCompagnie();
    this.selectedRamo = this.insuranceService.getRami()[0]
    this.selectedCompagnia = this.insuranceService.getCompagnie()[0]
    this.addForm = this.formBuilder.group({
      id: [],
      numero: ['', Validators.required],
      ramo: [''],
      compagnia: [''],
      targa: [''],
      scadenzaAnnuale: [''],
      frazionamento: [''],
      premioAnnuale: [''],
      premioRata: [''],
      fattura: [''],
      note: [''],
      userId: ['']
    });
    this.getInsurances();
  }

  onChangeSingle(event) {
  }

  selectCompagnia() {
    this.addForm.value.compagnia = this.selectedCompagnia;
  }

  selectRamo() {
    this.addForm.value.ramo = this.selectedRamo;
  }

  getInsurances() {
    this.apiService.getInsurances()
      .subscribe(data => {
        this.insurances = data;
        this.selectedInsurance = this.insurances[0];
      });
  }

  onSelectedChange(event) {
  }

  goHome() {
    this.router.navigate(['list-user']);
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      console.log('finfo', file.name, file.size, file.type);
      //max file size is 20mb
      if ((file.size / 1048576) <= 50) {
        let formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('ts', new Date().toISOString())
        this.file_data = formData
      } else {
        console.log('Errore dimensione file')
      }
    }
  }

  uploadFile() {
    this.uploading = true;
    this.http.post(environment.apiURL + 'upload.php', this.file_data)
      .subscribe(res => {
        this.fileName = res['fileName'];
        this.uploading = false;
        this.toaster.open({
          text: 'Upload completato',
          position: 'top-right',
          duration: 3000,
          type: 'success'
        });
      }, (err) => {
        this.toaster.open({
          text: 'Errore Upload',
          position: 'top-right',
          duration: 3000,
          type: 'warning'
        });
      });
  }


  onSubmit() {
    console.log('submitted')
    if (this.addForm.invalid) {
      this.toaster.open({
        text: "Errore nel form di salvataggio",
        position: 'top-right',
        duration: 3000,
        type: 'info'
      });
      return;
    }

    this.addForm.value.userId = this.userId;
    this.addForm.value.fileName = this.fileName;
    let insuranceForm = this.addForm.value;
    this.apiService.addInsurance(insuranceForm)
      .subscribe(data => {
        if (data) {
          this.apiService.update('ok')
          console.log('Polizza creata');
          this.toaster.open({
            text: 'Polizza creata',
            position: 'top-right',
            duration: 3000,
            type: 'success'
          });
        }
        else
          this.apiService.update('error')
      });
  }

}
