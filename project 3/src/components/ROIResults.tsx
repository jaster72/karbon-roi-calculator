import React from 'react';
import { type ROIResults } from '../utils/calculations';
import BreakevenCard from './BreakevenCard';

interface ROIResultsProps {
  results: ROIResults;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

export default function ROIResults({ results }: ROIResultsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Results</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Time Savings</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Per Employee (Weekly)</p>
              <p className="text-lg font-semibold text-gray-900">{results.hoursPerWeek} hours</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Per Employee (Yearly)</p>
              <p className="text-lg font-semibold text-gray-900">{formatNumber(results.hoursPerYear)} hours</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Total Team (Yearly)</p>
            <p className="text-lg font-semibold text-gray-900">{formatNumber(results.totalHoursPerYear)} hours</p>
          </div>
        </div>

        <BreakevenCard 
          breakevenWeeks={results.breakevenWeeks}
          weeklyTeamSavings={results.weeklyTeamSavings}
        />

        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-indigo-900">Financial Impact</h3>
          <div className="mt-2 space-y-3">
            <div>
              <p className="text-sm text-indigo-800">Annual Time Value Savings</p>
              <p className="text-lg font-semibold text-indigo-900">{formatCurrency(results.annualSavings)}</p>
            </div>
            <div>
              <p className="text-sm text-indigo-800">Annual Karbon Cost</p>
              <p className="text-lg font-semibold text-indigo-900">-{formatCurrency(results.karbonAnnualCost)}</p>
            </div>
            <div className="pt-2 border-t border-indigo-200">
              <p className="text-sm font-medium text-indigo-800">Net Annual ROI</p>
              <p className={`text-xl font-bold ${
                results.netAnnualROI >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(results.netAnnualROI)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}