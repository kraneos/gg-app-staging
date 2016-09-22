import { Pipe, PipeTransform } from '@angular/core';

import { Fee } from '../domain/fee';

@Pipe({
  name: 'feeStatusName'
})
export class FeeStatusNamePipe implements PipeTransform {
  transform(value: Fee, args?: any): any {
    switch (value.state) {
      case 0:
        return 'Debe';
      case 1:
        return 'Pagado';
      case 2:
        return 'Observado';
      case 3:
        return 'Preliquidado';
      case 4:
        return 'Liquidado';
      case 5:
        return 'Mantener Cubierto';
      case 6:
        return 'Moroso';
      case 7:
        return 'Sin Cobertura';
      case 8:
        return 'Debe y Preliquidado';
      default:
        return 'Otro';
    }
  }
}
