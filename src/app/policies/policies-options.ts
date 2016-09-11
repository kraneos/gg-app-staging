import { ParsePointer } from '../shared/domain/parse-pointer';

export class PoliciesOptions {
  number: string;
  client: ParsePointer;
  limit: number;
  page: number;
}
