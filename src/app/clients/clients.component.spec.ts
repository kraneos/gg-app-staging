/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ClientsComponent } from './clients.component';

describe('Component: Clients', () => {
  it('should create an instance', () => {
    let component = new ClientsComponent();
    expect(component).toBeTruthy();
  });
});
