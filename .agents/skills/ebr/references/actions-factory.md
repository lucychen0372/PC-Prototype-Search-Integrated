# EBR Actions And Component Factory

Read this when implementing custom cells, popups, action buttons, selection behavior, capability checks, detail actions, hooks, or renderer overrides.

## Component Factory Contract

Custom rendering is configured through perspective `customRenders` and resolved by `ebComponentFactory`.

Factory shape:

```tsx
class MyFactory {
  setDefaultFactory(factory) {
    this.defaultFactory = factory
  }

  getComponent(componentId, options) {
    switch (componentId) {
      case 'myFormatter':
        return <MyFormatter {...options} />
      default:
        return this.defaultFactory.getComponent(componentId, options)
    }
  }

  getFilterParser() {
    return this.parser
  }
}
```

Rules:

- Implement `setDefaultFactory`; EBR logs an error and falls back if it is missing.
- Delegate unknown component IDs to the default factory.
- Keep formatter IDs in perspectives, factory cases, export functions, side panel tabs, and popup IDs consistent.
- Prefer `COMPONENT_IDS` constants from `@nutanix-ui/ebr-ui` for built-in extension points. Custom formatter names are plain strings and must match `customRenders.formatter` exactly.

## Custom Renders

Perspective `customRenders` can include:

- `formatter`: component ID/name sent to the factory.
- `formatterOptions`
- `columnWidth`
- `className`
- `align`
- `sortable`
- `tooltip`
- `export`: function used for CSV export.

If a custom renderer needs attributes that are not displayed, add them to `helperAttributes`.

## Useful Default Component IDs

Factory overrides commonly target:

- Grid views: `grid`, `gridChild`
- Titles and grouping: `vizTitle`, `groupTitle`, `groupTabs`, `groupsPanel`, `groupsPanelListItem`, `groupbySelector`
- Filters/query UI: `filtersPanel`, `filterBarPanel`, `queryOptionsPanel`
- Actions: `actionsPanel`, `detailsActionsPanel`, `rightClickActionMenu`
- Popup: `popupContainer`
- Details/side panel links: `detailsLink`, `sidePanelLink`
- Selectors/export: entity type selector, visualization selector, export view, fetch selected entities view
- Hooks: `hookComponent`, `hookDropdown`

Prefer imported `COMPONENT_IDS` constants when available instead of string literals.

Common source-backed constants include:

- `COMPONENT_IDS.POPUP_CONTAINER`: action popup/modal container.
- `COMPONENT_IDS.EB_SIDE_PANEL`: side panel body.
- `COMPONENT_IDS.EB_SIDE_PANEL_LINK`: built-in side panel link formatter.
- `COMPONENT_IDS.EB_DETAILS_PANE`: details pane.
- `COMPONENT_IDS.EB_DETAILS_PANE_ACTIONS_PANEL`: details pane action panel.
- `COMPONENT_IDS.EB_HOOK_COMPONENT`: custom content between filter bar and grid.
- `COMPONENT_IDS.EB_HOOK_DROPDOWN`: custom dropdown near focus/group controls.
- `COMPONENT_IDS.FILTERS_PANEL`, `FILTER_BAR_PANEL`, `QUERY_OPTIONS_PANEL`: filter/query UI override points.

## Actions Config

Actions are declared as metadata and processed with `EBActionsUtil.processActionsConfig`.

Raw config shape:

```ts
{
  actions: {
    primary?: string[],
    secondary?: string[],
    right_click?: string[],
    dropdowns?: string[],
    details?: string[],
    detailsDropdowns?: string[]
  },
  actionProps: {
    [actionId]: {
      id,
      label,
      criteria,
      componentProps,
      children?,
      needsConfirmation?,
      confirmationMessage?,
      icon?,
      tooltip?,
      disabled?,
      hidden?
    }
  }
}
```

Processed groups:

- `primaryActions`
- `secondaryActions`
- `rightClickActions`
- `dropdownBtnActions`
- `detailsActions`
- `detailsDropdownBtnActions`

Action children:

- `children` references action IDs from `actionProps`.
- Separators use `--`.
- Source supports grandchildren, but comments say only one level is currently allowed.
- Missing action props throw during processing.

## Capability Checkers

Register checkers with:

```ts
EBActionsUtil.registerCapabilityChecker(entityType, checker)
```

Checker can be a function or a record of named checks. Criteria shape:

```ts
criteria: {
  checks: ['onlyOneSelected', 'canDelete'],
  match: 'all'
}
```

Built-ins include:

- `onlyOneSelected`
- `atLeastOneSelected`

Checkers return:

```ts
{ state: 'enabled' | 'disabled' | 'hidden', reason?: string }
```

Utilities:

- `getSelectionOptions()` computes select-all, unselected IDs, total count, and selected entity count.
- `getCapabilityEnabledEntities()` filters selected entities that can perform an action.
- Joined data is available to checkers through `options.joinedData` where joins are configured.

## Popup And Action UI

EBR opens action UI through the popup container. Custom factory should handle the popup container component ID and switch on the current action:

```tsx
case COMPONENT_IDS.POPUP_CONTAINER:
  return <MyPopupContainer {...DataUtil.getActionComponentArgs()} />;
```

Action UI receives EBR store helpers from `DataUtil.getActionComponentArgs()`, including getters and actions such as:

- `refreshQuery`
- `closePopup`
- `showPopup`
- selected entities/options
- offsets and metadata
- filters
- joined data

Keep capability checks close to the action config and return disabled/hidden states with useful reasons. After a successful mutation, refresh the EBR query through the action component args.

Popup containers that need EBR state should use EBR's internal store connector:

```tsx
import { connect } from '@nutanix-ui/ebr-ui'

const mapStateToProps = (state, ownProps) => ({
  currentPopup: ownProps.Getters.getCurrentPopup(state),
  selectedEntityType: ownProps.Getters.getSelectedEntityType(state),
  selectionInfo: ownProps.Getters.getCurrentSelectedEntities(state),
  groupByInfo: ownProps.Getters.getGroupByInfo(state),
  currentTotalMembers: ownProps.Getters.getCurrentTotalMembers(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  closePopup: () => dispatch(ownProps.actions.closePopup()),
  refreshQuery: () => dispatch(ownProps.actions.refreshQuery()),
  removeEntitySelections: (entityType, entityIds, selectedGroup) =>
    dispatch(
      ownProps.actions.removeEntitySelections(
        entityType,
        entityIds,
        selectedGroup,
      ),
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer)
```

Use `connect` from `@nutanix-ui/ebr-ui`, not `react-redux`. The EBR store is scoped to each `EntityBrowser` instance, and EBR injects `Getters` and `actions` through the component factory args.

## Details Actions

Details-only EBR can reuse action button plumbing without rendering the grid. See `references/joins-side-panels-export.md` for details mode.
