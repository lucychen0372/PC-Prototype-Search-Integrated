# EBR Joins, Side Panels, Details, Export, And Hooks

Read this when implementing joined data, side panels, details-only EBR, CSV export, labels, row expansion, or hook components.

## Joined Data

Treat EBR joins as client-side joined data unless local product code already has a custom processor that does more.

Shape:

```ts
joinedEntityTypes: [
  {
    entityType: 'host',
    schema: HostSchema,
    joinType: 'client',
    joinAttribute?: string | ((entity) => string | string[]),
    joinedEntityAttribute?: string,
    pollingSec?: number | ((...) => number)
  }
]
```

EBR flattens joined attributes into slash notation:

```ts
'host/hostName'
'cluster/name'
```

## Client-Side Joins

Use when joined data is readonly decoration for the current page.

Requirements:

- Primary schema has `joinedEntityTypes` with `joinType: 'client'`.
- `joinAttribute` maps parent entity to joined entity ID(s).
- Joined entity has its own schema.
- Joined entity query processor is configured in `queryProcessorsMap`.
- Perspective displays slash-qualified joined attributes.
- Parent join attributes needed to fetch joined data are in `helperAttributes`.

Limitations:

- No sorting on client-joined attributes.
- No filtering on client-joined attributes.
- No grouping on client-joined attributes.

## Rendering Joined Data

Use `JoinedDataRenderer` for generic joined display:

```tsx
<JoinedDataRenderer
  joinedEntityType="host"
  joinedEntityId={parentEntity.node}
  joinedEntityAttribute="hostType"
/>
```

Custom renderers can also read slash-qualified joined fields from EBR options, depending on the factory/render path.

## Side Panels

Side panels open from cells rendered with `sidePanelLink`.

Perspective config:

```ts
sidePanels: {
  showFooter: boolean,
  linkDetails: boolean,
  maxEntities?: number,
  tabs: {
    [tabId]: { ...tabProps }
  }
}
```

Custom render setup:

```ts
customRenders: {
  name: {
    formatter: 'sidePanelLink'
  }
}
```

Factory setup:

```tsx
case COMPONENT_IDS.EB_SIDE_PANEL:
  return <MySidePanel {...options} />;
```

Behavior:

- Default `sidePanelLink` renderer creates an accessible link and calls `onClick(entityId, event)`.
- Ctrl/cmd click can open modal mode.
- Side panel display collapses other panels such as filters/group list as needed.
- Side panel size is persisted per entity type in local storage.
- Sizes include `sm` and `lg`; modes include inline and modal.
- When open, EBR narrows the table to the first four columns and adjusts controls for space.

## Details Mode

Use `detailsEntityInfo` to show details or details actions for a specific entity.

```ts
detailsEntityInfo: {
  detailsViewOnly?: true,
  entity: {
    entityType,
    entityId,
    ...extraActionData
  },
  onClose?: () => void
}
```

When `detailsViewOnly` is true, EBR renders details/actions only instead of the full grid. This is useful on product detail pages that want to reuse EBR action buttons.

The factory usually handles the details pane/details action component ID and returns the product-specific details action UI.

## Export

EBR supports CSV export.

Top-level `exportSettings`:

```ts
exportSettings: {
  visible: boolean,
  maxRows?: number,
  pageSize?: number,
  forceExport?: boolean,
  exportOptions?: {
    all?: boolean | { labelFn, isDisabledFn },
    filtered?: boolean | { labelFn, isDisabledFn },
    selected?: boolean | { labelFn, isDisabledFn },
    [customOption]?: boolean | { labelFn, isDisabledFn }
  }
}
```

Behavior:

- Absent/null `exportSettings` disables export.
- `visible: true` enables export.
- Default export page size is 50 in EBR constants.
- Tune `pageSize` to the backend/export limits used by the product page.
- Custom export options are passed to UQDC during export fetching.

Perspective export:

- `entityAttributes.exportAttributes` chooses CSV columns.
- If omitted, export uses display/raw behavior.
- `customRenders[attr].export(entity)` controls exported cell value.
- Export functions must not mutate the entity object.

## Labels

Labels are controlled by:

- Top-level `allowLabels`.
- Schema attributes of type `label`.
- Exported `EBLabelIcon`.

Enable labels only when permissions and product capabilities support them.

## Hooks

Custom factories can implement:

- `COMPONENT_IDS.EB_HOOK_COMPONENT`: placed between the filter bar and grid.
- `COMPONENT_IDS.EB_HOOK_DROPDOWN`: placed near focus/group-by controls.

Default factory returns null for both. Use hooks sparingly for page-specific affordances that belong inside the EBR toolbar/canvas.
