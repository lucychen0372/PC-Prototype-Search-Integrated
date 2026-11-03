# EBR Implementation Examples

Read this when creating or reviewing an EBR. The examples show the moving pieces together: component, schema, perspectives, actions, factory, filters, side panel, and query config.

## Recommended File Shape

Use the local repo's component conventions, but keep EBR pieces separated:

```text
components/widgets-ebr/
  WidgetsEbr.tsx
  constants.ts
  schema.ts
  perspectives.ts
  actions.ts
  action-checker.ts
  factory.tsx
  renderers.tsx
  side-panel.tsx
  types.ts
  index.ts
api/src/features/groups/
  data.ts
  types.ts
```

For very small pages, schema/perspectives/actions can be inline, but split them once custom renderers, side panels, or actions appear.

## 1. Define Constants And Types

```ts
export const WIDGET_ENTITY_TYPE = 'widget'
export const WIDGET_EB_ID = 'widgets'

export interface WidgetEntity {
  uuid: string
  name: string
  power_state: 'ON' | 'OFF'
  cluster_uuid?: string
  cluster_name?: string
  created_time_usecs?: number
  alert_count?: number
}
```

Use backend attribute names consistently. The schema, perspective, custom render keys, filters, actions, helper attributes, and Groups API rows must all agree.

## 2. Create A Schema

```ts
import { WIDGET_ENTITY_TYPE } from './constants'

export const widgetSchema = {
  idAttribute: 'uuid',
  nameAttribute: 'name',
  attributes: {
    uuid: {
      type: 'string',
      displayName: 'UUID',
    },
    name: {
      type: 'string',
      displayName: 'Name',
    },
    power_state: {
      type: 'enum',
      subType: 'string',
      displayName: 'Power State',
      values: {
        ON: 'On',
        OFF: 'Off',
      },
    },
    cluster_name: {
      type: 'string',
      displayName: 'Cluster',
    },
    created_time_usecs: {
      type: 'int',
      subType: 'datetime',
      displayName: 'Created',
    },
    alert_count: {
      type: 'int',
      displayName: 'Alerts',
      continuous: true,
    },
  },
}
```

Schema rules:

- Include the ID and name attributes even if the ID is not displayed.
- Use `enum` values for finite filterable states.
- Use time/datetime subtypes for timestamp filters and renderers.
- Include helper-only attributes when actions or renderers need them.
- Do not invent attributes that the selected query path cannot return.

## 3. Create Perspectives

```ts
export const widgetPerspectives = [
  {
    name: '_common_',
    label: 'Common',
    entityAttributes: {
      idAttribute: 'uuid',
      primaryAttribute: 'name',
      displayAttributes: [],
      helperAttributes: ['uuid', 'cluster_uuid'],
      filterByAttributes: [
        'name',
        'power_state',
        'cluster_name',
        'created_time_usecs',
      ],
      groupByAttributes: ['power_state', 'cluster_name'],
      sortByAttributes: ['name', 'power_state', 'created_time_usecs'],
      defaultSortingAttribute: 'name',
      customRenders: {
        name: {
          formatter: 'widgetNameLink',
          columnWidth: '30%',
        },
        alert_count: {
          formatter: 'widgetAlertCount',
          align: 'right',
          export: (entity) => String(entity.alert_count ?? 0),
        },
      },
      sidePanels: {
        showFooter: false,
        linkDetails: true,
        maxEntities: 1,
        tabs: {
          properties: {
            title: 'Properties',
          },
        },
      },
    },
  },
  {
    name: 'General',
    label: 'General',
    entityAttributes: {
      displayAttributes: [
        'name',
        'power_state',
        'cluster_name',
        'alert_count',
        'created_time_usecs',
      ],
    },
  },
]
```

Perspective rules:

- Put shared fields in `_common_`; put visible columns in named perspectives.
- `displayAttributes` controls grid columns.
- `filterByAttributes`, `groupByAttributes`, and `sortByAttributes` should only include backend-supported fields.
- Put fields needed by formatters/actions but not shown in `helperAttributes`.
- `customRenders` formatter IDs must exist in the factory.
- `sidePanels` does not open by itself; the clickable column still needs the `sidePanelLink` formatter or a custom renderer that opens it.

## 4. Create Actions

```ts
export const widgetActions = {
  actions: {
    primary: ['powerOn'],
    secondary: ['powerOff'],
    right_click: ['powerOn', 'powerOff'],
    details: ['powerOn', 'powerOff'],
  },
  actionProps: {
    powerOn: {
      id: 'powerOn',
      label: 'Power On',
      criteria: {
        checks: ['onlyOneSelected', 'isPoweredOff'],
        match: 'all',
      },
    },
    powerOff: {
      id: 'powerOff',
      label: 'Power Off',
      criteria: {
        checks: ['onlyOneSelected', 'isPoweredOn'],
        match: 'all',
      },
      needsConfirmation: true,
      confirmationMessage: 'Power off the selected widget?',
    },
  },
}
```

Register an action checker before rendering EBR:

```ts
import { EBActionsUtil } from '@nutanix-ui/ebr-ui'
import { WIDGET_ENTITY_TYPE } from './constants'

export const widgetActionChecker = {
  isPoweredOn: ({ entities }) => {
    const [entity] = entities
    return entity?.power_state === 'ON'
      ? { state: 'enabled' }
      : { state: 'disabled', reason: 'Widget is already powered off.' }
  },
  isPoweredOff: ({ entities }) => {
    const [entity] = entities
    return entity?.power_state === 'OFF'
      ? { state: 'enabled' }
      : { state: 'disabled', reason: 'Widget is already powered on.' }
  },
}

EBActionsUtil.registerCapabilityChecker(WIDGET_ENTITY_TYPE, widgetActionChecker)
```

Action rules:

- Run `EBActionsUtil.processActionsConfig(widgetActions)` in the entity config.
- Checkers should return `enabled`, `disabled`, or `hidden` with useful reasons.
- If a checker needs fields that are not visible, add them to `helperAttributes`.
- Action UI is rendered through the popup container in the factory.

## 5. Create Renderers, Popup UI, And Side Panel

```tsx
export const WidgetNameLink = ({ options }) => {
  const entity = options.entity

  return <a href={`/widgets/${entity.uuid}`}>{entity.name}</a>
}

export const WidgetAlertCount = ({ options }) => {
  const count = options.entity.alert_count ?? 0

  return <span>{count}</span>
}

export const WidgetActionPopup = ({
  currentPopup,
  closePopup,
  refreshQuery,
}) => {
  if (currentPopup.actionId === 'powerOn') {
    return (
      <PowerWidgetModal
        mode="on"
        onClose={closePopup}
        onSuccess={refreshQuery}
      />
    )
  }

  if (currentPopup.actionId === 'powerOff') {
    return (
      <PowerWidgetModal
        mode="off"
        onClose={closePopup}
        onSuccess={refreshQuery}
      />
    )
  }

  return null
}

export const WidgetSidePanel = ({ entity }) => {
  return <WidgetProperties entityId={entity.entityId} />
}
```

Renderer rules:

- Renderer props vary by local wrapper; inspect nearby renderers before assuming exact option shape.
- Use `options.entity` for row data in common formatter paths.
- Action popups should close on success, refresh EBR through provided helpers, and keep UI open on recoverable errors.

## 6. Create The Component Factory

```tsx
import { COMPONENT_IDS } from '@nutanix-ui/ebr-ui'
import {
  WidgetActionPopup,
  WidgetAlertCount,
  WidgetNameLink,
  WidgetSidePanel,
} from './renderers'

export class WidgetEbrFactory {
  setDefaultFactory(defaultFactory) {
    this.defaultFactory = defaultFactory
  }

  getComponent(componentId, options) {
    switch (componentId) {
      case 'widgetNameLink':
        return <WidgetNameLink {...options} />
      case 'widgetAlertCount':
        return <WidgetAlertCount {...options} />
      case COMPONENT_IDS.EB_POPUP_CONTAINER:
        return <WidgetActionPopup {...options} />
      case COMPONENT_IDS.EB_SIDE_PANEL:
        return <WidgetSidePanel {...options} />
      default:
        return this.defaultFactory.getComponent(componentId, options)
    }
  }
}
```

Factory rules:

- `setDefaultFactory` is required.
- Delegate unknown IDs to the default factory.
- Formatter IDs in `customRenders` must match factory cases exactly.
- Use `COMPONENT_IDS` constants when available for built-in extension points.
- If implementing a custom free-text parser, add `getFilterParser()`.

## 7. Compose Entity Config

```ts
import { EBActionsUtil } from '@nutanix-ui/ebr-ui'
import { WIDGET_ENTITY_TYPE } from './constants'
import { widgetActions } from './actions'
import { widgetPerspectives } from './perspectives'
import { widgetSchema } from './schema'

export const getWidgetEntityConfigs = () => ({
  [WIDGET_ENTITY_TYPE]: {
    schema: widgetSchema,
    perspectives: widgetPerspectives,
    actions: EBActionsUtil.processActionsConfig(widgetActions),
    filters: {
      maxFilterConditions: 20,
      maxFilterConditionsPerAttribute: 5,
      pinnedFilterAttributes: ['power_state'],
    },
    defaultPerspective: 'General',
  },
})
```

Config rules:

- Use a function when config depends on permissions, feature flags, or labels.
- Keep `defaultPerspective` aligned to an existing perspective name.
- Use `filters.local` for initial page filters; use global filters for contextual/detail EBRs.

## 8. Create The EBR Component

Raw `EntityBrowser` example:

```tsx
import { EntityBrowser } from '@nutanix-ui/ebr-ui'
import { WIDGET_EB_ID, WIDGET_ENTITY_TYPE } from './constants'
import { WidgetEbrFactory } from './factory'
import { getWidgetEntityConfigs } from './entity-config'

const widgetFactory = new WidgetEbrFactory()

export const WidgetsEbr = () => {
  return (
    <EntityBrowser
      ebId={WIDGET_EB_ID}
      appId="widgets"
      entityTypes={[WIDGET_ENTITY_TYPE]}
      selectedEntityType={WIDGET_ENTITY_TYPE}
      entityTypeDisplayNames={{
        [WIDGET_ENTITY_TYPE]: {
          singular: 'Widget',
          plural: 'Widgets',
        },
      }}
      entityConfigs={getWidgetEntityConfigs()}
      queryConfig={{
        queryProcessorsMap: {
          [WIDGET_ENTITY_TYPE]: {
            queryProcessorName: 'GroupsV3UQDC',
          },
        },
        pollingSec: 30,
      }}
      ebComponentFactory={widgetFactory}
      showFiltersPanel
      filtersPanelCollapsed
      groupingType="tabs"
      persistQuerySettingsToSession
      exportSettings={{
        visible: true,
        pageSize: 500,
      }}
    />
  )
}
```

Aphrodite wrapper example:

```tsx
<EntityBrowserView
  ebId={WIDGET_EB_ID}
  entityType={WIDGET_ENTITY_TYPE}
  entityConfigs={getWidgetEntityConfigs()}
  queryConfig={{
    queryProcessorsMap: {
      [WIDGET_ENTITY_TYPE]: {
        queryProcessorName: 'GroupsV3UQDC',
      },
    },
  }}
  ebComponentFactory={widgetFactory}
  showFiltersPanel
  filtersPanelCollapsed
  exportSettings={{ visible: true, pageSize: 500 }}
/>
```

Component rules:

- Use stable `ebId` for a main list page.
- `EntityBrowserView` may derive display names and defaults; raw `EntityBrowser` needs explicit props.
- Keep `queryProcessorsMap` even for one entity so joins and detail-tab variants are easier to add.
- Enable `persistQuerySettingsToSession` for main list pages when product behavior expects it.

## 9. Add Groups API Data

When the EBR uses `GroupsV3UQDC`, add matching local API data. Read `groups-api.md` for the full contract.

Example `apps/api/src/features/groups/types.ts` shape:

```ts
export interface Entity {
  id: string
  name: string
  power_state: 'ON' | 'OFF'
  cluster_name: string
  created_time_usecs: number
  alert_count: number
  [key: string]: string | number
}
```

Example `apps/api/src/features/groups/data.ts` rows:

```ts
export const entities: Entity[] = Array.from({ length: 80 }, (_, i) => ({
  id: `widget-${i + 1}`,
  name: `Widget ${i + 1}`,
  power_state: i % 3 === 0 ? 'OFF' : 'ON',
  cluster_name: `Cluster ${(i % 4) + 1}`,
  created_time_usecs: 1_775_263_170_450 + i * 1_000_000,
  alert_count: i % 5,
}))
```

Data rules:

- Include every `displayAttributes`, `helperAttributes`, `filterByAttributes`, `groupByAttributes`, `sortByAttributes`, action-checker, renderer, and export field.
- Keep `idAttribute` aligned with the response `entity_id`. The current local mock emits `entity_id` from `entity.id`.
- Use varied values for enum/group/filter fields so filtering and grouping can be tested.
- Include enough rows to verify pagination.
- Update `DEFAULT_ATTRIBUTES` in `routes.ts` if the default projection should include the new entity's key fields.

## 10. Contextual Detail-Tab EBR

Use when rendering child entities scoped to a parent.

```tsx
export const VmNicsEbr = ({ vmId }) => {
  const ebId = `vm-nics-${vmId}`

  return (
    <EntityBrowser
      ebId={ebId}
      entityTypes={['virtual_nic']}
      selectedEntityType="virtual_nic"
      entityTypeDisplayNames={{
        virtual_nic: {
          singular: 'NIC',
          plural: 'NICs',
        },
      }}
      entityConfigs={getNicEntityConfigs()}
      queryConfig={{
        useGlobalFilters: true,
        globalFiltersSchema: {
          rawFilters: `vm==${vmId}`,
        },
        queryProcessorsMap: {
          virtual_nic: {
            queryProcessorName: 'GroupsV3UQDC',
          },
        },
      }}
      ebComponentFactory={new NicEbrFactory()}
      showFavoriteFilters={false}
      allowCustomFocuses={false}
      exportSettings={{ visible: true }}
    />
  )
}
```

Detail-tab rules:

- Include the parent ID in `ebId` to avoid stale query state across parent entities.
- Scope through `useGlobalFilters` and `globalFiltersSchema`.
- Usually disable favorite filters and custom focuses.
- Keep the perspective narrow.

## 11. When To Use A Custom UQDC

Stay with `GroupsV3UQDC` until there is a real mismatch. Create a custom UQDC when:

- The backend needs non-standard request payloads.
- Group counts require extra calls.
- The response must be transformed before EBR can consume it.
- Fetching must include product telemetry, access manager behavior, or feature-specific permissions.

Large product pages often have this shape:

```tsx
queryConfig={{
  queryProcessorsMap: {
    [WIDGET_ENTITY_TYPE]: {
      queryProcessorName: 'WidgetUQDC',
      queryProcessorComponent: WidgetUQDC,
      queryProcessorProps: {
        includeStats: true
      }
    }
  }
}}
```

Pair a custom UQDC with a config generator, action checker registration, and a factory that owns product-specific renderers/popups/side panels.

## 12. Final Review Checklist

- Every attribute in perspectives exists in schema.
- Every custom renderer ID has a factory case.
- Every action ID in action groups has an `actionProps` entry.
- Every action checker field is displayed or listed in `helperAttributes`.
- Groups API data includes every requested EBR attribute.
- `GroupsV3UQDC`, `ListV3UQDC`, `LocalDataUQDC`, or custom UQDC choice matches the backend.
- Main pages use stable `ebId`; detail-tab pages use unique parent-scoped `ebId`.
- Export settings and page size match product/backend limits.
- Favorite filters/custom focuses are disabled where saved state would be misleading.
