# OrderedList

## Figma

- **Library name:** List (page: N/A, frame: List)
- **Figma spec:** [Spec-Doc node 28522-125895](https://www.figma.com/design/KVbKkR0QAFRbTVpwysQLWw/Spec-Doc?version-id=2269294577004838050&node-id=28522-125895)

## React

Import: `import { OrderedList } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { OrderedList } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `OrderedListProps`

Extends: `Omit<JSX.IntrinsicElements['ol'], 'data'>`

All standard `<ol>` HTML attributes are accepted via rest spread (e.g. `id`, `style`, `aria-*`, `data-*`) except `data`, which is replaced by the typed prop below.

| Prop        | Type                | Default | Required | Description                                                                                                              |
| ----------- | ------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `className` | `string`            | —       | No       | Additional CSS class applied to the `<ol>` element.                                                                      |
| `data`      | `React.ReactNode[]` | `[]`    | No       | Ordered array of list items. Each entry may be a string, number, or any React node (e.g. `<span>` with inline `<Link>`). |
| `data-test` | `string`            | —       | No       | Test automation selector placed directly on the `<ol>` element.                                                          |

> **Note:** `data-test-id` and other `data-*` attributes are also accepted through the HTML spread; `data-test` is the only explicitly typed variant.

### Rendered Structure

```
<ol class="ntnx-ordered-list ntnx">        ← OrderedList root
  <li class="ntnx ntnx-list-item">…</li>   ← internal ListItem (not exported)
  <li class="ntnx ntnx-list-item">…</li>
</ol>
```

`ListItem` is an internal styled `<li>` component. It is not exported from `@nutanix-ui/prism-reactjs` and should not be imported directly.

### Visual Behaviour

- `list-style-type: none` — native browser numbering is suppressed.
- Each `<li>` renders a **circular counter badge** via a CSS `::before` pseudo-element using `counter-increment: step-counter`. The badge displays the step number inside a 20 × 20 px circle with a border, neutral background, and secondary label colour.
- Consecutive `<li>` elements receive `margin-top: 10px` spacing.
- Item text uses the paragraph font size token (`@paragraph-font-size`).

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic usage

```tsx
import { Link, OrderedList } from '@nutanix-ui/prism-reactjs'

/* eslint-disable max-len */
const data = [
  'Verify existing AHV time zone configuration by running the below command from any CVM in the Nutanix cluster',
  'Find the time zone of your choice by list the available once via the below command from any CVM in the Nutanix Cluster',
  <span>
    Use vmkfstools to create the vmdk disk descriptor. Need more help? Visit{' '}
    <Link style={{ display: 'inline' }}>Nutanix Support Portal.</Link>
  </span>,
]
/* eslint-enable max-len */

;<OrderedList data={data} data-test-id="basic-usage" />
```

#### Using StackingLayout to add a title

```tsx
import {
  StackingLayout,
  Title,
  Link,
  OrderedList,
} from '@nutanix-ui/prism-reactjs'

/* eslint-disable max-len */
const data = [
  'Verify existing AHV time zone configuration by running the below command from any CVM in the Nutanix cluster',
  'Find the time zone of your choice by list the available once via the below command from any CVM in the Nutanix Cluster',
  <span>
    Use vmkfstools to create the vmdk disk descriptor. Need more help? Visit{' '}
    <Link style={{ display: 'inline' }}>Nutanix Support Portal.</Link>
  </span>,
]
/* eslint-enable max-len */

;<StackingLayout itemSpacing="30px" data-test-id="add-title">
  <Title size="h3">How to Set Nutanix AHV Timezone</Title>
  <OrderedList data={data} />
</StackingLayout>
```

#### Wrapped list items

```tsx
import { Link, OrderedList } from '@nutanix-ui/prism-reactjs'

/* eslint-disable max-len */
const data = [
  'Verify existing AHV time zone configuration by running the below command from any CVM in the Nutanix cluster. The command will display the current timezone setting for the hypervisor. Of the time zone is incorrect or inconsistent across CVMs, proceed to the next step to update the configuration.',
  'Find the time zone of your choice by list the available once via the below command from any CVM in the Nutanix Cluster. To view all available timezones that can be configured on your AHV hosts run the following command. This will display a comprehensive list of all supported timezone identifiers.',
  <span>
    Use vmkfstools to create the vmdk disk descriptor. Need more help? Visit{' '}
    <Link style={{ display: 'inline' }}>Nutanix Support Portal.</Link>
  </span>,
]
/* eslint-enable max-len */

;<OrderedList data={data} data-test-id="wrapped-list" />
```

### Usage Notes

- `OrderedList` exposes no static enum values or sub-variants; there are no `OrderedList.<Enum>` constants to prefer.
- Pass mixed content (strings and React nodes) freely in the `data` array; the component wraps each entry in a styled `<li>` automatically.
- For inline links within a list item, render a `<span>` wrapper and set `style={{ display: 'inline' }}` on the `<Link>` to keep it inline with surrounding text.
- Prefer Prism layout props (`itemSpacing`, `padding`, `alignItems`, `justifyContent`) on a `StackingLayout` wrapper instead of custom CSS for spacing above or below the list.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
