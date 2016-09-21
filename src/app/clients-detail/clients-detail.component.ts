import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientsService } from '../shared/services/clients.service';

import { Client } from '../shared/domain/client';

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent implements OnInit, OnDestroy {
  client: Client;
  private sub: any;
  hideProgress: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.client = new Client();
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.clientsService.get(id)
        .subscribe(
        client => {
          this.client = client;
          this.hideProgress = true;
        }, error => {
          this.onError(error);
          this.hideProgress = true;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private onError(error) {
    return Observable.throw(error.message || error);
  }
}
