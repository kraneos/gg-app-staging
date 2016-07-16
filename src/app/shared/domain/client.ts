import { IdEntity } from './id-entity';

export class Client extends IdEntity {
  firstName: string;
  lastName: string;

  static getFullName(client) {
    return client.firstName + ' ' + client.lastName;
  }
}
