# Tooltip

## Figma

- **Library name:** Tooltip Container (page: N/A, frame: Tooltip Container)
- **Also matches:** Link with Tooltip, Tooltip

## React

Import: `import { Tooltip } from '@nutanix-ui/prism-reactjs'`

### TSX Examples

```tsx
{
  /* Simple text tooltip */
}
;<Tooltip
  oldTooltip={false}
  content="Create a new endpoint"
  mouseEnterDelay={300}
>
  <Button type={Button.ButtonTypes.PRIMARY}>
    <PlusIcon /> Create
  </Button>
</Tooltip>

{
  /* Tooltip on icon button */
}
;<Tooltip
  oldTooltip={false}
  content="Settings"
  placement="bottom"
  mouseEnterDelay={300}
>
  <Button type={Button.ButtonTypes.ICON_DEFAULT} aria-label="Settings">
    <SettingsIcon />
  </Button>
</Tooltip>
```

### Anti-patterns

- Don't use `title` HTML attribute -- use `Tooltip`
- Don't put interactive content (buttons, links) inside tooltips -- use `Popover`
- Tooltip is for brief text hints; Popover is for interactive/rich content
- Don't omit `oldTooltip={ false }` — the default is `true` (legacy mode); always set `oldTooltip={ false }` for the v2 Tooltip

<!-- SOURCE-API-START -->

### Import

```tsx
import { Tooltip } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `TooltipAppearance` — `Tooltip.APPEARANCE`

| Key         | Value         | Notes                   |
| ----------- | ------------- | ----------------------- |
| `PRIMARY`   | `'primary'`   | Default. Dark tooltip.  |
| `SECONDARY` | `'secondary'` | Light/outlined tooltip. |

Usage: `appearance={ Tooltip.APPEARANCE.SECONDARY }`

#### `PortalProviderTrigger` (trigger values)

| Key     | Value     |
| ------- | --------- |
| `HOVER` | `'hover'` |
| `CLICK` | `'click'` |
| `FOCUS` | `'focus'` |

Import if needed directly: `import { PortalProviderTrigger } from '@nutanix-ui/prism-reactjs'`

Default trigger for Tooltip: `[PortalProviderTrigger.FOCUS, PortalProviderTrigger.HOVER]`

### Props Interfaces

#### `ToolTipProps`

`ToolTipProps` extends `Omit<OldToolTipProps, 'appearance' | 'content' | 'placement'>` and `Omit<PortalProviderProps, 'children'>`. The table below covers all meaningful props available on the v2 Tooltip (i.e. when `oldTooltip={ false }`).

| Prop                  | Type                                                                                                                                                                 | Default          | Required | Description                                                                                                                                           |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oldTooltip`          | `boolean`                                                                                                                                                            | `true`           | —        | **Always set to `false`** to use the v2 Tooltip. When `true` the legacy OldTooltip is rendered and `mouseEnterDelay` / `mouseLeaveDelay` are ignored. |
| `content`             | `React.ReactNode`                                                                                                                                                    | —                | —        | Text or element placed inside the tooltip. Tooltip does not render if this is falsy (except `0`).                                                     |
| `appearance`          | `TooltipAppearance`                                                                                                                                                  | `'primary'`      | —        | Visual style. Use `Tooltip.APPEARANCE.PRIMARY` or `Tooltip.APPEARANCE.SECONDARY`.                                                                     |
| `size`                | `'mini' \| 'medium'`                                                                                                                                                 | `'medium'`       | —        | Size of the tooltip. `'mini'` is for short single-line text.                                                                                          |
| `placement`           | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'`          | —        | Position of the tooltip relative to the trigger.                                                                                                      |
| `showCaret`           | `boolean`                                                                                                                                                            | `true`           | —        | Whether to render the tooltip caret/arrow. Disable when anchoring to a group of metrics (e.g. a line chart).                                          |
| `contentProps`        | `TooltipContentProps`                                                                                                                                                | —                | —        | Props forwarded to the inner content container `<div>`. Use `style: { maxWidth: 300 }` to constrain width, or `data-test-id`, `className`, `id`, etc. |
| `className`           | `string`                                                                                                                                                             | —                | —        | Custom class name applied to the tooltip portal wrapper.                                                                                              |
| `id`                  | `string`                                                                                                                                                             | auto-generated   | —        | ID for the tooltip element (used in `aria-describedby`). Can also be set via `contentProps.id`.                                                       |
| `mouseEnterDelay`     | `number` (ms)                                                                                                                                                        | `0`              | —        | Delay before the tooltip appears on mouse enter. UX recommends `300`. Only applies when `oldTooltip={ false }`.                                       |
| `mouseLeaveDelay`     | `number` (ms)                                                                                                                                                        | `100`            | —        | Delay before the tooltip hides on mouse leave. Only applies when `oldTooltip={ false }`.                                                              |
| `offset`              | `number`                                                                                                                                                             | `10`             | —        | Distance in pixels between tooltip and the trigger element.                                                                                           |
| `trigger`             | `PortalProviderTrigger \| PortalProviderTrigger[]`                                                                                                                   | `[FOCUS, HOVER]` | —        | Events that open/close the tooltip.                                                                                                                   |
| `visible`             | `boolean`                                                                                                                                                            | —                | —        | Controlled visibility. When set, `trigger` is ignored and the caller owns open/close state.                                                           |
| `onVisibleChange`     | `(visible: boolean) => void`                                                                                                                                         | —                | —        | Callback fired when visibility changes. Use with `visible` for controlled mode.                                                                       |
| `mountElement`        | `() => HTMLElement`                                                                                                                                                  | —                | —        | Returns the DOM element where the tooltip portal is mounted. Useful for scrolling containers.                                                         |
| `background`          | `'base' \| 'alt'`                                                                                                                                                    | —                | —        | Explicitly sets the background context for the tooltip (overrides `BackgroundContext`).                                                               |
| `tabIndex`            | `number`                                                                                                                                                             | `0`              | —        | Tab index on the trigger element.                                                                                                                     |
| `style`               | `React.CSSProperties`                                                                                                                                                | —                | —        | Inline style applied to the portal wrapper.                                                                                                           |
| `animationFrame`      | `boolean`                                                                                                                                                            | `false`          | —        | When `true`, schedules position updates via `requestAnimationFrame` for smoother rendering.                                                           |
| `closableOnClickAway` | `boolean`                                                                                                                                                            | —                | —        | When `true`, closes the tooltip on click outside the portal.                                                                                          |

#### `TooltipContentProps`

`TooltipContent` extends `Omit<React.HTMLProps<HTMLDivElement>, 'content' | 'ref'>`, so any valid `<div>` prop is accepted (e.g. `style`, `className`, `data-test-id`, `id`).

| Prop        | Type                          | Default | Description                                                                                                     |
| ----------- | ----------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `content`   | `React.ReactNode`             | —       | Text or element inside the tooltip (set via `Tooltip.content`; you rarely set this directly on `contentProps`). |
| `showCaret` | `boolean`                     | `true`  | Whether the arrow caret is rendered.                                                                            |
| `caretRef`  | `React.Ref<HTMLInputElement>` | —       | Internal ref for caret; managed automatically by `Tooltip`.                                                     |
| `data-test` | `string`                      | —       | Test identifier.                                                                                                |
| `id`        | `string`                      | auto    | Overrides the tooltip's auto-generated `id` used for `aria-describedby`.                                        |
| `style`     | `React.CSSProperties`         | —       | Use `style: { maxWidth: 300 }` to constrain content width.                                                      |
| `className` | `string`                      | —       | Additional class on the inner content `<div>`.                                                                  |

### Static Members

| Member                   | Value               | Notes                                                   |
| ------------------------ | ------------------- | ------------------------------------------------------- |
| `Tooltip.TooltipContent` | `TooltipContent`    | Subcomponent — use for advanced custom tooltip layouts. |
| `Tooltip.APPEARANCE`     | `TooltipAppearance` | Enum alias — prefer over raw strings.                   |

### Default Props Summary

| Prop                     | Default                                  |
| ------------------------ | ---------------------------------------- |
| `oldTooltip`             | `true` — **must explicitly set `false`** |
| `showCaret`              | `true`                                   |
| `size`                   | `'medium'`                               |
| `appearance` (effective) | `'primary'`                              |
| `placement` (effective)  | `'top'`                                  |
| `offset` (effective)     | `10`                                     |
| `mouseEnterDelay`        | `0`                                      |
| `mouseLeaveDelay`        | `100`                                    |
| `trigger` (effective)    | `[FOCUS, HOVER]`                         |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic Example

```tsx
import { Tooltip, FormItemInput } from '@nutanix-ui/prism-reactjs'

const content = 'Supplemental information about this input'

// contentProps.style constrains tooltip width.
;<Tooltip
  oldTooltip={false}
  appearance={Tooltip.APPEARANCE.SECONDARY}
  mouseEnterDelay={300}
  content={content}
  placement="top-start"
  contentProps={{
    style: { maxWidth: 300 },
    'data-test-id': 'basic-tooltip',
    className: 'custom-content-classname',
  }}
>
  <FormItemInput
    id="id1"
    label="Input label"
    helpText="Help text"
    placeholder="I have a tooltip too!"
    data-test-id="basic-tooltip-trigger"
  />
</Tooltip>
```

#### Primary Appearance Example

```tsx
import { Checkbox, Tooltip } from '@nutanix-ui/prism-reactjs'
;<Tooltip
  oldTooltip={false}
  mouseEnterDelay={300}
  appearance={Tooltip.APPEARANCE.PRIMARY}
  content="HTTP Server is inactive"
>
  <Checkbox id="pc2" checked={false} label="Hover me if you want to live!" />
</Tooltip>
```

#### Mini Size Example

```tsx
import { Checkbox, Tooltip } from '@nutanix-ui/prism-reactjs'
;<Tooltip
  oldTooltip={false}
  appearance={Tooltip.APPEARANCE.SECONDARY}
  mouseEnterDelay={300}
  size="mini"
  content="65 VMs"
>
  <Checkbox
    id="pc1"
    checked={false}
    label="I am a mini tooltip! Use me for short single line text."
  />
</Tooltip>
```

#### Aria-disabled Button with a Tooltip

Use when a button is visually present but not interactive (e.g. a submit blocked by validation).

```tsx
import { Button, Tooltip } from '@nutanix-ui/prism-reactjs'
;<Tooltip
  oldTooltip={false}
  mouseEnterDelay={300}
  appearance={Tooltip.APPEARANCE.SECONDARY}
  content="Please fill out all fields"
>
  {/* aria-disabled informs screen readers the button is not interactive */}
  <Button
    aria-disabled={true}
    appearance="underline"
    type={Button.ButtonTypes.TEXT_NORMAL}
  >
    Submit
  </Button>
</Tooltip>
```

#### No Caret Example

```tsx
import { StatusIcon } from '@nutanix-ui/prism-reactjs'
;<StatusIcon
  type="question"
  aria-label="Example with a tooltip"
  tooltipProps={{
    oldTooltip: false,
    content: 'Where did my caret go?',
    showCaret: false,
    placement: 'top-start',
    contentProps: { 'data-test-id': 'no-caret-tooltip' },
  }}
/>
```

#### Placement Example

```tsx
import { Tooltip, Button } from '@nutanix-ui/prism-reactjs'

// Valid placement values:
// 'top' | 'top-start' | 'top-end'
// 'bottom' | 'bottom-start' | 'bottom-end'
// 'left' | 'left-start' | 'left-end'
// 'right' | 'right-start' | 'right-end'
;<Tooltip
  oldTooltip={false}
  mouseEnterDelay={300}
  appearance={Tooltip.APPEARANCE.SECONDARY}
  content="On your right!"
  placement="right"
>
  <Button>Hover me</Button>
</Tooltip>
```

#### Controlled Tooltip Example

When `visible` is set the caller owns show/hide state.

```tsx
import React from 'react'
import { Tooltip, Button } from '@nutanix-ui/prism-reactjs'

function ControlledTooltip() {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <Tooltip
      oldTooltip={false}
      mouseEnterDelay={300}
      content="I am fully controlled"
      visible={isVisible}
      onVisibleChange={(visible) => setIsVisible(visible)}
    >
      <Button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        Hover me
      </Button>
    </Tooltip>
  )
}
```

#### Scrolling Container / mountElement Example

Use `mountElement` so the tooltip stays positioned correctly inside a scrollable container.

```tsx
import React, { useEffect, useRef, useState } from 'react'
import { Tooltip, Button } from '@nutanix-ui/prism-reactjs'

function ScrollingTooltip() {
  const containerRef = useRef(null)
  const [container, setContainer] = useState(null)

  useEffect(() => {
    if (containerRef.current) {
      setContainer(containerRef)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ overflow: 'auto', height: 400, width: 400 }}
    >
      <Tooltip
        oldTooltip={false}
        appearance={Tooltip.APPEARANCE.SECONDARY}
        content="Scroll the container and watch how I respond."
        mountElement={() => container && container.current}
        contentProps={{ style: { maxWidth: 300 } }}
      >
        <Button>Scroll Me</Button>
      </Tooltip>
    </div>
  )
}
```

#### Tooltip with Existing aria-describedby

When the trigger already has an `aria-describedby`, the Tooltip appends its id to the space-separated list when visible.

```tsx
import {
  Checkbox,
  Tooltip,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

const helpTextId = 'help-desc-id'

;<StackingLayout itemGap="M">
  <Tooltip
    oldTooltip={false}
    mouseEnterDelay={300}
    placement="top-start"
    appearance={Tooltip.APPEARANCE.SECONDARY}
    content="This tooltip appends its id to aria-describedby when visible."
    contentProps={{ id: 'tooltip-multi-desc-id' }}
  >
    <Checkbox
      id="cb-aria-desc"
      checked={false}
      label="Option with visible help text and tooltip"
      aria-describedby={helpTextId}
    />
  </Tooltip>
  <Paragraph id={helpTextId}>
    This is the visible description always shown and referenced by the checkbox.
  </Paragraph>
</StackingLayout>
```

### Accessibility Guidelines

- **Only place tooltips on interactive elements** (inputs, buttons, checkboxes). If you must add a tooltip to a non-interactive element, use a `StatusIcon` as the trigger, or wrap text in an `aria-disabled` button.
- **Tooltip content must be text-only.** Avoid headings, lists, or interactive elements (buttons/links) inside the tooltip — use `Popover` for rich or interactive content.
- **Assume tooltip content may never be read.** Touch devices and some screen readers cannot access tooltip content. Never put essential information exclusively in a tooltip.
- **`aria-describedby` is wired automatically.** When the tooltip is visible and its `content` differs from the trigger text, Tooltip injects `aria-describedby` on the trigger pointing to the tooltip's content element (`role="tooltip"`). If the trigger already has `aria-describedby`, the tooltip id is appended (space-separated).
- **String children** are automatically wrapped in a `TextLabel` with `tabIndex` and `aria-describedby`.
- **Keyboard:** Tooltip opens on focus (Tab) and closes on Escape (handled internally via `closeOnEscape={ true }`).
- **`mouseEnterDelay`:** UX recommends `300`ms. The current default is `0` for backward compatibility; set `mouseEnterDelay={ 300 }` in new code.

### Usage Notes

- **Always set `oldTooltip={ false }`** — the default is `true` (legacy mode). The v2 Tooltip is only used when `oldTooltip` is explicitly `false`.
- Prefer `Tooltip.APPEARANCE.PRIMARY` / `Tooltip.APPEARANCE.SECONDARY` over raw strings.
- Use `contentProps.style = { maxWidth: 300 }` to prevent tooltip content from overflowing on long strings.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing inside tooltip content.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use `mountElement` when the trigger lives inside a scrollable container to keep the tooltip positioned correctly.

<!-- SOURCE-API-END -->
