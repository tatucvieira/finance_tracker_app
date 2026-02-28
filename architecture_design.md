# Architectural Update Document: CLT Paycheck System Integration

## 1. Overview
This document outlines the architectural changes required to integrate a CLT-compliant paycheck system into the finance_tracker_app. The update involves new data models, calculation engines, UI components, and integration with existing financial tracking logic.

## 2. File Changes Required

### 2.1. Backend Changes

#### 2.1.1. Data Models (`models/`)
- **New File:** `paycheck_template.py`
  - Defines `PaycheckTemplate` model with fields: `id`, `user_id`, `name`, `base_salary`, `inss_config`, `irrf_config` (including dependents), `transportation_voucher_value`, `meal_voucher_value`, `daily_meal_voucher_usage`, `overtime_rate`, `night_shift_allowance`, `hazard_pay`, `family_allowance`, `created_at`, `updated_at`
- **New File:** `paycheck_record.py`
  - Defines `PaycheckRecord` model with fields: `id`, `user_id`, `template_id`, `pay_period_start`, `pay_period_end`, `calculated_gross`, `calculated_inss`, `calculated_irrf`, `calculated_net`, `benefit_values`, `applied_to_transactions` (boolean), `created_at`
- **Modified File:** `transaction.py`
  - Extend `Transaction` model to include `paycheck_record_id` foreign key for linking paycheck data to existing transactions
- **Modified File:** `user.py`
  - Add relationship to `PaycheckTemplate` and `PaycheckRecord` models

#### 2.1.2. Calculation Engine (`services/`)
- **New File:** `clt_calculator.py`
  - Implements CLT-compliant calculation logic:
    - `calculate_inss(base_salary)` - applies current INSS brackets
    - `calculate_irrf(base_salary, dependents)` - applies progressive IRRF rates with deductions
    - `validate_benefits(transportation_value, meal_value)` - checks against CLT limits
    - `calculate_net_salary(template_data)` - orchestrates full paycheck calculation
- **New File:** `compliance_validator.py`
  - Validates inputs against CLT regulations
  - Provides error messages for non-compliant entries
  - Includes mechanism for updating tax brackets and rates

#### 2.1.3. API Endpoints (`api/`)
- **New File:** `paycheck_routes.py`
  - `GET /api/paycheck/templates` - list user templates
  - `POST /api/paycheck/templates` - create new template
  - `PUT /api/paycheck/templates/{id}` - update template
  - `DELETE /api/paycheck/templates/{id}` - delete template
  - `POST /api/paycheck/calculate` - calculate paycheck from template
  - `POST /api/paycheck/apply/{template_id}` - apply template to transactions
- **Modified File:** `transaction_routes.py`
  - Extend transaction creation to accept paycheck template data
  - Add endpoint to fetch paycheck-linked transactions

#### 2.1.4. Database Schema (`migrations/`)
- **New Migration:** Create tables for `paycheck_templates` and `paycheck_records`
- **New Migration:** Add `paycheck_record_id` column to `transactions` table
- **New Migration:** Add indexes for performance on user-template relationships

### 2.2. Frontend Changes

#### 2.2.1. Navigation (`components/Navigation/`)
- **Modified File:** `MainMenu.jsx` or `MainMenu.vue`
  - Add "Paycheck Management" menu item linking to paycheck dashboard
  - Integrate with existing navigation structure

#### 2.2.2. Paycheck Management UI (`views/paycheck/`)
- **New File:** `PaycheckDashboard.vue/jsx`
  - Main dashboard showing template list and quick actions
- **New File:** `TemplateEditor.vue/jsx`
  - Form for creating/editing paycheck templates with all CLT inputs
  - Real-time calculation preview
  - Validation feedback
- **New File:** `TemplateList.vue/jsx`
  - Display user's paycheck templates with CRUD actions
- **New File:** `CalculationPreview.vue/jsx`
  - Shows detailed breakdown of gross salary, deductions, and net salary
  - Visual representation of paycheck composition

#### 2.2.3. Form Components (`components/forms/`)
- **New File:** `CLTSalaryInput.vue/jsx`
  - Base salary input with minimum wage validation
- **New File:** `BenefitsInput.vue/jsx`
  - Transportation and meal voucher inputs with CLT limit validation
- **New File:** `DeductionsInput.vue/jsx`
  - INSS and IRRF configuration with automated calculations
- **New File:** `OtherCLTComponents.vue/jsx`
  - Inputs for overtime, night shift, hazard pay, family allowance

#### 2.2.4. Integration Components (`components/integration/`)
- **New File:** `ApplyPaycheckModal.vue/jsx`
  - Modal for applying paycheck template to transaction tracking
  - Options for pay period and category mapping
- **Modified File:** `TransactionForm.vue/jsx`
  - Add option to select paycheck template for income entries
  - Auto-populate fields when paycheck template is selected

### 2.3. Configuration and Constants

#### 2.3.1. CLT Configuration (`config/`)
- **New File:** `clt_config.py` or `cltConstants.js`
  - Current INSS brackets and rates
  - IRRF progressive tax tables
  - Benefit limits (transportation, meal vouchers)
  - Minimum wage and other regulatory constants
- **New File:** `compliance_rules.py` or `complianceRules.js`
  - Validation rules for all CLT components
  - Error message templates

### 2.4. Documentation and Help

#### 2.4.1. User Documentation (`docs/`)
- **New File:** `clt_help.md`
  - Explanation of CLT components and calculations
  - FAQ for common paycheck scenarios
- **Modified File:** `user_guide.md`
  - Add section on paycheck management features

## 3. Integration Points

### 3.1. Existing Transaction System
- Modify transaction creation to accept `paycheck_record_id`
- Update reporting logic to include paycheck-derived transactions
- Ensure paycheck data appears in income/expense reports

### 3.2. User Authentication
- All paycheck data must be scoped to authenticated users
- Add authorization checks for template access

### 3.3. Database Relationships
- Establish proper foreign key relationships between users, templates, records, and transactions
- Implement cascading deletion rules where appropriate

## 4. Data Flow
1. User creates paycheck template via TemplateEditor
2. CLT Calculator validates and computes net salary
3. User applies template to generate PaycheckRecord
4. PaycheckRecord creates corresponding Transaction entries
5. Transactions appear in existing financial tracking views

## 5. Compliance Considerations
- All calculations must use current CLT rates (configurable)
- Validation must prevent non-compliant entries
- Audit trail for paycheck calculations should be maintained
- Regular updates to tax tables must be supported without code changes