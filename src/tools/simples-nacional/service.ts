import { taxService } from "@/architecture/runtime";
import { calculateSimplesWithConfig } from "@/tools/simples-nacional/engine";
import type { SimplesInput } from "@/tools/simples-nacional/types";
export async function calculateSimplesNacional(input: SimplesInput) { const config = await taxService.getConfig(); return calculateSimplesWithConfig(input, config); }
