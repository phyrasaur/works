#!/usr/bin/env bash

set -Eeuo pipefail

check_network=false
check_deploy=false

for argument in "$@"; do
  case "$argument" in
    --network)
      check_network=true
      ;;
    --deploy)
      check_network=true
      check_deploy=true
      ;;
    *)
      printf 'Unknown option: %s\n' "$argument" >&2
      exit 2
      ;;
  esac
done

failures=0
warnings=0
repo_root=""
permission_probe=""
platform="$(uname -s)"
is_wsl=false

pass() {
  printf '[pass] %s\n' "$1"
}

warn() {
  printf '[warn] %s\n' "$1" >&2
  warnings=$((warnings + 1))
}

fail() {
  printf '[fail] %s\n' "$1" >&2
  failures=$((failures + 1))
}

cleanup() {
  if [[ -n "$permission_probe" && -e "$permission_probe" ]]; then
    rm -f "$permission_probe"
  fi
}

trap cleanup EXIT

if [[ "$platform" == "Linux" && -n "${WSL_DISTRO_NAME:-}" ]]; then
  is_wsl=true
  pass "Running in WSL Linux (${WSL_DISTRO_NAME})"
elif [[ "$platform" == "Linux" || "$platform" == "Darwin" ]]; then
  pass "Running on supported platform: ${platform}"
else
  fail "Unsupported platform: ${platform}; use macOS or Linux"
fi

if repo_root="$(git rev-parse --show-toplevel 2>/dev/null)"; then
  pass "Git repository found at ${repo_root}"
else
  fail "Run this check from inside the project repository"
fi

if [[ -n "$repo_root" ]]; then
  if $is_wsl && [[ "$repo_root" == /mnt/* ]]; then
    fail "Repository must live on the WSL filesystem, not under /mnt"
  else
    pass "Repository is on the native filesystem"
  fi

  if [[ -w "$repo_root" ]]; then
    permission_probe="$(mktemp "${repo_root}/.permission-check.XXXXXX")"
    pass "Repository is writable by $(id -un)"
  else
    fail "Repository is not writable by $(id -un)"
  fi

  wrong_owner="$(find "$repo_root" -xdev -not -user "$(id -un)" -print -quit 2>/dev/null || true)"
  if [[ -n "$wrong_owner" ]]; then
    fail "Project contains a file not owned by $(id -un): ${wrong_owner}"
  else
    pass "Project ownership is consistent"
  fi
fi

required_commands=(node npm pnpm git rg jq make cc)
for command_name in "${required_commands[@]}"; do
  command_path="$(command -v "$command_name" 2>/dev/null || true)"
  if [[ -z "$command_path" ]]; then
    fail "Missing required command: ${command_name}"
  elif $is_wsl && [[ "$command_path" == /mnt/* ]]; then
    fail "${command_name} resolves through Windows: ${command_path}"
  else
    pass "${command_name} is platform-native: ${command_path}"
  fi
done

if command -v node >/dev/null 2>&1; then
  if node -e '
    const [major, minor] = process.versions.node.split(".").map(Number);
    process.exit(major > 22 || (major === 22 && minor >= 12) ? 0 : 1);
  '; then
    pass "Node $(node --version) satisfies >=22.12.0"
  else
    fail "Node $(node --version) does not satisfy >=22.12.0"
  fi
fi

if command -v node >/dev/null 2>&1 && command -v pnpm >/dev/null 2>&1; then
  expected_pnpm="$(node -p 'require("./package.json").packageManager.split("@").at(-1)')"
  actual_pnpm="$(pnpm --version)"
  if [[ "$actual_pnpm" == "$expected_pnpm" ]]; then
    pass "pnpm ${actual_pnpm} matches package.json"
  else
    fail "pnpm ${actual_pnpm} does not match required ${expected_pnpm}"
  fi
fi

if [[ -d "node_modules/@playwright/test" ]]; then
  browser_path="$(
    node -e '
      const { chromium } = require("@playwright/test");
      process.stdout.write(chromium.executablePath());
    '
  )"
  if [[ -x "$browser_path" ]]; then
    pass "Playwright Chromium is installed: ${browser_path}"
  else
    fail "Playwright Chromium is missing; run pnpm browser:install"
  fi
else
  warn "Project dependencies are not installed; Playwright browser check skipped"
fi

if $is_wsl; then
  if [[ -r /etc/wsl.conf ]] && grep -Eq '^[[:space:]]*appendWindowsPath[[:space:]]*=[[:space:]]*false[[:space:]]*$' /etc/wsl.conf; then
    pass "WSL Windows PATH injection is disabled"
  else
    warn "/etc/wsl.conf does not disable Windows PATH injection"
  fi

  if [[ ":${PATH}:" == *":/mnt/"* ]]; then
    warn "Current shell still contains Windows PATH entries; run wsl.exe --shutdown from Windows"
  fi
fi

if [[ -r "${HOME}/.codex/config.toml" ]]; then
  if grep -Eq '^[[:space:]]*sandbox_mode[[:space:]]*=[[:space:]]*"danger-full-access"' "${HOME}/.codex/config.toml" &&
    grep -Eq '^[[:space:]]*approval_policy[[:space:]]*=[[:space:]]*"never"' "${HOME}/.codex/config.toml"; then
    pass "Codex user defaults request full access without approval prompts"
  else
    warn "Codex user defaults are not configured for full access"
  fi
fi

if $check_network; then
  if curl --fail --silent --show-error --head https://registry.npmjs.org/astro >/dev/null; then
    pass "npm registry is reachable"
  else
    fail "npm registry is not reachable"
  fi
fi

if $check_deploy; then
  if gh auth status >/dev/null 2>&1; then
    pass "GitHub CLI authentication is available"
  else
    fail "GitHub CLI authentication is unavailable"
  fi

  if pnpm exec wrangler whoami >/dev/null 2>&1; then
    pass "Cloudflare Wrangler authentication is available"
  else
    fail "Cloudflare Wrangler authentication is unavailable"
  fi
fi

if ((failures > 0)); then
  printf '\nEnvironment check failed: %d failure(s), %d warning(s).\n' "$failures" "$warnings" >&2
  exit 1
fi

printf '\nEnvironment check passed with %d warning(s).\n' "$warnings"
