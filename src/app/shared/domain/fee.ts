import { IdEntity } from './id-entity';
import { Policy } from './policy';

export class Fee extends IdEntity {
    policy: Policy;
    state: number;
    expirationDate: Date;
    value: number;
    number: number;
}