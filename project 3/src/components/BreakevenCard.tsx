import React from 'react';
import { Timer } from 'lucide-react';

interface BreakevenCardProps {
  breakevenWeeks: number;
  weeklyTeamSavings: number;
}

export default function BreakevenCard({ breakevenWeeks, weeklyTeamSavings }: BreakevenCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getBreakevenMessage = (weeks: number): string => {
    if (!isFinite(weeks)) {
      return "Will not break even with current savings";
    }
    if (weeks <= 0) {
      return "Immediate positive ROI";
    }
    if (weeks < 1) {
      return "Less than a week to break even";
    }
    if (weeks === 1) {
      return "1 week to break even";
    }
    return `${weeks} weeks to break even`;
  };
  
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Timer className="w-5 h-5 text-emerald-600" />
        <h3 className="text-sm font-medium text-emerald-900">Breakeven Analysis</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-emerald-800">Time to Break Even</p>
          <p className="text-lg font-semibold text-emerald-900">
            {getBreakevenMessage(breakevenWeeks)}
          </p>
        </div>
        
        <div className="pt-2 border-t border-emerald-200">
          <p className="text-sm text-emerald-800">Weekly Team Savings</p>
          <p className={`text-sm font-medium ${
            weeklyTeamSavings > 0 ? 'text-green-600' : 'text-amber-600'
          }`}>
            {formatCurrency(weeklyTeamSavings)} per week
          </p>
        </div>
      </div>
    </div>
  );
}