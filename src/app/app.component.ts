import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
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

import { Observable } from 'rxjs/Observable';

import { LoginService } from './shared/services/login.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
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
  providers: [MdIconRegistry, MdUniqueSelectionDispatcher, LoginService],
})
export class AppComponent {
  views: Object[] = [
    {
      url: "policies",
      name: "Polizas",
      description: "Visualiza las polizas",
      icon: "assignment"
    },
    {
      url: "clients",
      name: "Clientes",
      description: "Visualiza tus clientes",
      icon: "account_box"
    }
  ];

  constructor(private router: Router, private loginService: LoginService) { }

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
