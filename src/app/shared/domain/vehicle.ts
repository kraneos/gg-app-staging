import { IdEntity } from './id-entity';
import { VehicleModel } from './vehicle-model';

export class Vehicle extends IdEntity {
  plate: string;
  vehicleModel: VehicleModel;
}
