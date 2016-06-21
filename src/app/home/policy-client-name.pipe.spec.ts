/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { PolicyClientNamePipe } from './policy-client-name.pipe';

describe('Pipe: PolicyClientName', () => {
  it('create an instance', () => {
    let pipe = new PolicyClientNamePipe();
    expect(pipe).toBeTruthy();
  });
});
