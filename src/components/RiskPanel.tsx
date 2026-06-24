import { useState } from 'react';
import {
  LEVEL_CELL,
  LEVEL_LABEL,
  LEVEL_TEXT,
  levelFromScore,
  riskScore,
  type Risk,
} from '../lib/risk';
import { Badge, inputClass, primaryButtonClass, Section } from './ui';

interface Props {
  risks: Risk[];
  setRisks: (value: Risk[] | ((prev: Risk[]) => Risk[])) => void;
}

const SCALE = [1, 2, 3, 4, 5];

export default function RiskPanel({ risks, setRisks }: Props) {
  const [name, setName] = useState('');
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);

  const add = () => {
    if (!name.trim()) return;
    setRisks((prev) => [...prev, { id: crypto.randomUUID(), name: name.trim(), likelihood, impact }]);
    setName('');
  };

  const remove = (id: string) => setRisks((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="space-y-4">
      <Section title="Novo risco">
        <div className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="descrição do risco"
            className={inputClass('w-full')}
          />
          <div className="flex flex-wrap items-end gap-3">
            <label className="block">
              <span className="field-label">Probabilidade</span>
              <select
                value={likelihood}
                onChange={(e) => setLikelihood(Number(e.target.value))}
                className={inputClass()}
              >
                {SCALE.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="field-label">Impacto</span>
              <select
                value={impact}
                onChange={(e) => setImpact(Number(e.target.value))}
                className={inputClass()}
              >
                {SCALE.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={add} className={primaryButtonClass()}>
              adicionar
            </button>
          </div>
        </div>
      </Section>

      <Section title="Matriz de risco">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-1 text-center">
            <tbody>
              {[5, 4, 3, 2, 1].map((imp) => (
                <tr key={imp}>
                  <th className="w-8 font-mono text-xs text-slate-500">{imp}</th>
                  {SCALE.map((lik) => {
                    const score = lik * imp;
                    const level = levelFromScore(score);
                    const count = risks.filter(
                      (r) => r.likelihood === lik && r.impact === imp,
                    ).length;
                    return (
                      <td
                        key={lik}
                        className={`h-12 rounded-md font-mono text-xs ${LEVEL_CELL[level]}`}
                        title={`Prob ${lik} × Impacto ${imp} = ${score}`}
                      >
                        {count > 0 ? <span className="font-bold">{count}</span> : ''}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th />
                {SCALE.map((lik) => (
                  <th key={lik} className="font-mono text-xs text-slate-500">
                    {lik}
                  </th>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          ← probabilidade · ↑ impacto · número = riscos na célula
        </p>
      </Section>

      {risks.length > 0 && (
        <Section title={`Riscos (${risks.length})`}>
          <div className="space-y-2">
            {risks.map((r) => {
              const score = riskScore(r);
              const level = levelFromScore(score);
              return (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 border-b border-emerald-500/10 pb-2 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-slate-200">{r.name}</p>
                    <p className="font-mono text-xs text-slate-500">
                      P{r.likelihood} × I{r.impact} = {score} ·{' '}
                      <span className={LEVEL_TEXT[level]}>{LEVEL_LABEL[level]}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge
                      tone={
                        level === 'critical' || level === 'high'
                          ? 'bad'
                          : level === 'medium'
                            ? 'warn'
                            : 'ok'
                      }
                    >
                      {LEVEL_LABEL[level]}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => remove(r.id)}
                      className="font-mono text-xs text-slate-500 transition hover:text-red-400"
                    >
                      remover
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      )}
    </div>
  );
}
