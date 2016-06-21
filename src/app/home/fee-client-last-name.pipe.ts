import { Pipe, PipeTransform } from '@angular/core';

import { Fee } from '../shared/domain/fee';

@Pipe({
  name: 'feeClientLastName'
})
export class FeeClientLastNamePipe implements PipeTransform {

  transform(value: Fee, args?: any): any {
    if (value.policy && value.policy.client) {
      return value.policy.client.lastName;
    } else {
      return 'Sin cliente';
    }
  }

}
