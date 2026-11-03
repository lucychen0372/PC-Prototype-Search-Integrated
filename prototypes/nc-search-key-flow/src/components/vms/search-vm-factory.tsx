import { COMPONENT_IDS, connect } from '@nutanix-ui/ebr-ui'
import { FlexLayout, Loader, TextLabel, Title } from '@nutanix-ui/prism-reactjs'
import type { ComponentType, ReactNode } from 'react'
import { vmFactory } from '~/components/vms/factory'
import { EBRComponentFactory } from '~/lib/ebr-utils'
import type { EBRComponentFactoryLike, EBRFilterParser } from '~/types/ebr'
import { vmsMatching } from '@proto/lib/nc-data'
import { InterpretationPanel } from './InterpretationPanel'
import { useInterpretation } from './interpretation-context'

interface VizTitleOptions {
  uqdcData?: { totalEntities?: number; filteredEntities?: number }
}

interface EbrTitleState {
  ebState?: { loadingState?: string }
  ebSelections?: {
    selections?: Record<
      string,
      { visibleSelectedEntities?: unknown[]; isSelectAllMode?: boolean }
    >
  }
  ebFilters?: Record<string, Record<string, unknown>>
}

const hasCheckedFilters = (filters: Record<string, unknown> = {}) =>
  Object.values(filters).some(
    (conditions) =>
      Array.isArray(conditions) &&
      conditions.some((condition: { isChecked?: boolean } | undefined) =>
        Boolean(condition?.isChecked),
      ),
  )

const mapTitleState = (state: EbrTitleState) => ({
  isLoading: state.ebState?.loadingState === 'pending',
  hasSelection: Object.values(state.ebSelections?.selections ?? {}).some(
    (selection) =>
      Boolean(selection.isSelectAllMode) ||
      (selection.visibleSelectedEntities?.length ?? 0) > 0,
  ),
  hasFilters: hasCheckedFilters(state.ebFilters?.vm),
})

interface CountTitleProps extends ReturnType<typeof mapTitleState> {
  options: VizTitleOptions
  fallback: ReactNode
}

/** Wireframe count line: "X of Y VMs", plus "Filters arriving…" while interpreting. */
const CountTitleView = ({
  options,
  fallback,
  isLoading,
  hasSelection,
  hasFilters,
}: CountTitleProps) => {
  const { phase, scopeFilters } = useInterpretation()
  // The groups API counts its total before the scope's raw filter
  const total = scopeFilters
    ? vmsMatching(scopeFilters).length
    : options.uqdcData?.totalEntities
  const filtered = options.uqdcData?.filteredEntities ?? total

  // Selection messages ("2 selected out of …") stay EBR's own
  if (hasSelection || total === undefined) {
    return <>{fallback}</>
  }

  const interpreting = phase === 'interpreting'
  const count =
    hasFilters && !interpreting
      ? `${filtered?.toLocaleString()} of ${total.toLocaleString()} VMs`
      : `${total.toLocaleString()} VMs`

  return (
    <FlexLayout itemGap="S" alignItems="center" className="entity-counts">
      <Title
        id="ebr-viz-title"
        data-test="entity-counts"
        size={Title.TitleSizes.H3}
      >
        {count}
      </Title>
      {interpreting ? (
        <TextLabel
          type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          aria-live="polite"
        >
          Filters arriving…
        </TextLabel>
      ) : undefined}
      {interpreting || isLoading ? <Loader loading aria-busy /> : undefined}
    </FlexLayout>
  )
}

const CountTitle = (
  connect as unknown as (
    mapState: typeof mapTitleState,
  ) => (
    component: ComponentType<CountTitleProps>,
  ) => ComponentType<Pick<CountTitleProps, 'options' | 'fallback'>>
)(mapTitleState)(CountTitleView)

/**
 * Template VM factory plus two EBR slots: the hook component (interpretation
 * area between the filter bar and the grid) and the count title.
 */
class SearchVmFactory extends EBRComponentFactory<unknown> {
  private readonly base =
    vmFactory.getInstance() as EBRComponentFactoryLike<unknown>

  override getComponent(componentId: string, options: unknown) {
    if (componentId === COMPONENT_IDS.EB_HOOK_COMPONENT) {
      return <InterpretationPanel />
    }
    if (componentId === COMPONENT_IDS.VIZ_TITLE) {
      return (
        <CountTitle
          options={(options ?? {}) as VizTitleOptions}
          fallback={this.base.getComponent(componentId, options)}
        />
      )
    }
    return this.base.getComponent(componentId, options)
  }

  override getFilterParser(): EBRFilterParser {
    return this.base.getFilterParser()
  }

  override setDefaultFactory(factory: EBRComponentFactoryLike<unknown>) {
    super.setDefaultFactory(factory)
    this.base.setDefaultFactory(factory)
  }
}

export const searchVmFactory = new SearchVmFactory()
