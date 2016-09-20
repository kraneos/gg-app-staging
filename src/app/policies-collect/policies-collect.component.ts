import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { CashAccount } from '../shared/domain/cash-account';
import { Client } from '../shared/domain/client';
import { Fee } from '../shared/domain/fee';
import { LedgerAccount } from '../shared/domain/ledger-account';
import { Asset } from '../shared/domain/asset';
import { Producer } from '../shared/domain/producer';
import { LedgerAccountsQueryOptions } from '../shared/domain/ledger-accounts-query-options';
import { AssetsQueryOptions } from '../shared/domain/assets-query-options';
import { FeeStates } from '../shared/domain/enums/fee-states.enum';

import { LedgerAccountsService } from '../shared/services/ledger-accounts.service';
import { CashAccountsService } from '../shared/services/cash-accounts.service';
import { AssetsService } from '../shared/services/assets.service';
import { FeesService } from '../shared/services/fees.service';
import { CurrentUserService } from '../shared/services/current-user.service';
import { ProducersService } from '../shared/services/producers.service';

@Component({
  selector: 'app-policies-collect',
  templateUrl: './policies-collect.component.html',
  styleUrls: ['./policies-collect.component.css']
})
export class PoliciesCollectComponent implements OnInit, OnDestroy {
  fee: Fee;
  collection: LedgerAccount;
  cash: Asset;
  allowSubmit: boolean;
  showProducers: boolean;
  receiptNumber: string;
  amount: number;
  producers: Producer[];
  producer: Producer;
  producerId: string;

  private LEDGER_ACCOUNT_COBRANZA = 'Cobranza';
  private ASSET_EFECTIVO = 'Efectivo';

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ledgerAccountsService: LedgerAccountsService,
    private assetsService: AssetsService,
    private cashAccountsService: CashAccountsService,
    private feesService: FeesService,
    private currentUserService: CurrentUserService,
    private producersService: ProducersService
  ) { }

  ngOnInit() {
    this.fee = new Fee();
    this.collection = new LedgerAccount();
    this.cash = new Asset();
    this.allowSubmit = false;
    this.producers = [];
    this.producer = null;
    this.showProducers = true;

    this.sub = this.route.params.subscribe(params => {
      let feeId = params['feeId'];
      this.fetchFee(feeId);
    });
    this.fetchCollectionLedgerAccount();
    this.fetchCashAsset();
    this.fetchProducers();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fetchCollectionLedgerAccount() {
    let query = new LedgerAccountsQueryOptions();
    query.name = this.LEDGER_ACCOUNT_COBRANZA;
    this.ledgerAccountsService
      .query(query)
      .subscribe(
      ledgerAccounts => this.collection = ledgerAccounts.length > 0 ? ledgerAccounts[0] : null,
      this.onError
      );
  }

  fetchCashAsset() {
    let query = new AssetsQueryOptions();
    query.name = this.ASSET_EFECTIVO;
    this.assetsService
      .query(query)
      .subscribe(
      assets => this.cash = assets.length > 0 ? assets[0] : null,
      this.onError
      );
  }

  fetchFee(feeId) {
    this.feesService
      .get(feeId)
      .subscribe(
      fee => {
        this.fee = fee;
        this.amount = fee.value;
      },
      this.onError
      );
  }

  fetchProducers() {
    this.producersService
      .query()
      .subscribe(
      producers => this.producers = producers,
      this.onError
      );
  }

  submit() {
    let cashAccount = new CashAccount();
    cashAccount.amount = this.amount;
    cashAccount.asset = this.cash;
    cashAccount.balance = this.amount;
    cashAccount.date = new Date();
    cashAccount.description = 'Cobranza a ' + Client.getFullName(this.fee.policy.client);
    cashAccount.fee = this.fee;
    cashAccount.ledgerAccount = this.collection;
    cashAccount.producer = this.getSelectedProducer(this.producerId);
    cashAccount.receiptNumber = this.receiptNumber;

    this.cashAccountsService
      .post(cashAccount)
      .subscribe(
      res => {
        this.fee.state = FeeStates.PAGADO;
        this.feesService
          .put(this.fee.objectId, { state: FeeStates.PAGADO })
          .subscribe(
          () => this.router.navigate(['policies', this.fee.policy.objectId]),
          this.onError);
      },
      this.onError);
  }

  getProducerName(prodId) {
    let prod = this.producers.find(e => e.objectId === prodId);
    return prod ? prod.name : null;
  }

  assignAllowSubmit() {
    return this.fee && this.cash && this.collection && this.producers;
  }

  private getSelectedProducer(producerId): Producer {
    return producerId ?
      this.producers.find(p => p.objectId === producerId) :
      null;
  }

  private onError(error) {
    return Observable.throw(error.message || error);
  }
}
