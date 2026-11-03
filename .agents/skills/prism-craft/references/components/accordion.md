# Accordion

## Figma

- **Library name:** Accordion (page: N/A, frame: Accordion)

## React

Import: `import { Accordion } from '@nutanix-ui/prism-reactjs'`

### TSX Examples

```tsx
{
  /* Simple accordion, collapsed by default */
}
;<Accordion title="Advanced Settings">
  <StackingLayout itemGap="S" padding="10px">
    <FormItemInput
      id="timeout"
      label="Timeout (ms)"
      value={timeout}
      onChange={handleChange}
    />
    <FormItemInput
      id="retries"
      label="Max Retries"
      value={retries}
      onChange={handleChange}
    />
  </StackingLayout>
</Accordion>

{
  /* Controlled accordion */
}
;<Accordion
  title="Logs"
  expanded={logsExpanded}
  onToggleClick={() => setLogsExpanded(!logsExpanded)}
  extraHeaderContent={<Badge count={logCount} />}
>
  <LogViewer logs={logs} />
</Accordion>
```

### Anti-patterns

- Don't create custom collapsible sections with show/hide state -- use `Accordion`

<!-- SOURCE-API-START -->

### Import

```tsx
import { Accordion } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `AccordionProps`

Extends: `extends Omit<FlexLayoutProps, 'title'>`

All `FlexLayout` props (except `title`) are forwarded to the root element. HTML attributes such as `aria-disabled` are also accepted via this spread.

| Prop                 | Type                              | Default        | Required | Description                                                                                                                                                                       |
| -------------------- | --------------------------------- | -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`              | `string \| React.ReactNode`       | —              | Yes      | Title for the accordion header. Used as the toggle button's accessible name.                                                                                                      |
| `titleProps`         | `Omit<TitleProps, 'children'>`    | —              | No       | Custom props for the `Title` inside the header (e.g. `size`). See [Title](#!/Title) for all supported props.                                                                      |
| `renderToggleItem`   | `(props: any) => React.ReactNode` | —              | No       | Render a custom toggle icon/element. Receives `{ disabled, tabIndex, style }` (rotation + disabled state).                                                                        |
| `extraHeaderContent` | `React.ReactNode`                 | —              | No       | Additional content rendered in the header row next to the toggle (e.g. action links, badges).                                                                                     |
| `headerProps`        | `FlexLayoutProps`                 | —              | No       | Props forwarded to the header `FlexLayout`. Use `justifyContent: 'space-between'` with `extraHeaderContent`.                                                                      |
| `expandedByDefault`  | `boolean`                         | `false`        | No       | When `true`, content is visible on initial render (uncontrolled).                                                                                                                 |
| `disabled`           | `boolean`                         | `false`        | No       | Disables toggle interaction; toggle loses focus (`tabIndex={-1}`) and clicks are ignored.                                                                                         |
| `aria-disabled`      | `boolean`                         | `false`        | No       | HTML attribute spread via `...props`. Marks the toggle as disabled for AT while keeping it focusable. Also blocks `toggleVisibility` and sets `data-disabled="true"` on the root. |
| `expanded`           | `boolean`                         | —              | No       | Controlled expanded state. Must be paired with `onToggleClick`.                                                                                                                   |
| `onToggleClick`      | `() => void`                      | —              | No       | Callback fired when the toggle is clicked. When provided, switches to controlled mode.                                                                                            |
| `toggleProps`        | `FlexLayoutProps`                 | —              | No       | Props forwarded to the toggle `FlexLayout` (merges with default `itemSpacing="10px"`).                                                                                            |
| `role`               | `string`                          | `'region'`     | No       | ARIA role applied to the accordion body panel.                                                                                                                                    |
| `id`                 | `string`                          | auto-generated | No       | ID for the root element. Auto-generated with `accordion-<n>` prefix when not provided.                                                                                            |

### Behaviour

#### Uncontrolled vs. controlled

- **Uncontrolled** (default): internal `isExpanded` state drives visibility. Use `expandedByDefault` for the initial state.
- **Controlled**: provide both `expanded` and `onToggleClick`. When `onToggleClick` is present the component ignores its internal state entirely.

#### Body rendering

The `accordion-body` div is **always rendered in the DOM**. Visibility is toggled by CSS: `display: none` when collapsed, `display: flex` when expanded. This means children mount on first render regardless of expanded state.

#### Data attributes on root element

| Attribute       | Value            | When                                                    |
| --------------- | ---------------- | ------------------------------------------------------- |
| `data-expanded` | `true` / `false` | Always reflects expanded state                          |
| `data-disabled` | `true` / `false` | `true` when either `disabled` or `aria-disabled` is set |

#### Toggle button styling

The default toggle button is a 14×14 px circular icon container. When `data-disabled="false"` the toggle shows `cursor: pointer` and hover/active background states. When `data-disabled="true"` the toggle reduces to `opacity: var(--opacity-disabled)` with `cursor: not-allowed`.

### Accessibility & Keyboard

- The toggle `FlexLayout` has `role="button"`, `aria-expanded`, and `aria-controls` pointing to the panel `id`.
- The panel `div` has `role="region"` (configurable via `role` prop) and `aria-labelledby` pointing to the toggle `id`.
- **Enter** or **Space** on the focused toggle fires `toggleVisibility` (handled via `onKeyPress`).
- When `disabled={true}` the toggle receives `tabIndex={-1}` (removed from tab order).
- When `aria-disabled={true}` the toggle stays focusable (`tabIndex={0}`) but `toggleVisibility` is blocked for both keyboard and click.
- Both `disabled` and `aria-disabled` set `data-disabled="true"` on the root element and `disabled={true}` on the `renderToggleItem` props.
- Use a plain text string for `title` whenever possible — it becomes the accessible name of the toggle button and the panel's labelled-by reference.
- The toggle has `:focus-visible` focus ring styling built in.

### `TitleSizes` enum (for `titleProps.size`)

```ts
import { TitleSizes } from '@nutanix-ui/prism-reactjs'

enum TitleSizes {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3', // default used by Accordion
  H4 = 'h4',
}
```

The accordion header defaults to `TitleSizes.H3` (`'h3'`). Override with `titleProps={{ size: TitleSizes.H2 }}` or the equivalent string `'h2'` when the semantic heading level must differ.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
import { Paragraph, StackingLayout } from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    The Accordion title prop serves as the toggle button's accessible name. It
    must contain a text string and should succinctly describe the content that
    will be revealed when the accordion is opened.
  </Paragraph>
</StackingLayout>
```

#### Basic Example

```tsx
import { Accordion, Paragraph } from '@nutanix-ui/prism-reactjs'
;<Accordion title="Section Title">
  <Paragraph forceMultiLineHeight={true}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </Paragraph>
</Accordion>
```

#### Expanded by Default

```tsx
import { Accordion, Paragraph } from '@nutanix-ui/prism-reactjs'
;<Accordion title="Section Title" expandedByDefault={true}>
  <Paragraph>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Paragraph>
</Accordion>
```

#### Accordion with JSX Title

```tsx
import { Accordion, Paragraph } from '@nutanix-ui/prism-reactjs'

const titleComponent = (
  <Paragraph forceMultiLineHeight={true}>Some title here</Paragraph>
)

<Accordion title={titleComponent}>
  <Paragraph forceMultiLineHeight={true}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Paragraph>
</Accordion>
```

#### Controlled Accordion Group (open one, close others)

```tsx
import { useState } from 'react'
import {
  Accordion,
  Divider,
  Paragraph,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const ControlledAccordion = () => {
  const accordionIds = [1, 2, 3, 4, 5]
  const [expandedAccordion, setExpandedAccordion] = useState(accordionIds[0])

  const handleToggleClick = (id: number) => {
    setExpandedAccordion(expandedAccordion === id ? null : id)
  }

  return (
    <StackingLayout>
      {accordionIds.map((id, index) => (
        <StackingLayout key={id}>
          {index !== 0 && <Divider />}
          <Accordion
            title="Section Title"
            expanded={expandedAccordion === id}
            onToggleClick={() => handleToggleClick(id)}
          >
            <Paragraph forceMultiLineHeight={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Paragraph>
          </Accordion>
        </StackingLayout>
      ))}
    </StackingLayout>
  )
}
```

#### Disabled State

```tsx
import { Accordion, Paragraph, StackingLayout } from '@nutanix-ui/prism-reactjs'
;<StackingLayout tabIndex={-1}>
  {/* Fully disabled — removed from tab order, cursor: not-allowed */}
  <Accordion title="Disabled Section" disabled={true}>
    <Paragraph>Content not accessible via keyboard.</Paragraph>
  </Accordion>

  {/* aria-disabled — stays focusable (tabIndex=0), interaction blocked */}
  <Accordion title="Aria-disabled Section" aria-disabled={true}>
    <Paragraph>Content focusable but interaction blocked.</Paragraph>
  </Accordion>
</StackingLayout>
```

#### Extra Header Content

```tsx
import {
  Accordion,
  FlexLayout,
  FormItemTextArea,
  Link,
  Paragraph,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ width: 640 }}>
  <Accordion
    title="Section Title"
    expandedByDefault={true}
    headerProps={{ justifyContent: 'space-between' }}
    extraHeaderContent={
      <FlexLayout alignItems="center">
        <Link>Text</Link>
        <Link>Text</Link>
        <Link>Text</Link>
      </FlexLayout>
    }
  >
    <StackingLayout>
      <Paragraph forceMultiLineHeight={true}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Paragraph>
      <FormItemTextArea id="id" label="Additional item" />
    </StackingLayout>
  </Accordion>
</StackingLayout>
```

#### Custom Title Size via `titleProps`

```tsx
import { Accordion, Paragraph } from '@nutanix-ui/prism-reactjs'
;<Accordion title="Section Title" titleProps={{ size: 'h2' }}>
  <Paragraph forceMultiLineHeight={true}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Paragraph>
</Accordion>
```

#### Custom Toggle Item via `renderToggleItem`

```tsx
import {
  Accordion,
  ChevronDownIcon,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'
;<Accordion
  title="Section Title"
  renderToggleItem={(props) => (
    <span className="my-accordion-toggle-item" {...props}>
      <ChevronDownIcon />
    </span>
  )}
>
  <Paragraph forceMultiLineHeight={true}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Paragraph>
</Accordion>
```

The `props` argument passed to `renderToggleItem` has the shape:

```ts
{
  disabled: boolean // true when disabled || aria-disabled
  tabIndex: -1
  style: {
    transition: 'transform 0.2s ease'
    transform: string // 'rotate(-180deg)' expanded, 'rotate(0deg)' collapsed
  }
}
```

#### Custom Toggle Spacing via `toggleProps`

```tsx
import { Accordion, Paragraph } from '@nutanix-ui/prism-reactjs'
;<Accordion
  title="Section Title"
  toggleProps={{ itemSpacing: '20px', 'data-test': 'accordion-toggle' }}
>
  <Paragraph forceMultiLineHeight={true}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Paragraph>
</Accordion>
```

Note: `toggleProps` merges with the toggle's built-in defaults (`itemSpacing="10px"`, `alignItems="center"`). Providing `itemSpacing` in `toggleProps` overrides the default.

#### Nested Accordions

```tsx
import { Accordion, Paragraph, StackingLayout } from '@nutanix-ui/prism-reactjs'
;<Accordion title="Outer">
  <StackingLayout>
    <Paragraph forceMultiLineHeight={true}>Outer content.</Paragraph>
    <Accordion title="Middle">
      <StackingLayout>
        <Paragraph forceMultiLineHeight={true}>Middle content.</Paragraph>
        <Accordion title="Inner">
          <Paragraph forceMultiLineHeight={true}>Deepest content.</Paragraph>
        </Accordion>
      </StackingLayout>
    </Accordion>
  </StackingLayout>
</Accordion>
```

### Usage Notes

- Prefer documented enum/static values such as `TitleSizes.H2` over raw strings when available; both forms (`'h2'` and `TitleSizes.H2`) are accepted by `titleProps.size`.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- The title's default rendered element is `<h3>` (`TitleSizes.H3`). Override with `titleProps={{ size: 'h2' }}` when semantic heading level must differ. Only H1–H4 are valid `TitleSizes` values.
- `expandedByDefault` only sets the initial state; it is ignored after the first render (uncontrolled). For fully controlled behaviour use `expanded` + `onToggleClick`.
- The accordion body is always present in the DOM. Children mount immediately on first render even when collapsed. For expensive children, gate rendering manually if needed.
- Avoid nesting too many accordion levels — two levels is the practical maximum for readability.

<!-- SOURCE-API-END -->
