#!/bin/bash
set -euo pipefail

# Starts the mock API (port 3001) and this prototype (port 3010) together.
# Run `pnpm install` from the repo root first.
#
# Usage:      ./prototypes/nc-search-key-flow/start.sh
# Prototype:  http://localhost:3010

PROTO_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$PROTO_DIR/../.." && pwd)"

if [[ ! -d "$ROOT_DIR/apps/web/node_modules" ]]; then
  echo "Dependencies are missing. Run 'pnpm install' from $ROOT_DIR first (Nutanix VPN on)."
  exit 1
fi

echo "Starting mock API (port 3001)..."
cd "$ROOT_DIR/apps/api"
npx tsx watch src/index.ts &
API_PID=$!

echo "Starting prototype (port 3010)..."
cd "$PROTO_DIR"
node ../../apps/web/node_modules/vite/bin/vite.js --config vite.config.ts &
WEB_PID=$!

echo ""
echo "Open http://localhost:3010 in your browser. Press Ctrl+C to stop."

trap 'kill $API_PID $WEB_PID 2>/dev/null; exit' INT TERM
wait
