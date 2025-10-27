
export interface OptionTrade {
  Ticker: string;
  CP: 'Put' | 'Call';
  Strike: number;
  cost_basis: number | null;
  stock_price: number;
  stock_change: number;
  percent: number;
  num: number;
  Opened: string;
  'EXP Date': string;
  option_code: string;
  'Prem Entry': number;
  close_val: number;
  Capital: number;
  Prem_Adjusted: number;
  position_type: 'S' | 'L';
  PnL: number;
  PnL_adjusted: number;
  '% PnL': number;
  'Stock Price': number;
  'Stock Change': number;
  'Stock Percent': number;
  PNL: number; // Duplicate of PnL
  'Percent Profit': number; // Duplicate of % PnL
}
