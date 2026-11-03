#!/bin/bash
set -euo pipefail

# Starts the dev servers without requiring pnpm, turbo, or registry access.
# Use this if you received the offline archive and don't have Artifactory configured.
#
# Usage:   ./start.sh
# Web UI:  http://localhost:3000
# API:     http://localhost:3001

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# macOS quarantines files from downloaded archives, which blocks native binaries
# (rolldown, esbuild, etc.) from loading. Strip the quarantine attribute on first run.
if [[ "$(uname)" == "Darwin" ]] && xattr -l "$SCRIPT_DIR/node_modules" 2>/dev/null | grep -q "com.apple.quarantine"; then
  echo "Removing macOS quarantine flags (first-run only)..."
  xattr -rd com.apple.quarantine "$SCRIPT_DIR"
  echo "Done."
  echo ""
fi

echo "Starting API server (port 3001)..."
cd "$SCRIPT_DIR/apps/api"
npx tsx watch src/index.ts &
API_PID=$!

echo "Starting Web dev server (port 3000)..."
cd "$SCRIPT_DIR/apps/web"
npx vite &
WEB_PID=$!

echo ""
echo "Both servers starting. Open http://localhost:3000 in your browser."
echo "Press Ctrl+C to stop."

trap "kill $API_PID $WEB_PID 2>/dev/null; exit" INT TERM
wait
