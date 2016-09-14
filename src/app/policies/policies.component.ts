import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PoliciesOptions } from './policies-options';
import { PoliciesService} from '../shared/services/policies.service';
import {CurrentUserService} from '../shared/services/current-user.service';
import { Policy } from '../shared/domain/policy';
import { ParsePointer } from '../shared/domain/parse-pointer';

@Component({
  moduleId: module.id,
  selector: 'app-policies',
  templateUrl: 'policies.component.html',
  styleUrls: ['policies.component.css'],
  providers: [PoliciesService]

})
export class PoliciesComponent implements OnInit {
  policiesOptions: PoliciesOptions;
  policies: Policy[];

  constructor(
    private policiesService: PoliciesService,
    private currentUserService: CurrentUserService) {
  }

  ngOnInit() {
    this.policies = [];
    this.policiesOptions = new PoliciesOptions();
    this.policiesOptions.number = '';
    this.policiesOptions.limit = 10;
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
