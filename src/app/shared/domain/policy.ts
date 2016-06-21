import { IdEntity } from './id-entity';
import { Client } from './client';
import { Risk } from './risk';

export class Policy extends IdEntity {
    number: string;
    object: string;
    client: Client;
    risk: Risk;
}