import { Pipe, PipeTransform } from '@angular/core';

import { Fee } from '../domain/fee';

@Pipe({
  name: 'feePolicyIcon'
})
export class FeePolicyIconPipe implements PipeTransform {
  private VEHICLE_RISK_TYPES = [1];
  private INTEGRAL_RISK_TYPES = [2];
  private EMPLOYEE_RISK_TYPES = [3, 4];

  transform(value: Fee, args?: any): any {
    let riskType = value.policy.risk.riskType;
    if (this.validateAgainstArray(this.VEHICLE_RISK_TYPES, riskType)) {
      return 'directions_car';
    } else if (this.validateAgainstArray(this.INTEGRAL_RISK_TYPES, riskType)) {
      return 'home';
    } else if (this.validateAgainstArray(this.EMPLOYEE_RISK_TYPES, riskType)) {
      return 'favorite';
    } else {
      return 'help_outline';
    }
  }

  private validateAgainstArray(values: number[], value: number) {
    return values.indexOf(value) > -1;
  }
}
