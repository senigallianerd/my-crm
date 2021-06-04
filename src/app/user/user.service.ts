import { Injectable } from '@angular/core';
import { ApiService } from "./../service/api.service";
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable()
export class UserService {

    constructor(private apiService: ApiService) {
    }

    initTags() {
        return this.apiService.getCollaboratore().pipe(
            map(data => data.map(({ nome }) => nome))
        )
    }

    initTipoContatti() {
        return this.apiService.getTipoContatto().pipe(
            map(data => data.map(({ nome }) => nome))
        )
    }

}




