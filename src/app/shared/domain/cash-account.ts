import { IdEntity } from './id-entity';
import { LedgerAccount } from './ledger-account';
import { Fee } from './fee';
import { Asset } from './asset';
import { Producer } from './producer';

export class CashAccount extends IdEntity {
  receiptNumber: string;
  ledgerAccount: LedgerAccount;
  fee: Fee;
  date: Date;
  asset: Asset;
  producer: Producer;
  amount: number;
  balance: number;
  description: string;
}
