import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RegistrationsService } from '../shared/services/registrations.service';

import { SegguClient } from '../shared/domain/seggu-client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  password: string;
  repeatPassword: string;
  username: string;
  email: string;
  error: string;
  producerName: string;
  showError: boolean;
  segguClients: SegguClient[];
  segguClient: SegguClient;

  constructor(
    private registrationsService: RegistrationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.segguClient = new SegguClient();
        this.segguClient.objectId = params['segguClientId'];
      },
      this.onError
    );
  }

  register() {
    if (this.password !== this.repeatPassword) {
      alert('Las passwords no coinciden!');
      return;
    }
    let registrationsService = this.registrationsService;
    let onError = this.onError;
    let router = this.router;

    registrationsService.register({
      username: this.username,
      email: this.email,
      password: this.password,
      segguClient: this.segguClient
    }).subscribe(
      res => {
        alert('Su usuario se creo correctamente!');
        router.navigate(['/login']);
      },
      onError
      );
  }

  onError(error) {
    this.error = error.message || error;
    this.showError = true;
    window.alert(this.error);
    return Observable.throw(error.message || error);
  }
}
