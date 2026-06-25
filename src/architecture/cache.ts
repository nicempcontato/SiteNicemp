export class ModuleConfigCache<TKey extends string, TValue> {
  private readonly values = new Map<TKey, Promise<TValue>>();
  get(key: TKey, loader: () => Promise<TValue>): Promise<TValue> { const cached = this.values.get(key); if (cached) return cached; const next = loader().catch((error) => { this.values.delete(key); throw error; }); this.values.set(key, next); return next; }
  set(key: TKey, value: TValue): void { this.values.set(key, Promise.resolve(value)); }
  invalidate(key?: TKey): void { if (key) this.values.delete(key); else this.values.clear(); }
}
