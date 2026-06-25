import type { SupabaseClient } from "@supabase/supabase-js";
import { defaultConfiguration } from "@/architecture/defaults";
import type { ConfigMap, ConfigVersion, ModuleKey, SeoConfig, ToolDefinition, ToolField, ToolKey, ToolSettings } from "@/architecture/types";
import type { ConfigurationProvider, ExportProvider, FinancialProvider, HRProvider, ImportProvider, ProviderRegistry, SaveConfigMetadata, SEOProvider, TaxProvider, ToolProvider } from "@/architecture/providers";
import { getSupabaseClient } from "@/services/supabase/client";

type UnsafeClient = SupabaseClient & { from: (table: string) => any; rpc: (fn: string, args?: Record<string, unknown>) => any };

export class SupabaseProvider implements ConfigurationProvider, ToolProvider, FinancialProvider, TaxProvider, HRProvider, ImportProvider, ExportProvider, SEOProvider {
  private readonly db: UnsafeClient;
  constructor(client: SupabaseClient = getSupabaseClient()) { this.db = client as UnsafeClient; }
  async getModuleConfig<TKey extends ModuleKey>(moduleKey: TKey): Promise<ConfigMap[TKey]> { if (moduleKey === "seo") { const { data, error } = await this.db.from("tool_seo").select("*").eq("active", true).order("route"); if (error) throw error; return (data ?? []) as ConfigMap[TKey]; } const { data, error } = await this.db.from(moduleTable[moduleKey as Exclude<ModuleKey, "seo">]).select("settings").eq("active", true).lte("effective_date", new Date().toISOString()).order("version", { ascending: false }).limit(1).maybeSingle(); if (error) throw error; return (data?.settings ?? defaultConfiguration[moduleKey]) as ConfigMap[TKey]; }
  async saveModuleConfig<TKey extends ModuleKey>(moduleKey: TKey, config: ConfigMap[TKey], metadata: SaveConfigMetadata): Promise<ConfigVersion<ConfigMap[TKey]>> { const { data, error } = await this.db.rpc("create_config_version", { p_module_key: moduleKey, p_entity_key: moduleKey, p_entity_id: null, p_config: config, p_change_reason: metadata.reason, p_actor_id: metadata.actorId }); if (error) throw error; return data as ConfigVersion<ConfigMap[TKey]>; }
  async getVersionHistory(moduleKey: ModuleKey, entityKey?: string): Promise<ConfigVersion[]> { let query = this.db.from("config_versions").select("*").eq("module_key", moduleKey).order("created_at", { ascending: false }); if (entityKey) query = query.eq("entity_key", entityKey); const { data, error } = await query; if (error) throw error; return (data ?? []) as ConfigVersion[]; }
  async rollback(versionId: string, metadata: SaveConfigMetadata): Promise<ConfigVersion> { const { data, error } = await this.db.rpc("rollback_config_version", { p_version_id: versionId, p_actor_id: metadata.actorId, p_change_reason: metadata.reason }); if (error) throw error; return data as ConfigVersion; }
  async listTools(): Promise<ToolDefinition[]> { const { data, error } = await this.db.from("tools").select("*").eq("active", true).order("name"); if (error) throw error; return (data ?? []) as ToolDefinition[]; }
  async getTool(toolKey: ToolKey): Promise<ToolDefinition> { const { data, error } = await this.db.from("tools").select("*").eq("key", toolKey).eq("active", true).single(); if (error) throw error; return data as ToolDefinition; }
  async getToolSettings(toolKey: ToolKey): Promise<ToolSettings[]> { const { data, error } = await this.db.from("tool_settings").select("*").eq("tool_key", toolKey).eq("active", true).order("module_key"); if (error) throw error; return (data ?? []) as ToolSettings[]; }
  async getToolFields(toolKey: ToolKey): Promise<ToolField[]> { const { data, error } = await this.db.from("tool_fields").select("*, tools!inner(key)").eq("tools.key", toolKey).eq("active", true).order("order_index"); if (error) throw error; return (data ?? []) as ToolField[]; }
  async saveToolSettings(toolKey: ToolKey, settings: ToolSettings[], metadata: SaveConfigMetadata): Promise<void> { const { error } = await this.db.rpc("replace_tool_settings", { p_tool_key: toolKey, p_settings: settings, p_actor_id: metadata.actorId, p_change_reason: metadata.reason }); if (error) throw error; }
  getFinancialConfig() { return this.getModuleConfig("financial"); }
  saveFinancialConfig(config: ConfigMap["financial"], metadata: SaveConfigMetadata) { return this.saveModuleConfig("financial", config, metadata); }
  getTaxConfig() { return this.getModuleConfig("tax"); }
  saveTaxConfig(config: ConfigMap["tax"], metadata: SaveConfigMetadata) { return this.saveModuleConfig("tax", config, metadata); }
  getHRConfig() { return this.getModuleConfig("hr"); }
  saveHRConfig(config: ConfigMap["hr"], metadata: SaveConfigMetadata) { return this.saveModuleConfig("hr", config, metadata); }
  getImportConfig() { return this.getModuleConfig("import"); }
  saveImportConfig(config: ConfigMap["import"], metadata: SaveConfigMetadata) { return this.saveModuleConfig("import", config, metadata); }
  getExportConfig() { return this.getModuleConfig("export"); }
  saveExportConfig(config: ConfigMap["export"], metadata: SaveConfigMetadata) { return this.saveModuleConfig("export", config, metadata); }
  async getSeoConfig(routeOrToolKey: string): Promise<SeoConfig | null> { const { data, error } = await this.db.from("tool_seo").select("*").eq("active", true).or(`route.eq.${routeOrToolKey},tool_key.eq.${routeOrToolKey}`).order("version", { ascending: false }).limit(1).maybeSingle(); if (error) throw error; return (data ?? null) as SeoConfig | null; }
  async listSeoConfig(): Promise<SeoConfig[]> { const { data, error } = await this.db.from("tool_seo").select("*").eq("active", true).order("route"); if (error) throw error; return (data ?? []) as SeoConfig[]; }
  async saveSeoConfig(config: SeoConfig, metadata: SaveConfigMetadata): Promise<ConfigVersion<SeoConfig>> { const { data, error } = await this.db.rpc("save_tool_seo", { p_config: config, p_actor_id: metadata.actorId, p_change_reason: metadata.reason }); if (error) throw error; return data as ConfigVersion<SeoConfig>; }
}
const moduleTable: Record<Exclude<ModuleKey, "seo">, string> = { general: "system_settings", financial: "financial_settings", tax: "tax_settings", hr: "hr_settings", import: "import_settings", export: "export_settings" };
export function createSupabaseProviderRegistry(client: SupabaseClient = getSupabaseClient()): ProviderRegistry { const provider = new SupabaseProvider(client); return { configuration: provider, tools: provider, financial: provider, tax: provider, hr: provider, import: provider, export: provider, seo: provider }; }
