# List

## Figma

- **Library name:** List (page: Data Display, frame: List)

## React

Both `OrderedList` and `UnorderedList` accept items via a **`data` array prop** (not via `children` + `<ListItem>`). `ListItem` is an internal component and is **not exported** from `@nutanix-ui/prism-reactjs`.

```tsx
import { OrderedList, UnorderedList } from '@nutanix-ui/prism-reactjs'
```

### Props (UnorderedList)

Extends `Omit<React.HTMLProps<HTMLUListElement>, 'ref' | 'data'>` — all standard `<ul>` HTML attributes are accepted in addition to the props below.

| Prop         | Type                      | Default             | Required | Notes                                               |
| ------------ | ------------------------- | ------------------- | -------- | --------------------------------------------------- |
| `data`       | `React.ReactNode[]`       | `[]`                | No       | Array of strings or elements rendered as list items |
| `appearance` | `UnorderedListAppearance` | —                   | No       | Visual style variant; only value is `NAVIGATION`    |
| `prefix`     | `PrefixType`              | `PrefixType.CIRCLE` | No       | Bullet marker style                                 |
| `className`  | `string`                  | —                   | No       | Additional CSS class                                |
| `data-test`  | `string`                  | —                   | No       | Test selector placed on the `<ul>` element          |

### Props (OrderedList)

Extends `Omit<JSX.IntrinsicElements['ol'], 'data'>` — all standard `<ol>` HTML attributes are accepted in addition to the props below.

| Prop        | Type                | Default | Required | Notes                                               |
| ----------- | ------------------- | ------- | -------- | --------------------------------------------------- |
| `data`      | `React.ReactNode[]` | `[]`    | No       | Array of strings or elements rendered as list items |
| `className` | `string`            | —       | No       | Additional CSS class                                |
| `data-test` | `string`            | —       | No       | Test selector placed on the `<ol>` element          |

### Anti-patterns

- Don't use `<ul>/<ol>/<li>` HTML tags — use `OrderedList` / `UnorderedList` instead.
- Don't pass `<ListItem>` as children — `ListItem` is internal and not exported. Pass items via the `data` prop array.
- Don't pass `children` — these components render items from the `data` array only.

<!-- SOURCE-API-START -->

### Import

```tsx
import { OrderedList, UnorderedList } from '@nutanix-ui/prism-reactjs'
```

`ListItem` is **not exported** from the package and must not be imported directly.

### Enums / Constants

#### `UnorderedListAppearance`

```tsx
import { UnorderedList } from '@nutanix-ui/prism-reactjs'
// Access via static member:
UnorderedList.APPEARANCE.NAVIGATION // 'navigation'
```

| Key          | Value          |
| ------------ | -------------- |
| `NAVIGATION` | `'navigation'` |

#### `PrefixType`

```tsx
import { UnorderedList } from '@nutanix-ui/prism-reactjs'
// Access via static member:
UnorderedList.PrefixType.CIRCLE // 'circle'
UnorderedList.PrefixType.NONE // 'none'
```

| Key      | Value      | Notes                 |
| -------- | ---------- | --------------------- |
| `CIRCLE` | `'circle'` | Default bullet marker |
| `NONE`   | `'none'`   | Removes bullet marker |

### Props Interfaces

#### `UnorderedListProps`

Extends: `Omit<React.HTMLProps<HTMLUListElement>, 'ref' | 'data'>`

| Prop         | Type                      | Description                                                |
| ------------ | ------------------------- | ---------------------------------------------------------- |
| `appearance` | `UnorderedListAppearance` | Visual variant. Only value: `NAVIGATION = 'navigation'`.   |
| `className`  | `string`                  | Add custom class name.                                     |
| `data`       | `React.ReactNode[]`       | Array of strings or elements rendered as list items.       |
| `data-test`  | `string`                  | Test selector attribute placed on the root `<ul>` element. |
| `prefix`     | `PrefixType`              | Bullet marker style. Default: `PrefixType.CIRCLE`.         |

#### `OrderedListProps`

Extends: `Omit<JSX.IntrinsicElements['ol'], 'data'>`

| Prop        | Type                | Description                                                |
| ----------- | ------------------- | ---------------------------------------------------------- |
| `className` | `string`            | Add custom class name.                                     |
| `data`      | `React.ReactNode[]` | Array of strings or elements rendered as list items.       |
| `data-test` | `string`            | Test selector attribute placed on the root `<ol>` element. |

#### `ListItemProps` (internal — not exported)

Extends: `Omit<React.HTMLProps<HTMLLIElement>, 'ref'>`

| Prop                      | Type     | Description                          |
| ------------------------- | -------- | ------------------------------------ |
| `data-test`               | `string` | Test selector attribute.             |
| _(all `<li>` HTML props)_ | —        | Standard `HTMLLIElement` attributes. |

### Static Members

- `UnorderedList.APPEARANCE` = `UnorderedListAppearance`
- `UnorderedList.PrefixType` = `PrefixType`

`OrderedList` exposes no static members.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### UnorderedList — basic usage

```tsx
import { Link, UnorderedList } from '@nutanix-ui/prism-reactjs'

const data = [
  'Verify existing AHV time zone configuration by running the below command from any CVM in the Nutanix cluster',
  'Find the time zone of your choice by listing the available ones via the below command from any CVM in the Nutanix Cluster',
  <span>
    Use vmkfstools to create the vmdk disk descriptor. Need more help? Visit{' '}
    <Link style={{ display: 'inline' }}>Nutanix Support Portal.</Link>
  </span>,
]

;<UnorderedList data={data} data-test="basic-usage" />
```

#### UnorderedList — wrapped (long) list items

```tsx
import { Link, UnorderedList } from '@nutanix-ui/prism-reactjs'

const data = [
  'Verify existing AHV time zone configuration by running the below command from any CVM in the Nutanix cluster. The command will display the current timezone setting for the hypervisor.',
  'Find the time zone of your choice by listing the available ones via the below command from any CVM in the Nutanix Cluster.',
  <span>
    Use vmkfstools to create the vmdk disk descriptor. Need more help? Visit{' '}
    <Link style={{ display: 'inline' }}>Nutanix Support Portal.</Link>
  </span>,
]

;<UnorderedList data={data} data-test="wrapped-list" />
```

#### UnorderedList — no bullet marker (`PrefixType.NONE`)

```tsx
import { Link, UnorderedList } from '@nutanix-ui/prism-reactjs'

const data = [
  'Verify existing AHV time zone configuration by running the below command from any CVM in the Nutanix cluster',
  'Find the time zone of your choice by listing the available ones via the below command from any CVM in the Nutanix Cluster',
  <span>
    Use vmkfstools to create the vmdk disk descriptor. Need more help? Visit{' '}
    <Link style={{ display: 'inline' }}>Nutanix Support Portal.</Link>
  </span>,
]

;<UnorderedList
  prefix={UnorderedList.PrefixType.NONE}
  data={data}
  data-test="prefix-none"
/>
```

#### OrderedList — basic usage

```tsx
import { Link, OrderedList } from '@nutanix-ui/prism-reactjs'

const data = [
  'Verify existing AHV time zone configuration by running the below command from any CVM in the Nutanix cluster',
  'Find the time zone of your choice by listing the available ones via the below command from any CVM in the Nutanix Cluster',
  <span>
    Use vmkfstools to create the vmdk disk descriptor. Need more help? Visit{' '}
    <Link style={{ display: 'inline' }}>Nutanix Support Portal.</Link>
  </span>,
]

;<OrderedList data={data} data-test="basic-usage" />
```

#### OrderedList — with a title using `StackingLayout`

```tsx
import {
  StackingLayout,
  Title,
  Link,
  OrderedList,
} from '@nutanix-ui/prism-reactjs'

const data = [
  'Verify existing AHV time zone configuration by running the below command from any CVM in the Nutanix cluster',
  'Find the time zone of your choice by listing the available ones via the below command from any CVM in the Nutanix Cluster',
  <span>
    Use vmkfstools to create the vmdk disk descriptor. Need more help? Visit{' '}
    <Link style={{ display: 'inline' }}>Nutanix Support Portal.</Link>
  </span>,
]

;<StackingLayout itemSpacing="30px" data-test="add-title">
  <Title size="h3">How to Set Nutanix AHV Timezone</Title>
  <OrderedList data={data} />
</StackingLayout>
```

#### OrderedList — wrapped (long) list items

```tsx
import { Link, OrderedList } from '@nutanix-ui/prism-reactjs'

const data = [
  'Verify existing AHV time zone configuration by running the below command from any CVM in the Nutanix cluster. The command will display the current timezone setting for the hypervisor.',
  'Find the time zone of your choice by listing the available ones via the below command from any CVM in the Nutanix Cluster.',
  <span>
    Use vmkfstools to create the vmdk disk descriptor. Need more help? Visit{' '}
    <Link style={{ display: 'inline' }}>Nutanix Support Portal.</Link>
  </span>,
]

;<OrderedList data={data} data-test="wrapped-list" />
```

### Usage Notes

- Prefer static enum accessors (`UnorderedList.APPEARANCE.NAVIGATION`, `UnorderedList.PrefixType.NONE`) over raw strings.
- Items in the `data` array can be plain strings, React elements, or any `ReactNode`. Wrap inline interactive content (e.g. links) in a `<span>` with `display: inline`.
- Use Prism layout components (`StackingLayout`, `FlexLayout`) around list components to add titles, spacing, or group related lists — do not apply custom CSS margin/padding directly.
- `data-test` (not `data-test-id`) is the correct prop name for test selectors on both components.

<!-- SOURCE-API-END -->
