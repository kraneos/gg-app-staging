import { IdEntity } from './id-entity';

export class Employee extends IdEntity {
    firstName: string;
    lastName: string;
    dni: string;
    cuit: string;
}