export interface MarkupInput { cost: number; expensesPercent: number; marginPercent: number; }
export interface MarkupResult { salePrice: number; multiplier: number; expectedProfit: number; cost: number; expensesPercent: number; marginPercent: number; costPerCurrencyUnit: number; }
export interface MarkupValidationErrors { cost?: string; expensesPercent?: string; marginPercent?: string; }
