import { Component, OnInit } from '@angular/core';
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
import { LoginService } from '../shared/services/login.service';
import { RegistrationsService } from '../shared/services/registrations.service';
import { SegguClientsService } from '../shared/services/seggu-clients.service';
import { CurrentUserService } from '../shared/services/current-user.service';
import { RolesService } from '../shared/services/roles.service';
import { SegguClient } from '../shared/domain/seggu-client';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
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
    LoginService,
    CurrentUserService,
    SegguClientsService,
    RolesService,
    RegistrationsService
  ]
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
    private segguClientsService: SegguClientsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private currentUserService: CurrentUserService,
    private rolesService: RolesService
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
    let currentUserService = this.currentUserService;
    let segguClientsService = this.segguClientsService;
    let rolesService = this.rolesService;
    let registrationsService = this.registrationsService;
    let onError = this.onError;
    let router = this.router;
    let segguClientId = this.segguClient.objectId;

    registrationsService.register({
      username: this.username,
      email: this.email,
      password: this.password,
      segguClient: this.segguClient
    }).subscribe(
      res => {
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
