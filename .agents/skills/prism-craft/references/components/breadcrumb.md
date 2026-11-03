# Breadcrumb

## Figma

- **Library name:** Navigation Breadcrumb (page: N/A, frame: Navigation Breadcrumb)
- **Also matches:** Breadcrumb Dropdown, Breadcrumb Basic

## React

Import: `import { Breadcrumb, BreadcrumbItem } from '@nutanix-ui/prism-reactjs'`

### Compound-component pattern

`Breadcrumb` is a compound component. Every direct child should be a `BreadcrumbItem`. The parent `Breadcrumb` automatically:

- Renders as a `<nav>` element with `aria-label`.
- Wraps children in an `<ol>` list (fixed `itemSpacing="15px"`) with one `<li>` per `BreadcrumbItem`.
- Injects `aria-current="page"` on the **last** `BreadcrumbItem`.
- Propagates `appearance` down to every direct `BreadcrumbItem` child via `React.cloneElement`. Non-`BreadcrumbItem` children are rendered as-is without cloning.

### TSX Examples

#### Minimal working example

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
;<Breadcrumb aria-label="Navigation">
  <BreadcrumbItem>
    <Link onClick={() => navigate('/home')}>Home</Link>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <Link onClick={() => navigate('/endpoints')}>Endpoints</Link>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
      Unified Endpoints
    </TextLabel>
  </BreadcrumbItem>
</Breadcrumb>
```

#### Single item

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
;<Breadcrumb>
  <BreadcrumbItem>
    <TextLabel title="Page 1" type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
      Page 1
    </TextLabel>
  </BreadcrumbItem>
</Breadcrumb>
```

#### Multiple items (static list)

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'

const itemsList = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5']

;<Breadcrumb>
  {itemsList.map((id) => (
    <BreadcrumbItem key={id}>
      <TextLabel title={id} type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
        {id}
      </TextLabel>
    </BreadcrumbItem>
  ))}
</Breadcrumb>
```

#### Alternative appearance (lighter background)

Use `appearance="alternative"` when the breadcrumb sits on a light/body background:

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  FlexLayout,
  Link,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout background="body" padding="5px">
  <Breadcrumb appearance="alternative">
    <BreadcrumbItem>
      <Link onClick={() => navigate('/page1')}>Page 1</Link>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <Link onClick={() => navigate('/page2')}>Page 2</Link>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>Page 3</TextLabel>
    </BreadcrumbItem>
  </Breadcrumb>
</FlexLayout>
```

#### Custom `itemContainerProps` padding (e.g. when child is a Badge)

```tsx
import { Breadcrumb, BreadcrumbItem, Badge } from '@nutanix-ui/prism-reactjs'
;<Breadcrumb>
  <BreadcrumbItem itemContainerProps={{ padding: '0px-5px' }}>
    <Badge type={Badge.BadgeTypes.TAG} count="cluster" />
  </BreadcrumbItem>
</Breadcrumb>
```

### Anti-patterns

- Don't build breadcrumbs with `>` separators and raw links — use `Breadcrumb` + `BreadcrumbItem`.
- Always provide `aria-label` on `Breadcrumb` for the navigation landmark.
- Don't pass plain text or non-`BreadcrumbItem` children directly to `Breadcrumb`; the auto-injection of `aria-current` and `appearance` only applies to `BreadcrumbItem` children.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Breadcrumb, BreadcrumbItem } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `BreadcrumbProps`

Extends: `FlexLayoutProps` (which extends `FlexItemProps`). All FlexLayout layout props (`itemSpacing`, `padding`, `alignItems`, `justifyContent`, `background`, `htmlTag`, etc.) are forwarded to the root `<nav>` element.

| Prop         | Type                         | Required | Default        | Description                                                                                                                                                       |
| ------------ | ---------------------------- | -------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`   | `React.ReactNode`            | Yes      | —              | Should be one or more `BreadcrumbItem` elements.                                                                                                                  |
| `appearance` | `'default' \| 'alternative'` | No       | `'default'`    | Visual style; propagated automatically to all direct `BreadcrumbItem` children via `React.cloneElement`.                                                          |
| `aria-label` | `string`                     | No       | `'Breadcrumb'` | Accessible label for the `<nav>` landmark.                                                                                                                        |
| `className`  | `string`                     | No       | —              | Additional CSS class on the root element.                                                                                                                         |
| `data-test`  | `string`                     | No       | —              | Typed test-selector attribute on the interface. Note: the official source examples also use the plain HTML attribute `data-test-id` (not typed in the interface). |

#### `BreadcrumbItemProps`

Extends: `FlexLayoutProps`. All FlexLayout props are forwarded to the root `<li>` element (except `id`, which is always replaced by a derived wrapper ID — see Behaviour notes below).

| Prop                 | Type                         | Required | Default                   | Description                                                                                                                                                                                                                                                                                                                                              |
| -------------------- | ---------------------------- | -------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`           | `React.ReactNode`            | No       | —                         | Content rendered inside the item (typically a `Link` or `TextLabel`).                                                                                                                                                                                                                                                                                    |
| `itemContainerProps` | `FlexLayoutProps`            | No       | `{ padding: '0px-10px' }` | Props applied to the inner content-wrapper `FlexLayout`. Defaults of `itemSpacing="10px"` and `alignItems="center"` on the inner container are overridable via this prop. The inner container `id` is always derived (see Behaviour notes) unless explicitly set here via `itemContainerProps.id`.                                                       |
| `appearance`         | `'default' \| 'alternative'` | No       | `'default'`               | Injected automatically by the parent `Breadcrumb`; only override manually when rendering `BreadcrumbItem` in isolation.                                                                                                                                                                                                                                  |
| `className`          | `string`                     | No       | —                         | Additional CSS class on the root `<li>` element.                                                                                                                                                                                                                                                                                                         |
| `id`                 | `string`                     | No       | auto-generated            | Base identifier used to derive both the outer `<li>` wrapper ID (`breadcrumb-item-wrapper-<id>`) and the inner container ID (`breadcrumb-item-<id>`). When omitted, a `uniqueId` value is generated. The outer wrapper `id` is always the derived value regardless of `id` prop; the inner container `id` can be overridden via `itemContainerProps.id`. |

### Behaviour notes

- The `Breadcrumb` renders as `<nav>` → `<ol>` (with fixed `itemSpacing="15px"`) → one `<li>` per `BreadcrumbItem`.
- The **last** `BreadcrumbItem` automatically receives `aria-current="page"`. This is injected via `React.cloneElement` only for children whose `type === BreadcrumbItem`. Other children are rendered unchanged.
- `BreadcrumbItem` renders: `BreadcrumbTailIcon` → inner content `FlexLayout` → `BreadcrumbHeadIcon`. Both icons are hidden from assistive technology (`aria-hidden="true"`).
- The inner content container has hardcoded `itemSpacing="10px"` and `alignItems="center"` as defaults. These **can** be overridden by passing the same props inside `itemContainerProps` (the spread comes after the defaults). However, the inner container `id` is **always** the derived value and ignores the outer spread; use `itemContainerProps.id` to override the inner container's `id` specifically.
- The outer `<li>` wrapper `id` is always the derived `breadcrumb-item-wrapper-<commonIdentifier>` value and cannot be changed via any prop.
- `BreadcrumbItem` IDs are auto-generated with `lodash.uniqueId` when no explicit `id` prop is supplied.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic page-navigation breadcrumb

```tsx
import { useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  TextLabel,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const renderLabel = (label: string) => (
  <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>{label}</TextLabel>
)

const renderLink = (label: string, onClick: () => void) => (
  <Link onClick={onClick}>{label}</Link>
)

const pages = {
  page1: {
    breadcrumbItems: [{ key: 'page1', label: renderLabel('Page 1') }],
  },
  page2: {
    breadcrumbItems: [
      {
        key: 'page1',
        label: (go: (p: string) => void) =>
          renderLink('Page 1', () => go('page1')),
      },
      { key: 'page2', label: renderLabel('Page 2') },
    ],
  },
  page3: {
    breadcrumbItems: [
      {
        key: 'page1',
        label: (go: (p: string) => void) =>
          renderLink('Page 1', () => go('page1')),
      },
      {
        key: 'page2',
        label: (go: (p: string) => void) =>
          renderLink('Page 2', () => go('page2')),
      },
      { key: 'page3', label: renderLabel('Page 3') },
    ],
  },
}

const MyBreadcrumb = () => {
  const [currentPage, setPage] = useState<'page1' | 'page2' | 'page3'>('page3')

  return (
    <StackingLayout>
      <Breadcrumb>
        {pages[currentPage].breadcrumbItems.map(({ key, label }) => (
          <BreadcrumbItem key={key}>
            {typeof label === 'function' ? label(setPage) : label}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </StackingLayout>
  )
}
```

#### Entities examples

> **Accessibility warning:** The entity-dropdown pattern shown below (badges + popovers inside breadcrumb items) is retained for backward compatibility. It is not recommended for new work. The accessible breadcrumb pattern should consist entirely of a list of links. Consult your designer for alternatives. Support for this usage will be deprecated in a future version.

```tsx
// See Breadcrumb.examples.md in the Prism source for the full runnable version.
// Key structural pattern:
<Breadcrumb>
  {entitiesOrder.map((entityType, index) => (
    <BreadcrumbItem
      key={`${entityType}-${index}`}
      itemContainerProps={{ padding: '0px-5px' }}
    >
      {/* Badge + Link/TextLabel + optional Popover trigger */}
    </BreadcrumbItem>
  ))}
</Breadcrumb>
```

### Usage Notes

- Use `BreadcrumbItem` (not raw `Link`/`TextLabel`) as direct children of `Breadcrumb` so that separator icons and `aria-current` are injected correctly.
- The last item in the trail represents the current page and should render a `TextLabel`, not a `Link`.
- Non-last items should render a `Link` so users can navigate back.
- Use Prism layout props (`itemSpacing`, `padding`, `alignItems`, `justifyContent`) on `BreadcrumbItem` and `itemContainerProps` instead of custom CSS for spacing.
- `appearance="alternative"` is designed for use against light/body backgrounds (e.g. inside a `FlexLayout background="body"` wrapper).
- `BreadcrumbHeadIcon` and `BreadcrumbTailIcon` are exported from `@nutanix-ui/prism-reactjs` but are rendered automatically by `BreadcrumbItem` — import them only if building a custom breadcrumb-like component outside this pattern.

<!-- SOURCE-API-END -->
