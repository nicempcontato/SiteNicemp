import type { TaxConfig } from "@/architecture/types";
import { validateRange } from "@/architecture/validation";
import type { SimplesInput, SimplesValidationErrors } from "@/tools/simples-nacional/types";
export function validateSimplesInput(input: SimplesInput, config: TaxConfig): SimplesValidationErrors { const errors: SimplesValidationErrors = {}; const simples = config.simples_nacional; const rbt12Error = validateRange(input.rbt12, simples.rbt12); const monthlyRevenueError = validateRange(input.monthlyRevenue, simples.monthly_revenue); if (rbt12Error) errors.rbt12 = rbt12Error; if (monthlyRevenueError) errors.monthlyRevenue = monthlyRevenueError; if (!["I", "II", "III", "IV", "V"].includes(input.annex)) errors.annex = simples.validation_messages.invalid_annex; return errors; }
