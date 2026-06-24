// Risk model: a 5x5 likelihood x impact matrix with derived level and colours.

export interface Risk {
  id: string;
  name: string;
  likelihood: number; // 1..5
  impact: number; // 1..5
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export function riskScore(risk: Risk): number {
  return risk.likelihood * risk.impact;
}

export function levelFromScore(score: number): RiskLevel {
  if (score <= 4) return 'low';
  if (score <= 9) return 'medium';
  if (score <= 15) return 'high';
  return 'critical';
}

export const LEVEL_LABEL: Record<RiskLevel, string> = {
  low: 'baixo',
  medium: 'médio',
  high: 'alto',
  critical: 'crítico',
};

export const LEVEL_CELL: Record<RiskLevel, string> = {
  low: 'bg-emerald-500/25 text-emerald-200',
  medium: 'bg-amber-500/25 text-amber-100',
  high: 'bg-orange-500/35 text-orange-100',
  critical: 'bg-red-500/45 text-red-50',
};

export const LEVEL_TEXT: Record<RiskLevel, string> = {
  low: 'text-emerald-300',
  medium: 'text-amber-300',
  high: 'text-orange-300',
  critical: 'text-red-300',
};
