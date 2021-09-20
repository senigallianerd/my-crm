import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-crm';

  constructor() { }

  ngOnInit() {
    const isPortrait = window.matchMedia('(max-width: 767px) and (orientation: portrait)').matches;
    const isLandscape = window.matchMedia('(max-width: 926px) and (orientation: landscape)').matches;
    isPortrait || isLandscape ? environment.isSmartphone = true : environment.isSmartphone = false;
  }


}
