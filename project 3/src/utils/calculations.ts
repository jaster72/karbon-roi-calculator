export interface ROICalculationParams {
  employeeCount: number;
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface ROIResults {
  hoursPerWeek: number;
  hoursPerYear: number;
  totalHoursPerYear: number;
  annualSavings: number;
  karbonAnnualCost: number;
  netAnnualROI: number;
  breakevenWeeks: number;
  weeklyTeamSavings: number;
}

const KARBON_MONTHLY_COST_PER_EMPLOYEE = 89;

export const calculateWeeklySavings = (
  employeeCount: number,
  hourlyRate: number,
  hoursPerWeek: number
): number => {
  return employeeCount * hourlyRate * hoursPerWeek;
};

export const calculateBreakevenWeeks = (
  employeeCount: number,
  weeklyTeamSavings: number
): number => {
  const monthlyTeamSavings = weeklyTeamSavings * 52/12; // Convert weekly to monthly
  const monthlyKarbonCost = employeeCount * KARBON_MONTHLY_COST_PER_EMPLOYEE;
  
  // If savings are 0 or negative, it will never break even
  if (weeklyTeamSavings <= 0) return Infinity;
  
  // Calculate how many weeks of savings are needed to cover annual cost
  const totalCost = monthlyKarbonCost * 12;
  const weeksToBreakeven = (totalCost / weeklyTeamSavings);
  
  return Math.round(weeksToBreakeven * 10) / 10; // Round to 1 decimal place
};

export const calculateROI = ({
  employeeCount,
  hourlyRate,
  hoursPerWeek,
  weeksPerYear,
}: ROICalculationParams): ROIResults => {
  const hoursPerYear = hoursPerWeek * weeksPerYear;
  const totalHoursPerYear = hoursPerYear * employeeCount;
  const weeklyTeamSavings = calculateWeeklySavings(employeeCount, hourlyRate, hoursPerWeek);
  const annualSavings = weeklyTeamSavings * weeksPerYear;
  const karbonAnnualCost = employeeCount * KARBON_MONTHLY_COST_PER_EMPLOYEE * 12;
  const netAnnualROI = annualSavings - karbonAnnualCost;
  const breakevenWeeks = calculateBreakevenWeeks(employeeCount, weeklyTeamSavings);

  return {
    hoursPerWeek,
    hoursPerYear,
    totalHoursPerYear,
    annualSavings,
    karbonAnnualCost,
    netAnnualROI,
    breakevenWeeks,
    weeklyTeamSavings,
  };
};