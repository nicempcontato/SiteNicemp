import { defaultConfiguration } from "@/architecture/defaults";
import { calculateMarkupWithConfig } from "@/tools/markup/engine";

export function testMarkupEngine() {
  const output = calculateMarkupWithConfig({ cost: 100, expensesPercent: 10, marginPercent: 20 }, defaultConfiguration.financial);
  if (!output.result || output.result.salePrice <= 100) throw new Error("Markup engine failed.");
}
