/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { FeeClientLastNamePipe } from './fee-client-last-name.pipe';

describe('Pipe: FeeClientLastName', () => {
  it('create an instance', () => {
    let pipe = new FeeClientLastNamePipe();
    expect(pipe).toBeTruthy();
  });
});
