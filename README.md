# @juiceboxcreative/skills

The Juicebox install CLI for [`JuiceboxCreative/skills`](https://github.com/JuiceboxCreative/skills) — a thin fork of [`vercel-labs/skills`](https://github.com/vercel-labs/skills) with telemetry stripped.

> **Fork policy.** Identical to upstream except `src/telemetry.ts` is replaced with a no-op stub. Removes phone-home to `add-skill.vercel.sh/t` (install/remove/update/find events) and `add-skill.vercel.sh/audit` (security-audit lookup). Stops auto-publication of agency repo URLs and skill names to the public skills.sh leaderboard. No proprietary changes — pull upstream periodically with `git fetch upstream && git merge upstream/main`; only `src/telemetry.ts`, `package.json`, and this README should ever conflict.

---

## Install a skill

The canonical install command for any Juicebox skill:

```bash
npx @juiceboxcreative/skills@latest add JuiceboxCreative/skills --skill <slug> -g
```

`-g` writes the skill to your **global** agent config (e.g. `~/.claude/skills/<slug>/`). Drop the `-g` to install into the current project at `./.claude/skills/<slug>/`.

### Examples

```bash
# Install one skill globally; the CLI auto-detects which agents you have
npx @juiceboxcreative/skills@latest add JuiceboxCreative/skills --skill seo-audit -g

# Install for Cursor + Codex instead of Claude Code
npx @juiceboxcreative/skills@latest add JuiceboxCreative/skills --skill seo-audit -g -a cursor -a codex

# List every skill in the repo without installing
npx @juiceboxcreative/skills@latest add JuiceboxCreative/skills --list

# Install several skills at once
npx @juiceboxcreative/skills@latest add JuiceboxCreative/skills \
  --skill meeting-agenda \
  --skill jira-ticket-standard \
  --skill change-request \
  -g

# Install absolutely every skill in the repo (rare; usually overkill)
npx @juiceboxcreative/skills@latest add JuiceboxCreative/skills --skill '*' -g

# Non-interactive (CI-friendly): skip every confirmation prompt
npx @juiceboxcreative/skills@latest add JuiceboxCreative/skills --skill seo-audit -g -a claude-code -y
```

The CLI also accepts other source formats (GitHub URLs, GitLab URLs, raw git URLs, local paths) — see `npx @juiceboxcreative/skills@latest add --help` for the full list.

## Install scope

| Scope         | Flag        | Where it goes                  | When to use                                 |
| ------------- | ----------- | ------------------------------ | ------------------------------------------- |
| **Global**    | `-g`        | `~/<agent>/skills/<slug>/`     | Available across every project on your machine. The default for most Juicebox use. |
| **Project**   | *(default)* | `./<agent>/skills/<slug>/`     | Commit alongside the project; teammates pick it up via `git clone`. |

## Multi-agent install

By default the CLI walks every agent it finds installed locally (Claude Code, Cursor, Codex, OpenCode, Gemini CLI, and ~50 more). To target a specific subset, use `-a <agent>` one or more times:

```bash
# Just Claude Code
npx @juiceboxcreative/skills@latest add JuiceboxCreative/skills --skill seo-audit -g -a claude-code

# Cursor + Codex
npx @juiceboxcreative/skills@latest add JuiceboxCreative/skills --skill seo-audit -g -a cursor -a codex

# Every supported agent (rarely needed)
npx @juiceboxcreative/skills@latest add JuiceboxCreative/skills --skill seo-audit -g -a '*'
```

## Common commands

| Command                                                | What it does                                  |
| ------------------------------------------------------ | --------------------------------------------- |
| `npx @juiceboxcreative/skills@latest add <source>`            | Install one or more skills                    |
| `npx @juiceboxcreative/skills@latest list`                    | List installed skills (alias: `ls`)           |
| `npx @juiceboxcreative/skills@latest update [slug]`           | Update installed skills to the latest version |
| `npx @juiceboxcreative/skills@latest remove [slug]`           | Remove installed skills (alias: `rm`)         |
| `npx @juiceboxcreative/skills@latest find [query]`            | Search installable skills interactively       |
| `npx @juiceboxcreative/skills@latest init [name]`             | Scaffold a new local `SKILL.md` template      |

Every command accepts `--help` for the full option list.

### Update everything you've installed

```bash
# Interactive — picks the right scope and confirms each update
npx @juiceboxcreative/skills@latest update

# Update one skill by name
npx @juiceboxcreative/skills@latest update seo-audit

# Update all global skills, no prompts
npx @juiceboxcreative/skills@latest update -g -y
```

### Remove a skill

```bash
# Remove from global scope
npx @juiceboxcreative/skills@latest remove seo-audit -g

# Remove from a specific agent only
npx @juiceboxcreative/skills@latest remove seo-audit -a cursor

# Wipe everything (asks for confirmation)
npx @juiceboxcreative/skills@latest remove --all
```

## Add a new skill to the Juicebox library

You don't add skills through this CLI. Skills live in [`JuiceboxCreative/skills`](https://github.com/JuiceboxCreative/skills):

1. Branch the skills repo.
2. Add your `SKILL.md` (and any sidecar `references/` / `assets/` / `scripts/`) under the right category folder.
3. Open a PR. CI lints the frontmatter; reviewers check the body.
4. Merge to `main`. The webhook syncs the new skill into [skills-web](https://skills.juicebox.com.au) within seconds.

Read [`JuiceboxCreative/skills` → README](https://github.com/JuiceboxCreative/skills#readme) for the slug rules, frontmatter reference, and the directory layout convention.

## Maintaining the fork

This repo is a thin layer over upstream. Keep that layer thin.

```bash
# One-time setup
git remote add upstream https://github.com/vercel-labs/skills.git

# Periodic upstream pull
git fetch upstream
git checkout main
git merge upstream/main
# Resolve any conflicts. The only files that should ever conflict are:
#   - src/telemetry.ts   (we want the no-op stub)
#   - package.json       (we want the @juiceboxcreative/skills name)
#   - README.md          (this file)
```

After a successful merge, bump the version and publish:

```bash
pnpm install
pnpm test          # if there are any local tests
pnpm publish --access public
```

## Why a fork

Upstream `vercel-labs/skills` pings `add-skill.vercel.sh/t` on every install/remove/update/find, sending the source repo URL and the skill name. For a private library like ours, that leaks both the repo URL and the names of the skills we ship. The fork swaps the telemetry module for a no-op stub so nothing leaves the user's machine.

## Useful links

- npm package: <https://www.npmjs.com/package/@juiceboxcreative/skills>
- Skills repo: <https://github.com/JuiceboxCreative/skills>
- Web directory (internal): <https://skills.juicebox.com.au>
- Upstream project: <https://github.com/vercel-labs/skills>
- Anthropic skills format reference: <https://code.claude.com/docs/en/skills>

## Licence

MIT, mirroring upstream. See `LICENSE` and `ThirdPartyNoticeText.txt`.
