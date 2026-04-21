export interface Transaction {
  id: string;
  date: string;
  time: string;
  merchant: string;
  fund: string;
  transactionId: string;
  amount: string;
  isNegative: boolean;
  iconUrl: string;
}

export interface NavItem {
  label: string;
  active: boolean;
  badge?: boolean;
  iconUrl: string;
}

export interface ExpenseLegendItem {
  label: string;
  color: string;
}
