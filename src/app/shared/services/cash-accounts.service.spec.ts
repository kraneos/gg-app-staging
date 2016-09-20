/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CashAccountsService } from './cash-accounts.service';

describe('Service: CashAccounts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashAccountsService]
    });
  });

  it('should ...', inject([CashAccountsService], (service: CashAccountsService) => {
    expect(service).toBeTruthy();
  }));
});
