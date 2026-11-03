import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useRouterState } from '@tanstack/react-router'
import { CLUSTERS, getEntityById } from '@proto/data/catalog'
import type { CatalogEntity, InterpretedFilter } from '@proto/data/types'
import { answerQuestion, mentionedEntities } from '@proto/lib/niva/answers'
import { findClusterName, parseConditions } from '@proto/lib/query-interpreter'
import type {
  NivaAnswer,
  NivaContextChip,
  NivaMessage,
} from '@proto/lib/niva/types'
import { usePrototypeStore } from './prototype-store'

interface NivaStore {
  open: boolean
  messages: NivaMessage[]
  /** Entities named in the conversation; the current page chip is derived from the route. */
  context: NivaContextChip[]
  pageChipRemoved: boolean
  /** Changes whenever the composer should take focus. */
  focusToken: number
  /** Opens the panel; with a question it is sent, without one the composer is focused. */
  openNiva: (question?: string) => void
  /** `about` is the answer a follow-up chip belongs to ("these" = its VMs); defaults to the latest. */
  ask: (question: string, about?: NivaAnswer) => void
  close: () => void
  /** Removing or adding a cluster re-answers the latest question for the new scope. */
  removeContext: (id: string) => void
  addContext: (entity: CatalogEntity) => void
}

const NivaStoreContext = createContext<NivaStore | undefined>(undefined)

let messageSeq = 0
const nextId = () => {
  messageSeq += 1
  return `niva-${messageSeq}`
}

const latestAnswer = (messages: NivaMessage[]): NivaAnswer | undefined => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index]
    if (message?.role === 'assistant') return message.answer
  }
  return undefined
}

const clusterNamed = (name?: string) =>
  name
    ? CLUSTERS.find(
        (cluster) => cluster.name.toLowerCase() === name.toLowerCase(),
      )
    : undefined

/** The cluster the current page is about: its own page, or the one in the page's filters / query. */
const usePageClusterId = () =>
  useRouterState({
    select: (state) => {
      const { pathname } = state.location
      const search = state.location.search as {
        q?: string
        f?: InterpretedFilter[]
      }
      const [, section, id = ''] = pathname.split('/')
      if (section === 'clusters') return getEntityById(id)?.id
      if (pathname === '/vms') {
        const filters = search.f ?? parseConditions(search.q ?? '')
        const named = filters.find((filter) => filter.attribute === 'cluster')
        return named ? clusterNamed(String(named.value))?.id : undefined
      }
      if (pathname === '/search') {
        return clusterNamed(findClusterName(search.q ?? ''))?.id
      }
      return
    },
  })

const entityChip = (entity: CatalogEntity): NivaContextChip => ({
  id: entity.id,
  label: entity.name,
  kind: 'entity',
  entityType: entity.type,
  clusterName: entity.type === 'cluster' ? entity.name : entity.clusterName,
})

const withEntities = (
  context: NivaContextChip[],
  entities: CatalogEntity[],
) => {
  const known = new Set(context.map((chip) => chip.id))
  return [
    ...context,
    ...entities
      .filter((entity) => !known.has(entity.id))
      .map((entity) => entityChip(entity)),
  ]
}

/** The cluster later answers are about: the newest cluster chip, else the newest entity's cluster. */
const scopeOf = (context: NivaContextChip[]) =>
  (
    context.findLast((chip) => chip.entityType === 'cluster') ??
    context.findLast((chip) => chip.clusterName)
  )?.clusterName

const latestQuestion = (messages: NivaMessage[]) =>
  messages.findLast((message) => message.role === 'user')?.text

const entitiesFor = (id?: string) => {
  const entity = id ? getEntityById(id) : undefined
  return entity ? [entity] : []
}

export const NivaProvider = ({ children }: { children: ReactNode }) => {
  const { nivaDelayMs, resetCount } = usePrototypeStore()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<NivaMessage[]>([])
  const [context, setContext] = useState<NivaContextChip[]>([])
  const [pageChipRemoved, setPageChipRemoved] = useState(false)
  const [focusToken, setFocusToken] = useState(0)
  const messagesRef = useRef(messages)
  messagesRef.current = messages
  const contextRef = useRef(context)
  contextRef.current = context
  const delayRef = useRef(nivaDelayMs)
  delayRef.current = nivaDelayMs
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([])
  const pageClusterId = usePageClusterId()
  const pageClusterRef = useRef(pageClusterId)
  pageClusterRef.current = pageClusterId
  // Chips the participant removed stay off until they add them or name them again
  const dismissed = useRef(new Set<string>())

  const pageEntities = () =>
    entitiesFor(pageClusterRef.current).filter(
      (entity) => !dismissed.current.has(entity.id),
    )

  const pushAnswer = useCallback((lead: NivaMessage, answer: NivaAnswer) => {
    const assistantId = nextId()
    const delay = delayRef.current
    setMessages((current) => [
      ...current,
      lead,
      {
        id: assistantId,
        role: 'assistant',
        status: delay > 0 ? 'thinking' : 'done',
        answer,
      },
    ])
    if (delay > 0) {
      const timer = globalThis.setTimeout(() => {
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId && message.role === 'assistant'
              ? { ...message, status: 'done' }
              : message,
          ),
        )
      }, delay)
      timers.current.push(timer)
    }
  }, [])

  const ask = useCallback(
    (rawQuestion: string, about?: NivaAnswer) => {
      const question = rawQuestion.trim()
      if (!question) return
      setOpen(true)

      const mentioned = mentionedEntities(question)
      for (const entity of mentioned) dismissed.current.delete(entity.id)
      const nextContext = withEntities(contextRef.current, [
        ...pageEntities(),
        ...mentioned,
      ])
      const answer = answerQuestion(question, {
        cluster: scopeOf(nextContext),
        previous: about ?? latestAnswer(messagesRef.current),
      })
      contextRef.current = nextContext
      setContext(nextContext)
      pushAnswer({ id: nextId(), role: 'user', text: question }, answer)
    },
    [pushAnswer],
  )

  const changeContext = useCallback(
    (nextContext: NivaContextChip[], note: string) => {
      const scopeChanged = scopeOf(nextContext) !== scopeOf(contextRef.current)
      contextRef.current = nextContext
      setContext(nextContext)
      const question = latestQuestion(messagesRef.current)
      if (!question || !scopeChanged) return
      pushAnswer(
        { id: nextId(), role: 'context', text: note },
        answerQuestion(question, {
          cluster: scopeOf(nextContext),
          scoped: true,
        }),
      )
    },
    [pushAnswer],
  )

  const openNiva = useCallback(
    (question?: string) => {
      setOpen(true)
      setPageChipRemoved(false)
      if (question?.trim()) {
        ask(question)
      } else {
        contextRef.current = withEntities(contextRef.current, pageEntities())
        setContext(contextRef.current)
        setFocusToken((token) => token + 1)
      }
    },
    [ask],
  )

  const close = useCallback(() => setOpen(false), [])

  const removeContext = useCallback(
    (id: string) => {
      if (id === 'page') {
        setPageChipRemoved(true)
        return
      }
      const chip = contextRef.current.find((item) => item.id === id)
      if (!chip) return
      dismissed.current.add(id)
      changeContext(
        contextRef.current.filter((item) => item.id !== id),
        `Removed ${chip.label} from context`,
      )
    },
    [changeContext],
  )

  const addContext = useCallback(
    (entity: CatalogEntity) => {
      dismissed.current.delete(entity.id)
      changeContext(
        withEntities(contextRef.current, [entity]),
        `Added ${entity.name} to context`,
      )
    },
    [changeContext],
  )

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    for (const timer of timers.current) globalThis.clearTimeout(timer)
    timers.current = []
    setOpen(false)
    setMessages([])
    setContext([])
    dismissed.current.clear()
    setPageChipRemoved(false)
  }, [resetCount])

  useEffect(
    () => () => {
      for (const timer of timers.current) globalThis.clearTimeout(timer)
    },
    [],
  )

  const value = useMemo(
    () => ({
      open,
      messages,
      context,
      pageChipRemoved,
      focusToken,
      openNiva,
      ask,
      close,
      removeContext,
      addContext,
    }),
    [
      open,
      messages,
      context,
      pageChipRemoved,
      focusToken,
      openNiva,
      ask,
      close,
      removeContext,
      addContext,
    ],
  )

  return (
    <NivaStoreContext.Provider value={value}>
      {children}
    </NivaStoreContext.Provider>
  )
}

export const useNiva = () => {
  const store = useContext(NivaStoreContext)
  if (!store) throw new Error('useNiva must be used within NivaProvider')
  return store
}
