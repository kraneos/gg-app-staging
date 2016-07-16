import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HomeOptions } from '../../home/home-options';
import { LedgerAccount } from '../domain/ledger-account';
import { LedgerAccountsQueryOptions } from '../domain/ledger-accounts-query-options';
import { ParseService } from './parse.service';

@Injectable()
export class LedgerAccountsService {
  /**
   *
   */
  constructor(private parseService: ParseService) {
  }

  query(options: LedgerAccountsQueryOptions): Observable<LedgerAccount[]> {
    let url = 'classes/LedgerAccount?skip=0';
    if (options.name) {
      url = url + '&where={"name":"' + options.name + '"}';
    }
    return this.parseService
      .get(url)
      .map(this.parseService.extractArray)
      .catch(this.parseService.handleError);
  }
}
