import { SegguClient } from '../domain/seggu-client';
import { Role } from '../domain/role';
import { Client } from '../domain/client';

export class CurrentUser {
  objectId: string;
  client: Client;
  createdAt: Date;
  sessionToken: string;
  username: string;
  segguClient: SegguClient;
  roles: Role[];
}
