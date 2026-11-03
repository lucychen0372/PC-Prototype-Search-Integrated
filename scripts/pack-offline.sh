#!/bin/bash
set -euo pipefail

# Creates a distributable archive with all dependencies pre-installed.
# Recipients can unzip and run `pnpm dev` without registry access.

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ARCHIVE_NAME="global-design-prototype-template-offline.tar.gz"

cd "$REPO_DIR"

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Creating offline archive..."

# Clean project build outputs before archiving (if they exist).
# We cannot use tar --exclude='dist' because it would also strip
# dist/ directories inside node_modules packages (vite, tsx, etc.).
rm -rf dist dist-ssr apps/*/dist apps/*/dist-ssr

tar czf "$ARCHIVE_NAME" \
  --exclude='.git' \
  --exclude='.turbo' \
  --exclude='*.tar.gz' \
  --exclude='.DS_Store' \
  .

SIZE=$(du -h "$ARCHIVE_NAME" | cut -f1)
echo "Created $ARCHIVE_NAME ($SIZE)"
echo ""
echo "To use: unzip, then run 'pnpm dev' — no install step needed."
