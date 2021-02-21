import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() { }
 
  private user;

  getUser(){
      return this.user;
  }

  setUser(user){
      this.user = user;
  }


}
