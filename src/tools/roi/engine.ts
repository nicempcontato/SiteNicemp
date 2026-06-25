import type { FinancialConfig } from "@/architecture/types";
import type { RoiInput, RoiResult } from "@/tools/roi/types";
import { validateRoiInput } from "@/tools/roi/validation";
export function calculateRoiWithConfig(input: RoiInput, config: FinancialConfig): { errors: Record<string, string>; result: RoiResult | null } { const errors = validateRoiInput(input, config) as Record<string, string>; if (Object.keys(errors).length > 0) return { errors, result: null }; const profit = input.returnValue - input.investment; return { errors: {}, result: { roi: (profit / input.investment) * 100, profit, investment: input.investment, returnValue: input.returnValue } }; }
