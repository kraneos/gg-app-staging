import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CashAccount } from '../domain/cash-account';

import { ParseService } from './parse.service';

@Injectable()
export class CashAccountsService {

  constructor(
    private parseService: ParseService
  ) { }

  post(obj: CashAccount): Observable<Response> {
    let url = 'classes/CashAccount';
    let body = this.getCashAccountBody(obj);

    return this.parseService
      .post(url, body)
      .catch(this.parseService.handleError);
  }

  private getCashAccountBody(obj: CashAccount) {
    let body: any = {};
    body.amount = obj.amount;
    body.asset = { __type: 'Pointer', className: 'Asset', objectId: obj.asset.objectId };
    body.balance = obj.balance;
    body.date = { __type: 'Date', iso: obj.date.toJSON() };
    body.description = obj.description;
    body.fee = { __type: 'Pointer', className: 'Fee', objectId: obj.fee.objectId };
    body.ledgerAccount = { __type: 'Pointer', className: 'LedgerAccount', objectId: obj.ledgerAccount.objectId };
    body.producer = { __type: 'Pointer', className: 'Producer', objectId: obj.producer.objectId };
    body.receiptNumber = obj.receiptNumber;
    return body;
  }
}
