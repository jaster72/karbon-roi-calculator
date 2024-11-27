import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { calculateROI, type ROICalculationParams, type ROIResults } from '../utils/calculations';
import ROIResults from './ROIResults';

const initialValues: ROICalculationParams = {
  employeeCount: 10,
  hourlyRate: 50,
  hoursPerWeek: 5,
  weeksPerYear: 52,
};

export default function ROICalculator() {
  const [values, setValues] = useState<ROICalculationParams>(initialValues);
  const results = calculateROI(values);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Karbon ROI Calculator</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Input Parameters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    name="employeeCount"
                    value={values.employeeCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={values.hourlyRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hours Saved Per Week (per employee)
                  </label>
                  <input
                    type="number"
                    name="hoursPerWeek"
                    value={values.hoursPerWeek}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weeks Per Year
                  </label>
                  <input
                    type="number"
                    name="weeksPerYear"
                    value={values.weeksPerYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                    max="52"
                  />
                </div>
              </div>
            </div>

            <ROIResults results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}