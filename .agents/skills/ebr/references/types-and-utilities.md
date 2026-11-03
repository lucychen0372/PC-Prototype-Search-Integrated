# EBR Types And Utilities

Read this when touching TypeScript types, module declarations, local EBR helpers, action popup wiring, formatter option shapes, or utility calls from `@nutanix-ui/ebr-ui`.

## Local Type Sources

The EBR package does not provide complete TypeScript declarations for this repo. Use local types and declarations:

- `apps/web/src/types/ebr.ts`: source of truth for EBR interfaces used by app code.
- `apps/web/src/types/ebr-ui.d.ts`: ambient module declaration for `@nutanix-ui/ebr-ui`.
- `apps/web/src/lib/ebr-utils.ts`: local helpers for action states, factories, formatters, and parser/factory typing.

Prefer importing types from `~/types/ebr` instead of inventing local `any` shapes:

```ts
import type {
  EBRActionChecker,
  EBRComponentFactoryOptions,
  EBREntityConfig,
  EBRFormatterOptions,
  EBRQueryConfig,
  EBRRawActionsConfig,
} from '~/types/ebr'
```

Update these local types only when source-backed EBR behavior requires it. If a type shim mentions `LocalData`, remember the source-backed processor name is `LocalDataUQDC`.

## Useful Exported APIs

`@nutanix-ui/ebr-ui` exports:

- `EntityBrowser`: raw top-level component.
- `COMPONENT_IDS`: constants for factory extension points.
- `connect`: connector for the EBR internal Redux store.
- `EBActionsUtil`: action config processing and capability helpers.
- `DataUtil`: helper args and data/query utilities.
- `JoinedDataRenderer`, `EBLabelIcon`, `NoDataSpan`: built-in render helpers.

## `connect`

Use EBR's `connect` for popup containers and other custom components that need EBR state. Do not import `connect` from `react-redux`; EBR scopes its own store per `EntityBrowser` instance.

Common getters:

- `getCurrentPopup(state)`
- `getSelectedEntityType(state)`
- `getCurrentSelectedEntities(state)`
- `getGroupByInfo(state)`
- `getCurrentTotalMembers(state)`
- `getCurrentGroupTotalMembers(state)`
- `getDetailsEntity(state)`
- `getJoinedEntities(state)`

Common actions:

- `refreshQuery()`
- `closePopup()`
- `removeEntitySelections(entityType, entityIds, selectedGroup?)`
- `setDetailsEntity(entity)`
- `setSidePanelEntities(entityType, entityIds)`
- `showPopup(popup)`

## `DataUtil`

Use `DataUtil.getActionComponentArgs()` when rendering action popup containers from the factory:

```tsx
case COMPONENT_IDS.POPUP_CONTAINER:
  return <PopupContainer {...DataUtil.getActionComponentArgs()} />
```

Useful source-backed helpers:

- `getActionComponentArgs()`: returns `actions` and `Getters` for action components.
- `getFilteringComponentArgs()`: returns `actions` and `Getters` for filter components.
- `getQueryOptionsComponentArgs()`: returns `actions` and `Getters` for query option components.
- `getEntityValue(entity, attribute)`: reads display values, including nested/joined attribute behavior.
- `processFilters(filters, globalFiltersSchema, useGlobalFilters)`: prepares local/global filters for UQDC.

## Type Hygiene Checklist

- Keep `EntityBrowser` props, query configs, entity configs, actions, filters, and formatter options typed from `~/types/ebr`.
- If a renderer needs full row data, confirm the formatter option shape in nearby code before assuming `options.options.entity` or `options.entity`.
- When adding a new query processor name, action checker shape, component factory method, or store getter/action, update the local type shim if the compiler cannot see it.
- Avoid `any`; use local `EBRRecord`, `EBRValue`, or a domain entity interface when values are dynamic.
