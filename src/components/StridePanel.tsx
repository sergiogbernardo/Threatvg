import { useState } from 'react';
import { STRIDE, type StrideThreat } from '../lib/stride';
import { inputClass, primaryButtonClass, Section } from './ui';

interface Props {
  threats: StrideThreat[];
  setThreats: (value: StrideThreat[] | ((prev: StrideThreat[]) => StrideThreat[])) => void;
}

export default function StridePanel({ threats, setThreats }: Props) {
  const [component, setComponent] = useState('');
  const [category, setCategory] = useState(STRIDE[0].id);
  const [mitigation, setMitigation] = useState('');

  const add = () => {
    if (!component.trim()) return;
    setThreats((prev) => [
      ...prev,
      { id: crypto.randomUUID(), component: component.trim(), category, mitigation: mitigation.trim() },
    ]);
    setComponent('');
    setMitigation('');
  };

  const remove = (id: string) => setThreats((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="space-y-4">
      <Section title="Referência STRIDE">
        <div className="space-y-3">
          {STRIDE.map((c) => (
            <div key={c.id} className="border-b border-emerald-500/10 pb-3 last:border-0">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-400/15 font-display text-sm font-bold text-emerald-300">
                  {c.letter}
                </span>
                <span className="text-sm text-slate-200">{c.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  viola {c.property}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{c.description}</p>
              <p className="mt-1 font-mono text-xs text-slate-500">Mitigações: {c.mitigations}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Registrar ameaça">
        <div className="space-y-3">
          <input
            value={component}
            onChange={(e) => setComponent(e.target.value)}
            placeholder="componente / fluxo (ex.: API de login)"
            className={inputClass('w-full')}
          />
          <div className="flex flex-wrap items-end gap-3">
            <label className="block">
              <span className="field-label">Categoria</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass()}
              >
                {STRIDE.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={add} className={primaryButtonClass()}>
              adicionar
            </button>
          </div>
          <input
            value={mitigation}
            onChange={(e) => setMitigation(e.target.value)}
            placeholder="mitigação planejada (opcional)"
            className={inputClass('w-full')}
          />
        </div>
      </Section>

      {threats.length > 0 && (
        <Section title={`Ameaças (${threats.length})`}>
          <div className="space-y-2">
            {threats.map((t) => {
              const cat = STRIDE.find((c) => c.id === t.category);
              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-3 border-b border-emerald-500/10 pb-2 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-slate-200">{t.component}</p>
                    <p className="font-mono text-xs text-slate-500">
                      {cat?.name ?? t.category}
                      {t.mitigation ? ` · ${t.mitigation}` : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(t.id)}
                    className="shrink-0 font-mono text-xs text-slate-500 transition hover:text-red-400"
                  >
                    remover
                  </button>
                </div>
              );
            })}
          </div>
        </Section>
      )}
    </div>
  );
}
