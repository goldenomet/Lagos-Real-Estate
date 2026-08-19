import { Currency } from '../types';
import { EXCHANGE_RATES } from '../data/properties';

export function formatPrice(amountInNgn: number, currency: Currency = 'NGN'): string {
  if (currency === 'USD') {
    const usdAmount = amountInNgn / EXCHANGE_RATES.USD;
    if (usdAmount >= 1000000) {
      return `$${(usdAmount / 1000000).toFixed(2)}M`;
    }
    return `$${Math.round(usdAmount).toLocaleString()}`;
  }

  if (currency === 'GBP') {
    const gbpAmount = amountInNgn / EXCHANGE_RATES.GBP;
    if (gbpAmount >= 1000000) {
      return `£${(gbpAmount / 1000000).toFixed(2)}M`;
    }
    return `£${Math.round(gbpAmount).toLocaleString()}`;
  }

  // NGN formatting
  if (amountInNgn >= 1000000000) {
    const billionVal = amountInNgn / 1000000000;
    return `₦${billionVal % 1 === 0 ? billionVal.toFixed(0) : billionVal.toFixed(2)} Billion`;
  }
  if (amountInNgn >= 1000000) {
    const millionVal = amountInNgn / 1000000;
    return `₦${millionVal % 1 === 0 ? millionVal.toFixed(0) : millionVal.toFixed(1)} Million`;
  }
  return `₦${amountInNgn.toLocaleString('en-NG')}`;
}

export function formatFullNaira(amountInNgn: number): string {
  return `₦${amountInNgn.toLocaleString('en-NG')}`;
}

export function generateWhatsAppLink(phoneNum: string, message: string): string {
  const cleanPhone = phoneNum.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
