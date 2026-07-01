# Threatvg

Client-side threat-modelling and risk toolkit. Build risk matrices and STRIDE
models, and browse the MITRE ATT&CK matrix — **entirely in the browser**. There
is no backend and nothing leaves your machine.

Part of the [project hub](https://sabion.io/), alongside
[Bytevg](https://sabion.io/Bytevg/),
[Scanvg](https://sabion.io/Scanvg/) and
[Inspectorvg](https://sabion.io/Inspectorvg/).

## Modules

- **Risk matrix** — build a likelihood × impact matrix, classify risks and view
  the resulting heat map.
- **STRIDE** — threat modelling by STRIDE category, derived from the system
  components you describe.
- **MITRE ATT&CK** — browse tactics and techniques, mark what applies and export
  a Navigator layer.
- **Export** — download the assessment as JSON or Markdown to attach to reports.

## Stack

React + TypeScript + Vite + Tailwind. ATT&CK data is bundled as static JSON;
everything runs locally. No backend, no tracking.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview
```

The Vite `base` is `/Threatvg/` to match GitHub Pages. Deployment is automated by
`.github/workflows/deploy.yml` on every push to `main`.
