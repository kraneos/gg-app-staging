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

import { Risk } from '../shared/domain/risk';
import { Company } from '../shared/domain/company';
import { Policy } from '../shared/domain/policy';
import { Vehicle } from '../shared/domain/vehicle';
import { Integral } from '../shared/domain/integral';
import { Employee } from '../shared/domain/employee';
import { Fee } from '../shared/domain/fee';
import { FEE_STATES } from '../shared/domain/enums/fee-states';

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
    MdUniqueSelectionDispatcher,
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
  hideProgress: boolean;
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
            fees => {
              this.fees = fees
              this.hideProgress = this.fees !== null && (this.vehicles !== null || this.employees !== null || this.integrals !== null);
            },
            error => {
              this.onError(error);
              this.hideProgress = true;
            });

          if (this.validateAgainstArray(this.VEHICLE_RISK_TYPES, this.policy.risk.riskType)) {
            this.vehiclesService.query(id)
              .subscribe(
              vehicles => {
                this.vehicles = vehicles
                this.hideProgress = this.fees !== null && (this.vehicles !== null || this.employees !== null || this.integrals !== null);
              },
              error => {
                this.onError(error);
                this.hideProgress = true;
              });
          } else if (this.validateAgainstArray(this.INTEGRAL_RISK_TYPES, this.policy.risk.riskType)) {
            this.integralsService.query(id)
              .subscribe(
              integrals => {
                this.integrals = integrals
                this.hideProgress = this.fees !== null && (this.vehicles !== null || this.employees !== null || this.integrals !== null);
              },
              error => {
                this.onError(error);
                this.hideProgress = true;
              });
          } else if (this.validateAgainstArray(this.EMPLOYEE_RISK_TYPES, this.policy.risk.riskType)) {
            this.employeesService.query(id)
              .subscribe(
              employees => {
                this.employees = employees
                this.hideProgress = this.fees !== null && (this.vehicles !== null || this.employees !== null || this.integrals !== null);
              },
              error => {
                this.onError(error);
                this.hideProgress = true;
              });
          }
        },
        error => {
          this.onError(error);
          this.hideProgress = true;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  collect(fee: Fee, index: number) {
    if (this.validateCurrentFeeState(fee)) {
      if (index > 0) {
        var prevFee = this.fees[index - 1];
        if (this.validatePreviousFeeState(prevFee)) {
          this.router.navigate(['fees', fee.objectId, 'collect']);
        } else {
          alert('Verifique el estado de la cuota anterior.');
        }
      } else {
        this.router.navigate(['fees', fee.objectId, 'collect']);
      }
    } else {
      alert('Verifique el estado de la cuota seleccionada.');
    }
  }

  private validateCurrentFeeState(fee: Fee) {
    switch (fee.state) {
      case FEE_STATES.DEBE: return true;
      case FEE_STATES.LIQUIDADO: return false;
      case FEE_STATES.OBSERVADO: return true;
      case FEE_STATES.PAGADO: return false;
      case FEE_STATES.PRELIQUIDADO: return false;
      case FEE_STATES.MANTENER_CUBIERTO: return true;
      case FEE_STATES.MOROSO: return true;
      case FEE_STATES.SIN_COBERTURA: return true;
      case FEE_STATES.DEBE_Y_PRELIQUIDADO: return true;
      default: return false;
    }
  }

  private validatePreviousFeeState(fee: Fee) {
    switch (fee.state) {
      case FEE_STATES.DEBE: return true;
      case FEE_STATES.LIQUIDADO: return false;
      case FEE_STATES.OBSERVADO: return true;
      case FEE_STATES.PAGADO: return false;
      case FEE_STATES.PRELIQUIDADO: return false;
      case FEE_STATES.MANTENER_CUBIERTO: return true;
      case FEE_STATES.MOROSO: return true;
      case FEE_STATES.SIN_COBERTURA: return true;
      case FEE_STATES.DEBE_Y_PRELIQUIDADO: return true;
      default: return false;
    }
  }

  private onError(error) {
    return Observable.throw(error.message || error);
  }

  private validateAgainstArray(values: number[], value: number) {
    return values.indexOf(value) > -1;
  }
}
