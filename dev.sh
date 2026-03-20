#!/bin/zsh

set -euo pipefail

ROOT_DIR="${0:A:h}"
export PATH="$ROOT_DIR/.local/node/bin:$PATH"

cd "$ROOT_DIR"
npm run dev

