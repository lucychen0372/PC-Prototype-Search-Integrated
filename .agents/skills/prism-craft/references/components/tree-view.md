# TreeView

## Figma

- **Library name:** Tree View (page: Data Display, frame: Tree View)

## React

Import: `import { TreeView, TreeItem } from '@nutanix-ui/prism-reactjs'`

> **Note:** `TreeItemCheckbox` is a deprecated type alias for `TreeItemProps`. Use `TreeItemProps` and
> `TreeView.TreeItem` instead. `TreeItem` is also exported directly from the package for
> standalone use, but the component is primarily intended to be used through `TreeView`.

---

### Props (`TreeView`)

`TreeViewProps` extends `React.HTMLProps<HTMLUListElement>`.

| Prop                 | Type                                                                                    | Default                | Required | Notes                                                                                                                                                                                            |
| -------------------- | --------------------------------------------------------------------------------------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `treeItemsData`      | `TreeItemProps[]`                                                                       | —                      | **yes**  | Tree data rendered by the component.                                                                                                                                                             |
| `type`               | `TreeItemProps['type']`                                                                 | `TreeItemType.DEFAULT` | no       | Applies the same item type to every node. See `TreeItemType` below.                                                                                                                              |
| `selectedIds`        | `TreeItemProps['id'][]`                                                                 | `[]`                   | no       | Controlled selected node ids. Do **not** include ids of parent nodes that have `subTreeItems`.                                                                                                   |
| `expandedIds`        | `TreeItemProps['id'][]`                                                                 | —                      | no       | Controlled expanded node ids. When provided the component operates in controlled expansion mode.                                                                                                 |
| `defaultExpandedIds` | `TreeItemProps['id'][] \| 'all'`                                                        | —                      | no       | Uncontrolled initial expansion. Pass `'all'` to expand every node on first render.                                                                                                               |
| `onSelectionChange`  | `(selectedIds: TreeViewProps['selectedIds']) => void`                                   | —                      | no       | Called when a node is selected/deselected. Receives the suggested new id list.                                                                                                                   |
| `onExpandedChange`   | `(expandedIds: TreeViewProps['expandedIds']) => void`                                   | —                      | no       | Called when a node is expanded or collapsed. Receives the suggested new id list.                                                                                                                 |
| `currentFocusId`     | `TreeItemProps['id']`                                                                   | —                      | no       | Controlled focus id. When provided, you must update it via `onFocusIdChange`. Omit for internal (uncontrolled) focus management.                                                                 |
| `onFocusIdChange`    | `(focusId: TreeViewProps['currentFocusId']) => void`                                    | —                      | no       | Called when focus moves. In controlled mode you must mirror the value back to `currentFocusId`.                                                                                                  |
| `wrapperProps`       | `React.HTMLProps<HTMLUListElement>`                                                     | `{}`                   | no       | Extra props forwarded to the root `<ul>` element. Use to attach `aria-label` / `aria-labelledby` (required for accessibility).                                                                   |
| `customRef`          | `{ readonly handleOnKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void }` | —                      | no       | Non-standard ref. After render the component attaches its `handleOnKeyDown` handler here, allowing external elements (e.g. an `<Input>`) to drive keyboard navigation without focusing the tree. |
| `tabIndex`           | `number`                                                                                | `0`                    | no       | Tab-stop for the root `<ul>`. Set to `-1` when keyboard focus is managed externally via `customRef`.                                                                                             |
| `hideMouseFocus`     | `boolean`                                                                               | —                      | no       | Suppresses the visual focus ring when the item is hovered with a mouse.                                                                                                                          |
| `treeItemIdPrefix`   | `string`                                                                                | `''`                   | no       | String prepended to every tree-item DOM id. Use unique values when rendering multiple trees on the same page.                                                                                    |
| `labelRenderer`      | `(props: TreeItemProps) => JSX.Element`                                                 | —                      | no       | Global custom label renderer applied to every node. Can be overridden per-node via `TreeItemProps.labelRenderer`.                                                                                |

---

### Enums / Constants

#### `TreeItemType` — `TreeView.TreeItem.TreeItemType`

Access via `TreeView.TreeItem.TreeItemType.<VALUE>` or import `TreeItem` directly and use
`TreeItem.TreeItemType.<VALUE>`.

| Value         | String          | Behaviour                                                                                                                                   |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFAULT`     | `'default'`     | Collapsible chevron **+** checkbox **+** text. Clicking a parent node toggles the checkbox; clicking the chevron expands/collapses.         |
| `COLLAPSIBLE` | `'collapsible'` | Collapsible chevron **+** text only (no checkbox). Keyboard: ↑/↓ to move focus, →/← to expand/collapse.                                     |
| `SELECTABLE`  | `'selectable'`  | Checkbox **+** text, **no** chevron. Parent nodes are not expandable; clicking selects. Keyboard: ↑/↓ to move focus, Space/Enter to select. |

#### `SelectionType` (enum exported from `TreeView`)

Returned internally by `getElementSelectionType`; useful when inspecting selection state.

| Value     | String      |
| --------- | ----------- |
| `all`     | `'all'`     |
| `partial` | `'partial'` |
| `none`    | `'none'`    |

---

### Static Members

- `TreeView.TreeItem` — the `TreeItem` component (use to access `TreeItemType`).

---

### `TreeItemProps` (data shape for `treeItemsData` entries)

| Prop                | Type                                               | Default                | Notes                                                                                                                                              |
| ------------------- | -------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                | `string`                                           | **required**           | Unique identifier within the tree.                                                                                                                 |
| `label`             | `string`                                           | **required**           | Display label text.                                                                                                                                |
| `type`              | `TreeItemType`                                     | `TreeItemType.DEFAULT` | Per-node type override; normally you set `type` on `<TreeView>` instead.                                                                           |
| `subTreeItems`      | `TreeItemProps[]`                                  | —                      | Child nodes. Presence signals the node is a parent/branch.                                                                                         |
| `subLabel`          | `string`                                           | —                      | Secondary text rendered below the label.                                                                                                           |
| `disabled`          | `boolean`                                          | —                      | Disables interaction on this node (propagates visually).                                                                                           |
| `idPrefix`          | `string`                                           | `''`                   | Per-node id prefix; typically set globally via `TreeView.treeItemIdPrefix`.                                                                        |
| `labelRenderer`     | `(props: TreeItemProps) => JSX.Element`            | —                      | Per-node label override; takes precedence over the `TreeView`-level `labelRenderer`.                                                               |
| `checkboxProps`     | `CheckboxProps`                                    | —                      | Extra props forwarded to the internal `<Checkbox>`. Useful to customise checkbox appearance.                                                       |
| `wrapperProps`      | `FlexLayoutProps`                                  | `{}`                   | Extra props forwarded to the item's wrapper element.                                                                                               |
| `treeLevelStart`    | `number`                                           | `1`                    | Override the visual starting indent level for this subtree. Useful when the root node should appear at a deeper indent (e.g. `treeLevelStart: 2`). |
| `treeLevel`         | `number`                                           | computed               | Depth level; managed internally by `TreeView`. Rarely set manually.                                                                                |
| `isSelected`        | `boolean`                                          | —                      | Managed internally by `TreeView` from `selectedIds`.                                                                                               |
| `isPartialSelected` | `boolean`                                          | —                      | Managed internally; true when some (but not all) leaf descendants are selected.                                                                    |
| `isExpanded`        | `boolean`                                          | —                      | Managed internally by `TreeView` from `expandedIds`.                                                                                               |
| `isFocused`         | `boolean`                                          | —                      | Managed internally by `TreeView`.                                                                                                                  |
| `isHover`           | `boolean`                                          | —                      | Managed internally by `TreeView`.                                                                                                                  |
| `onClick`           | `(event: React.MouseEvent<HTMLLIElement>) => void` | —                      | Managed internally.                                                                                                                                |
| `onMouseOver`       | `(event: React.MouseEvent<HTMLLIElement>) => void` | —                      | Managed internally.                                                                                                                                |
| `onMouseOut`        | `(event: React.MouseEvent<HTMLLIElement>) => void` | —                      | Managed internally.                                                                                                                                |
| `onMouseDown`       | `(event: React.MouseEvent<HTMLLIElement>) => void` | —                      | Managed internally.                                                                                                                                |
| `children`          | `React.ReactNode`                                  | —                      | Rendered child nodes; managed internally by `TreeView`.                                                                                            |

> **Internally-managed props** (`isSelected`, `isPartialSelected`, `isExpanded`, `isFocused`,
> `isHover`, `treeLevel`, event handlers) are set by `TreeView` at render time. You do **not**
> need to provide them in your `treeItemsData` array.

---

### TSX Examples

#### Basic (default type — checkbox + collapsible)

```tsx
import React, { useState } from 'react'
import { TreeView, StackingLayout, TextLabel } from '@nutanix-ui/prism-reactjs'

const treeItemsData = [
  {
    id: '1',
    label: 'Root Item 1',
    subTreeItems: [
      { id: '1-1', label: 'Child Item 1-1' },
      { id: '1-2', label: 'Child Item 1-2' },
    ],
  },
  {
    id: '2',
    label: 'Root Item 2',
    subTreeItems: [{ id: '2-1', label: 'Child Item 2-1' }],
  },
]

const MyTreeView = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>()

  return (
    <StackingLayout itemGap="S">
      <TextLabel id="basic-tree-label" type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
        Basic Tree
      </TextLabel>
      <TreeView
        treeItemsData={treeItemsData}
        treeItemIdPrefix="basic-tree"
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        defaultExpandedIds="all"
        wrapperProps={{ 'aria-labelledby': 'basic-tree-label' }}
      />
    </StackingLayout>
  )
}
```

#### Collapsible (no checkboxes)

```tsx
import React, { useState } from 'react'
import { TreeView, StackingLayout, TextLabel } from '@nutanix-ui/prism-reactjs'

const MyCollapsibleTree = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>()

  return (
    <StackingLayout itemGap="S">
      <TextLabel
        id="collapsible-tree-label"
        type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
      >
        Collapsible Tree
      </TextLabel>
      <TreeView
        type={TreeView.TreeItem.TreeItemType.COLLAPSIBLE}
        treeItemsData={treeItemsData}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        treeItemIdPrefix="collapsible-tree"
        defaultExpandedIds="all"
        wrapperProps={{ 'aria-labelledby': 'collapsible-tree-label' }}
      />
    </StackingLayout>
  )
}
```

#### Selectable (checkboxes, no expand chevron)

```tsx
import React, { useState } from 'react'
import { TreeView, StackingLayout, TextLabel } from '@nutanix-ui/prism-reactjs'

const MySelectableTree = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>()

  return (
    <StackingLayout itemGap="S">
      <TextLabel
        id="selectable-tree-label"
        type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
      >
        Selectable Tree
      </TextLabel>
      <TreeView
        type={TreeView.TreeItem.TreeItemType.SELECTABLE}
        treeItemsData={treeItemsData}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        treeItemIdPrefix="selectable-tree"
        defaultExpandedIds="all"
        wrapperProps={{ 'aria-labelledby': 'selectable-tree-label' }}
      />
    </StackingLayout>
  )
}
```

#### Custom label renderer (icon + text)

```tsx
import React, { useState } from 'react'
import {
  TreeView,
  FlexLayout,
  FolderIcon,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { TreeItemProps } from '@nutanix-ui/prism-reactjs'

const treeLabelRender = ({ subTreeItems, label, id }: TreeItemProps) => {
  const hasSubtree = subTreeItems && subTreeItems.length > 0
  return (
    <FlexLayout
      itemGap="S"
      alignItems="center"
      id={`treeitem-${id}-text-label`}
    >
      {hasSubtree && <FolderIcon />}
      <span>{label}</span>
    </FlexLayout>
  )
}

const MyCustomLabelTree = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>()

  return (
    <StackingLayout itemGap="S">
      <TextLabel
        id="custom-label-tree-label"
        type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
      >
        Custom Label Renderer Tree
      </TextLabel>
      <TreeView
        treeItemsData={treeItemsData}
        treeItemIdPrefix="custom-label-tree"
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        defaultExpandedIds="all"
        labelRenderer={treeLabelRender}
        wrapperProps={{ 'aria-labelledby': 'custom-label-tree-label' }}
      />
    </StackingLayout>
  )
}
```

#### `subLabel` — secondary text under each label

```tsx
import React, { useState } from 'react'
import { TreeView } from '@nutanix-ui/prism-reactjs'

const treeItemsData = [
  {
    id: 'parent-1',
    label: 'Root Item 1',
    subLabel: 'Expanded parent with children',
    subTreeItems: [
      { id: 'child-1-1', label: 'Child Item 1-1', subLabel: 'No children' },
      { id: 'child-1-2', label: 'Child Item 1-2', subLabel: 'No children' },
    ],
  },
  {
    id: 'leaf-1',
    label: 'Root Item 2',
    subLabel: 'Leaf node — no children',
  },
]

const MySubLabelTree = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [expandedIds, setExpandedIds] = useState<string[]>(['parent-1'])

  return (
    <TreeView
      treeItemsData={treeItemsData}
      selectedIds={selectedIds}
      expandedIds={expandedIds}
      onSelectionChange={setSelectedIds}
      onExpandedChange={setExpandedIds}
      treeItemIdPrefix="sublabel-tree"
      wrapperProps={{ 'aria-label': 'Items with sub-labels' }}
    />
  )
}
```

#### Externally controlled focus via `customRef` (MultiSelect pattern)

Use this pattern when a trigger element (e.g. an `<Input>`) should drive keyboard navigation
inside the tree without the tree itself receiving tab focus.

```tsx
import React, { useState, useMemo } from 'react'
import { TreeView, Input } from '@nutanix-ui/prism-reactjs'

const treeItemsData = [
  {
    id: 'all',
    label: 'All',
    treeLevelStart: 2, // indent root to visual level 2
    subTreeItems: [
      { id: 'a4', label: 'puppyfood' },
      {
        id: 'group1',
        label: 'Fruits',
        subTreeItems: [
          { id: 'a5', label: 'Peach', disabled: true },
          { id: 'a6', label: 'Apple' },
        ],
      },
    ],
  },
]

const MyControlledFocusTree = () => {
  const [currentFocusId, setCurrentFocusId] = useState<string>()
  const [selectedIds, setSelectedIds] = useState<string[]>(['a4', 'a6'])
  const [expandedIds, setExpandedIds] = useState<string[]>()
  const treeViewCustomRef = useMemo(() => ({}), [])

  const inputValue = selectedIds.join(', ')

  return (
    <div>
      <Input
        value={inputValue}
        onChange={() => undefined}
        onKeyDown={(e) => treeViewCustomRef.handleOnKeyDown?.(e)}
        onFocus={() => setCurrentFocusId(treeItemsData[0].id)}
        onBlur={() => setCurrentFocusId(undefined)}
      />
      <TreeView
        type={TreeView.TreeItem.TreeItemType.SELECTABLE}
        treeItemsData={treeItemsData}
        treeItemIdPrefix="controlled-focus-tree"
        currentFocusId={currentFocusId}
        onFocusIdChange={setCurrentFocusId}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        expandedIds={expandedIds}
        onExpandedChange={setExpandedIds}
        defaultExpandedIds="all"
        customRef={treeViewCustomRef}
        tabIndex={-1}
        hideMouseFocus={true}
        wrapperProps={{
          'aria-label': 'Fruit picker',
          onMouseDown: (e) => e.preventDefault(),
        }}
      />
    </div>
  )
}
```

---

### Keyboard Navigation

| Key               | Behaviour                                                                       |
| ----------------- | ------------------------------------------------------------------------------- |
| `↑` / `↓`         | Move focus to the previous / next visible node                                  |
| `→`               | Expand a collapsed branch; if already expanded, move focus to first child       |
| `←`               | Collapse an expanded branch; if already collapsed, move focus to parent         |
| `Space` / `Enter` | Select the focused node (DEFAULT and SELECTABLE types)                          |
| `Tab`             | Exit the tree entirely; moves focus to the next interactive element on the page |

---

### Accessibility

- The root `<ul>` renders with `role="tree"` and `aria-multiselectable="true"`.
- Each item renders as `role="treeitem"` with `aria-selected`, `aria-level`, `aria-expanded`, and `aria-disabled` set automatically.
- **You must supply an accessible name** via `wrapperProps['aria-labelledby']` (preferred) or `wrapperProps['aria-label']`.
- Tab exits the tree; any content between the tree and the next interactive element will be skipped by keyboard users. Design page layouts accordingly.
- The component is intended for **complex, deeply-nested hierarchies**. For simpler cases prefer a flat list or the `Accordion` component.
- Always test with a screen reader in the context of your application; additional labelling or focus management may be needed beyond what the component provides.

---

### Anti-patterns

- Don't build recursive `<ul>`/`<li>` list components manually — use `TreeView`.
- Don't include parent-node ids in `selectedIds`; only include leaf ids.
- Don't omit `aria-labelledby` or `aria-label` from `wrapperProps`.
- Don't use the old `data`/`expandedKeys`/`selectedKeys`/`onExpand`/`onSelect`/`checkedKeys`/`onCheck` API — those props do not exist in the v2 component. The correct props are `treeItemsData`, `expandedIds`, `selectedIds`, `onExpandedChange`, `onSelectionChange`.

<!-- SOURCE-API-END -->
