/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ClientPoliciesComponent } from './client-policies.component';
import { PoliciesService } from '../shared/services/policies.service';
import { ParseService } from '../shared/services/parse.service';

describe('Component: ClientPolicies', () => {
  it('should create an instance', () => {
    let policiesService = new PoliciesService()
    let component = new ClientPoliciesComponent();
    expect(component).toBeTruthy();
  });
});
