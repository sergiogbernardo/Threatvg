import { useMemo } from 'react';
import { buildJson, buildMarkdown, download, type Assessment } from '../lib/report';
import { primaryButtonClass, Section } from './ui';

interface Props extends Assessment {
  onClear: () => void;
}

export default function ExportPanel({ risks, threats, selected, onClear }: Props) {
  const markdown = useMemo(
    () => buildMarkdown({ risks, threats, selected }),
    [risks, threats, selected],
  );
  const isEmpty = risks.length === 0 && threats.length === 0 && selected.length === 0;

  return (
    <div className="space-y-4">
      <Section title="Resumo">
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'riscos', value: risks.length },
            { label: 'ameaças STRIDE', value: threats.length },
            { label: 'técnicas ATT&CK', value: selected.length },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-emerald-500/15 p-3">
              <p className="font-display text-2xl font-bold text-emerald-300">{item.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={isEmpty}
            onClick={() => download('threat-assessment.md', markdown, 'text/markdown')}
            className={primaryButtonClass()}
          >
            baixar Markdown
          </button>
          <button
            type="button"
            disabled={isEmpty}
            onClick={() =>
              download(
                'threat-assessment.json',
                buildJson({ risks, threats, selected }),
                'application/json',
              )
            }
            className={primaryButtonClass()}
          >
            baixar JSON
          </button>
          <button
            type="button"
            disabled={isEmpty}
            onClick={onClear}
            className="rounded-lg border border-red-500/30 px-4 py-2 font-mono text-xs uppercase tracking-wider text-red-300 transition hover:bg-red-500/10 disabled:opacity-40"
          >
            limpar tudo
          </button>
        </div>
      </Section>

      <Section title="Pré-visualização (Markdown)">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-slate-300">
          {markdown}
        </pre>
      </Section>
    </div>
  );
}
