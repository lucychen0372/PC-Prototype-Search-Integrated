import type { EntityType, InterpretedFilter } from '@proto/data/types'
import type { ProtoLink } from '@proto/lib/destinations'

/** Plain text with inline links ("6 VMs" opens the Entity Browser). */
export type RichText = Array<string | { text: string; link: ProtoLink }>

export interface NivaEvidence {
  id: string
  type: EntityType
  text: RichText
  linkLabel: string
  link: ProtoLink
}

export type NivaAnswerKind =
  | 'list'
  | 'diagnostic'
  | 'alerts'
  | 'trend'
  | 'move'
  | 'fallback'

export interface NivaAnswer {
  kind: NivaAnswerKind
  /** Shown beside the loader while NIVA "works". */
  thinking: string
  summary: RichText
  /** "From NC data" for answers, "From search" for the fallback. */
  evidenceSource: string
  evidence: NivaEvidence[]
  /** Trend answers: one series drawn with the template sparkline. */
  chart?: {
    title: string
    points: number[]
    startLabel: string
    endLabel: string
  }
  /** Diagnostic answers only; always marked "Not confirmed". */
  inference?: { text: RichText; caption: string }
  steps: string[]
  action?: { label: string; link: ProtoLink }
  followUps: string[]
  /** Carried into follow-ups ("which of these…"). */
  filters?: InterpretedFilter[]
  host?: string
}

export interface NivaContextChip {
  id: string
  label: string
  kind: 'page' | 'entity'
  entityType?: EntityType
  /** Cluster this chip scopes later questions to. */
  clusterName?: string
}

export type NivaMessage =
  | { id: string; role: 'user'; text: string }
  /** A context change ("Removed Cluster ABC from context") that re-answers the latest question. */
  | { id: string; role: 'context'; text: string }
  | {
      id: string
      role: 'assistant'
      status: 'thinking' | 'done'
      answer: NivaAnswer
    }
