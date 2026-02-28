```markdown
# Project Update Requirements: finance_tracker_app

## 1. Overview
**Update Title:** CLT Paycheck System Integration  
**Objective:** Enhance the finance_tracker_app by integrating a menu-driven system for defining and calculating paycheck information compliant with Brazil's CLT (Consolidação das Leis do Trabalho) regulations. This system will allow users to create, edit, and apply paycheck templates to streamline payroll tracking and ensure accurate financial management.

## 2. Core Requirements

### 2.1. Menu System Integration
- **Requirement:** Implement a dedicated "Paycheck Management" menu within the app's main navigation.
- **Details:** The menu should provide access to all paycheck-related functionalities, including template creation, editing, deletion, and application to tracking logic.

### 2.2. Paycheck Template Management
- **Requirement:** Enable users to create, edit, and delete paycheck templates.
- **Details:** Each template must store CLT-compliant configurations for salary, deductions, and benefits.

### 2.3. CLT-Compliant Inputs
- **Requirement:** Support inputs for all CLT-mandated and optional components.
- **Details:**
  - **Salary:** Base salary input with validation for minimum wage and contractual terms.
  - **Deductions:** 
    - INSS (Instituto Nacional do Seguro Social): Automated calculation based on current brackets.
    - IRRF (Imposto de Renda Retido na Fonte): Automated calculation with progressive rates and dependents' deductions.
  - **Benefits:**
    - Transportation Voucher: Input for value and usage, with compliance to CLT limits.
    - Meal Voucher: Input for value and daily usage, adhering to tax-exempt thresholds.
  - **Other CLT Components:** Include inputs for overtime, night shift allowances, hazard pay, and family allowance.

### 2.4. Calculation Engine
- **Requirement:** Integrate a calculation engine that computes net salary based on inputs.
- **Details:** Automatically apply INSS, IRRF, and benefit deductions according to CLT rules, with real-time updates.

### 2.5. Template Application
- **Requirement:** Allow users to apply paycheck templates to the existing financial tracking logic.
- **Details:** Templates should populate transaction records with calculated values, linking to income and expense categories.

### 2.6. Validation and Compliance
- **Requirement:** Ensure all inputs and calculations adhere to current CLT regulations.
- **Details:** Include validation for legal limits (e.g., maximum INSS contribution, tax thresholds) and provide error messages for non-compliant entries.

### 2.7. User Interface
- **Requirement:** Design an intuitive UI for template management and input forms.
- **Details:** Use forms with clear labels, tooltips for CLT terms, and summary previews of calculations.

## 3. User Stories

### 3.1. Template Management
- **As a** user, **I want to** create a paycheck template with my salary and benefits, **so that** I can reuse it for recurring pay periods.
- **As a** user, **I want to** edit an existing template to update my salary or deductions, **so that** it reflects changes in my employment terms.
- **As a** user, **I want to** delete outdated templates, **so that** my template list remains organized and relevant.

### 3.2. Calculation and Compliance
- **As a** user, **I want to** input my base salary and have the app automatically calculate INSS and IRRF deductions, **so that** I ensure compliance with Brazilian tax laws.
- **As a** user, **I want to** add transportation and meal vouchers with automatic validation against CLT limits, **so that** I avoid errors in benefit reporting.
- **As a** user, **I want to** see a breakdown of my gross salary, deductions, and net salary, **so that** I understand my paycheck composition.

### 3.3. Integration with Tracking
- **As a** user, **I want to** apply a paycheck template to log income and deductions in my financial tracker, **so that** my records are automatically updated.
- **As a** user, **I want to** review applied paycheck data in my transaction history, **so that** I can track my earnings and deductions over time.

### 3.4. Usability and Support
- **As a** user, **I want to** access a help section explaining CLT components, **so that** I can understand the terms and calculations.
- **As a** user, **I want to** receive alerts for non-compliant entries (e.g., benefits exceeding limits), **so that** I can correct them before saving.

## 4. Technical Specifications

### 4.1. Data Models
- **Paycheck Template:** Fields for template name, salary, deductions (INSS rate, IRRF parameters), benefits (transportation voucher value, meal voucher value), and other CLT components.
- **Paycheck Record:** Linked to templates, storing calculated values for net salary, deductions, and benefits for each pay period.

### 4.2. Integration Points
- **Existing Tracking Logic:** Modify income/expense logging to accept paycheck template data, ensuring seamless integration with transaction histories and reports.
- **Database:** Extend schema to store templates and paycheck records, with relationships to user accounts and financial entries.

### 4.3. Compliance Updates
- **Mechanism:** Implement a system to update INSS brackets and IRRF rates based on regulatory changes, with manual override capabilities for users.

## 5. Success Metrics
- **User Adoption:** 80% of active users utilize the paycheck system within one month of launch.
- **Accuracy:** Reduce user-reported errors in paycheck calculations by 90% compared to manual entry.
- **Compliance:** Ensure 100% of calculations adhere to current CLT regulations through automated validation.

## 6. Dependencies
- **Regulatory Data:** Access to updated CLT tax tables and benefit limits.
- **Existing App Modules:** Integration with user authentication, transaction tracking, and reporting features.

## 7. Out of Scope
- **Multi-currency Support:** This update focuses solely on BRL (Brazilian Real) and CLT regulations.
- **Employer-Side Features:** Functionality for HR or payroll management is not included.
- **Legal Advice:** The app provides calculations based on CLT rules but does not offer legal or tax consultation.
```