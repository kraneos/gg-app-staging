import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PoliciesService } from '../shared/services/policies.service';
import { CurrentUserService } from '../shared/services/current-user.service';

import { PoliciesOptions } from '../shared/domain/policies-options';
import { Policy } from '../shared/domain/policy';
import { ParsePointer } from '../shared/domain/parse-pointer';

@Component({
  selector: 'app-client-policies',
  templateUrl: './client-policies.component.html',
  styleUrls: ['./client-policies.component.css']
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
