/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { FeeStatusNamePipe } from './fee-status-name.pipe';

describe('Pipe: FeeStatusName', () => {
  it('create an instance', () => {
    let pipe = new FeeStatusNamePipe();
    expect(pipe).toBeTruthy();
  });
});
