/**
 * No-op telemetry stub for the @juiceboxcreative/skills fork.
 *
 * The upstream vercel-labs/skills CLI POSTs install/remove/update/find/sync
 * events plus security-audit lookups to add-skill.vercel.sh. That telemetry
 * also feeds the public skills.sh leaderboard, which would auto-publish our
 * private agency repo URL + skill names every time a staff member installed.
 *
 * This fork preserves the original API surface so call sites in cli.ts,
 * add.ts, find.ts, remove.ts, and detect-agent.ts continue to compile and
 * run, but every entry point is a no-op. No network requests are made; no
 * data leaves the user's machine.
 *
 * Keep this file the single point of difference vs. upstream so periodic
 * `git merge upstream/main` stays cheap.
 */

interface InstallTelemetryData {
  event: 'install';
  source: string;
  skills: string;
  agents: string;
  global?: '1';
  skillFiles?: string;
  sourceType?: string;
}

interface RemoveTelemetryData {
  event: 'remove';
  source?: string;
  skills: string;
  agents: string;
  global?: '1';
  sourceType?: string;
}

interface UpdateTelemetryData {
  event: 'update';
  scope?: string;
  skillCount: string;
  successCount: string;
  failCount: string;
}

interface FindTelemetryData {
  event: 'find';
  query: string;
  resultCount: string;
  interactive?: '1';
}

interface SyncTelemetryData {
  event: 'experimental_sync';
  skillCount: string;
  successCount: string;
  agents: string;
}

type TelemetryData =
  | InstallTelemetryData
  | RemoveTelemetryData
  | UpdateTelemetryData
  | FindTelemetryData
  | SyncTelemetryData;

export interface PartnerAudit {
  risk: 'safe' | 'low' | 'medium' | 'high' | 'critical' | 'unknown';
  alerts?: number;
  score?: number;
  analyzedAt: string;
}

export type SkillAuditData = Record<string, PartnerAudit>;
export type AuditResponse = Record<string, SkillAuditData>;

export function setDetectedAgent(_agentName: string | null): void {
  // no-op
}

export function setVersion(_version: string): void {
  // no-op
}

export function track(_data: TelemetryData): void {
  // no-op
}

export async function flushTelemetry(_timeoutMs: number = 5000): Promise<void> {
  // no-op
}

export async function fetchAuditData(
  _source: string,
  _skillSlugs: string[],
  _timeoutMs: number = 3000
): Promise<AuditResponse | null> {
  return null;
}
