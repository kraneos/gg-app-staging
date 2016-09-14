import { Component, OnInit } from '@angular/core';
import { PoliciesService} from '../shared/services/policies.service';
import { PoliciesOptions } from '../policies/policies-options';
import { Policy } from '../shared/domain/policy';
import {CurrentUserService} from '../shared/services/current-user.service';
import { ParsePointer } from '../shared/domain/parse-pointer';
import { Observable } from 'rxjs/Observable';
import { PolicyIconPipe } from './policy-icon.pipe';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-client-policies',
  templateUrl: 'client-policies.component.html',
  styleUrls: ['client-policies.component.css'],
  providers: [MdIconRegistry, PoliciesService],
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
    ROUTER_DIRECTIVES,
    MD_PROGRESS_CIRCLE_DIRECTIVES
  ],
  pipes: [PolicyIconPipe]
})
export class ClientPoliciesComponent implements OnInit {
  policiesOptions: PoliciesOptions;
  policies: Policy[];

  constructor(
    private policiesService: PoliciesService,
    private currentUserService: CurrentUserService) {
  }

  ngOnInit() {
    this.policies = [];
    this.policiesOptions = new PoliciesOptions();
    this.policiesOptions.client = new ParsePointer('Client', this.currentUserService.get().client.objectId);
    this.policiesOptions.number = '';
    this.policiesOptions.limit = 100;
    this.policiesOptions.page = 1;
    this.policiesService.query(this.policiesOptions)
      .subscribe(
      policies => this.policies = policies,
      this.onError);
  }

  private onError(error) {
    return Observable.throw(error.message || error);
  }
}
