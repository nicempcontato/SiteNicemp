export interface RoiInput { investment: number; returnValue: number; }
export interface RoiResult { roi: number; profit: number; investment: number; returnValue: number; }
export interface RoiValidationErrors { investment?: string; returnValue?: string; }
