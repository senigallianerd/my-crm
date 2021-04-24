import { Component, OnInit , Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { first } from "rxjs/operators";
import { ApiService } from "../../service/api.service";
import { Toaster } from 'ngx-toast-notifications';
import { InsuranceService } from '../insurance.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-insurance',
  templateUrl: './edit-insurance.component.html',
  styleUrls: ['./edit-insurance.component.scss']
})
export class EditInsuranceComponent implements OnInit {

  insurances = [];
  selectedInsurance;
  editForm: FormGroup;
  singleDatePickerOptions;
  singleDate;
  insurance;
  rami;
  compagnie;
  selectedRamo;
  selectedCompagnia;
  file = new FormControl('');
  file_data: any = '';
  uploading: boolean = false;
  fileName;
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private http: HttpClient,
    private insuranceService: InsuranceService,
    private toaster: Toaster) { }

  ngOnInit() {
    this.insurance = this.route.snapshot.data['insurance'];
    this.fileName = this.insurance.fileName;
    this.rami = this.insuranceService.getRami();
    this.compagnie = this.insuranceService.getCompagnie();
    this.selectedRamo = this.insurance['ramo'];
    this.selectedCompagnia = this.insurance['compagnia'];
    this.singleDate = this.insurance && this.insurance.scadenzaAnnuale ? new Date(this.insurance.scadenzaAnnuale) : '';
    this.editForm = this.formBuilder.group({
      id: [''],
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
      fileName: [''],
      userId: ['']
    });
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.apiService.getInsuranceById(id)
    .subscribe( data => {
      this.editForm.setValue(data);
    });
  }

  onChangeSingle(event){
    this.editForm.value.scadenzaAnnuale = new Date(event)
  }

  viewFile(fileName){
    if(fileName)
      window.open(environment.policyURL + fileName)
  }

  deleteFile(fileName){
    Swal.fire({
      title: "Sei sicuro di cancellare il file?",
      showDenyButton: true,
      confirmButtonText: `Ok`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteFileInsurance(this.insurance.id,fileName)
          .subscribe(data => {
            this.fileName = '';
          })
      }
    })
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
    this.editForm.value.fileName = this.fileName;
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
        this.onSubmit();
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

}
