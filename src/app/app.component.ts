import { Component } from '@angular/core';
import { InsuranceService } from './insurance/insurance.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-crm';

  constructor(private insuranceService: InsuranceService,
    private userService: UserService ) { }

  ngOnInit() {
  }


}
