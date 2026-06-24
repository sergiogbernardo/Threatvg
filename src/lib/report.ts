import { levelFromScore, LEVEL_LABEL, riskScore, type Risk } from './risk';
import { STRIDE, type StrideThreat } from './stride';
import { ALL_TECHNIQUES } from './attack';

export interface Assessment {
  risks: Risk[];
  threats: StrideThreat[];
  selected: string[]; // ATT&CK technique ids
}

function selectedTechniques(selected: string[]) {
  return ALL_TECHNIQUES.filter((t) => selected.includes(t.id));
}

export function buildJson(assessment: Assessment): string {
  const data = {
    generatedAt: new Date().toISOString(),
    risks: assessment.risks.map((r) => {
      const score = riskScore(r);
      return { ...r, score, level: levelFromScore(score) };
    }),
    strideThreats: assessment.threats,
    attackTechniques: selectedTechniques(assessment.selected),
  };
  return JSON.stringify(data, null, 2);
}

export function buildMarkdown(assessment: Assessment): string {
  const lines: string[] = ['# Threat assessment', '', `_Gerado em ${new Date().toISOString()}_`, ''];

  lines.push('## Riscos', '');
  if (assessment.risks.length === 0) {
    lines.push('_Nenhum risco registrado._', '');
  } else {
    lines.push('| Risco | Probabilidade | Impacto | Score | Nível |', '|---|---|---|---|---|');
    for (const r of assessment.risks) {
      const score = riskScore(r);
      lines.push(
        `| ${r.name} | ${r.likelihood} | ${r.impact} | ${score} | ${LEVEL_LABEL[levelFromScore(score)]} |`,
      );
    }
    lines.push('');
  }

  lines.push('## STRIDE', '');
  if (assessment.threats.length === 0) {
    lines.push('_Nenhuma ameaça registrada._', '');
  } else {
    lines.push('| Componente | Categoria | Mitigação |', '|---|---|---|');
    for (const t of assessment.threats) {
      const category = STRIDE.find((c) => c.id === t.category)?.name ?? t.category;
      lines.push(`| ${t.component} | ${category} | ${t.mitigation || '—'} |`);
    }
    lines.push('');
  }

  lines.push('## MITRE ATT&CK', '');
  const techniques = selectedTechniques(assessment.selected);
  if (techniques.length === 0) {
    lines.push('_Nenhuma técnica marcada._');
  } else {
    for (const t of techniques) lines.push(`- ${t.id} ${t.name} _(${t.tactic})_`);
  }

  return lines.join('\n');
}

export function download(filename: string, content: string, type = 'text/plain'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
