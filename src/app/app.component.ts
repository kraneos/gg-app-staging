import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  logout() {
    this.loginService.logout()
      .subscribe(
      res => {
        localStorage.removeItem('segguUser');
        this.router.navigate(['/login']);
      },
      error => onError
      );

    function onError(error) {
      this.error = error.message;
      this.showError = true;
      return Observable.throw(error.message);
    }
  }
}
