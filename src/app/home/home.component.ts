import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PoliciesService } from '../shared/services/policies.service';
import { FeesService } from '../shared/services/fees.service';

import { HomeOptions } from '../shared/domain/home-options';
import { Fee } from '../shared/domain/fee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  options: HomeOptions;
  fees: Fee[];
  showOptions: boolean;
  test: number;
  dateStr: string;
  hideProgress: boolean;

  constructor(
    private policiesService: PoliciesService,
    private feesService: FeesService
  ) { }

  ngOnInit() {
    this.options = new HomeOptions();
    this.options.date = new Date();
    this.dateStr = this.getDateForInput();
    this.options.limit = '5';
    this.options.page = 1;
    this.filter();
  }

  getDateForInput(): string {
    let year = this.options.date.getFullYear();
    let month = this.options.date.getMonth() + 1;
    let day = this.options.date.getDate();
    return year + '-' +
      (month < 10 ? '0' : '') + month + '-' +
      (day < 10 ? '0' : '') + day;
  }

  filter() {
    this.hideProgress = false;
    this.feesService.query(this.options)
      .subscribe(
      fees => {
        this.fees = fees;
        this.hideProgress = true;
      },
      error => {
        this.onError(error);
        this.hideProgress = true;
      });
    this.showOptions = false;
  }

  onError(error) {
    return Observable.throw(error.message || error);
  }

  onDateChange($event: string) {
    if ($event === this.dateStr) {
      return;
    }
    if ($event === '') {
      this.options.date = null;
      this.dateStr = '';
    } else {
      let parts = $event.split('-').map(function (e) {
        return parseInt(e, 10);
      });
      this.options.date = new Date(parts[0], parts[1] - 1, parts[2]);
      this.dateStr = this.getDateForInput();
    }

    this.filter();
  }

  previousDate() {
    this.options.date = this.addDays(this.options.date, -1);
    this.dateStr = this.getDateForInput();
    this.filter();
  }

  nextDate() {
    this.options.date = this.addDays(this.options.date, 1);
    this.dateStr = this.getDateForInput();
    this.filter();
  }

  private addDays(date, days) {
    let anotherDate = new Date(date.valueOf());
    anotherDate.setDate(anotherDate.getDate() + days);
    return anotherDate;
  }
}
