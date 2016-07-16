import { IdEntity } from './id-entity';
import { SegguClient } from './seggu-client';

export class User extends IdEntity {
  username: string;
  segguClient: SegguClient;
}
