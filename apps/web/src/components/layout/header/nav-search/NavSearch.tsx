import {
  AIIcon,
  Badge,
  Button,
  Favorite,
  FlexLayout,
  Input,
  LineChartIcon,
  MagGlassIcon,
  NavigationIcon,
  StackingLayout,
  TextLabel,
  ThemeManager,
  VMIcon,
  AlertIcon,
} from '@nutanix-ui/prism-reactjs'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  INVESTIGATION_QUERY,
  openNivaInvestigation,
} from '~/components/niva-investigation/NivaInvestigationPanel'
import { NAV_SEARCH_RESULTS } from './constants'
import './NavSearch.css'
import type { NavSearchResult } from './types'

const INVESTIGATION_RELATED_LINKS = [
  {
    id: 'cluster-abc-east',
    title: 'Cluster ABC',
    metadata: 'Infrastructure · East-1',
    route: '/vms',
  },
  {
    id: 'cluster-abc-west',
    title: 'Cluster ABC',
    metadata: 'Infrastructure · West-1',
    route: '/vms',
  },
]

const RESEARCH_QUERY_CHANGE_EVENT = 'research-prototype-query-change'
const CONCEPT_PREVIEW_VIEW_RESULTS_EVENT =
  'research-prototype-concept-preview-view-results'

type ResearchVariation = 'v1' | 'v2' | 'v3'

type ResearchPrototypeContext =
  | {
      mode?: 'scenario'
      scenario: 'entity-lookup' | 'investigation' | 'scoped-view'
      variation: ResearchVariation
    }
  | {
      mode: 'concept'
      variation: ResearchVariation
    }

const isResearchScenario = (
  value: unknown,
): value is Extract<ResearchPrototypeContext, { mode?: 'scenario' }>['scenario'] =>
  value === 'entity-lookup' ||
  value === 'investigation' ||
  value === 'scoped-view'

const isResearchVariation = (
  value: unknown,
): value is ResearchVariation =>
  value === 'v1' || value === 'v2' || value === 'v3'

const ENTITY_LOOKUP_RESULTS = [
  {
    id: 'vm-prod-api-05',
    title: 'vm-prod-api-05',
    metadata: 'Infrastructure · West-2',
    route: '/vms',
  },
  {
    id: 'vm-prod-batch-09',
    title: 'vm-prod-batch-09',
    metadata: 'Infrastructure · East-1',
    route: '/vms',
  },
  {
    id: 'vm-prod-cache-03',
    title: 'vm-prod-cache-03',
    metadata: 'Infrastructure · West-2',
    route: '/vms',
  },
  {
    id: 'vm-prod-db-01',
    title: 'vm-prod-db-01',
    metadata: 'Infrastructure · East-1',
    route: '/vms',
  },
  {
    id: 'vm-prod-jobs-11',
    title: 'vm-prod-jobs-11',
    metadata: 'Infrastructure · West-2',
    route: '/vms',
  },
  {
    id: 'vm-prod-queue-04',
    title: 'vm-prod-queue-04',
    metadata: 'Infrastructure · East-1',
    route: '/vms',
  },
  {
    id: 'vm-prod-report-12',
    title: 'vm-prod-report-12',
    metadata: 'Infrastructure · West-2',
    route: '/vms',
  },
  {
    id: 'vm-prod-search-08',
    title: 'vm-prod-search-08',
    metadata: 'Infrastructure · East-1',
    route: '/vms',
  },
  {
    id: 'vm-prod-web-01',
    title: 'vm-prod-web-01',
    metadata: 'Infrastructure · East-1',
    route: '/vms',
  },
  {
    id: 'vm-prod-web-02',
    title: 'vm-prod-web-02',
    metadata: 'Infrastructure · East-1',
    route: '/vms',
  },
  {
    id: 'vm-prod-worker-07',
    title: 'vm-prod-worker-07',
    metadata: 'Infrastructure · East-1',
    route: '/vms',
  },
  {
    id: 'vm-prod-worker-10',
    title: 'vm-prod-worker-10',
    metadata: 'Infrastructure · West-2',
    route: '/vms',
  },
]

const SCOPED_VIEW_QUERY = 'CPU alerts in Cluster ABC'

const SCOPED_VIEW_RESULTS = [
  {
    id: 'cluster-abc',
    title: 'Cluster ABC',
    metadata: 'Infrastructure · East-1',
    route: '/vms',
    icon: 'cluster',
  },
  {
    id: 'cluster-abc-alerts',
    title: 'Cluster ABC › Alerts',
    metadata: 'Infrastructure · East-1',
    route: '/vms',
    icon: 'scoped',
  },
  {
    id: 'alerts',
    title: 'Alerts',
    metadata: 'Monitoring · Alerts',
    route: '/vms',
    icon: 'alert',
  },
]

const CONCEPT_PREVIEW_RESULTS = [
  {
    id: 'concept-result-a',
    title: 'Matching result A',
    metadata: 'Result type · Context',
  },
  {
    id: 'concept-result-b',
    title: 'Matching result B',
    metadata: 'Result type · Context',
  },
  {
    id: 'concept-result-c',
    title: 'Matching result C',
    metadata: 'Result type · Context',
  },
  {
    id: 'concept-result-d',
    title: 'Matching result D',
    metadata: 'Result type · Context',
  },
  {
    id: 'concept-result-e',
    title: 'Matching result E',
    metadata: 'Result type · Context',
  },
]

const getScopedSearchIcon = (icon: string) => {
  if (icon === 'cluster') {
    return NavigationIcon
  }

  if (icon === 'alert') {
    return AlertIcon
  }

  if (icon === 'metrics') {
    return LineChartIcon
  }

  return NavigationIcon
}

const getResearchQuery = (context: ResearchPrototypeContext) => {
  if (context.mode === 'concept') {
    return '[search query]'
  }

  if (context.scenario === 'entity-lookup') {
    return 'vm-prod'
  }

  if (context.scenario === 'scoped-view') {
    return SCOPED_VIEW_QUERY
  }

  return INVESTIGATION_QUERY
}

export const NavSearch = () => {
  const navigate = useNavigate()
  const locationState = useLocation({
    select: (location) => {
      const search = location.search as {
        q?: unknown
        scenario?: unknown
        variation?: unknown
      }
      const scenario = isResearchScenario(search.scenario)
        ? search.scenario
        : undefined
      const variation = isResearchVariation(search.variation)
        ? search.variation
        : undefined

      return {
        pathname: location.pathname,
        query: typeof search.q === 'string' ? search.q : undefined,
        scenario,
        variation,
      }
    },
  })
  const routeResearchContext =
    locationState.scenario && locationState.variation
      ? {
          scenario: locationState.scenario,
          variation: locationState.variation,
        }
      : undefined
  const [researchContext, setResearchContext] = useState<
    ResearchPrototypeContext | undefined
  >(
    locationState.pathname === '/' ||
      locationState.pathname === '/research-prototype' ||
      locationState.pathname === '/research-prototype-results'
      ? (routeResearchContext ?? { scenario: 'entity-lookup', variation: 'v1' })
      : undefined,
  )
  const isResearchPrototype =
    locationState.pathname === '/' ||
    locationState.pathname === '/research-prototype' ||
    locationState.pathname === '/research-prototype-results'
  const shouldShowRouteQuery =
    locationState.pathname === '/search-results-v1-fully-separate' ||
    locationState.pathname === '/niva-chat'
  const routeQuery = locationState.query ?? INVESTIGATION_QUERY
  const [searchValue, setSearchValue] = useState(
    shouldShowRouteQuery ? routeQuery : '',
  )
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<ResearchPrototypeContext>).detail

      setResearchContext(detail)
      setSearchValue(getResearchQuery(detail))
      setShowDropdown(false)
    }

    globalThis.addEventListener(RESEARCH_QUERY_CHANGE_EVENT, listener)

    return () => {
      globalThis.removeEventListener(RESEARCH_QUERY_CHANGE_EVENT, listener)
    }
  }, [])

  useEffect(() => {
    if (!isResearchPrototype) {
      setResearchContext(undefined)
    }
  }, [isResearchPrototype])

  useEffect(() => {
    if (shouldShowRouteQuery) {
      setSearchValue(routeQuery)
      return
    }

    setSearchValue('')
  }, [routeQuery, shouldShowRouteQuery])

  // Filter results based on search value
  const filteredResults = searchValue
    ? NAV_SEARCH_RESULTS.filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.category.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : NAV_SEARCH_RESULTS

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    setShowDropdown(value.length > 0)
  }

  const handleResultClick = (result: NavSearchResult) => {
    setSearchValue(result.title)
    setShowDropdown(false)
    // Navigate to the route
    navigate({ to: result.route })
  }

  const handleRelatedLinkClick = (route: string) => {
    setShowDropdown(false)
    navigate({ to: route })
  }

  const handleAskNiva = () => {
    setShowDropdown(false)
    openNivaInvestigation(searchValue || INVESTIGATION_QUERY)
  }

  const handleViewAllResults = () => {
    setShowDropdown(false)
    if (isResearchPrototype && researchContext?.mode === 'concept') {
      globalThis.dispatchEvent(
        new CustomEvent(CONCEPT_PREVIEW_VIEW_RESULTS_EVENT, {
          detail: {
            variation: researchContext.variation,
          },
        }),
      )
      return
    }

    if (isResearchPrototype && researchContext) {
      if (researchContext.mode === 'concept') {
        return
      }

      navigate({
        to: '/research-prototype-results',
        search: {
          scenario: researchContext.scenario,
          variation: researchContext.variation,
        },
      })
      return
    }

    navigate({
      to: '/search-results-v1-fully-separate',
      search: {
        q: searchValue || INVESTIGATION_QUERY,
      },
    })
  }

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && showDropdown) {
      if (shouldShowEntityLookupPanel) {
        handleViewAllResults()
        return
      }

      handleViewAllResults()
    }
  }

  const handleBlur = () => {
    // Delay to allow click events to fire
    setTimeout(() => setShowDropdown(false), 200)
  }

  const normalizedSearchValue = searchValue.toLowerCase()
  const shouldShowInvestigationPanel =
    searchValue.length > 0 &&
    researchContext?.mode !== 'concept' &&
    ((!isResearchPrototype &&
      INVESTIGATION_QUERY.toLowerCase().includes(normalizedSearchValue)) ||
      normalizedSearchValue.includes('slow') ||
      (!isResearchPrototype && normalizedSearchValue.includes('cluster abc')) ||
      (isResearchPrototype && researchContext?.scenario === 'investigation'))
  const shouldShowEntityLookupPanel =
    isResearchPrototype &&
    researchContext?.mode !== 'concept' &&
    researchContext?.scenario === 'entity-lookup' &&
    searchValue.length > 0
  const shouldShowScopedViewPanel =
    isResearchPrototype &&
    researchContext?.mode !== 'concept' &&
    researchContext?.scenario === 'scoped-view' &&
    searchValue.length > 0
  const shouldShowConceptPreviewPanel =
    isResearchPrototype &&
    researchContext?.mode === 'concept' &&
    searchValue.length > 0

  return (
    <div className="nav-search-container">
      <Input
        className="nav-search"
        background="alt"
        appearance="borderless"
        placeholder="Type to search"
        search
        value={searchValue}
        onChange={handleSearchChange}
        onFocus={() => searchValue && setShowDropdown(true)}
        onClick={() => searchValue && setShowDropdown(true)}
        onKeyDown={handleSearchKeyDown}
        onBlur={handleBlur}
        prefix={
          <MagGlassIcon
            aria-label="Search Icon"
            color={ThemeManager.getVar('gray-2')}
          />
        }
        suffix={
          <Favorite
            aria-label="Favorite Icon"
            appearance={Favorite.APPEARANCE.NAVIGATION}
            checked={false}
          />
        }
      />
      {showDropdown && shouldShowEntityLookupPanel && (
        <div className="search-dropdown">
          <StackingLayout itemGap="none">
            {ENTITY_LOOKUP_RESULTS.slice(0, 6).map((result) => (
              <button
                key={result.id}
                className="search-result-item"
                onClick={() => handleRelatedLinkClick(result.route)}
                type="button"
              >
                <FlexLayout alignItems="center" itemGap="M">
                  <VMIcon aria-hidden={true} className="search-result-icon" />
                  <StackingLayout itemGap="XS">
                    <TextLabel className="search-title">{result.title}</TextLabel>
                    <TextLabel
                      className="search-category"
                      type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
                    >
                      {result.metadata}
                    </TextLabel>
                  </StackingLayout>
                </FlexLayout>
              </button>
            ))}
            <FlexLayout
              className="search-dropdown-footer"
              alignItems="center"
              justifyContent="flex-end"
              itemGap="S"
              padding="15px-20px"
            >
              <Button
                type={Button.ButtonTypes.TEXT_NAVIGATION_SECONDARY}
                onClick={handleViewAllResults}
              >
                View Results
              </Button>
              <Badge
                color={Badge.BadgeColorTypes.GRAY}
                count="Enter"
                type={Badge.BadgeTypes.TAG}
                aria-label="Press enter"
              />
            </FlexLayout>
          </StackingLayout>
        </div>
      )}
      {showDropdown && shouldShowConceptPreviewPanel && (
        <div className="search-dropdown">
          <StackingLayout itemGap="none">
            {CONCEPT_PREVIEW_RESULTS.map((result) => (
              <button
                key={result.id}
                className="search-result-item"
                onClick={handleViewAllResults}
                type="button"
              >
                <FlexLayout alignItems="center" itemGap="M">
                  <VMIcon aria-hidden={true} className="search-result-icon" />
                  <StackingLayout itemGap="XS">
                    <TextLabel className="search-title">{result.title}</TextLabel>
                    <TextLabel
                      className="search-category"
                      type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
                    >
                      {result.metadata}
                    </TextLabel>
                  </StackingLayout>
                </FlexLayout>
              </button>
            ))}
            <FlexLayout
              className="search-dropdown-footer"
              alignItems="center"
              justifyContent={
                researchContext?.variation === 'v1' ? 'space-between' : 'flex-end'
              }
              itemGap="M"
              padding="15px-20px"
            >
              {researchContext?.variation === 'v1' ? (
                <Button
                  type={Button.ButtonTypes.TEXT_NAVIGATION_PRIMARY}
                  onClick={() => {
                    setShowDropdown(false)
                    openNivaInvestigation(searchValue || '[search query]')
                  }}
                >
                  <AIIcon aria-hidden={true} />
                  Ask NIVA
                </Button>
              ) : undefined}
              <FlexLayout alignItems="center" itemGap="S">
                <Button
                  type={Button.ButtonTypes.TEXT_NAVIGATION_SECONDARY}
                  onClick={handleViewAllResults}
                >
                  View Results
                </Button>
                <Badge
                  color={Badge.BadgeColorTypes.GRAY}
                  count="Enter"
                  type={Badge.BadgeTypes.TAG}
                  aria-label="Press enter"
                />
              </FlexLayout>
            </FlexLayout>
          </StackingLayout>
        </div>
      )}
      {showDropdown && shouldShowScopedViewPanel && (
        <div className="search-dropdown">
          <StackingLayout itemGap="none">
            {SCOPED_VIEW_RESULTS.map((result) => (
              (() => {
                const ScopedIcon = getScopedSearchIcon(result.icon)

                return (
                  <button
                    key={result.id}
                    className="search-result-item"
                    onClick={() => handleRelatedLinkClick(result.route)}
                    type="button"
                  >
                    <FlexLayout alignItems="center" itemGap="M">
                      <ScopedIcon aria-hidden={true} className="search-result-icon" />
                      <StackingLayout itemGap="XS">
                        <TextLabel className="search-title">{result.title}</TextLabel>
                        <TextLabel
                          className="search-category"
                          type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
                        >
                          {result.metadata}
                        </TextLabel>
                      </StackingLayout>
                    </FlexLayout>
                  </button>
                )
              })()
            ))}
            <FlexLayout
              className="search-dropdown-footer"
              alignItems="center"
              justifyContent="flex-end"
              itemGap="S"
              padding="15px-20px"
            >
              <Button
                type={Button.ButtonTypes.TEXT_NAVIGATION_SECONDARY}
                onClick={handleViewAllResults}
              >
                View Results
              </Button>
              <Badge
                color={Badge.BadgeColorTypes.GRAY}
                count="Enter"
                type={Badge.BadgeTypes.TAG}
                aria-label="Press enter"
              />
            </FlexLayout>
          </StackingLayout>
        </div>
      )}
      {showDropdown && shouldShowInvestigationPanel && (
        <div className="search-dropdown">
          <StackingLayout itemGap="none">
            {INVESTIGATION_RELATED_LINKS.map((result) => (
              <button
                key={result.id}
                className="search-result-item"
                onClick={() => handleRelatedLinkClick(result.route)}
                type="button"
              >
                <FlexLayout alignItems="center" itemGap="M">
                  <NavigationIcon aria-hidden={true} className="search-result-icon" />
                  <StackingLayout itemGap="XS">
                    <TextLabel className="search-title">{result.title}</TextLabel>
                    <TextLabel
                      className="search-category"
                      type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
                    >
                      {result.metadata}
                    </TextLabel>
                  </StackingLayout>
                </FlexLayout>
              </button>
            ))}
            <FlexLayout
              className="search-dropdown-footer"
              alignItems="center"
              justifyContent="space-between"
              itemGap="M"
              padding="15px-20px"
            >
              <Button
                type={Button.ButtonTypes.TEXT_NAVIGATION_PRIMARY}
                onClick={handleAskNiva}
              >
                <AIIcon aria-hidden={true} />
                Ask NIVA
              </Button>
              <FlexLayout alignItems="center" itemGap="S">
                <Button
                  type={Button.ButtonTypes.TEXT_NAVIGATION_SECONDARY}
                  onClick={handleViewAllResults}
                >
                  View Results
                </Button>
                <Badge
                  color={Badge.BadgeColorTypes.GRAY}
                  count="Enter"
                  type={Badge.BadgeTypes.TAG}
                  aria-label="Press enter"
                />
              </FlexLayout>
            </FlexLayout>
          </StackingLayout>
        </div>
      )}
      {showDropdown &&
        !shouldShowEntityLookupPanel &&
        !shouldShowScopedViewPanel &&
        !shouldShowConceptPreviewPanel &&
        !shouldShowInvestigationPanel &&
        filteredResults.length > 0 && (
          <div className="search-dropdown">
            {filteredResults.map((result) => (
              <button
                key={result.id}
                className="search-result-item"
                onClick={() => handleResultClick(result)}
                type="button"
              >
                <FlexLayout
                  alignItems="center"
                  itemGap="M"
                >
                  <NavigationIcon aria-hidden={true} className="search-result-icon" />
                  <StackingLayout itemGap="XS">
                    <TextLabel className="search-title">{result.title}</TextLabel>
                    <TextLabel
                      className="search-category"
                      type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
                    >
                      {result.category}
                    </TextLabel>
                  </StackingLayout>
                </FlexLayout>
              </button>
            ))}
          </div>
        )}
    </div>
  )
}
