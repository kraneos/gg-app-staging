/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LedgerAccountsService } from './ledger-accounts.service';

describe('Service: LedgerAccounts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LedgerAccountsService]
    });
  });

  it('should ...', inject([LedgerAccountsService], (service: LedgerAccountsService) => {
    expect(service).toBeTruthy();
  }));
});
