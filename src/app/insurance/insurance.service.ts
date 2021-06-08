import { Injectable } from '@angular/core';
import { ApiService } from "./../service/api.service";
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable()
export class InsuranceService {

    constructor(private apiService: ApiService) {
    }

    getRami() {
        return this.apiService.getRami().pipe(
            map(data => data.map(({ nome }) => nome)),
        );
    }

    getCompagnie() {
        return this.apiService.getCompagnie().pipe(
            map(data => data.map(({ nome }) => nome)),
        );
    }

    getListaPreventivi() {
        return this.apiService.getListaPreventivi().pipe(
            map(data => data.map(({ nome }) => nome)),
        );
    }

    getListaDocs() {
        return this.apiService.getListaDocs().pipe(
            map(data => data.map(({ nome }) => nome)),
        );
    }

}




