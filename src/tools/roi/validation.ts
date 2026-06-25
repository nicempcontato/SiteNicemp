import type { FinancialConfig } from "@/architecture/types";
import { validateRange } from "@/architecture/validation";
import type { RoiInput, RoiValidationErrors } from "@/tools/roi/types";
export function validateRoiInput(input: RoiInput, config: FinancialConfig): RoiValidationErrors { const errors: RoiValidationErrors = {}; const investmentError = validateRange(input.investment, config.roi.investment); const returnError = validateRange(input.returnValue, config.roi.return_value); if (investmentError) errors.investment = investmentError; if (returnError) errors.returnValue = returnError; return errors; }
