import { financialService } from "@/architecture/runtime";
import type { RoiInput } from "@/tools/roi/types";
import { calculateRoiWithConfig } from "@/tools/roi/engine";
export async function calculateRoi(input: RoiInput) { const config = await financialService.getConfig(); return calculateRoiWithConfig(input, config); }
