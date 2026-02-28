// CLT Configuration Constants
// Current as of 2024 - Brazilian Labor Laws

const CLTConstants = {
    // Minimum wage (2024)
    MINIMUM_WAGE: 1412.00,
    
    // INSS (Social Security) Brackets and Rates for 2024
    INSS_BRACKETS: [
        { min: 0, max: 1412.00, rate: 0.075 },      // 7.5%
        { min: 1412.01, max: 2666.68, rate: 0.09 },  // 9%
        { min: 2666.69, max: 4000.03, rate: 0.12 },  // 12%
        { min: 4000.04, max: 7786.02, rate: 0.14 }   // 14%
    ],
    MAX_INSS_CONTRIBUTION: 7786.02 * 0.14, // Maximum INSS contribution
    
    // IRRF (Income Tax) Brackets for 2024
    IRRF_BRACKETS: [
        { min: 0, max: 2259.20, rate: 0, deduction: 0 },
        { min: 2259.21, max: 2826.65, rate: 0.075, deduction: 169.44 },
        { min: 2826.66, max: 3751.05, rate: 0.15, deduction: 381.44 },
        { min: 3751.06, max: 4664.68, rate: 0.225, deduction: 662.77 },
        { min: 4664.69, max: Infinity, rate: 0.275, deduction: 896.00 }
    ],
    MONTHLY_DEPENDENT_DEDUCTION: 189.59, // Monthly deduction per dependent
    
    // Benefit Limits
    TRANSPORTATION_VOUCHER_MAX: 0.06, // 6% of salary maximum
    TRANSPORTATION_VOUCHER_DISCOUNT: 0.06, // Employee contributes 6%
    
    MEAL_VOUCHER_TAX_FREE_LIMIT: 33.00, // Daily tax-free limit
    MEAL_VOUCHER_MAX_DAILY: 100.00, // Maximum daily value
    
    // Working Hours
    STANDARD_MONTHLY_HOURS: 220, // Standard monthly working hours
    DAILY_WORKING_HOURS: 8,
    
    // Overtime Rates
    OVERTIME_RATE: {
        WEEKDAY: 1.5, // 50% extra
        SUNDAY_HOLIDAY: 2.0, // 100% extra
        NIGHT_SHIFT: 0.2, // 20% extra for night work (10pm-5am)
    },
    
    // Allowances
    NIGHT_SHIFT_ALLOWANCE: 0.2, // 20% extra for night work
    HAZARD_PAY_RATES: {
        LOW: 0.1,    // 10% for low risk
        MEDIUM: 0.2, // 20% for medium risk
        HIGH: 0.4    // 40% for high risk
    },
    
    // Family Allowance (Salário Família)
    FAMILY_ALLOWANCE_BRACKETS: [
        { maxSalary: 1754.18, perChild: 62.04 },
        { maxSalary: 2918.92, perChild: 43.78 }
    ],
    
    // 13th Salary (Christmas Bonus)
    THIRTEENTH_SALARY_MONTHS: 12,
    
    // Vacation
    VACATION_DAYS_PER_YEAR: 30,
    VACATION_BONUS: 1.333, // 1/3 extra on vacation
    
    // FGTS (Severance Fund)
    FGTS_RATE: 0.08, // 8% of salary
    
    // Other Constants
    WORK_DAYS_PER_MONTH: 22,
    WORK_DAYS_PER_YEAR: 264
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CLTConstants;
}