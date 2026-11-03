# EBR Core API

Read this when creating or reviewing an EBR instance, schema, entity config, or perspective/focus.

## Top-Level Component

EBR is exported as `EntityBrowser` from `@nutanix-ui/ebr-ui`. Aphrodite commonly wraps it with `EntityBrowserView`, which adds defaults and navigation-context behavior.

Important raw `EntityBrowser` props:

- `ebId`: required stable instance ID for store keying and persistence.
- `appId`: app identifier for user-data persistence.
- `entityTypes`: required array of entity type IDs.
- `entityTypeDisplayNames`: `{ [entityType]: { singular, plural } }`.
- `selectedEntityType`: initially selected entity type.
- `entityConfigs`: required metadata per entity type.
- `entityGroupings`: optional grouped entity selector model.
- `groupingType`: `'tabs'` or `'list'`; use list when group count is high.
- `queryConfig`: query processor and data behavior.
- `ebComponentFactory`: app-provided factory for custom renderers, popups, side panels, hooks, and overrides.
- `detailsEntityInfo`: opens details mode.
- `showFiltersBar`, `showFiltersPanel`, `filtersPanelCollapsed`, `showFiltersButton`, `showModifyFiltersLink`, `showSuggestedFilters`, `showFavoriteFilters`.
- `showPageSizeSelector`, `allowCustomFocuses`, `allowLabels`.
- `persistQuerySettingsToSession`.
- `telemetryName`, `notificationsContainer`, `baseHeadingLevel`, `language`.
- `exportSettings`: null/absent disables export.

`EntityBrowserView` defaults observed in Aphrodite:

- Derives `entityTypes`, display names, and groupings from a single `entityType`.
- Defaults `queryConfig.pollingSec` to the product long-polling interval.
- Defaults query processor to `GroupsV3UQDC`.
- Defaults `persistQuerySettingsToSession` to true.
- Converts URL/navigation context into initial local filters and default perspective.

## Entity Config

Each entity type gets a config:

```ts
{
  schema,
  perspectives,
  actions?,
  filters?,
  gettingStarted?,
  defaultPerspective?
}
```

Use config generators for large product pages so schema, perspectives, actions, permissions, feature flags, and labels stay coordinated.

## Schema

Schema describes every attribute EBR may display, fetch, filter, sort, group, join, export, or pass to renderers/actions.

```ts
{
  idAttribute: string,
  nameAttribute: string,
  attributes: Record<string, AttributeInfo>,
  joinedEntityTypes?: JoinedEntityType[],
  schemaValidator?: (attributeName) => { isValid: boolean, reason?: string }
}
```

Common attribute fields:

- `type`: examples include `int`, `enum`, `enum_radio`, `string`, `protocolport`, `searchselect`, `label`, `objectStr`, `boolean`, `group`.
- `subType`: `int`, `string`, `time`, `datetime`, `custom`.
- `displayName`, `values`, `units`, `continuous`, `operators`.
- `onSearch`: async callback for `searchselect`, returning `{ key, label }[]`.
- `isRange`, `validate`, `isRangeRequired`.

Use `schemaValidator` for dynamic/custom metrics and saved custom views. Invalid attributes are excluded from valid attributes and can be flagged or removed from perspectives.

## Perspectives / Focuses

Perspectives define the user-facing view of an entity. EBR also calls them focuses. Use `_common_` for shared entity attributes and named perspectives such as `General` or `Performance` for display columns.

Important `entityAttributes` keys:

- `idAttribute`
- `primaryAttribute`
- `displayAttributes`
- `exportAttributes`
- `groupByAttributes`
- `groupByAttributesMap`
- `sortByAttributes`
- `filterByAttributes`
- `helperAttributes`
- `virtualAttributes`
- `childAttributes`
- `summaries`
- `defaultGroupByAttribute`
- `defaultSortingAttribute`
- `customRenders`
- `columnGroups`
- `rowClassname`

Query attributes are derived from `primaryAttribute`, `displayAttributes`, `helperAttributes`, `childAttributes`, and `defaultColorByAttribute`, excluding virtual attributes. If a renderer, action checker, link, join, export function, or popup needs a field, put it in `helperAttributes` when it is not displayed.

## Visualizations

Grid is the implemented/default visualization. Constants include `grid`, `gridChild`, `tile`, and `map`, but production usage is mostly grid.

Use this shape when explicit visualization config is needed:

```ts
visualizations: [{ name: 'grid', entityAttributes: {} }]
```

## Empty / Getting Started

An entity config can include:

```ts
gettingStarted: {
  createActionId?: string,
  GettingStartedComponent?: ReactNode
}
```

Use this for first-run and no-results flows where product UX needs more than the default empty renderer.
