import { defaultConfiguration } from "@/architecture/defaults";
import { calculateRoiWithConfig } from "@/tools/roi/engine";
import { parseCurrency } from "@/utils/format";

export interface RoiResult { roi: number; lucro: number; invest: number; retorno: number; }
export function calculateRoi(investStr: string, retornoStr: string) { const invest = parseCurrency(investStr); const retorno = parseCurrency(retornoStr); const calculated = calculateRoiWithConfig({ investment: invest, returnValue: retorno }, defaultConfiguration.financial); if (!calculated.result) return { errs: { invest: calculated.errors.investment, retorno: calculated.errors.returnValue }, result: null }; return { errs: {}, result: { roi: calculated.result.roi, lucro: calculated.result.profit, invest: calculated.result.investment, retorno: calculated.result.returnValue } }; }
