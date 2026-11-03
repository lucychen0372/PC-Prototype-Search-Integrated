import type { EntityBrowser } from '@nutanix-ui/ebr-ui'
import type PropTypes from 'prop-types'
import type { ComponentType, ReactNode } from 'react'

import type { actionState } from '~/lib/ebr-utils'

type EBRPropTypes = PropTypes.InferProps<typeof EntityBrowser.propTypes>

export type EBRPrimitive = string | number | boolean | null
export type EBRValue =
  | EBRPrimitive
  | EBRValue[]
  | {
      [key: string]: EBRValue
    }

export type EBRRecord = Record<string, EBRValue>
export type EBRState = Record<string, EBRValue | EBRValue[] | EBRRecord>
export type EBRActionResult = ReturnType<typeof actionState>
export type EBROrder = 'asc' | 'desc'
export type EBRGroupingType = 'tabs' | 'list'
export type EBRQueryProcessorName =
  | 'GroupsV3UQDC'
  | 'ListV3UQDC'
  | 'LocalData'
  | 'ODataV4UQDC'

export interface EBRActionCriteria {
  checks: string[]
  match: 'all' | 'any'
}

export interface EBRActionMenuItem {
  id: string
  label: string
  criteria: EBRActionCriteria
  componentProps: EBRRecord
  children?: EBRActionMenu[]
  needsConfirmation?: boolean
  confirmationMessage?: string
  icon?: string
  tooltip?: string
  disabled?: boolean
  hidden?: boolean
}

export interface EBRRawActionMenuItem
  extends Omit<EBRActionMenuItem, 'children'> {
  children?: Array<string | EBRActionSeparatorItem['id']>
}

export interface EBRActionSeparatorItem {
  id: '--'
}

export interface EBRActionSubmenu {
  id: string
  label: string
  children: EBRActionMenu[]
}

export type EBRActionMenu =
  | EBRActionMenuItem
  | EBRActionSeparatorItem
  | EBRActionSubmenu

export interface EBRActionsConfig {
  primaryActions: EBRActionMenuItem[]
  secondaryActions: EBRActionMenu[]
  rightClickActions: EBRActionMenu[]
  dropdownBtnActions: EBRActionMenu[]
  detailsActions: EBRActionMenu[]
  detailsDropdownBtnActions: EBRActionMenu[]
}

export interface EBRRawActionsConfig {
  actions: {
    primary?: string[]
    secondary?: string[]
    right_click?: string[]
    dropdowns?: string[]
    details?: string[]
    detailsDropdowns?: string[]
  }
  actionProps: Record<string, EBRRawActionMenuItem>
}

export interface EBRProcessedFilters {
  filterExp: Record<string, EBRFilterCondition[]>
  rawFilters: EBRFilterCondition[] | null
}

export interface EBRFilterCondition {
  id: string
  attribute: string
  value?: string
  value1: string | number | boolean
  op: string
  value2?: string | number | boolean | null
  isChecked: boolean
}

interface EBRCommonAttributeFields {
  displayName?: string
  internalAttribute?: true
  filterable?: boolean
  sortable?: boolean
  groupable?: boolean
  aggregatable?: boolean
  isList?: boolean
  display?: boolean
  formatter?: string
  v4AttributeName?: string
  v4AttributePath?: string
}

export interface EBRStringAttribute extends EBRCommonAttributeFields {
  type: 'string'
}

export interface EBRLabelAttribute extends EBRCommonAttributeFields {
  type: 'label'
}

export interface EBRListAttribute extends EBRCommonAttributeFields {
  type?: 'string' | 'int' | 'enum' | 'label' | 'searchselect'
  isList: true
}

export interface EBRNumericAttribute extends EBRCommonAttributeFields {
  type: 'int' | 'float'
  subType?: 'time' | 'datetime'
  units?:
    | 'bytes'
    | 'hz'
    | 'kbps'
    | 'iops'
    | 'ppm'
    | 'pph'
    | 'pct'
    | 'secs'
    | 'usecs'
    | 'msecs'
    | 'raw'
    | 'time'
    | 'health'
    | 'percent'
    | 'duration_secs'
  defaultUnits?: string
  continuous?: boolean
  values?: Record<string, string>
  disableCount?: boolean
}

export interface EBREnumAttribute extends EBRCommonAttributeFields {
  type: 'enum' | 'enum_radio'
  subType?: 'int' | 'string' | 'time' | 'datetime' | 'custom'
  values: Record<string, string>
  processRawResponse?: (
    response: EBRRecord | EBRRecord[],
    keyCounts: Record<string, number>,
  ) => Record<string, number>
  v4ObjectNameSpace?: string
  v4GroupbyType?: 'client' | 'server'
}

export interface EBRSearchSelectAttribute extends EBRCommonAttributeFields {
  type: 'searchselect'
  values?: Record<string, string>
  v4ObjectNameSpace?: string
}

export type EBRAttributeSchema =
  | EBRStringAttribute
  | EBRNumericAttribute
  | EBREnumAttribute
  | EBRListAttribute
  | EBRLabelAttribute
  | EBRSearchSelectAttribute

export interface EBRSchemaValidationResult {
  isValid: boolean
  reason?: string
}

export interface EBRJoinedEntitySchema {
  idAttribute: string
  nameAttribute: string
  attributes: Record<string, EBRAttributeSchema>
}

export interface EBRJoinedEntityType<TEntity = Record<string, unknown>> {
  entityType: string
  schema: EBRJoinedEntitySchema
  joinType: 'client' | 'server'
  joinAttribute: string | ((entity: TEntity) => string | string[])
  joinedEntityAttribute?: string
  v4ODataPrefix?: string
}

export interface EBREntitySchema<TEntity = Record<string, unknown>> {
  idAttribute: string
  nameAttribute: string
  attributes: Record<string, EBRAttributeSchema>
  joinedEntityTypes?: Array<EBRJoinedEntityType<TEntity>>
  schemaValidator?: (attributeName: string) => EBRSchemaValidationResult
}

export interface EBRVisualization {
  name: string
  viewName?: string
  entityAttributes?: EBRRecord
}

export interface EBRCustomRender {
  formatter?: string
  columnWidth?: string | number
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  tooltip?: string
}

export interface EBRPerspectiveEntityAttributes {
  idAttribute?: string
  primaryAttribute?: string
  displayAttributes?: string[]
  helperAttributes?: string[]
  sortByAttributes?: string[]
  filterByAttributes?: string[]
  groupByAttributes?: string[]
  defaultGroupByAttribute?: string
  defaultSortingAttribute?: string
  defaultSortOrder?: EBROrder
  customRenders?: Record<string, EBRCustomRender>
}

export interface EBRPerspective {
  name: string
  label?: string
  entityAttributes: EBRPerspectiveEntityAttributes
  visualizations?: EBRVisualization[]
}

export interface EBRFiltersConfig {
  local?: {
    type: 'simple' | 'advanced'
    value: Record<string, string>
  }
  global?: Record<string, EBRFilterCondition[]>
  maxFilterConditions?: number
  maxFilterConditionsPerAttribute?: number
  pinnedFilterAttributes?: string[]
}

export interface EBRGettingStartedConfig {
  createActionId?: string
  GettingStartedComponent?: ReactNode
}

export interface EBREntityConfig<TEntity = Record<string, unknown>> {
  schema: EBREntitySchema<TEntity>
  actions?: EBRActionsConfig
  perspectives: EBRPerspective[]
  filters?: EBRFiltersConfig
  gettingStarted?: EBRGettingStartedConfig
  defaultPerspective?: string
}

export interface EntityBrowserProps<TEntity = Record<string, unknown>>
  extends Omit<
    EBRPropTypes,
    | 'ebComponentFactory'
    | 'entityConfigs'
    | 'entityTypeDisplayNames'
    | 'entityGroupings'
    | 'entityTypes'
    | 'groupingType'
    | 'onFilterChange'
    | 'queryConfig'
  > {
  ebComponentFactory?: EBRComponentFactoryLike
  entityConfigs: Record<string, EBREntityConfig<TEntity>>
  entityGroupings?: EBREntityGrouping[]
  entityTypes: string[]
  entityTypeDisplayNames: Record<string, EBREntityTypeDisplayName>
  groupingType?: EBRGroupingType
  onFilterChange?: (filters: EBRFilterCondition[]) => void
  queryConfig?: EBRQueryConfig<TEntity>
}

export interface EntityBrowserViewProps<TEntity = Record<string, unknown>>
  extends Omit<
    EntityBrowserProps<TEntity>,
    'entityTypes' | 'entityTypeDisplayNames'
  > {
  entityType?: string
  entityTypes?: string[]
  entityTypeDisplayNames?: Record<string, EBREntityTypeDisplayName>
  entityGroupings?: EBREntityGrouping[]
}

export interface EBREntityTypeDisplayName {
  singular: string
  plural: string
}

export interface EBREntityGrouping {
  sectionName: string
  entities: Array<{
    entity: string
    displayName: string
  }>
}

export interface EBRDetailsEntityInfo<TEntity = Record<string, unknown>> {
  detailsViewOnly?: boolean
  entity: TEntity & {
    entityType: string
    entityId: string
  }
  onClose?: () => void
}

export interface EBRExportOptionConfig {
  labelFn?: () => string
  isDisabledFn?: () => boolean
}

export interface EBRExportSettings {
  exportOptions?: Record<string, boolean | EBRExportOptionConfig>
  forceExport?: boolean
  maxRows?: number
  pageSize?: number
  visible?: boolean
}

export interface EBRRowExpansionConfig<TEntity = Record<string, unknown>> {
  render: (row: TEntity) => ReactNode
  rows: string[]
}

export interface EBRQueryProcessorConfig<TEntity = Record<string, unknown>> {
  queryProcessorName?: EBRQueryProcessorName
  queryProcessorProps?: EBRRecord
  queryProcessorComponent?: ComponentType<EBRRecord>
  rowExpansionConfig?: EBRRowExpansionConfig<TEntity>
}

export interface EBRQueryConfig<TEntity = Record<string, unknown>>
  extends EBRQueryProcessorConfig<TEntity> {
  queryProcessorsMap?: Record<string, EBRQueryProcessorConfig<TEntity>>
  useGlobalFilters?: boolean
  globalFiltersSchema?: EBRRecord
  pollingSec?: number
  fetchCount?: number
  onNewQueryData?: (data: TEntity[]) => void | Promise<void>
  onRowExpand?: (expandedRows: string[]) => void
  userDataAPI?: string
}

export interface EBRSelectionInfo<TEntity = unknown>
  extends Record<
    string,
    EBRValue | Record<string, TEntity> | TEntity[] | undefined
  > {
  selected: string[]
  selectedEntities?: Record<string, TEntity>
  visibleSelectedEntities: Record<string, TEntity> | string[]
  isSelectAllMode?: boolean
  unselected?: string[]
}

export interface EBRCurrentPopup {
  actionId?: string
  confirmed?: boolean
  needsConfirmation?: boolean
  action?: EBRActionMenuItem
  componentProps?: EBRRecord
}

export interface EBRGetters<
  TSelectionInfo extends EBRSelectionInfo = EBRSelectionInfo,
  TCurrentPopup extends EBRCurrentPopup = EBRCurrentPopup,
> {
  getCurrentPopup: (state: EBRState) => TCurrentPopup
  getSelectedEntityType: (state: EBRState) => string
  getCurrentSelectedEntities: (state: EBRState) => TSelectionInfo
  getGroupByInfo: (state: EBRState) => EBRGroupByInfo | null
  getCurrentTotalMembers: (state: EBRState) => number
  getCurrentGroupTotalMembers: (state: EBRState) => Record<string, number>
  getDetailsEntity?: <TEntity>(state: EBRState) => TEntity | null
  getJoinedEntities?: <TEntity>(state: EBRState) => Record<string, TEntity[]>
}

export interface EBRActions {
  refreshQuery: () => EBRStoreAction
  closePopup: () => EBRStoreAction
  removeEntitySelections: (
    entityType: string,
    entityIds: string[],
    selectedGroup?: EBRGroupByInfo[],
  ) => EBRStoreAction
  setDetailsEntity?: <TEntity>(detailsEntity: TEntity | null) => EBRStoreAction
  setSidePanelEntities?: (entityType: string, entityIds: string[]) => unknown
  showPopup?: (popup: EBRCurrentPopup) => EBRStoreAction
}

export interface EBRStoreAction {
  type: string
  payload?: EBRValue | EBRRecord
}

export interface EBRGroupByInfo {
  attribute: string
  value?: EBRPrimitive
  values?: EBRPrimitive[]
}

export interface EBROwnProps<
  TSelectionInfo extends EBRSelectionInfo = EBRSelectionInfo,
  TCurrentPopup extends EBRCurrentPopup = EBRCurrentPopup,
> {
  Getters: EBRGetters<TSelectionInfo, TCurrentPopup>
  actions: EBRActions
  actionTargetId?: string
}

export interface EBRFormatterOptions<TEntity = Record<string, unknown>> {
  text?: string
  detailsActions?: ReactNode
  joinedData?: Record<string, EBRRecord[]>
  children?: ReactNode
  options?: {
    entity?: TEntity
    schema?: EBREntitySchema<TEntity>
  }
}

export interface EBRComponentFactoryOptions {
  parser?: EBRFilterParser
}

export interface EBRFilterParser {
  parse?: (value: string) => EBRFilterCondition[]
  serialize?: (filters: EBRFilterCondition[]) => string
}

export interface EBRComponentFactoryLike<TOptions = EBRFormatterOptions> {
  getComponent: (componentId: string, options: TOptions) => ReactNode
  getFilterParser: () => EBRFilterParser
  setDefaultFactory: (factory: EBRComponentFactoryLike<TOptions>) => void
}

export type EBRActionChecker<
  TEntity = Record<string, unknown>,
  TAction extends EBRActionMenuItem = EBRActionMenuItem,
> = (
  action: TAction,
  entityType: string,
  selectedEntities: TEntity[],
  additionalOptions: EBRSelectionOptions,
) => EBRActionResult

export interface EBRSelectionOptions {
  isSelectAllMode?: boolean
  unselected?: string[]
  totalCount?: number
  selectedEntitiesCount?: number
  childSelections?: Record<string, string[]>
}
