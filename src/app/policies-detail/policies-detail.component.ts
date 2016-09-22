import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Risk } from '../shared/domain/risk';
import { Company } from '../shared/domain/company';
import { Policy } from '../shared/domain/policy';
import { Vehicle } from '../shared/domain/vehicle';
import { Integral } from '../shared/domain/integral';
import { Employee } from '../shared/domain/employee';
import { Fee } from '../shared/domain/fee';
import { FeeStates } from '../shared/domain/enums/fee-states.enum';

import { PoliciesService } from '../shared/services/policies.service';
import { VehiclesService } from '../shared/services/vehicles.service';
import { IntegralsService } from '../shared/services/integrals.service';
import { EmployeesService } from '../shared/services/employees.service';
import { FeesService } from '../shared/services/fees.service';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  selector: 'app-policies-detail',
  templateUrl: './policies-detail.component.html',
  styleUrls: ['./policies-detail.component.css']
})
export class PoliciesDetailComponent implements OnInit, OnDestroy {
  policy: Policy;
  fees: Fee[];
  vehicles: Vehicle[];
  integrals: Integral[];
  employees: Employee[];
  hideProgress: boolean;
  isProducer: boolean;
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
    private feesService: FeesService,
    private currentUserService: CurrentUserService
  ) { }


  ngOnInit() {
    this.policy = new Policy();
    this.policy.risk = new Risk();
    this.policy.risk.company = new Company();
    this.vehicles = [];
    this.employees = [];
    this.integrals = [];
    this.fees = [];
    this.isProducer = this.currentUserService.isProducer();

    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.policiesService.get(id)
        .subscribe(
        policy => {
          this.policy = policy;
          this.feesService.queryByPolicy(id)
            .subscribe(
            fees => {
              this.fees = fees;
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
                this.vehicles = vehicles;
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
                this.integrals = integrals;
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
                this.employees = employees;
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

  private onError(error) {
    return Observable.throw(error.message || error);
  }

  private validateAgainstArray(values: number[], value: number) {
    return values.indexOf(value) > -1;
  }

  collect(fee: Fee, index: number) {
    if (this.validateCurrentFeeState(fee)) {
      if (index > 0) {
        let prevFee = this.fees[index - 1];
        if (!this.validateCurrentFeeState(prevFee)) {
          this.router.navigate(['/policies', fee.policy.objectId, 'fees', fee.objectId, 'collect']);
        } else {
          alert('Verifique el estado de la cuota anterior.');
        }
      } else {
        this.router.navigate(['/policies', fee.policy.objectId, 'fees', fee.objectId, 'collect']);
      }
    } else {
      alert('Verifique el estado de la cuota seleccionada.');
    }
  }

  validateCurrentFeeState(fee: Fee) {
    switch (fee.state) {
      case FeeStates.DEBE: return true;
      case FeeStates.LIQUIDADO: return false;
      case FeeStates.OBSERVADO: return true;
      case FeeStates.PAGADO: return false;
      case FeeStates.PRELIQUIDADO: return false;
      case FeeStates.MANTENER_CUBIERTO: return true;
      case FeeStates.MOROSO: return true;
      case FeeStates.SIN_COBERTURA: return true;
      case FeeStates.DEBE_Y_PRELIQUIDADO: return true;
      default: return false;
    }
  }
}
