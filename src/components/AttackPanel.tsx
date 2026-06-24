import { TACTICS } from '../lib/attack';
import { Section } from './ui';

interface Props {
  selected: string[];
  setSelected: (value: string[] | ((prev: string[]) => string[])) => void;
}

export default function AttackPanel({ selected, setSelected }: Props) {
  const selectedSet = new Set(selected);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-slate-500">
          Subconjunto do MITRE ATT&amp;CK Enterprise. Marque as técnicas aplicáveis.
        </p>
        <span className="shrink-0 font-mono text-xs text-emerald-300">{selected.length} marcadas</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {TACTICS.map((tactic) => (
          <Section key={tactic.id} title={tactic.name}>
            <div className="space-y-1.5">
              {tactic.techniques.map((tech) => {
                const checked = selectedSet.has(tech.id);
                return (
                  <label
                    key={`${tactic.id}-${tech.id}`}
                    className="flex cursor-pointer items-start gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(tech.id)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-400"
                    />
                    <span className={checked ? 'text-emerald-200' : 'text-slate-400'}>
                      <span className="font-mono text-xs text-slate-500">{tech.id}</span> {tech.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </Section>
        ))}
      </div>
    </div>
  );
}
