import { KeyValueEntity } from './key-value-entity';
import { Company } from './company';

export class Risk extends KeyValueEntity {
    riskType: number;
    company: Company;
}