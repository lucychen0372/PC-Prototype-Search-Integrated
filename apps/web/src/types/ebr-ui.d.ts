import type PropTypes from 'prop-types'
import type {
  EBRActionMenuItem,
  EBRActionResult,
  EBRActionsConfig,
  EBRComponentFactoryLike,
  EBRDetailsEntityInfo,
  EBREntityConfig,
  EBREntityGrouping,
  EBREntityTypeDisplayName,
  EBRExportSettings,
  EBRFilterCondition,
  EBRFormatterOptions,
  EBRGroupByInfo,
  EBROwnProps,
  EBRProcessedFilters,
  EBRQueryConfig,
  EBRRawActionMenuItem,
  EBRRecord,
  EBRSelectionInfo,
  EBRSelectionOptions,
  EBRState,
  EBRStoreAction,
  EBRValue,
} from './ebr'

declare module '@nutanix-ui/ebr-ui' {
  const entityBrowserPropTypes: {
    appId: PropTypes.Requireable<string>
    showEntityTypeSelector: PropTypes.Requireable<boolean>
    groupingType: PropTypes.Requireable<'tabs' | 'list'>
    showFiltersBar: PropTypes.Requireable<boolean>
    filterBarPlaceholder: PropTypes.Requireable<string>
    filtersPanelCollapsed: PropTypes.Requireable<boolean>
    showFiltersPanel: PropTypes.Requireable<boolean>
    showFiltersButton: PropTypes.Requireable<boolean>
    showModifyFiltersLink: PropTypes.Requireable<boolean>
    showSuggestedFilters: PropTypes.Requireable<boolean>
    showFavoriteFilters: PropTypes.Requireable<boolean>
    showPageSizeSelector: PropTypes.Requireable<boolean>
    allowCustomFocuses: PropTypes.Requireable<boolean>
    allowLabels: PropTypes.Requireable<boolean>
    ebComponentFactory: PropTypes.Requireable<EBRComponentFactoryLike>
    entityTypes: PropTypes.Validator<string[]>
    entityTypeDisplayNames: PropTypes.Validator<
      Record<string, EBREntityTypeDisplayName>
    >
    selectedEntityType: PropTypes.Requireable<string>
    detailsEntityInfo: PropTypes.Requireable<EBRDetailsEntityInfo>
    entityConfigs: PropTypes.Validator<Record<string, EBREntityConfig>>
    entityGroupings: PropTypes.Requireable<EBREntityGrouping[]>
    queryConfig: PropTypes.Requireable<EBRQueryConfig>
    onFilterChange: PropTypes.Requireable<
      (filters: EBRFilterCondition[]) => void
    >
    onSidePanelTitleClick: PropTypes.Requireable<(entity: EBRRecord) => void>
    className: PropTypes.Requireable<string>
    telemetryName: PropTypes.Requireable<string>
    persistQuerySettingsToSession: PropTypes.Requireable<boolean>
    ebId: PropTypes.Validator<string>
    notificationsContainer: PropTypes.Requireable<boolean>
    baseHeadingLevel: PropTypes.Requireable<number>
    debugStore: PropTypes.Requireable<boolean>
    language: PropTypes.Requireable<string>
    exportSettings: PropTypes.Requireable<EBRExportSettings>
  }
  export interface EntityBrowserRuntimeProps<
    TEntity = Record<string, unknown>,
  > {
    appId?: string
    showEntityTypeSelector?: boolean
    groupingType?: 'tabs' | 'list'
    showFiltersBar?: boolean
    filterBarPlaceholder?: string
    filtersPanelCollapsed?: boolean
    showFiltersPanel?: boolean
    showFiltersButton?: boolean
    showModifyFiltersLink?: boolean
    showSuggestedFilters?: boolean
    showFavoriteFilters?: boolean
    showPageSizeSelector?: boolean
    allowCustomFocuses?: boolean
    allowLabels?: boolean
    ebComponentFactory?: EBRComponentFactoryLike<EBRFormatterOptions<TEntity>>
    entityTypes: string[]
    entityTypeDisplayNames: Record<string, EBREntityTypeDisplayName>
    selectedEntityType?: string
    detailsEntityInfo?: EBRDetailsEntityInfo<TEntity>
    entityConfigs: Record<string, EBREntityConfig<TEntity>>
    entityGroupings?: EBREntityGrouping[]
    queryConfig?: EBRQueryConfig<TEntity>
    onFilterChange?: (filters: EBRFilterCondition[]) => void
    onSidePanelTitleClick?: (entity: EBRRecord) => void
    className?: string
    telemetryName?: string
    persistQuerySettingsToSession?: boolean
    ebId: string
    notificationsContainer?: boolean
    baseHeadingLevel?: number
    debugStore?: boolean
    language?: string
    exportSettings?: EBRExportSettings | null
  }
  const deprecatedEntityBrowserQueryPropTypes: {
    queryProcessorName?: string | null | undefined
    queryProcessorProps?: object | null | undefined
    queryProcessorComponent?: React.ElementType | null | undefined
    queryProcessorsMap?: object | null | undefined
    useGlobalFilters?: boolean | null | undefined
    globalFiltersSchema?: object | null | undefined
    pollingSec?: number | null | undefined
    fetchCount?: number | null | undefined
    onNewQueryData?: ((...arguments_: unknown[]) => unknown) | null | undefined
    onRowExpand?: ((...arguments_: unknown[]) => unknown) | null | undefined
    rowExpansionConfig?: object | null | undefined
    userDataAPI?: string | null | undefined
  }
  export const EntityBrowser: (<TEntity = Record<string, unknown>>(
    props: EntityBrowserRuntimeProps<TEntity>,
  ) => React.ReactElement | null) & {
    propTypes: typeof entityBrowserPropTypes
  }
  export interface EBRActionState {
    state: 'enabled' | 'disabled' | 'hidden'
    reason?: string | null
  }
  export type EBRCapabilityChecker<
    TEntity = Record<string, unknown>,
    TAction extends EBRActionMenuItem = EBRActionMenuItem,
  > = (
    action: TAction,
    entityType: string,
    selectedEntities: TEntity[],
    options?: EBRSelectionOptions,
  ) => EBRActionResult
  export const EBActionsUtil: {
    registerCapabilityChecker: (
      entityType: string,
      checker: Record<string, EBRCapabilityChecker> | EBRCapabilityChecker,
    ) => void
    processActionsConfig: (config: {
      actions: Record<string, string[] | undefined>
      actionProps: Record<string, EBRRawActionMenuItem>
    }) => EBRActionsConfig
    getSelectionOptions: (
      selectionInfo: EBRSelectionInfo,
      groupByInfo: EBRGroupByInfo | null,
      currentTotalMembers: number,
      currentGroupTotalMembers: Record<string, number>,
    ) => EBRSelectionOptions
    onlyOneSelected: EBRCapabilityChecker
    atLeastOneSelected: EBRCapabilityChecker
    getCapabilityEnabledEntities: <TEntity>(
      action: EBRActionMenuItem,
      entityType: string,
      selectedEntities: TEntity[],
      options?: EBRSelectionOptions,
    ) => TEntity[]
  }
  export const COMPONENT_IDS: {
    EXPORT_VIEW: string
    FETCH_SELECTED_ENTITIES_VIEW: string
    ENTITY_TYPE_SELECTOR: string
    VIZ_TYPE_SELECTOR: string
    FILTERS_PANEL: string
    QUERY_OPTIONS_PANEL: string
    FILTER_BAR_PANEL: string
    EBACTIONS_PANEL: string
    EB_DETAILS_PANE_ACTIONS_PANEL: string
    POPUP_CONTAINER: string
    RIGHT_CLICK_ACTION_MENU: string
    LINK: string
    SIDE_PANEL_TITLE_FORMATTER: string
    VIZ_TITLE: string
    GROUP_TITLE: string
    GROUP_TABS: string
    GROUPS_PANEL_LIST_ITEM: string
    GROUPBY_SELECTOR: string
    GROUPS_PANEL: string
    EB_HOOK_COMPONENT: string
    EB_HOOK_DROPDOWN: string
    EB_DETAILS_PANE: string
    EB_DETAILS_LINK: string
    EB_SIDE_PANEL_LINK: string
    EB_SIDE_PANEL: string
    INVALID_PERSPECTIVE_DIALOG: string
    [key: string]: string
  }
  export const DataUtil: {
    GROUPS_PAGE_SIZE: number
    MAX_GROUPS_MEMBERS: number
    EBToUQDCSchema: (ebSchema: EBRRecord) => EBRRecord
    getActionComponentArgs: () => EBROwnProps
    getVizComponentArgs: () => Pick<EBROwnProps, 'actions'>
    getFilteringComponentArgs: () => EBROwnProps
    getQueryOptionsComponentArgs: () => EBROwnProps
    processPropsForStore: (props: EntityBrowserRuntimeProps) => EBRState
    clearPropsForStore: (props: EntityBrowserRuntimeProps) => void
    batchObject: <TEntity extends EBRRecord>(
      entities: TEntity[],
      schema: EBRRecord,
      factory: EBRComponentFactoryLike,
    ) => Record<keyof TEntity, ReactNode[]>
    processFilters: (
      filters: Record<string, EBRFilterCondition[]>,
      globalFiltersSchema?: EBRRecord,
      useGlobalFilters?: boolean,
    ) => EBRProcessedFilters
    getEntityValue: (
      entity: EBRRecord,
      attribute: string,
    ) => EBRValue | undefined
    fetchAllV4Entities: <TEntity, TClient>(
      ApiClient: TClient,
      ApiNameSpace: new (client: TClient) => Record<
        string,
        (queryBody: { $page: number; $limit: number }) => Promise<{
          data: {
            data?: TEntity[]
            metadata: { totalAvailableResults: number }
          }
        }>
      >,
      apiName: string,
      page: number,
      results: TEntity[],
      doneCB: (results: TEntity[]) => void,
      errorCB: () => void,
    ) => void
    fetchGroupsUQDCQuery: (
      selectedEntityType: string,
      primaryGroupByAttr: string,
      processedFilters: EBRProcessedFilters,
    ) => EBRRecord
    ODataJoinedValue: (
      entity: EBRRecord,
      attributeName: string,
      ebSchema: EBRRecord,
    ) => EBRValue | undefined
    ODataGroupAggregationValue: (
      groupEntity: EBRRecord,
      aggregationTuple: string,
      defaultValue?: EBRValue,
    ) => EBRValue | undefined
  }
  export const connect: <
    TOwnProps,
    TStateProps,
    TDispatchProps,
    TMergedProps = TStateProps & TDispatchProps,
  >(
    mapState: (state: EBRState, ownProps: TOwnProps) => TStateProps,
    mapDispatch: (
      dispatch: (action: EBRStoreAction) => void,
      ownProps: TOwnProps,
    ) => TDispatchProps,
    mergeProps?: (
      stateProps: TStateProps,
      dispatchProps: TDispatchProps,
      ownProps: TOwnProps,
    ) => TMergedProps,
    options?: EBRRecord,
  ) => (
    component: React.ComponentType<TMergedProps>,
  ) => React.ComponentType<TOwnProps>
  export const JoinedDataRenderer: React.ComponentType<EBRRecord>
  export const ODataProjectionRenderer: React.ComponentType<EBRRecord>
  export const EBLabelIcon: React.ComponentType<EBRRecord>
  export const NoDataSpan: React.ComponentType<EBRRecord>
}
