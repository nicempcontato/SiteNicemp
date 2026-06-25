import { ModuleConfigCache } from "@/architecture/cache";
import type { ConfigMap, ConfigVersion, ExportConfig, FinancialConfig, GeneralConfig, HRConfig, ImportConfig, ModuleKey, SeoConfig, TaxConfig, ToolKey } from "@/architecture/types";
import type { ProviderRegistry, SaveConfigMetadata } from "@/architecture/providers";
import { moduleSchemas } from "@/architecture/validation";

export class ConfigurationService {
  private readonly cache = new ModuleConfigCache<ModuleKey, ConfigMap[ModuleKey]>();
  constructor(private readonly providers: ProviderRegistry) {}
  async get<TKey extends ModuleKey>(moduleKey: TKey): Promise<ConfigMap[TKey]> { return this.cache.get(moduleKey, async () => moduleSchemas[moduleKey].parse(await this.providers.configuration.getModuleConfig(moduleKey)) as ConfigMap[TKey]) as Promise<ConfigMap[TKey]>; }
  async save<TKey extends ModuleKey>(moduleKey: TKey, config: ConfigMap[TKey], metadata: SaveConfigMetadata): Promise<ConfigVersion<ConfigMap[TKey]>> { const parsed = moduleSchemas[moduleKey].parse(config) as ConfigMap[TKey]; const version = await this.providers.configuration.saveModuleConfig(moduleKey, parsed, metadata); this.cache.set(moduleKey, parsed); return version; }
  history(moduleKey: ModuleKey, entityKey?: string): Promise<ConfigVersion[]> { return this.providers.configuration.getVersionHistory(moduleKey, entityKey); }
  async rollback(versionId: string, metadata: SaveConfigMetadata): Promise<ConfigVersion> { const version = await this.providers.configuration.rollback(versionId, metadata); this.cache.invalidate(version.module_key); return version; }
  invalidate(moduleKey?: ModuleKey): void { this.cache.invalidate(moduleKey); }
}
export class ToolService { constructor(private readonly providers: ProviderRegistry) {} listTools() { return this.providers.tools.listTools(); } getTool(toolKey: ToolKey) { return this.providers.tools.getTool(toolKey); } getSettings(toolKey: ToolKey) { return this.providers.tools.getToolSettings(toolKey); } getFields(toolKey: ToolKey) { return this.providers.tools.getToolFields(toolKey); } }
export class FinancialService { constructor(private readonly configuration: ConfigurationService) {} getConfig(): Promise<FinancialConfig> { return this.configuration.get("financial"); } }
export class TaxService { constructor(private readonly configuration: ConfigurationService) {} getConfig(): Promise<TaxConfig> { return this.configuration.get("tax"); } }
export class HRService { constructor(private readonly configuration: ConfigurationService) {} getConfig(): Promise<HRConfig> { return this.configuration.get("hr"); } }
export class ImportService { constructor(private readonly configuration: ConfigurationService) {} getConfig(): Promise<ImportConfig> { return this.configuration.get("import"); } }
export class ExportService { constructor(private readonly configuration: ConfigurationService) {} getConfig(): Promise<ExportConfig> { return this.configuration.get("export"); } }
export class GeneralService { constructor(private readonly configuration: ConfigurationService) {} getConfig(): Promise<GeneralConfig> { return this.configuration.get("general"); } }
export class SEOService { constructor(private readonly providers: ProviderRegistry) {} getSeoConfig(routeOrToolKey: string): Promise<SeoConfig | null> { return this.providers.seo.getSeoConfig(routeOrToolKey); } listSeoConfig(): Promise<SeoConfig[]> { return this.providers.seo.listSeoConfig(); } }
