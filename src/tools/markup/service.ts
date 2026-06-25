import { financialService } from "@/architecture/runtime";
import { calculateMarkupWithConfig } from "@/tools/markup/engine";
import type { MarkupInput } from "@/tools/markup/types";
export async function calculateMarkup(input: MarkupInput) { const config = await financialService.getConfig(); return calculateMarkupWithConfig(input, config); }
