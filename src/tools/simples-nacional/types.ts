export type SimplesAnnex = "I" | "II" | "III" | "IV" | "V";
export interface SimplesInput { rbt12: number; monthlyRevenue: number; annex: SimplesAnnex; }
export interface SimplesResult { nominalRate: number; deductionAmount: number; effectiveRate: number; dasValue: number; netRevenue: number; taxesPerThousand: number; bracket: number; }
export interface SimplesValidationErrors { rbt12?: string; monthlyRevenue?: string; annex?: string; }
