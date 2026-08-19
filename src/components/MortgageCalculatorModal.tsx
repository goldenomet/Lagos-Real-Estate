import React, { useState } from 'react';
import { Currency } from '../types';
import { formatPrice, formatFullNaira } from '../utils/formatters';
import { X, Calculator, DollarSign, Percent, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

interface MortgageCalculatorModalProps {
  currency: Currency;
  onClose: () => void;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  currency,
  onClose
}) => {
  const [propertyPriceNgn, setPropertyPriceNgn] = useState<number>(350000000); // 350 Million Naira default
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30% down
  const [loanTermYears, setLoanTermYears] = useState<number>(10); // 10 years
  const [interestRatePercent, setInterestRatePercent] = useState<number>(18); // 18% typical Nigerian mortgage rate

  const downPaymentAmount = (propertyPriceNgn * downPaymentPercent) / 100;
  const loanPrincipal = propertyPriceNgn - downPaymentAmount;

  // Monthly Interest Rate Calculation
  const monthlyRate = interestRatePercent / 100 / 12;
  const totalPaymentsCount = loanTermYears * 12;

  let estimatedMonthlyPaymentNgn = 0;
  if (monthlyRate > 0 && totalPaymentsCount > 0) {
    estimatedMonthlyPaymentNgn =
      (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalPaymentsCount)) /
      (Math.pow(1 + monthlyRate, totalPaymentsCount) - 1);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFD600]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      
      <div className="bg-white border border-[#0A0A0A] rounded-none w-full max-w-2xl overflow-hidden shadow-none text-[#0A0A0A] p-6 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#0A0A0A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-sm bg-white border border-[#0A0A0A] text-[#0A0A0A]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
                Lagos Property Payment & Mortgage Estimator
              </h2>
              <span className="text-[11px] text-gray-500">
                Calculate developer installment spreads or commercial mortgage terms
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-sm bg-white hover:bg-[#0A0A0A] hover:text-[#FFD600] text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          
          {/* Property Price */}
          <div>
            <label className="block text-xs uppercase font-bold text-gray-700 mb-1">
              Property Guide Price (NGN)
            </label>
            <input
              type="number"
              value={propertyPriceNgn}
              onChange={(e) => setPropertyPriceNgn(Math.max(0, Number(e.target.value)))}
              step={10000000}
              className="w-full bg-white border border-[#0A0A0A] rounded-sm p-3 text-sm font-mono text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
            />
            <span className="text-[11px] text-gray-500 mt-1 block">
              Formatted: {formatPrice(propertyPriceNgn, currency)} ({formatFullNaira(propertyPriceNgn)})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Down Payment % */}
            <div>
              <label className="block text-xs uppercase font-bold text-gray-700 mb-1">
                Initial Deposit (%)
              </label>
              <select
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#0A0A0A]"
              >
                <option value={20}>20% Deposit</option>
                <option value={30}>30% Deposit (Standard Off-Plan)</option>
                <option value={50}>50% Deposit</option>
                <option value={70}>70% Deposit</option>
              </select>
            </div>

            {/* Loan Duration */}
            <div>
              <label className="block text-xs uppercase font-bold text-gray-700 mb-1">
                Tenure (Years)
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#0A0A0A]"
              >
                <option value={1}>1 Year (Developer Spread)</option>
                <option value={2}>2 Years (Developer Spread)</option>
                <option value={5}>5 Years (Mortgage)</option>
                <option value={10}>10 Years (Mortgage)</option>
                <option value={15}>15 Years (Mortgage)</option>
                <option value={20}>20 Years (Mortgage)</option>
              </select>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-xs uppercase font-bold text-gray-700 mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRatePercent}
                onChange={(e) => setInterestRatePercent(Number(e.target.value))}
                step={0.5}
                className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#0A0A0A]"
              />
            </div>

          </div>

        </div>

        {/* Output Results Box */}
        <div className="p-5 bg-[#FFD600] rounded-none border border-[#0A0A0A] space-y-4">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#0A0A0A]">
            <div>
              <span className="text-[11px] uppercase text-gray-500 block">Initial Down Payment</span>
              <span className="text-lg font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
                {formatPrice(downPaymentAmount, currency)}
              </span>
              <span className="text-[10px] text-gray-500 block">({downPaymentPercent}% of Total)</span>
            </div>

            <div>
              <span className="text-[11px] uppercase text-gray-500 block">Financed Balance</span>
              <span className="text-lg font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
                {formatPrice(loanPrincipal, currency)}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase text-[#0A0A0A] font-bold block">
                Estimated Monthly Repayment
              </span>
              <span className="text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
                {formatPrice(estimatedMonthlyPaymentNgn, currency)} <span className="text-xs font-sans text-gray-500 font-normal">/ month</span>
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-sm bg-[#0A0A0A] hover:bg-[#333333] text-[#0A0A0A] text-xs font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 font-normal italic">
          * Note: Off-plan developer payment plans in Ikoyi and Lekki often offer interest-free spreads over 12 to 24 months. Bank mortgage rates in Nigeria typically range between 16% and 22%.
        </p>

      </div>

    </div>
  );
};
