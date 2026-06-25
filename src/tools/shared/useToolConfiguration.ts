import { useQuery } from "@tanstack/react-query";
import type { ModuleKey, ToolKey } from "@/architecture/types";
import { configurationService, toolService } from "@/architecture/runtime";
export function useModuleConfiguration<TKey extends ModuleKey>(moduleKey: TKey) { return useQuery({ queryKey: ["configuration", moduleKey], queryFn: () => configurationService.get(moduleKey), staleTime: 300000 }); }
export function useToolDefinition(toolKey: ToolKey) { return useQuery({ queryKey: ["tool", toolKey], queryFn: () => toolService.getTool(toolKey), staleTime: 300000 }); }
export function useToolFields(toolKey: ToolKey) { return useQuery({ queryKey: ["tool-fields", toolKey], queryFn: () => toolService.getFields(toolKey), staleTime: 300000 }); }
