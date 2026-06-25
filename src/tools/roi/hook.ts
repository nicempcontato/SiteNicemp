import { useMemo } from "react";
import { useModuleConfiguration } from "@/tools/shared/useToolConfiguration";
import { calculateRoiWithConfig } from "@/tools/roi/engine";
import type { RoiInput } from "@/tools/roi/types";
export function useRoiCalculation(input: RoiInput) { const query = useModuleConfiguration("financial"); return useMemo(() => { if (!query.data) return { loading: query.isLoading, errors: {}, result: null }; return { loading: query.isLoading, ...calculateRoiWithConfig(input, query.data) }; }, [input, query.data, query.isLoading]); }
