import { SegguClient } from '../domain/seggu-client';
import { Role } from '../domain/role';

export class CurrentUser {
  objectId: string;
  createdAt: Date;
  sessionToken: string;
  username: string;
  segguClient: SegguClient;
  roles: Role[];
}
