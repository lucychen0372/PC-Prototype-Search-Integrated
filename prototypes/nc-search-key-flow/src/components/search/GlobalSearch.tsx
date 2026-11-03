import {
  Dropdown,
  FlexLayout,
  Input,
  MagGlassIcon,
  Menu,
  MenuGroup,
  VerticalSeparator,
} from '@nutanix-ui/prism-reactjs'
import {
  useEffect,
  useMemo,
  useRef,
  type ChangeEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from 'react'
import type { DisplayRow, SelectableRow } from '@proto/data/types'
import {
  buildSearchModel,
  classifyQuery,
  topMatchLoads,
} from '@proto/lib/search-engine'
import { useOpenQuery } from './use-run-search'
import { useOpenLink } from '@proto/lib/destinations'
import { useNiva } from '@proto/store/niva-store'
import { usePrototypeStore } from '@proto/store/prototype-store'
import { KeyboardHintBar } from './KeyboardHintBar'
import { ScopeSwitcher } from './ScopeSwitcher'
import { SearchResultRow } from './SearchResultRow'
import './GlobalSearch.css'

export const GlobalSearch = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const openLink = useOpenLink()
  const { openNiva } = useNiva()
  const {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    highlightedId,
    setHighlightedId,
    pointerMode,
    setPointerMode,
    topMatchDelayMs,
    forceTopMatchFail,
    topMatchStatus,
    setTopMatchStatus,
    recents,
    addRecent,
  } = usePrototypeStore()

  const intent = classifyQuery(query)

  useEffect(() => {
    if (!isOpen || !topMatchLoads(intent)) {
      setTopMatchStatus('idle')
      return
    }

    setTopMatchStatus('loading')
    const timer = globalThis.setTimeout(() => {
      setTopMatchStatus(forceTopMatchFail ? 'failed' : 'ready')
    }, topMatchDelayMs)

    return () => globalThis.clearTimeout(timer)
  }, [
    query,
    intent,
    isOpen,
    topMatchDelayMs,
    forceTopMatchFail,
    setTopMatchStatus,
  ])

  const model = useMemo(
    () => buildSearchModel(query, topMatchStatus, recents),
    [query, topMatchStatus, recents],
  )

  // A new query forgets where the participant moved
  useEffect(() => {
    setHighlightedId(null)
  }, [query, setHighlightedId])

  // Until the participant moves, the model's default (See all) is highlighted
  const activeId =
    highlightedId && model.selectable.some((row) => row.id === highlightedId)
      ? highlightedId
      : (model.defaultId ?? null)
  const highlightedIndex = model.selectable.findIndex(
    (row) => row.id === activeId,
  )

  const selectableIndexById = useMemo(() => {
    const map = new Map<string, number>()
    for (const [index, row] of model.selectable.entries()) {
      map.set(row.id, index)
    }
    return map
  }, [model.selectable])

  const openSearch = () => {
    setIsOpen(true)
  }

  // Focus already opened the popup; the Dropdown trigger's click toggle would close it again
  const handleInputClick = (event: MouseEvent) => {
    event.stopPropagation()
    setIsOpen(true)
  }

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setIsOpen(true)
  }

  const openQuery = useOpenQuery()

  const handleActivate = (row: SelectableRow) => {
    // A recent query goes back into the field so the participant can run or edit it
    if (row.kind === 'recent-query') {
      setQuery(row.query)
      setIsOpen(true)
      requestAnimationFrame(() => inputRef.current?.focus())
      return
    }
    setIsOpen(false)
    setQuery('')
    inputRef.current?.blur()
    switch (row.kind) {
      case 'top-match-filter': {
        openQuery(
          row.query,
          row.destination === 'grouped-results' ? 'grouped-results' : 'vm-list',
        )
        return
      }
      case 'see-all': {
        openQuery(row.query, 'results')
        return
      }
      case 'ask-niva': {
        openNiva(row.query)
        return
      }
      case 'entity': {
        addRecent({ kind: 'entity', entityId: row.entity.id })
        openLink({ kind: 'entity', entity: row.entity })
      }
    }
  }

  const moveHighlight = (step: 1 | -1) => {
    const count = model.selectable.length
    if (count === 0) return
    // The first ArrowDown lands on the top entry, the first ArrowUp on the last
    const nextIndex =
      highlightedIndex === -1 || !highlightedId
        ? step === 1
          ? 0
          : count - 1
        : (highlightedIndex + step + count) % count
    const next = model.selectable[nextIndex]
    setHighlightedId(next?.id ?? null)
  }

  const handleRowSelect = (row: DisplayRow) => {
    const selectable = model.selectable.find((item) => item.id === row.id)
    if (selectable) {
      handleActivate(selectable)
    }
  }

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    // Prism Dropdown treats Space as a toggle key and preventDefaults it
    if (event.key === ' ') {
      event.stopPropagation()
      return
    }

    if (!isOpen && ['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
      setIsOpen(true)
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setPointerMode('keyboard')
      setIsOpen(true)
      moveHighlight(1)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setPointerMode('keyboard')
      setIsOpen(true)
      moveHighlight(-1)
      return
    }

    if (event.key === 'Enter' && isOpen) {
      event.preventDefault()
      const row = model.selectable[highlightedIndex]
      if (row) {
        handleActivate(row)
      } else if (query.trim()) {
        handleActivate({
          id: 'enter-default',
          kind: 'see-all',
          query: query.trim(),
          count: 0,
        })
      }
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
      return
    }

    // Once there is text, "?" is part of a question-style query, not the shortcut
    if (event.key === '?' && isOpen && !query) {
      event.preventDefault()
      const askRow = model.selectable.find((row) => row.kind === 'ask-niva')
      if (askRow) {
        handleActivate(askRow)
      }
    }
  }

  const handleRowMouseEnter = (index: number) => {
    if (pointerMode === 'mouse') {
      setHighlightedId(model.selectable[index]?.id ?? null)
    }
  }

  const popup = (
    <FlexLayout flexDirection="column" itemGap="none" className="search-popup">
      <Menu className="search-menu">
        {model.sections.map((section) => {
          const items = section.rows.map((row) => {
            const selectableIndex = selectableIndexById.get(row.id) ?? null
            return (
              <SearchResultRow
                key={row.id}
                row={row}
                query={query}
                active={
                  selectableIndex !== null &&
                  selectableIndex === highlightedIndex
                }
                isEnterDefault={highlightedIndex === -1}
                selectableIndex={selectableIndex}
                onMouseEnter={handleRowMouseEnter}
                onSelect={handleRowSelect}
              />
            )
          })

          if (section.title) {
            return (
              <MenuGroup key={section.id} title={section.title}>
                {items}
              </MenuGroup>
            )
          }

          return items
        })}
      </Menu>
      <KeyboardHintBar />
    </FlexLayout>
  )

  return (
    <Dropdown
      popupVisible={isOpen}
      onPopupVisibleChange={setIsOpen}
      popup={popup}
      popupPlacement="bottomLeft"
      popupOffset={{ y: '-8px' }}
      /*
       * Portal to body so MainPageLayout overflow:hidden
       * (apps/web/src/styles/index.css + MainPageLayout.css) cannot clip "Recent".
       * Light popup theme comes from default Dropdown (not NAVIGATION).
       */
      getPopupContainer={() => document.body}
      focusOnOpen={false}
      disableKeyboardNavigation
      popupClassName="search-dropdown-popup"
    >
      <FlexLayout
        alignItems="center"
        itemGap="S"
        padding="0px-10px"
        className="search-combo"
        onMouseMove={() => setPointerMode('mouse')}
      >
        <MagGlassIcon aria-label="Search" />
        <ScopeSwitcher />
        <VerticalSeparator
          appearance={VerticalSeparator.VerticalSeparatorAppearance.NAVIGATION}
        />
        <Input
          inputRef={inputRef}
          className="search-input"
          appearance="borderless"
          background="alt"
          placeholder="Search entities and pages"
          value={query}
          onChange={handleQueryChange}
          onFocus={openSearch}
          onClick={handleInputClick}
          onKeyDown={handleInputKeyDown}
          aria-label="Global search"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />
      </FlexLayout>
    </Dropdown>
  )
}
