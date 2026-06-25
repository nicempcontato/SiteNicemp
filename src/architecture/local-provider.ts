import { defaultConfiguration } from "@/architecture/defaults";
import type { ConfigMap, ConfigVersion, ModuleKey, SeoConfig, ToolDefinition, ToolField, ToolKey, ToolSettings } from "@/architecture/types";
import type { ConfigurationProvider, ExportProvider, FinancialProvider, HRProvider, ImportProvider, ProviderRegistry, SaveConfigMetadata, SEOProvider, TaxProvider, ToolProvider } from "@/architecture/providers";

export class LocalProvider implements ConfigurationProvider, ToolProvider, FinancialProvider, TaxProvider, HRProvider, ImportProvider, ExportProvider, SEOProvider {
  private config: ConfigMap = defaultConfiguration;
  private versions: ConfigVersion[] = [];
  async getModuleConfig<TKey extends ModuleKey>(moduleKey: TKey): Promise<ConfigMap[TKey]> { return this.config[moduleKey]; }
  async saveModuleConfig<TKey extends ModuleKey>(moduleKey: TKey, config: ConfigMap[TKey], metadata: SaveConfigMetadata): Promise<ConfigVersion<ConfigMap[TKey]>> { this.config = { ...this.config, [moduleKey]: config }; const version = { id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), active: true, version: this.versions.length + 1, effective_date: new Date().toISOString(), created_by: metadata.actorId, updated_by: metadata.actorId, module_key: moduleKey, entity_key: moduleKey, entity_id: null, config, change_reason: metadata.reason, rollback_of: null }; this.versions.unshift(version as ConfigVersion); return version; }
  async getVersionHistory(moduleKey: ModuleKey, entityKey?: string): Promise<ConfigVersion[]> { return this.versions.filter((item) => item.module_key === moduleKey && (!entityKey || item.entity_key === entityKey)); }
  async rollback(versionId: string, metadata: SaveConfigMetadata): Promise<ConfigVersion> { const version = this.versions.find((item) => item.id === versionId); if (!version) throw new Error("Version not found."); return this.saveModuleConfig(version.module_key, version.config as ConfigMap[ModuleKey], metadata); }
  async listTools(): Promise<ToolDefinition[]> { return []; }
  async getTool(toolKey: ToolKey): Promise<ToolDefinition> { throw new Error(`Tool ${toolKey} is not available in local provider.`); }
  async getToolSettings(): Promise<ToolSettings[]> { return []; }
  async getToolFields(): Promise<ToolField[]> { return []; }
  async saveToolSettings(): Promise<void> { return; }
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
  async getSeoConfig(routeOrToolKey: string): Promise<SeoConfig | null> { return this.config.seo.find((item) => item.route === routeOrToolKey || item.tool_key === routeOrToolKey) ?? null; }
  async listSeoConfig(): Promise<SeoConfig[]> { return this.config.seo; }
  async saveSeoConfig(config: SeoConfig, metadata: SaveConfigMetadata): Promise<ConfigVersion<SeoConfig>> { const next = this.config.seo.filter((item) => item.id !== config.id); this.config = { ...this.config, seo: [...next, config] }; return this.saveModuleConfig("seo", this.config.seo, metadata) as unknown as Promise<ConfigVersion<SeoConfig>>; }
}
export function createLocalProviderRegistry(): ProviderRegistry { const provider = new LocalProvider(); return { configuration: provider, tools: provider, financial: provider, tax: provider, hr: provider, import: provider, export: provider, seo: provider }; }
