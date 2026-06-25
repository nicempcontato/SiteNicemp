import { defaultConfiguration } from "@/architecture/defaults";
import { calculateSimplesWithConfig } from "@/tools/simples-nacional/engine";

export function testSimplesEngine() {
  const output = calculateSimplesWithConfig({ rbt12: 180000, monthlyRevenue: 10000, annex: "I" }, defaultConfiguration.tax);
  if (!output.result || output.result.dasValue !== 400) throw new Error("Simples Nacional engine failed.");
}
