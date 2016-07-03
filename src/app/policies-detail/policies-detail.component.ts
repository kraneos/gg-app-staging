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
import { MdRadioButton, MdRadioGroup, MdRadioDispatcher } from '@angular2-material/radio';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Risk } from '../shared/domain/risk';
import { Company } from '../shared/domain/company';
import { Policy } from '../shared/domain/policy';
import { Vehicle } from '../shared/domain/vehicle';
import { Integral } from '../shared/domain/integral';
import { Employee } from '../shared/domain/employee';
import { Fee } from '../shared/domain/fee';

import { PoliciesService } from '../shared/services/policies.service';
import { VehiclesService } from '../shared/services/vehicles.service';
import { IntegralsService } from '../shared/services/integrals.service';
import { EmployeesService } from '../shared/services/employees.service';
import { FeesService } from '../shared/services/fees.service';

import { FeeStatusNamePipe } from './fee-status-name.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-policies-detail',
  templateUrl: 'policies-detail.component.html',
  styleUrls: ['policies-detail.component.css'],
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
    ROUTER_DIRECTIVES
  ],
  providers: [
    MdIconRegistry,
    MdRadioDispatcher,
    PoliciesService,
    FeesService,
    VehiclesService,
    IntegralsService,
    EmployeesService],
  pipes: [
    FeeStatusNamePipe
  ]
})
export class PoliciesDetailComponent implements OnInit, OnDestroy {
  policy: Policy;
  fees: Fee[];
  vehicles: Vehicle[];
  integrals: Integral[];
  employees: Employee[];
  private sub: any;
  private VEHICLE_RISK_TYPES = [1];
  private INTEGRAL_RISK_TYPES = [2];
  private EMPLOYEE_RISK_TYPES = [3, 4];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private policiesService: PoliciesService,
    private vehiclesService: VehiclesService,
    private integralsService: IntegralsService,
    private employeesService: EmployeesService,
    private feesService: FeesService) { }

  ngOnInit() {
    this.policy = new Policy();
    this.policy.risk = new Risk();
    this.policy.risk.company = new Company();
    this.vehicles = [];
    this.employees = [];
    this.integrals = [];
    this.fees = [];

    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.policiesService.get(id)
        .subscribe(
        policy => {
          this.policy = policy;
          this.feesService.queryByPolicy(id)
            .subscribe(
            fees => this.fees = fees,
            error => this.onError
            );

          if (this.validateAgainstArray(this.VEHICLE_RISK_TYPES, this.policy.risk.riskType)) {
            this.vehiclesService.query(id)
              .subscribe(
              vehicles => this.vehicles = vehicles,
              error => this.onError
              );
          } else if (this.validateAgainstArray(this.INTEGRAL_RISK_TYPES, this.policy.risk.riskType)) {
            this.integralsService.query(id)
              .subscribe(
              integrals => this.integrals = integrals,
              error => this.onError
              );
          } else if (this.validateAgainstArray(this.EMPLOYEE_RISK_TYPES, this.policy.risk.riskType)) {
            this.employeesService.query(id)
              .subscribe(
              employees => this.employees = employees,
              error => this.onError
              );
          }
        },
        error => this.onError
        );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private onError(error) {
    return Observable.throw(error.message);
  }

  private validateAgainstArray(values: number[], value: number) {
    return values.indexOf(value) > -1;
  }
}
