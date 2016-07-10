/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { PoliciesComponent } from './policies.component';

describe('Component: Policies', () => {
  it('should create an instance', () => {
    let component = new PoliciesComponent();
    expect(component).toBeTruthy();
  });
});
