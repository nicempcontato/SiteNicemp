import { useMemo } from "react";
import { useModuleConfiguration } from "@/tools/shared/useToolConfiguration";
import { calculateMarkupWithConfig } from "@/tools/markup/engine";
import type { MarkupInput } from "@/tools/markup/types";
export function useMarkupCalculation(input: MarkupInput) { const query = useModuleConfiguration("financial"); return useMemo(() => { if (!query.data) return { loading: query.isLoading, errors: {}, result: null }; return { loading: query.isLoading, ...calculateMarkupWithConfig(input, query.data) }; }, [input, query.data, query.isLoading]); }
