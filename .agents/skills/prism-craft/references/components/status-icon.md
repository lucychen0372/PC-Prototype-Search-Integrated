# StatusIcon

## Figma

- **Library name:** Icon (page: N/A, frame: Icon)

## React

Import: `import { StatusIcon } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { StatusIcon } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `StatusIconTypes`

| Key        | Value        |
| ---------- | ------------ |
| `INFO`     | `'info'`     |
| `QUESTION` | `'question'` |
| `VALID`    | `'valid'`    |
| `WARNING`  | `'warning'`  |
| `ALERT`    | `'alert'`    |

Access via the static member: `StatusIcon.StatusIconTypes.INFO`, etc.

### Props Interfaces

#### `StatusIconProps`

Extends: `FlexLayoutProps`

| Prop           | Type                                                                                                    | Default                 | Required | Description                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------- | ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`         | `StatusIconTypes`                                                                                       | `StatusIconTypes.ALERT` | No       | Which status icon to render.                                                                                                                                              |
| `className`    | `string`                                                                                                | —                       | No       | Optional custom class name.                                                                                                                                               |
| `id`           | `string`                                                                                                | auto-generated          | No       | Status icon id for a11y support. When omitted an internal id is generated.                                                                                                |
| `tooltipProps` | `Omit<ToolTipProps, 'children'>`                                                                        | —                       | No       | Wraps the icon in a `Tooltip`. See [Tooltip](#!/Tooltip) for all supported properties. Mutually exclusive with `popoverProps`.                                            |
| `popoverProps` | `OldPopoverProps`                                                                                       | —                       | No       | Wraps the icon in a `Popover`. When set the icon renders as a `<button>`. See [Popover](#!/Popover) for all supported properties. Mutually exclusive with `tooltipProps`. |
| `iconProps`    | `AlertTriangleIconProps \| WarningStatusIconProps \| QuestionStatusIconProps \| SuccessStatusIconProps` | —                       | No       | Props forwarded to the underlying status icon SVG component.                                                                                                              |

All other `FlexLayoutProps` are also accepted and spread onto the icon wrapper element.

#### `iconProps` — shared sub-props

All four icon prop types (`AlertTriangleIconProps`, `WarningStatusIconProps`, `QuestionStatusIconProps`, `SuccessStatusIconProps`) extend `StandardIconWrapperProps` and share the following props:

| Prop          | Type                                       | Default         | Description                                                                                             |
| ------------- | ------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------- |
| `color`       | `string`                                   | `'inherit'`     | Fill color of the outer icon shape. Accepts any CSS color value.                                        |
| `iconColor`   | `string`                                   | `'transparent'` | Fill color of the inner icon sign (exclamation mark, question mark, etc.). Accepts any CSS color value. |
| `size`        | `'small' \| 'medium' \| 'large' \| 'none'` | `'medium'`      | Size class applied to the SVG. `'none'` skips the size class entirely.                                  |
| `className`   | `string`                                   | —               | Custom class name on the SVG element.                                                                   |
| `aria-hidden` | `boolean \| 'true' \| 'false'`             | `true`          | Hides the SVG from assistive technology (the icon wrapper itself carries the accessible label).         |
| `innerRef`    | `React.Ref<any>`                           | —               | Ref to the inner SVG element.                                                                           |

### Static Members

| Member                         | Value             | Notes                                                   |
| ------------------------------ | ----------------- | ------------------------------------------------------- |
| `StatusIcon.StatusIconTypes`   | `StatusIconTypes` | Preferred accessor.                                     |
| `StatusIcon.STATUS_ICON_TYPES` | `StatusIconTypes` | **Deprecated.** Alias kept for backwards compatibility. |

### Behaviour Notes

- **No overlay prop** — renders a plain `role="img"` element.
- **`tooltipProps` present** — wraps in `Tooltip`. The tooltip content element receives an auto-generated `id` linked to the icon for screen-reader association.
- **`popoverProps` present** — renders the icon wrapper as a focusable `<button>` and wraps it in `Popover`. Focus returns to the trigger button when the popover closes.
- **`type` default** — `StatusIconTypes.ALERT` (alert triangle).
- **Default `aria-label`** — automatically set from `I18nManager` based on the `type` value. Override by passing `aria-label` directly (it is forwarded via `...props` to the wrapper).
- **Icon mapping** — `INFO` → `InformationStatusIcon` (circle), `QUESTION` → `QuestionStatusIcon` (circle), `VALID` → `SuccessStatusIcon` (circle), `WARNING` → `WarningStatusIcon` (diamond), `ALERT` → `AlertTriangleIcon` (triangle).

### Accessibility Guidelines

- All `StatusIcon` instances need an accessible label. Default labels are provided via `I18nManager`, but use context-specific labels wherever possible.
- Screen readers announce element roles automatically; do not include words like "icon", "image", or "button" in the label.
- If the tooltip content duplicates the `aria-label`, hide the tooltip from screen readers: `tooltipProps={{ contentProps: { 'aria-hidden': 'true' } }}`.
- Never hide important information in a tooltip only — it must also be available in a persistent, visible label.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines (rendered example)

```tsx
import {
  StackingLayout,
  Paragraph,
  UnorderedList,
} from '@nutanix-ui/prism-reactjs'

/* eslint-disable max-len */
const data = [
  'Screen Readers announce an element\'s role automatically so words like "image", "icon", or "button" are redundant and should not be used.',
  "Labels should be concise and not repeat content that is included in the tooltip. If the tooltip is very short, consider hiding it from screen readers and including that content in the label instead. Hint: use \"contentProps: {'aria-hidden': 'true'}\".",
  'Remember: important information should never be hidden in a tooltip!',
]
/* eslint-enable max-len */
;<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    All StatusIcons need a label for accessibility. Defaults have been provided
    for convenience, but you're encouraged to use labels that best fit your
    specific context.
  </Paragraph>
  <UnorderedList data={data} />
</StackingLayout>
```

#### Basic Example with Tooltip and Default labels

```tsx
import React from 'react'
import { FlexLayout, StatusIcon, Tooltip } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <StatusIcon
    type={StatusIcon.StatusIconTypes.INFO}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
      content: 'You look lovely today!',
    }}
  />
  <StatusIcon
    type={StatusIcon.StatusIconTypes.QUESTION}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
      content: 'Can you help me find me keys?',
    }}
  />
  <StatusIcon
    type={StatusIcon.StatusIconTypes.VALID}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
      content: 'Amazing! You set a new record!',
    }}
  />
  <StatusIcon
    type={StatusIcon.StatusIconTypes.WARNING}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
      content: 'Your check engine light is on.',
    }}
  />
  {/* By default type is set to StatusIcon.StatusIconTypes.ALERT */}
  <StatusIcon
    type={StatusIcon.StatusIconTypes.ALERT}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
      content: 'Looks like you ran out of fuel.',
    }}
  />
</FlexLayout>
```

#### Basic Example with Tooltip and Custom Labels

```tsx
import React from 'react'
import { FlexLayout, StatusIcon, Tooltip } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <StatusIcon
    type={StatusIcon.StatusIconTypes.INFO}
    aria-label="More information"
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
      content: 'You look lovely today!',
    }}
  />
  <StatusIcon
    type={StatusIcon.StatusIconTypes.QUESTION}
    aria-label="Help!"
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
      content: 'Can you help me find me keys?',
    }}
  />
  {/* This tooltip is hidden from screen readers since it duplicates the aria-label */}
  <StatusIcon
    type={StatusIcon.StatusIconTypes.VALID}
    aria-label="Process completed!"
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
      content: 'Process completed!',
      contentProps: { 'aria-hidden': 'true' },
    }}
  />
  <StatusIcon
    type={StatusIcon.StatusIconTypes.WARNING}
    aria-label="Beware!"
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
      content: 'Your check engine light is on.',
    }}
  />
  <StatusIcon
    type={StatusIcon.StatusIconTypes.ALERT}
    aria-label="Error"
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
      content: 'Looks like you ran out of fuel.',
    }}
  />
</FlexLayout>
```

#### Basic Example with Popover

```tsx
import React from 'react'
import {
  FlexLayout,
  FlexItem,
  Link,
  StatusIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <StatusIcon
    type={StatusIcon.StatusIconTypes.INFO}
    popoverProps={{
      content: (
        <FlexLayout alignItems="center" itemSpacing="5px">
          <FlexItem>You look lovely today!</FlexItem>
          <Link href="https://nutanix.com" target="_blank">
            See more
          </Link>
        </FlexLayout>
      ),
    }}
  />
  <StatusIcon
    type={StatusIcon.StatusIconTypes.QUESTION}
    popoverProps={{
      content: (
        <FlexLayout alignItems="center" itemSpacing="5px">
          <FlexItem>Can you help me find me keys?</FlexItem>
          <Link href="https://nutanix.com" target="_blank">
            See more
          </Link>
        </FlexLayout>
      ),
    }}
  />
  <StatusIcon
    type={StatusIcon.StatusIconTypes.VALID}
    popoverProps={{
      content: (
        <FlexLayout alignItems="center" itemSpacing="5px">
          <FlexItem>Amazing! You set a new record!</FlexItem>
          <Link href="https://nutanix.com" target="_blank">
            See more
          </Link>
        </FlexLayout>
      ),
    }}
  />
  <StatusIcon
    type={StatusIcon.StatusIconTypes.WARNING}
    popoverProps={{
      content: (
        <FlexLayout alignItems="center" itemSpacing="5px">
          <FlexItem>Your check engine light is on.</FlexItem>
          <Link href="https://nutanix.com" target="_blank">
            See more
          </Link>
        </FlexLayout>
      ),
    }}
  />
  {/* By default type is set to StatusIcon.StatusIconTypes.ALERT */}
  <StatusIcon
    type={StatusIcon.StatusIconTypes.ALERT}
    popoverProps={{
      content: (
        <FlexLayout alignItems="center" itemSpacing="5px">
          <FlexItem>Looks like you ran out of fuel.</FlexItem>
          <Link href="https://nutanix.com" target="_blank">
            See more
          </Link>
        </FlexLayout>
      ),
    }}
  />
</FlexLayout>
```

#### StepItem Integration

`StatusIcon.StatusIconTypes` values can be passed to `StepItem.statusIconType`:

```tsx
import React from 'react'
import { FlexLayout, StatusIcon, StepItem } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <StepItem
    title="Finish"
    status={StepItem.StepItemStatus.PROCESS}
    tooltipProps={{
      content: 'Alert',
      oldTooltip: false,
    }}
    statusIconType={StatusIcon.StatusIconTypes.ALERT}
  />
</FlexLayout>
```

#### TabItem Integration

`StatusIcon.StatusIconTypes` values can be passed to `TabItem.statusIconType`:

```tsx
import React from 'react'
import {
  StackingLayout,
  FlexLayout,
  StatusIcon,
  TabItem,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <FlexLayout>
    <TabItem
      appearance={TabItem.TabItemAppearance.ACTIVE}
      title="Tab1 Active"
      statusIconType={StatusIcon.StatusIconTypes.ALERT}
      tooltipProps={{ content: 'Alert', oldTooltip: false }}
    />
    <TabItem
      title="Tab2"
      statusIconType={StatusIcon.StatusIconTypes.ALERT}
      tooltipProps={{ content: 'Warning', oldTooltip: false }}
    />
  </FlexLayout>
  <FlexLayout>
    <TabItem
      appearance={TabItem.TabItemAppearance.ACTIVE}
      title="ViewSwitcher Tab1 Active"
      type={TabItem.TabItemType.VIEW_SWITCHERS}
      statusIconType={StatusIcon.StatusIconTypes.ALERT}
      tooltipProps={{ content: 'Alert', oldTooltip: false }}
    />
    <TabItem
      title="ViewSwitcher Tab2"
      type={TabItem.TabItemType.VIEW_SWITCHERS}
      statusIconType={StatusIcon.StatusIconTypes.WARNING}
      tooltipProps={{ content: 'Warning', oldTooltip: false }}
    />
  </FlexLayout>
</StackingLayout>
```

### Usage Notes

- Prefer documented enum/static values such as `StatusIcon.StatusIconTypes.<VALUE>` over raw strings when the component exposes them.
- `STATUS_ICON_TYPES` is a deprecated alias for `StatusIconTypes`; use `StatusIconTypes` in all new code.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- Do not pass both `tooltipProps` and `popoverProps` simultaneously; only `popoverProps` will be used when both are provided.
- When `popoverProps` is set the icon renders as a focusable `<button>` — ensure the icon has a meaningful `aria-label`.

<!-- SOURCE-API-END -->
