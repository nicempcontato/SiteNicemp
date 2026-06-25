import { useMemo } from "react";
import { useModuleConfiguration } from "@/tools/shared/useToolConfiguration";
import { calculateSimplesWithConfig } from "@/tools/simples-nacional/engine";
import type { SimplesInput } from "@/tools/simples-nacional/types";
export function useSimplesCalculation(input: SimplesInput) { const query = useModuleConfiguration("tax"); return useMemo(() => { if (!query.data) return { loading: query.isLoading, errors: {}, result: null }; return { loading: query.isLoading, ...calculateSimplesWithConfig(input, query.data) }; }, [input, query.data, query.isLoading]); }
