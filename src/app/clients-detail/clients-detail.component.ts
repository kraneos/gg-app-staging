import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {MdUniqueSelectionDispatcher} from '@angular2-material/core';

import { Client } from '../shared/domain/client';
import { ClientsService } from '../shared/services/clients.service';

@Component({
  moduleId: module.id,
  selector: 'app-clients-detail',
  templateUrl: 'clients-detail.component.html',
  styleUrls: ['clients-detail.component.css'],
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
  providers: [MdIconRegistry, MdUniqueSelectionDispatcher, ClientsService]
})
export class ClientsDetailComponent implements OnInit, OnDestroy {
  client: Client;
  private sub: any;
  hideProgress: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService) { }

  ngOnInit() {
    this.client = new Client();
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.clientsService.get(id)
        .subscribe(
        client => {
          this.client = client;
          this.hideProgress = true;
        }, error => {
          this.onError(error);
          this.hideProgress = true;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private onError(error) {
    return Observable.throw(error.message || error);
  }
}
