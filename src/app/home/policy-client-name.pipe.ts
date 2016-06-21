import { Pipe, PipeTransform } from '@angular/core';
import { Policy } from '../shared/domain/policy';

@Pipe({
  name: 'policyClientName'
})
export class PolicyClientNamePipe implements PipeTransform {

  transform(value: Policy, args?: any): any {
    if (value.client) {
      return value.client.firstName + ' ' + value.client.lastName;
    } else {
      return 'Sin cliente';
    }
  }

}
