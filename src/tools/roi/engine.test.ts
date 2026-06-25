import { defaultConfiguration } from "@/architecture/defaults";
import { calculateRoiWithConfig } from "@/tools/roi/engine";

export function testRoiEngine() {
  const output = calculateRoiWithConfig({ investment: 1000, returnValue: 1500 }, defaultConfiguration.financial);
  if (!output.result || output.result.roi !== 50) throw new Error("ROI engine failed.");
}
