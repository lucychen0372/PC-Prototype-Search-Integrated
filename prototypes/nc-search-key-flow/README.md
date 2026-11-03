# Nutanix Central: AI-augmented search + NIVA (key flow)

A clickable prototype of global search in Nutanix Central, built for a moderated usability study:

- **Search dropdown**: Recent / Favorites, Top Match with an interpretation loading state, grouped matches, "See all results", Ask NIVA.
- **Results page**: one filter section shared with the Entity Browser (tokens, "+ Filter", "Refine in plain words"), literal vs interpreted modes, "Did you mean".
- **Entity Browser landing**: VMs filtered from the search query (EBR with mock Groups API data).
- **NIVA side panel**: scripted answers from the template data, with evidence, an inference, follow-ups, and editable context (remove / "+ Add" a cluster re-answers the question).

It runs inside this template monorepo and reuses its shell, Prism components, and mock data. Nothing under `apps/web` is modified.

## Run it locally

### Prerequisites

- **Node.js 22** (`node -v`)
- **pnpm 10** (`npm install -g pnpm@10`, or `corepack enable`)
- **Nutanix VPN on** while installing: `@nutanix-ui/*` packages come from Nutanix Artifactory (see `.npmrc` at the repo root).

### Steps

```bash
# 1. Clone and install (from the repo root, VPN on)
git clone <this repo URL>
cd <repo folder>
pnpm install

# 2. Start the mock API (3001) and the prototype (3010) together
./prototypes/nc-search-key-flow/start.sh
```

Open **http://localhost:3010**. Press `Ctrl+C` in the terminal to stop both servers.

If you'd rather run the two servers in separate terminals:

```bash
# Terminal 1: mock API, needed for the Entity Browser's VM data
cd apps/api
npx tsx watch src/index.ts

# Terminal 2: the prototype
cd prototypes/nc-search-key-flow
node ../../apps/web/node_modules/vite/bin/vite.js --config vite.config.ts
```

### Troubleshooting

- **`pnpm install` fails on `@nutanix-ui/...`**: connect to the VPN and retry.
- **Port 3010 or 3001 already in use**: stop the other process (`lsof -i :3010`) and start again; the prototype uses a fixed port.
- **Entity Browser shows no VMs**: the mock API isn't running. Start it (Terminal 1 above).
- **macOS blocks a native binary after unzipping**: `xattr -rd com.apple.quarantine .` from the repo root.

## Things to try

| Type in the header search | What happens |
| --- | --- |
| `cluster abc` | Plain matches, no Top Match; "See all" opens results with an empty "Filters" section |
| `running vms with high iops` | Top Match loads, then "Running VMs with high IOPS, grouped by cluster"; opens the interpreted results page |
| `running vms on cluster abc with high iops` | Top Match goes to Cluster ABC's VMs tab in the Entity Browser, filtered |
| `why are my vms slow on cluster abc` | NIVA becomes the Top Match; opens the NIVA panel with a diagnostic answer |
| `vms kind of busy` | Low confidence: no Top Match; results page offers "Did you mean …?" |

In the NIVA panel, remove the **Cluster ABC** context chip to get the across-clusters answer, then use **+ Add → Clusters → Cluster ABC** to bring it back.

### Moderator controls

- **Shift + Option + D**: hidden moderator panel. Set the Top Match / interpretation / NIVA delays, force the Top Match to fail, toggle the Reset button, or reset to start.
- **Reset** (bottom of the left nav): asks for confirmation, then clears search history, NIVA and filters and returns to the dashboard. Delay settings are kept.

## Where the code lives

All prototype code is in `prototypes/nc-search-key-flow/src` (alias `@proto`). The template's web source is aliased as `~`.

| Area | Files |
| --- | --- |
| Search dropdown | `components/search/` (`GlobalSearch.tsx`, `SearchResultRow.tsx`, `use-run-search.ts`) |
| Query classification and Top Match | `lib/query-interpreter.ts`, `lib/search-engine.ts` |
| Results page | `components/results/` (`SearchResultsPage.tsx`, `ResultsFilterMenu.tsx`), `lib/results-filters.ts` |
| Shared interpretation / filter box (EB + results) | `components/vms/InterpretationBox.tsx`, `InterpretationPanel.tsx` |
| NIVA panel | `components/niva/` (`NivaPanel.tsx`, `NivaContextMenu.tsx`), `store/niva-store.tsx` |
| NIVA answers (scripted, from template data) | `lib/niva/answers.ts`, `lib/niva/types.ts` |
| Moderator panel and Reset | `components/moderator/`, `store/prototype-store.tsx` |
| Routes and shell | `App.tsx` |

The behavior rules for the dropdown, results page and NIVA panel are written down in `.cursor/rules/search-dropdown.mdc` at the repo root. Read that first if you're adapting search or NIVA for another prototype.
