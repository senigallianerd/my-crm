import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from "./../service/api.service";

@Injectable()
export class CalendarResolver implements Resolve<any> {

  constructor( private route: ActivatedRoute,
    private apiService: ApiService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.apiService.getInsurances();
  }
}