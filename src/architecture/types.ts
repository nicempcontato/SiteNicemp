import type { Json } from "@/types/database";

export type UUID = string;
export type ModuleKey = "general" | "financial" | "tax" | "hr" | "import" | "export" | "seo";
export type ToolKey = "roi" | "markup" | "simples-nacional" | "capital-de-giro" | "fluxo-de-caixa" | "dre" | "dre-completo" | "margem-de-lucro" | "ponto-de-equilibrio" | "enquadramento-tributario" | "importacao" | "exportacao" | "rh" | "payroll" | "inventory" | "dashboard" | "ai";
export type Permission = "config:read" | "config:write" | "tools:read" | "tools:write" | "users:read" | "users:write" | "logs:read" | "system:write";

export interface VersionedEntity { id: UUID; created_at: string; updated_at: string; active: boolean; version: number; effective_date: string; created_by: UUID | null; updated_by: UUID | null; }
export interface RangeRule { key: string; min: number | null; max: number | null; inclusive_min: boolean; inclusive_max: boolean; message: string; }
export interface LimitRule { key: string; value: number; message: string; }
export interface ToolDefinition extends VersionedEntity { key: ToolKey; category_id: UUID | null; name: string; description: string; status: "draft" | "active" | "inactive" | "archived"; feature_flags: Record<string, boolean>; }
export interface ToolField extends VersionedEntity { tool_id: UUID; key: string; label: string; type: "currency" | "percent" | "number" | "text" | "select" | "boolean" | "date"; required: boolean; default_value: Json; validation: Json; help_text: string | null; order_index: number; }
export interface ToolSettings extends VersionedEntity { tool_key: ToolKey; module_key: ModuleKey; settings: Json; }
export interface SeoConfig extends VersionedEntity { tool_key: ToolKey | null; route: string; title: string; meta_description: string; canonical: string | null; open_graph: Json; twitter_card: Json; faq_schema: Json; software_application_schema: Json; json_ld: Json; }

export interface FinancialConfig { default_currency: "BRL"; roi: { investment: RangeRule; return_value: RangeRule; labels: Record<string, string>; help_texts: Record<string, string>; }; markup: { cost: RangeRule; expenses_percent: RangeRule; margin_percent: RangeRule; combined_percent_limit: LimitRule; labels: Record<string, string>; help_texts: Record<string, string>; }; }
export interface TaxBracket { regime: string; annex: "I" | "II" | "III" | "IV" | "V"; bracket: number; min_revenue: number; max_revenue: number; nominal_rate: number; deduction_amount: number; }
export interface TaxConfig { simples_nacional: { max_rbt12: number; monthly_revenue: RangeRule; rbt12: RangeRule; brackets: TaxBracket[]; annex_descriptions: Record<string, string>; states: string[]; legal_texts: Record<string, string>; validation_messages: Record<string, string>; }; }
export interface HRConfig { payroll: { enabled: boolean; validation_messages: Record<string, string>; future_integrations: Record<string, string>; }; }
export interface ImportConfig { allowed_extensions: string[]; max_file_size_mb: number; validation_messages: Record<string, string>; future_integrations: Record<string, string>; }
export interface ExportConfig { allowed_formats: string[]; default_format: string; validation_messages: Record<string, string>; future_integrations: Record<string, string>; }
export interface GeneralConfig { platform_name: string; locale: "pt-BR"; feature_flags: Record<string, boolean>; validation_messages: Record<string, string>; }
export interface ConfigMap { general: GeneralConfig; financial: FinancialConfig; tax: TaxConfig; hr: HRConfig; import: ImportConfig; export: ExportConfig; seo: SeoConfig[]; }
export interface ConfigVersion<TConfig = unknown> extends VersionedEntity { module_key: ModuleKey; entity_key: string; entity_id: UUID | null; config: TConfig; change_reason: string | null; rollback_of: UUID | null; }
