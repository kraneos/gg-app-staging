import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

import { LoginService } from '../shared/services/login.service';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
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
    MdIcon
  ],
  providers: [
    LoginService,
    CurrentUserService
  ],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;
  showError: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.showError = false;
  }

  login() {
    this.loginService.login(this.username, this.password)
      .subscribe(
      user => {
        this.currentUserService.set(user);
        this.loginService
          .getSegguClient(user.segguClient.objectId)
          .subscribe(
          segguClient => {
            this.loginService
              .getRolesBySegguClient(segguClient)
              .subscribe(
              roles => {
                let postACL = {};
                postACL[user.objectId] = { read: true, write: true };
                roles.forEach(function (r) {
                  postACL['role:' + r.name] = { read: true, write: true };
                });
                this.currentUserService.setPostACL(postACL);
                this.router.navigate(['/']);
              },
              onError
              );
          },
          onError
          );
      },
      onError
      );

    function onError(error) {
      this.error = error.message;
      this.showError = true;
      return Observable.throw(error.message);
    }
  }
}
