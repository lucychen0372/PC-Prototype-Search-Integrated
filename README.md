# NC Search + NIVA prototype

## Run it

You need **Node.js 22** (or 20.19+), **pnpm 10** (`npm install -g pnpm@10`) and the **Nutanix VPN** (packages install from Nutanix Artifactory).

```bash
git clone https://github.com/lucychen0372/PC-Prototype-Search-Integrated-.git
cd PC-Prototype-Search-Integrated-
pnpm install
./prototypes/nc-search-key-flow/start.sh
```

Open **http://localhost:3010**. `Ctrl+C` stops it.

### If `pnpm install` fails (Artifactory access)

Use the offline copy, which already includes all dependencies (Apple Silicon Macs only):

1. Download [global-design-prototype-template-offline.zip](https://github.com/lucychen0372/PC-Prototype-Search-Integrated-/releases/latest/download/global-design-prototype-template-offline.zip) (about 270 MB) and unzip it.
2. In Terminal: `cd global-design-prototype-template-offline && ./prototypes/nc-search-key-flow/start.sh`
3. If macOS blocks it, run `xattr -rd com.apple.quarantine .` in that folder and try again.

Moderator panel: **Shift + Option + D**.
