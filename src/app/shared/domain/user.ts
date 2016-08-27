import { IdEntity } from './id-entity';
import { SegguClient } from './seggu-client';
import { Role } from './role';

export class User extends IdEntity {
  username: string;
  segguClient: SegguClient;
  roles: Role[];
}
