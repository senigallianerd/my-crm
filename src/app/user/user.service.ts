import { Injectable } from '@angular/core';
import { ApiService } from "./../service/api.service";
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable()
export class UserService {

    constructor(private apiService: ApiService) {
    }

    public previousSearch: string;

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

    getCAPfromComune(comune){
        return this.apiService.getCAPfromComune(comune).pipe(
            map(data => data.map(({ cap }) => cap))
        )
    }

    initProvince() {
        return this.apiService.getProvince().pipe(
            map(data => data.map(({ sigla }) => sigla))
        )
    }

    initComuni(prov) {
        return this.apiService.getComuni(prov).pipe(
            map(data => data.map(({ comune }) => comune))
        )
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validateCodiceFiscale(code){
        var pattern = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/;
        if (code.search(pattern) == -1)
            return false
        else
            return true;
    }

    validatePartitaIva(pIVA){
        if (pIVA == '') 
            return false
        else if (!/^[0-9]{11}$/.test(pIVA)){
            console.log('La partita IVA deve contenere 11 cifre.')
            return false;
        } 
        else 
            return true;
    }

}




