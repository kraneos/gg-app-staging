import { Component, OnInit } from '@angular/core';
import { RegistrationsService } from '../shared/services/registrations.service';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MdUniqueSelectionDispatcher} from '@angular2-material/core';

@Component({
  moduleId: module.id,
  selector: 'app-pas-register',
  templateUrl: 'pas-register.component.html',
  styleUrls: ['pas-register.component.css'],
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon,
    ROUTER_DIRECTIVES
  ],
  providers: [
    RegistrationsService
  ]
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
    private registrationsService: RegistrationsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    if (this.password !== this.repeatPassword) {
      alert('Las passwords no coinciden!');
      return;
    }

    let router = this.router;
    let onError = this.onError;

    this.registrationsService.registerPas({
      username: this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
      company: this.company,
      segguClient: null
    }).subscribe(
      res => {
        alert('Su usuario se creo correctamente!\nPodes loguearte con este usuario en SeGGu Escritorio.')
        window.close();
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
