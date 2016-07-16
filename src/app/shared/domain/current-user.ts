import { SegguClient } from '../domain/seggu-client';

export class CurrentUser {
  objectId: string;
  createdAt: Date;
  sessionToken: string;
  username: string;
  segguClient: SegguClient;
}
