import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RegistrationsService } from '../shared/services/registrations.service';

@Component({
  selector: 'app-pas-register',
  templateUrl: './pas-register.component.html',
  styleUrls: ['./pas-register.component.css']
})
export class PasRegisterComponent implements OnInit {
  password: string;
  repeatPassword: string;
  username: string;
  email: string;
  phone: string;
  company: string;
  error: string;
  showError: boolean;

  constructor(
    private registrationsService: RegistrationsService
  ) { }

  ngOnInit() {
  }

  register() {
    if (this.password !== this.repeatPassword) {
      alert('Las passwords no coinciden!');
      return;
    }

    this.registrationsService.registerPas({
      username: this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
      company: this.company,
      segguClient: null
    }).subscribe(
      res => {
        alert('Su usuario se creo correctamente!\nPodes loguearte con este usuario en SeGGu Escritorio.');
        window.close();
      },
      onError
      );

    function onError(error) {
      this.error = error.message || error;
      this.showError = true;
      window.alert(this.error);
      return Observable.throw(error.message || error);
    }
  }
}
