import { useState } from 'react';
import MatrixRain from './components/MatrixRain';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import RiskPanel from './components/RiskPanel';
import StridePanel from './components/StridePanel';
import AttackPanel from './components/AttackPanel';
import ExportPanel from './components/ExportPanel';
import { useLocalStorage } from './lib/useLocalStorage';
import type { Risk } from './lib/risk';
import type { StrideThreat } from './lib/stride';

const TABS = [
  { id: 'risk', label: 'Risco' },
  { id: 'stride', label: 'STRIDE' },
  { id: 'attack', label: 'ATT&CK' },
  { id: 'export', label: 'Exportar' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function App() {
  const [tab, setTab] = useState<TabId>('risk');
  const [risks, setRisks] = useLocalStorage<Risk[]>('threatvg.risks', []);
  const [threats, setThreats] = useLocalStorage<StrideThreat[]>('threatvg.threats', []);
  const [selected, setSelected] = useLocalStorage<string[]>('threatvg.attack', []);

  const clearAll = () => {
    setRisks([]);
    setThreats([]);
    setSelected([]);
  };

  return (
    <div className="relative min-h-screen bg-grid-glow">
      <MatrixRain />
      <div className="relative z-10">
        <TopBar />

        <main className="mx-auto w-full max-w-3xl px-4 py-10 lg:px-6">
          <Hero />

          <nav className="mb-6 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-lg px-4 py-1.5 font-display text-sm font-semibold transition ${
                  tab === t.id
                    ? 'bg-emerald-400/15 text-emerald-300'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {tab === 'risk' && <RiskPanel risks={risks} setRisks={setRisks} />}
          {tab === 'stride' && <StridePanel threats={threats} setThreats={setThreats} />}
          {tab === 'attack' && <AttackPanel selected={selected} setSelected={setSelected} />}
          {tab === 'export' && (
            <ExportPanel
              risks={risks}
              threats={threats}
              selected={selected}
              onClear={clearAll}
            />
          )}
        </main>

        <footer className="border-t border-emerald-500/10 py-6 text-center font-mono text-xs text-slate-600">
          © 2026 Sergio Bernardo
        </footer>
      </div>
    </div>
  );
}
