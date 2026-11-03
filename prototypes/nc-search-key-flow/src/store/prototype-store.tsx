import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import type { RecentItem, TopMatchStatus } from '@proto/data/types'

interface PrototypeStore {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  /** Row the participant moved to (keyboard or mouse); null means "use the default row". */
  highlightedId: string | null
  setHighlightedId: Dispatch<SetStateAction<string | null>>
  pointerMode: 'mouse' | 'keyboard'
  setPointerMode: Dispatch<SetStateAction<'mouse' | 'keyboard'>>
  topMatchDelayMs: number
  setTopMatchDelayMs: Dispatch<SetStateAction<number>>
  interpretationDelayMs: number
  setInterpretationDelayMs: Dispatch<SetStateAction<number>>
  nivaDelayMs: number
  setNivaDelayMs: Dispatch<SetStateAction<number>>
  /** Bumped by "Reset to start" so session state outside this store (NIVA) clears too. */
  resetCount: number
  forceTopMatchFail: boolean
  setForceTopMatchFail: Dispatch<SetStateAction<boolean>>
  topMatchStatus: TopMatchStatus
  setTopMatchStatus: Dispatch<SetStateAction<TopMatchStatus>>
  moderatorOpen: boolean
  setModeratorOpen: Dispatch<SetStateAction<boolean>>
  /** Floating bottom-left "Reset" for the moderator. */
  showResetButton: boolean
  setShowResetButton: Dispatch<SetStateAction<boolean>>
  /** Opened from search this session, newest first (empty-state Recent). */
  recents: RecentItem[]
  addRecent: (item: RecentItem) => void
  resetToStart: () => void
}

const MAX_RECENTS = 5
const RECENTS_STORAGE_KEY = 'nc-search-recents'

// A reload mid-session keeps what the participant already searched
const readStoredRecents = (): RecentItem[] => {
  try {
    const stored = globalThis.sessionStorage.getItem(RECENTS_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as RecentItem[]) : []
  } catch {
    return []
  }
}

const recentKey = (item: RecentItem) =>
  item.kind === 'entity'
    ? `entity:${item.entityId}`
    : `query:${item.query.trim().toLowerCase()}`

const PrototypeStoreContext = createContext<PrototypeStore | undefined>(
  undefined,
)

const DEFAULT_DELAY_MS = 1500

export const PrototypeProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const [pointerMode, setPointerMode] = useState<'mouse' | 'keyboard'>('mouse')
  const [topMatchDelayMs, setTopMatchDelayMs] = useState(DEFAULT_DELAY_MS)
  const [interpretationDelayMs, setInterpretationDelayMs] =
    useState(DEFAULT_DELAY_MS)
  const [nivaDelayMs, setNivaDelayMs] = useState(DEFAULT_DELAY_MS)
  const [resetCount, setResetCount] = useState(0)
  const [forceTopMatchFail, setForceTopMatchFail] = useState(false)
  const [topMatchStatus, setTopMatchStatus] = useState<TopMatchStatus>('idle')
  const [moderatorOpen, setModeratorOpen] = useState(false)
  const [showResetButton, setShowResetButton] = useState(true)
  const [recents, setRecents] = useState<RecentItem[]>(readStoredRecents)

  useEffect(() => {
    globalThis.sessionStorage.setItem(
      RECENTS_STORAGE_KEY,
      JSON.stringify(recents),
    )
  }, [recents])

  const addRecent = useCallback((item: RecentItem) => {
    setRecents((current) =>
      [
        item,
        ...current.filter((entry) => recentKey(entry) !== recentKey(item)),
      ].slice(0, MAX_RECENTS),
    )
  }, [])

  const resetToStart = useCallback(() => {
    setRecents([])
    setQuery('')
    setIsOpen(false)
    setHighlightedId(null)
    setPointerMode('mouse')
    setResetCount((count) => count + 1)
    setTopMatchStatus('idle')
    setModeratorOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      query,
      setQuery,
      isOpen,
      setIsOpen,
      highlightedId,
      setHighlightedId,
      pointerMode,
      setPointerMode,
      topMatchDelayMs,
      setTopMatchDelayMs,
      interpretationDelayMs,
      setInterpretationDelayMs,
      nivaDelayMs,
      setNivaDelayMs,
      resetCount,
      forceTopMatchFail,
      setForceTopMatchFail,
      topMatchStatus,
      setTopMatchStatus,
      moderatorOpen,
      setModeratorOpen,
      showResetButton,
      setShowResetButton,
      recents,
      addRecent,
      resetToStart,
    }),
    [
      recents,
      addRecent,
      query,
      isOpen,
      highlightedId,
      pointerMode,
      topMatchDelayMs,
      interpretationDelayMs,
      nivaDelayMs,
      resetCount,
      forceTopMatchFail,
      topMatchStatus,
      moderatorOpen,
      showResetButton,
      resetToStart,
    ],
  )

  return (
    <PrototypeStoreContext.Provider value={value}>
      {children}
    </PrototypeStoreContext.Provider>
  )
}

export const usePrototypeStore = () => {
  const store = useContext(PrototypeStoreContext)
  if (!store) {
    throw new Error('usePrototypeStore must be used within PrototypeProvider')
  }
  return store
}
