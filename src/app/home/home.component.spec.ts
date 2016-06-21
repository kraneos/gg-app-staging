/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PoliciesService } from '../shared/services/policies.service';
import { Http } from '@angular/http';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { HomeComponent } from './home.component';

// describe('Component: Home', () => {
//   it('should create an instance', () => {
//     let component = new HomeComponent(new PoliciesService();
//     expect(component).toBeTruthy();
//   });
// });
