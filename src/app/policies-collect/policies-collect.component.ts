import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdInput } from '@angular2-material/input';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdRadioButton, MdRadioGroup } from '@angular2-material/radio';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {MdUniqueSelectionDispatcher} from '@angular2-material/core';
import {MD_SLIDE_TOGGLE_DIRECTIVES} from '@angular2-material/slide-toggle';

import { CashAccount } from '../shared/domain/cash-account';
import { LedgerAccount } from '../shared/domain/ledger-account';
import { Asset } from '../shared/domain/asset';
import { Client } from '../shared/domain/client';
import { Producer } from '../shared/domain/producer';
import { Fee } from '../shared/domain/fee';
import { LedgerAccountsQueryOptions } from '../shared/domain/ledger-accounts-query-options';
import { AssetsQueryOptions } from '../shared/domain/assets-query-options';
import { FEE_STATES } from '../shared/domain/enums/fee-states';

import { LedgerAccountsService } from '../shared/services/ledger-accounts.service';
import { CashAccountsService } from '../shared/services/cash-accounts.service';
import { AssetsService } from '../shared/services/assets.service';
import { FeesService } from '../shared/services/fees.service';
import { CurrentUserService } from '../shared/services/current-user.service';
import { ProducersService } from '../shared/services/producers.service';

@Component({
  moduleId: module.id,
  selector: 'app-policies-collect',
  templateUrl: 'policies-collect.component.html',
  styleUrls: ['policies-collect.component.css'],
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon,
    ROUTER_DIRECTIVES,
    MD_SLIDE_TOGGLE_DIRECTIVES
  ],
  providers: [
    MdIconRegistry,
    MdUniqueSelectionDispatcher,
    LedgerAccountsService,
    AssetsService,
    CashAccountsService,
    FeesService,
    CurrentUserService,
    ProducersService
  ]
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
    var query = new LedgerAccountsQueryOptions();
    query.name = this.LEDGER_ACCOUNT_COBRANZA;
    this.ledgerAccountsService
      .query(query)
      .subscribe(
      ledgerAccounts => this.collection = ledgerAccounts.length > 0 ? ledgerAccounts[0] : null,
      this.onError
      );
  }

  fetchCashAsset() {
    var query = new AssetsQueryOptions();
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
    var cashAccount = new CashAccount();
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
        this.fee.state = FEE_STATES.PAGADO;
        this.feesService
          .put(this.fee.objectId, { state: FEE_STATES.PAGADO })
          .subscribe(
          res => this.router.navigate(['policies', this.fee.policy.objectId]),
          this.onError);
      },
      this.onError);
  }

  getProducerName(prodId) {
    var prod = this.producers.find(e => e.objectId === prodId);
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
    return Observable.throw(error.message);
  }
}
