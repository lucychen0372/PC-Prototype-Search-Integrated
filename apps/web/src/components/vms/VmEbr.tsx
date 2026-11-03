import { EBActionsUtil, EntityBrowser } from '@nutanix-ui/ebr-ui'
import type {
  EBRComponentFactoryLike,
  EBREntityConfig,
  EBRFormatterOptions,
  EBRQueryConfig,
} from '~/types/ebr'
import { vmActionChecker } from './config/actionChecker'
import { vmEntityConfig } from './config/config'
import { VM_ENTITY_TYPE, VM_ID } from './config/constants'
import type { VmEntity } from './config/types'
import { vmFactory } from './factory'

const entityTypes = [VM_ENTITY_TYPE]

const entityTypeDisplayNames = {
  [VM_ENTITY_TYPE]: {
    singular: 'VM',
    plural: 'VMs',
  },
}

const queryConfig = {
  queryProcessorsMap: {
    [VM_ENTITY_TYPE]: {
      queryProcessorName: 'GroupsV3UQDC',
    },
  },
  pollingSec: 30,
} satisfies EBRQueryConfig<VmEntity>

EBActionsUtil.registerCapabilityChecker(VM_ENTITY_TYPE, vmActionChecker)

/** Lets a host page mount a differently-configured main VM browser (e.g. driven by search). */
export interface VmEbrOverrides {
  ebId?: string
  className?: string
  entityConfig?: Partial<EBREntityConfig<VmEntity>>
  ebComponentFactory?: EBRComponentFactoryLike<EBRFormatterOptions<VmEntity>>
  showFiltersBar?: boolean
  persistQuerySettingsToSession?: boolean
  /** FIQL that scopes every query to a parent entity, e.g. a cluster's VMs tab (`cluster==Cluster ABC`). */
  scopeFilter?: string
}

interface VmProps {
  detailsEntity?: VmEntity
  scopedEntityId?: string
  defaultPerspective?: string
  overrides?: VmEbrOverrides
}

export function VmEbr({
  detailsEntity,
  scopedEntityId,
  defaultPerspective,
  overrides,
}: VmProps) {
  const isDetailsView = Boolean(detailsEntity)
  const isScopedBrowser = Boolean(scopedEntityId)
  const canUseSavedFilters = !isDetailsView && !isScopedBrowser
  const rawFilters = scopedEntityId
    ? `id==${scopedEntityId}`
    : overrides?.scopeFilter
  const scopedQueryConfig = rawFilters
    ? {
        ...queryConfig,
        useGlobalFilters: true,
        globalFiltersSchema: { rawFilters },
      }
    : queryConfig
  const entityConfig = {
    ...vmEntityConfig,
    ...(defaultPerspective ? { defaultPerspective } : {}),
    ...overrides?.entityConfig,
  }
  const showFilters = !isDetailsView && !isScopedBrowser

  return (
    <EntityBrowser
      ebId={
        isDetailsView
          ? `${VM_ID}-details-actions-${detailsEntity?.id}`
          : scopedEntityId
            ? `${VM_ID}-details-tab-${defaultPerspective ?? 'general'}-${scopedEntityId}`
            : (overrides?.ebId ?? VM_ID)
      }
      className={overrides?.className}
      appId="vm"
      queryConfig={scopedQueryConfig}
      entityTypes={entityTypes}
      entityTypeDisplayNames={entityTypeDisplayNames}
      selectedEntityType={VM_ENTITY_TYPE}
      entityConfigs={{
        [VM_ENTITY_TYPE]: entityConfig,
      }}
      showEntityTypeSelector={false}
      showFiltersBar={showFilters && (overrides?.showFiltersBar ?? true)}
      showFiltersPanel={showFilters}
      showSuggestedFilters={showFilters}
      showPageSizeSelector={showFilters}
      filtersPanelCollapsed={true}
      filterBarPlaceholder="Filter VMs"
      allowCustomFocuses={canUseSavedFilters}
      showFavoriteFilters={canUseSavedFilters}
      persistQuerySettingsToSession={
        canUseSavedFilters && (overrides?.persistQuerySettingsToSession ?? true)
      }
      exportSettings={
        isDetailsView ? undefined : { visible: true, pageSize: 500 }
      }
      ebComponentFactory={
        overrides?.ebComponentFactory ?? vmFactory.getInstance()
      }
      detailsEntityInfo={
        detailsEntity
          ? {
              detailsViewOnly: true,
              entity: {
                entityId: detailsEntity.id,
                entityType: VM_ENTITY_TYPE,
                ...detailsEntity,
              },
            }
          : undefined
      }
    />
  )
}
