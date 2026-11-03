# Button

## Figma

- **Library name:** Button (page: N/A, frame: Button)
- **Button variants (Figma Type → React `ButtonTypes`):**
  - Default → `PRIMARY`
  - Secondary → `SECONDARY`
  - Destructive → `DESTRUCTIVE`
  - Borderless → `BORDERLESS` (deprecated — use `SECONDARY` with alt/base background)
  - Success → `SUCCESS`
  - Warning → `WARNING`
  - Navigation Primary → `NAVIGATION_PRIMARY`
  - Navigation Secondary → `NAVIGATION_SECONDARY`
  - Navigation Destructive → `NAVIGATION_DESTRUCTIVE`
  - Navigation Borderless → `NAVIGATION_BORDERLESS` (deprecated — use `NAVIGATION_SECONDARY` with alt/base background)
  - Icon Default → `ICON_DEFAULT`
  - Icon Secondary → `ICON_SECONDARY`
  - Icon Link → `ICON_LINK`
  - Icon Navigation → `ICON_NAVIGATION`
  - Text Normal → `TEXT_NORMAL`
  - Text Primary → `TEXT_PRIMARY`
  - Text Secondary → `TEXT_SECONDARY`
  - Text Destructive → `TEXT_DESTRUCTIVE`
  - Text Alert Info → `TEXT_ALERT_INFO`
  - Text Alert Success → `TEXT_ALERT_SUCCESS`
  - Text Alert Warning → `TEXT_ALERT_WARNING`
  - Text Alert Error → `TEXT_ALERT_ERROR`
  - Text Navigation Primary → `TEXT_NAVIGATION_PRIMARY`
  - Text Navigation Secondary → `TEXT_NAVIGATION_SECONDARY`
  - Text Navigation Info → `TEXT_NAVIGATION_INFO`

## React

Import: `import { Button } from '@nutanix-ui/prism-reactjs'`

### Figma -> React Prop Mapping

| Figma Property | React Prop   | Value Mapping                                                                                                                   |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Type           | `type`       | Default → `Button.ButtonTypes.PRIMARY`, Secondary → `Button.ButtonTypes.SECONDARY`, etc. (see full `ButtonTypes` enum below)    |
| Appearance     | `appearance` | Default → `"default"`, Square → `"square"`, Mini → `"mini"`, Transparent Mini → `"transparent-mini"`, Underline → `"underline"` |
| Disabled       | `disabled`   | `true` / `false`                                                                                                                |
| Full Width     | `fullWidth`  | `true` / `false`                                                                                                                |

### TSX Examples

```tsx
{/* Primary button */}
<Button type={Button.ButtonTypes.PRIMARY} onClick={handleCreate}>
  Create
</Button>

{/* Primary button with leading icon */}
<Button type={Button.ButtonTypes.PRIMARY}>
  <PlusIcon size="small" /> Create VM
</Button>

{/* Icon-only button — MUST have aria-label; tooltip content should be hidden from AT */}
<Tooltip content="Settings" contentProps={{ 'aria-hidden': 'true' }} oldTooltip={false}>
  <Button type={Button.ButtonTypes.ICON_DEFAULT} aria-label="Settings">
    <SettingsIcon />
  </Button>
</Tooltip>

{/* Destructive action */}
<Button type={Button.ButtonTypes.DESTRUCTIVE} onClick={handleDelete}>
  Delete
</Button>

{/* Secondary */}
<Button type={Button.ButtonTypes.SECONDARY}>Cancel</Button>

{/* Success / Warning */}
<Button type={Button.ButtonTypes.SUCCESS} count={2} aria-label="Upgrade 2 VMs">Upgrade</Button>
<Button type={Button.ButtonTypes.WARNING}>Reboot</Button>

{/* Mini appearance — icon-only compact button */}
<Button appearance="mini" type={Button.ButtonTypes.SECONDARY} aria-label="Previous">
  <ChevronLeftIcon />
</Button>

{/* Transparent-mini — for cut-out chevron icons over gradients */}
<Button appearance="transparent-mini" aria-label="Next">
  <ChevronCutoutRightIcon />
</Button>

{/* Full-width */}
<Button fullWidth={true}>Save Configuration</Button>

{/* Text button */}
<Button type={Button.ButtonTypes.TEXT_PRIMARY} onClick={handleAction}>
  Learn More
</Button>

{/* Small text button — replaces inline links only */}
<Button type={Button.ButtonTypes.TEXT_PRIMARY} textButtonSize={Button.TextButtonSizes.SMALL}>
  Learn More
</Button>

{/* Text button with underline appearance */}
<Button type={Button.ButtonTypes.TEXT_PRIMARY} appearance="underline">
  Learn More
</Button>

{/* aria-disabled — keeps button focusable and tab-able; shows tooltips; does NOT fire onClick */}
<Button type={Button.ButtonTypes.PRIMARY} aria-disabled={true}>
  Deploy
</Button>

{/* Count badge */}
<Button type={Button.ButtonTypes.SUCCESS} count={1} aria-label="Upgrade 1 VM">
  Upgrade
</Button>

{/* Navigation context buttons */}
<Button type={Button.ButtonTypes.NAVIGATION_PRIMARY}>Click me</Button>
<Button type={Button.ButtonTypes.NAVIGATION_SECONDARY}>Click me</Button>

{/* Split button using ButtonGroup + Dropdown */}
<ButtonGroup>
  <Button type={Button.ButtonTypes.PRIMARY} onClick={handlePrimary}>
    Save
  </Button>
  <Dropdown popup={<Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="save-as">Save As...</MenuItem>
  </Menu>}>
    <Button type={Button.ButtonTypes.PRIMARY} aria-label="Toggle options dropdown">
      <ChevronDownIcon />
    </Button>
  </Dropdown>
</ButtonGroup>

{/* Button acting as a link (role="link") */}
<Button role="link">Open new page</Button>

{/* Form submit */}
<Button htmlType="submit">Submit</Button>
```

### Anti-patterns

- Never use raw type strings like `type="primary"` — always use `Button.ButtonTypes.PRIMARY`
- Icon-only buttons MUST have `aria-label`; if a tooltip duplicates it, hide the tooltip from screen readers with `contentProps={{ 'aria-hidden': 'true' }}`
- Never use `disabled` and `aria-disabled` together — they conflict; `disabled` is ignored when `aria-disabled` is set
- `appearance="underline"` is only valid on text button types (`TEXT_NORMAL`, `TEXT_PRIMARY`, `TEXT_SECONDARY`, `TEXT_DESTRUCTIVE`, `TEXT_NAVIGATION_PRIMARY`, `TEXT_NAVIGATION_SECONDARY`, `TEXT_NAVIGATION_INFO`) — using it on other types throws a `TypeError`
- Do not wrap `<Button>` in `<a>` tags — use `role="link"` on the button instead
- Do not use `<a>` or `<Link>` when you need a button action — use `Button` with a text type
- `BORDERLESS` and `NAVIGATION_BORDERLESS` are deprecated; use `SECONDARY` / `NAVIGATION_SECONDARY` with an `alt` or `base` background context instead

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  Button,
  ButtonGroup,
  AdaptiveButtonGroup,
  TextButtonGroup,
} from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `ButtonTypes`

Accessed via `Button.ButtonTypes.<KEY>` or imported directly as `{ ButtonTypes }`.

| Key                         | Value                       | Notes                                          |
| --------------------------- | --------------------------- | ---------------------------------------------- |
| `PRIMARY`                   | `primary`                   | Default `type` when none is supplied           |
| `SECONDARY`                 | `secondary`                 |                                                |
| `DESTRUCTIVE`               | `destructive`               |                                                |
| `BORDERLESS`                | `borderless`                | @deprecated — use `SECONDARY` with alt/base bg |
| `DARK_PRIMARY`              | `dark-primary`              | @deprecated — use `NAVIGATION_PRIMARY`         |
| `NAVIGATION_PRIMARY`        | `navigation-primary`        |                                                |
| `DARK_SECONDARY`            | `dark-secondary`            | @deprecated — use `NAVIGATION_SECONDARY`       |
| `NAVIGATION_SECONDARY`      | `navigation-secondary`      |                                                |
| `DARK_DESTRUCTIVE`          | `dark-destructive`          | @deprecated — use `NAVIGATION_DESTRUCTIVE`     |
| `NAVIGATION_DESTRUCTIVE`    | `navigation-destructive`    |                                                |
| `DARK_BORDERLESS`           | `dark-borderless`           | @deprecated — use `NAVIGATION_BORDERLESS`      |
| `NAVIGATION_BORDERLESS`     | `navigation-borderless`     | @deprecated — use `NAVIGATION_SECONDARY`       |
| `ICON_DEFAULT`              | `icon-default`              |                                                |
| `ICON_SECONDARY`            | `icon-secondary`            |                                                |
| `ICON_LINK`                 | `icon-link`                 |                                                |
| `ICON_DARK`                 | `icon-dark`                 | @deprecated                                    |
| `ICON_NAVIGATION`           | `icon-navigation`           |                                                |
| `SUCCESS`                   | `success`                   |                                                |
| `WARNING`                   | `warning`                   |                                                |
| `TEXT_NORMAL`               | `text-normal`               |                                                |
| `TEXT_PRIMARY`              | `text-primary`              |                                                |
| `TEXT_SECONDARY`            | `text-secondary`            |                                                |
| `TEXT_DESTRUCTIVE`          | `text-destructive`          |                                                |
| `TEXT_ALERT_INFO`           | `text-alert-info`           |                                                |
| `TEXT_ALERT_SUCCESS`        | `text-alert-success`        |                                                |
| `TEXT_ALERT_WARNING`        | `text-alert-warning`        |                                                |
| `TEXT_ALERT_ERROR`          | `text-alert-error`          |                                                |
| `TEXT_NAVIGATION_PRIMARY`   | `text-navigation-primary`   |                                                |
| `TEXT_NAVIGATION_SECONDARY` | `text-navigation-secondary` |                                                |
| `TEXT_NAVIGATION_INFO`      | `text-navigation-info`      |                                                |

#### `TextButtonSizes`

Accessed via `Button.TextButtonSizes.<KEY>`. Only applies when `type` is one of the `TEXT_*` variants.

| Key      | Value    |
| -------- | -------- |
| `NORMAL` | `normal` |
| `SMALL`  | `small`  |

`SMALL` replaces inline `<a>` or `<Link>` elements only. Do not use it as a general-purpose smaller button.

### Props Interfaces

#### `ButtonProps`

Extends: `Omit<React.HTMLProps<HTMLButtonElement>, 'ref'>`

| Prop             | Type                                                                   | Default                  | Required | Description                                                                                                                                                                                                                                                                                                                                                 |
| ---------------- | ---------------------------------------------------------------------- | ------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`           | `ButtonTypes`                                                          | `ButtonTypes.PRIMARY`    | No       | Visual variant of the button. Use `Button.ButtonTypes.<KEY>`.                                                                                                                                                                                                                                                                                               |
| `children`       | `React.ReactNode`                                                      | —                        | Yes      | Button label text, icon, or mixed content. A single non-array object child auto-activates `square` appearance.                                                                                                                                                                                                                                              |
| `className`      | `string`                                                               | —                        | No       | Additional CSS class names.                                                                                                                                                                                                                                                                                                                                 |
| `disabled`       | `boolean`                                                              | —                        | No       | Disables the button, prevents all events, and removes it from keyboard navigation. Wraps in a `<span>` to fix a React `onMouseLeave` bug. Do not combine with `aria-disabled`.                                                                                                                                                                              |
| `aria-disabled`  | `AriaDisabledType` (`boolean \| 'true' \| 'false'`)                    | —                        | No       | Keeps the button focusable and in the tab order while blocking `onClick`. Use when users should still focus the button to discover why it is unavailable. Do not combine with `disabled`.                                                                                                                                                                   |
| `appearance`     | `'default' \| 'square' \| 'mini' \| 'transparent-mini' \| 'underline'` | Auto-detected            | No       | Shape override. `default` = text label layout. `square` = equal width/height (auto-applied when `children` is a single non-array node). `mini` = compact icon button. `transparent-mini` = compact with transparent icon, suited for gradient backgrounds. `underline` = text button underline style (text types only — throws `TypeError` on other types). |
| `fullWidth`      | `boolean`                                                              | `false`                  | No       | Stretches the button to 100% of its container width.                                                                                                                                                                                                                                                                                                        |
| `count`          | `number \| null \| false`                                              | —                        | No       | Renders a numeric badge on the button. When `count` is a finite number and `children` is a plain string and no `aria-label` is provided, a default label of `"<children> <count> item(s)"` is generated automatically.                                                                                                                                      |
| `htmlType`       | `'submit' \| 'reset' \| 'button'`                                      | `'button'`               | No       | Maps to the native `<button type>` attribute. Use `'submit'` for form submission.                                                                                                                                                                                                                                                                           |
| `textButtonSize` | `TextButtonSizes`                                                      | `TextButtonSizes.NORMAL` | No       | Size variant for text buttons. Only applied when `type` is one of the `TEXT_*` variants.                                                                                                                                                                                                                                                                    |
| `background`     | `BackgroundTypeWithoutBody` (`'base' \| 'alt'`)                        | —                        | No       | Explicit background context override. Prefer using a parent layout component with a `background` prop (e.g. `<FlexLayout background="alt">`) over this prop directly, as that is the recommended pattern.                                                                                                                                                   |
| `innerRef`       | `React.LegacyRef<HTMLButtonElement>`                                   | —                        | No       | Ref forwarded to the inner `<button>` DOM element.                                                                                                                                                                                                                                                                                                          |
| `tabIndex`       | `number`                                                               | `0`                      | No       | Tab index. Defaults to `0` (required for Safari/WebKit focus support).                                                                                                                                                                                                                                                                                      |
| `data-test`      | `string`                                                               | —                        | No       | Test selector attribute.                                                                                                                                                                                                                                                                                                                                    |
| `onClick`        | `React.MouseEventHandler<HTMLButtonElement>`                           | —                        | No       | Click handler. Suppressed automatically when `disabled` or `aria-disabled` is set.                                                                                                                                                                                                                                                                          |
| `onMouseEnter`   | `React.MouseEventHandler<HTMLButtonElement>`                           | —                        | No       | Mouse-enter handler. When `disabled` is set, forwarded to the wrapping `<span>` instead.                                                                                                                                                                                                                                                                    |
| `onMouseLeave`   | `React.MouseEventHandler<HTMLButtonElement>`                           | —                        | No       | Mouse-leave handler. When `disabled` is set, forwarded to the wrapping `<span>` to work around a React bug with disabled buttons.                                                                                                                                                                                                                           |
| `aria-label`     | `string`                                                               | —                        | No       | Accessible label. Required for icon-only buttons. When set alongside `count`, overrides the auto-generated count label.                                                                                                                                                                                                                                     |

All other `React.HTMLProps<HTMLButtonElement>` props (e.g. `role`, `style`, `data-*`) pass through to the underlying `<button>`.

### Static Members

- `Button.ButtonTypes` = `ButtonTypes` enum
- `Button.TextButtonSizes` = `TextButtonSizes` enum

---

### `ButtonGroup`

Glues multiple buttons together with connected borders for related actions. Provides `ArrowLeft` / `ArrowRight` keyboard navigation between its children.

**Import:** `import { ButtonGroup } from '@nutanix-ui/prism-reactjs'`

#### `ButtonGroupProps`

Extends: `FlexLayoutProps`

| Prop        | Type              | Required | Description                                                                                 |
| ----------- | ----------------- | -------- | ------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode` | Yes      | Allowed children: `Button`, `Dropdown`, `Tooltip`, `Popover`. Mixed other types are errors. |
| `className` | `string`          | No       | Additional CSS class names.                                                                 |

Keyboard: `ArrowRight` moves focus to the next button; `ArrowLeft` moves focus to the previous button.

---

### `AdaptiveButtonGroup`

Accessible toolbar composed of an optional PRIMARY action, an optional `ButtonGroup` of SECONDARY actions, and an automatic "More" overflow dropdown that collapses secondary actions when the container narrows. Also supports a hard cap on the number of visible buttons via `maxVisibleButtons`.

**Import:** `import { AdaptiveButtonGroup } from '@nutanix-ui/prism-reactjs'`

**Design:** Figma 26.4

#### `AdaptiveButtonGroupProps`

Extends: `Omit<FlexLayoutProps, 'children' | 'itemSpacing'>` and `MoreButtonHostProps`

| Prop                      | Type                                                          | Default | Required | Description                                                                                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `primaryAction`           | `AdaptivePrimaryAction`                                       | —       | No       | Optional primary slot. Renders as a `PRIMARY` Button. Set `dropdownProps` to make it a dropdown trigger (appends `ChevronDownIcon`). Set `splitButtonProps` for a two-button split arrangement. Mutually exclusive. |
| `secondaryActions`        | `AdaptiveSecondaryAction[]`                                   | `[]`    | No       | Array of secondary actions rendered as a `SECONDARY` ButtonGroup. Overflowing items collapse into the "More" dropdown.                                                                                              |
| `maxVisibleButtons`       | `number`                                                      | `5`     | No       | Hard cap on total visible buttons (primary counts as 1). Width-based overflow still applies independently.                                                                                                          |
| `className`               | `string`                                                      | —       | No       | Additional CSS class names on the root container.                                                                                                                                                                   |
| `aria-label`              | `string`                                                      | —       | No       | Accessible label for the `role="toolbar"` container.                                                                                                                                                                |
| `data-test`               | `string`                                                      | —       | No       | Test selector on the root container.                                                                                                                                                                                |
| `moreButtonProps`         | `Omit<ButtonProps, 'type' \| 'children'>`                     | —       | No       | Extra props for the "More" overflow trigger button.                                                                                                                                                                 |
| `moreButtonTooltipProps`  | `Omit<ToolTipProps, 'children' \| 'content' \| 'oldTooltip'>` | —       | No       | Extra props for the Tooltip wrapping the "More" button.                                                                                                                                                             |
| `moreButtonDropdownProps` | `Omit<DropdownProps, 'children' \| 'popup'>`                  | —       | No       | Extra props (e.g. `getPopupContainer`) for the Dropdown wrapping the "More" button.                                                                                                                                 |

#### `AdaptivePrimaryAction`

Extends `Omit<ButtonProps, 'type' | 'children' | 'ref'>` plus:

| Prop               | Type                                             | Required | Description                                                                                                       |
| ------------------ | ------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `children`         | `React.ReactNode`                                | Yes      | Primary button label.                                                                                             |
| `tooltipProps`     | `Omit<ToolTipProps, 'children' \| 'oldTooltip'>` | No       | Wraps the entire primary section in a Tooltip.                                                                    |
| `dropdownProps`    | `Omit<DropdownProps, 'children'>`                | No       | Makes the primary button a Dropdown trigger with a trailing chevron. Mutually exclusive with `splitButtonProps`.  |
| `splitButtonProps` | `SplitButtonConfig`                              | No       | Renders a two-button split arrangement (main action + chevron dropdown). Mutually exclusive with `dropdownProps`. |

#### `AdaptiveSecondaryAction`

Extends `Omit<ButtonProps, 'type' | 'children' | 'ref' | 'key'>` plus:

| Prop              | Type                                             | Required | Description                                                                                                                             |
| ----------------- | ------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `key`             | `string \| number`                               | Yes      | Stable React key used for overflow menu click dispatch.                                                                                 |
| `children`        | `React.ReactNode`                                | Yes      | Button label / icon content.                                                                                                            |
| `overflowLabel`   | `React.ReactNode`                                | No       | Label used as the `MenuItem`/`MenuGroup` title when this entry is in the overflow. Falls back to `children` (string) then `aria-label`. |
| `dropdownOptions` | `DropdownOption[]`                               | No       | Structured list of dropdown options. Visible as a `Dropdown` when the button is shown; as a `MenuGroup` when overflowed.                |
| `dropdownProps`   | `Omit<DropdownProps, 'children' \| 'popup'>`     | No       | Extra config for the `Dropdown` wrapping the visible button.                                                                            |
| `tooltipProps`    | `Omit<ToolTipProps, 'children' \| 'oldTooltip'>` | No       | Tooltip on the visible button; forwarded to the `MenuItem` when overflowed.                                                             |

---

### `TextButtonGroup`

Responsive group of text-type buttons that collapses overflowing items into a dropdown menu. Items are rendered once and pulled off-screen via CSS for overflow measurement (no hidden clones).

**Import:** `import { TextButtonGroup } from '@nutanix-ui/prism-reactjs'`

**Design:** Figma 26.4

#### `TextButtonGroupProps`

Extends: `Omit<FlexLayoutProps, 'children'>` and `MoreButtonHostProps`

| Prop                      | Type                                                          | Default | Required | Description                                                                         |
| ------------------------- | ------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------- |
| `items`                   | `TextButtonGroupItem[]`                                       | —       | Yes      | Array of text button configurations.                                                |
| `className`               | `string`                                                      | —       | No       | Additional CSS class names.                                                         |
| `aria-label`              | `string`                                                      | —       | No       | Accessible label for the `role="toolbar"` container.                                |
| `data-test`               | `string`                                                      | —       | No       | Test selector.                                                                      |
| `moreButtonProps`         | `Omit<ButtonProps, 'type' \| 'children'>`                     | —       | No       | Extra props for the "More" overflow trigger button.                                 |
| `moreButtonTooltipProps`  | `Omit<ToolTipProps, 'children' \| 'content' \| 'oldTooltip'>` | —       | No       | Extra props for the Tooltip wrapping the "More" button.                             |
| `moreButtonDropdownProps` | `Omit<DropdownProps, 'children' \| 'popup'>`                  | —       | No       | Extra props (e.g. `getPopupContainer`) for the Dropdown wrapping the "More" button. |

#### `TextButtonGroupItem`

Extends `Omit<ButtonProps, 'type'>` plus:

| Prop              | Type                                             | Required | Description                                                                                                        |
| ----------------- | ------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `key`             | `string \| number`                               | Yes      | Stable React key and overflow click dispatch identifier.                                                           |
| `children`        | `React.ReactNode`                                | Yes      | Button label.                                                                                                      |
| `type`            | `TextButtonType \| TextNavigationButtonType`     | No       | Text button type. All items in a single `TextButtonGroup` must belong to the same group (standard vs. navigation). |
| `overflowLabel`   | `React.ReactNode`                                | No       | Label used as `MenuItem`/`MenuGroup` title when overflowed.                                                        |
| `dropdownOptions` | `DropdownOption[]`                               | No       | Dropdown options — shown as `Dropdown` when visible, as `MenuGroup` when overflowed.                               |
| `dropdownProps`   | `Omit<DropdownProps, 'children' \| 'popup'>`     | No       | Extra config for the `Dropdown` wrapping the visible button.                                                       |
| `tooltipProps`    | `Omit<ToolTipProps, 'children' \| 'oldTooltip'>` | No       | Per-item tooltip; forwarded to `MenuItem.tooltipProps` when overflowed.                                            |

**`TextButtonType`** (standard group): `TEXT_NORMAL`, `TEXT_PRIMARY`, `TEXT_SECONDARY`, `TEXT_DESTRUCTIVE`, `TEXT_ALERT_INFO`, `TEXT_ALERT_SUCCESS`, `TEXT_ALERT_WARNING`, `TEXT_ALERT_ERROR`

**`TextNavigationButtonType`** (navigation group): `TEXT_NAVIGATION_PRIMARY`, `TEXT_NAVIGATION_SECONDARY`, `TEXT_NAVIGATION_INFO`

---

### Shared Types

#### `DropdownOption`

Used in `AdaptiveSecondaryAction.dropdownOptions` and `TextButtonGroupItem.dropdownOptions`.

| Prop           | Type                                             | Required | Description                                                    |
| -------------- | ------------------------------------------------ | -------- | -------------------------------------------------------------- |
| `key`          | `string \| number`                               | Yes      | Stable key; used as React key and overflow click dispatch ID.  |
| `children`     | `React.ReactNode`                                | Yes      | Option label / content.                                        |
| `onClick`      | `(event: React.MouseEvent) => void`              | No       | Fires in both the visible Dropdown and the overflow MenuGroup. |
| `disabled`     | `boolean`                                        | No       | Disables the option in both render contexts.                   |
| `tooltipProps` | `Omit<ToolTipProps, 'children' \| 'oldTooltip'>` | No       | Tooltip forwarded to the `MenuItem` in both render contexts.   |
| `aria-label`   | `string`                                         | No       | Accessible label for the option's `MenuItem`.                  |
| `data-test`    | `string`                                         | No       | Test selector for the option's `MenuItem`.                     |

#### `SplitButtonConfig`

Used in `AdaptivePrimaryAction.splitButtonProps`.

| Prop            | Type                                      | Required | Description                                                        |
| --------------- | ----------------------------------------- | -------- | ------------------------------------------------------------------ |
| `dropdownProps` | `Omit<DropdownProps, 'children'>`         | Yes      | Dropdown props for the trailing chevron button (supply `popup`).   |
| `icon`          | `React.ReactNode`                         | No       | Icon inside the chevron button. Defaults to `<ChevronDownIcon />`. |
| `aria-label`    | `string`                                  | No       | Accessible label for the trailing chevron button (recommended).    |
| `buttonProps`   | `Omit<ButtonProps, 'type' \| 'children'>` | No       | Additional props forwarded to the chevron `Button`.                |

---

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
import {
  Paragraph,
  StackingLayout,
  UnorderedList,
  Title,
} from '@nutanix-ui/prism-reactjs'

/* eslint-disable max-len */
const listData = [
  'Usually this is the button text',
  'If a button does not have text (such as an icon button), an aria-label that describes what the button does should be added. If the aria-label duplicates the tooltip content, the tooltip content should be hidden from screen readers.',
  'If the button text does not include enough context to be descriptive, use either aria-labelledby (if there is nearby visible text that can provide context) or an aria-label',
  'If an aria-label (or aria-labelledby) is used on a button with visible text, the visible text must be the START of the aria-label',
]
/* eslint-enable max-len */

;<StackingLayout itemGap="XL" style={{ maxWidth: 800 }}>
  <StackingLayout>
    <Title size="h3">
      All buttons should have unique, descriptive, visual labels.
    </Title>
    <UnorderedList data={listData} />
  </StackingLayout>
  <StackingLayout>
    <Title size="h3">Disabled vs. Aria-Disabled Behavior</Title>
    <Paragraph>
      <code>disabled</code> prevents all interaction and removes the button from
      keyboard navigation. Screen readers treat disabled buttons as plain text.
    </Paragraph>
    <Paragraph>
      <code>aria-disabled</code> keeps the button focusable and in the normal
      tab order, allowing for showing tooltips and preserving focus position.
      Use aria-disabled when users should still be able to focus and learn why
      something isn't available.
    </Paragraph>
    <Paragraph>
      Never use <code>disabled</code> and <code>aria-disabled</code> together.
    </Paragraph>
    <Paragraph>
      The Button component prevents onClick with either aria-disabled or
      disabled. When using a form submit type button with aria-disabled,
      preventing form submission will need to be configured separately.
    </Paragraph>
    <Paragraph>
      When disabling an element, communicate why it's disabled. Show the reason
      upfront in nearby text when possible, or use a tooltip if space is
      limited.
    </Paragraph>
  </StackingLayout>
</StackingLayout>
```

#### Presentation

```tsx
import {
  ChevronDownIcon,
  FlexLayout,
  StackingLayout,
  Button,
  ButtonGroup,
  Dropdown,
  Menu,
  MenuItem,
  Tooltip,
  MinusIcon,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Save Option 1</MenuItem>
    <MenuItem key="2">Save Option 2</MenuItem>
    <MenuItem key="3">Save Option 3</MenuItem>
  </Menu>
)

;<StackingLayout>
  <FlexLayout>
    <Button>Create</Button>
    <Button type={Button.ButtonTypes.SECONDARY}>Cancel</Button>
    <Button type={Button.ButtonTypes.SUCCESS}>Upgrade</Button>
    <Button type={Button.ButtonTypes.WARNING}>Reboot</Button>
    <Button type={Button.ButtonTypes.DESTRUCTIVE}>Remove</Button>
  </FlexLayout>
  <FlexLayout>
    <Button count={1}>Deploy</Button>
    <ButtonGroup>
      <Button>Save All</Button>
      <Dropdown
        getPopupContainer={() => document.querySelector('.right-panel')}
        popup={menu}
      >
        <Button aria-label="Toggle options dropdown">
          <ChevronDownIcon />
        </Button>
      </Dropdown>
    </ButtonGroup>
    {/* Tooltip hidden from screen readers since it duplicates the aria-label */}
    <Tooltip
      appearance={Tooltip.APPEARANCE.SECONDARY}
      content="Remove Filter"
      contentProps={{ 'aria-hidden': 'true' }}
      oldTooltip={false}
      size="mini"
    >
      <Button aria-label="Remove Filter" type={Button.ButtonTypes.SECONDARY}>
        <MinusIcon />
      </Button>
    </Tooltip>
    <Button disabled={true}>Loading...</Button>
  </FlexLayout>
</StackingLayout>
```

#### Icon-Only Buttons (with Tooltips)

```tsx
import {
  FlexLayout,
  Tooltip,
  MinusIcon,
  PlusIcon,
  Button,
  CloneIcon,
} from '@nutanix-ui/prism-reactjs'

{
  /* Tooltips are hidden from screen readers since they duplicate the aria-labels */
}
;<FlexLayout alignItems="center">
  <Tooltip
    content="Create VM"
    contentProps={{ 'aria-hidden': 'true' }}
    oldTooltip={false}
  >
    <Button aria-label="Create VM">
      <PlusIcon size="small" />
    </Button>
  </Tooltip>
  <Tooltip
    content="Remove Filter"
    contentProps={{ 'aria-hidden': 'true' }}
    oldTooltip={false}
  >
    <Button aria-label="Remove Filter" type={Button.ButtonTypes.SECONDARY}>
      <MinusIcon />
    </Button>
  </Tooltip>
  <Tooltip
    oldTooltip={false}
    mouseEnterDelay={300}
    size="mini"
    content="Copy"
    contentProps={{ 'aria-hidden': 'true' }}
  >
    <Button
      aria-label="Copy"
      appearance="mini"
      type={Button.ButtonTypes.ICON_DEFAULT}
    >
      <CloneIcon />
    </Button>
  </Tooltip>
</FlexLayout>
```

#### Mini and Transparent-Mini Buttons

```tsx
import {
  FlexLayout,
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronCutoutLeftIcon,
  ChevronCutoutRightIcon,
} from '@nutanix-ui/prism-reactjs'

{
  /* Mini — compact icon buttons */
}
;<FlexLayout alignItems="center" itemSpacing="10px">
  <Button
    appearance="mini"
    type={Button.ButtonTypes.SECONDARY}
    aria-label="Previous"
  >
    <ChevronLeftIcon />
  </Button>
  <Button appearance="mini" aria-label="Next">
    <ChevronRightIcon />
  </Button>
</FlexLayout>

{
  /* Transparent-mini — over gradients */
}
;<FlexLayout
  alignItems="center"
  itemSpacing="10px"
  padding="20px"
  style={{ background: 'linear-gradient(45deg, black, transparent)' }}
>
  <Button
    appearance="transparent-mini"
    type={Button.ButtonTypes.SECONDARY}
    aria-label="Previous"
  >
    <ChevronCutoutLeftIcon />
  </Button>
  <Button appearance="transparent-mini" aria-label="Next">
    <ChevronCutoutRightIcon />
  </Button>
</FlexLayout>
```

#### Navigation Background Buttons

```tsx
import {
  StackingLayout,
  FlexLayout,
  Button,
  ButtonGroup,
  Dropdown,
  Menu,
  MenuItem,
  ChevronDownIcon,
  ChevronLeftIcon,
  PlusIcon,
  Title,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Option 1</MenuItem>
    <MenuItem key="2">Option 2</MenuItem>
  </Menu>
)

{
  /* Navigation Primary — used on dark navigation chrome */
}
;<FlexLayout className="ntnx-navigation-example" style={{ padding: 20 }}>
  <Button type={Button.ButtonTypes.NAVIGATION_PRIMARY}>Click me</Button>
  <Button type={Button.ButtonTypes.NAVIGATION_PRIMARY} aria-label="Go back">
    <ChevronLeftIcon /> Previous
  </Button>
  <Button type={Button.ButtonTypes.NAVIGATION_PRIMARY} disabled={true}>
    Disabled
  </Button>
  <ButtonGroup>
    <Button type={Button.ButtonTypes.NAVIGATION_PRIMARY}>Save</Button>
    <Dropdown popup={menu}>
      <Button
        type={Button.ButtonTypes.NAVIGATION_PRIMARY}
        aria-label="Toggle options dropdown"
      >
        <ChevronDownIcon />
      </Button>
    </Dropdown>
  </ButtonGroup>
</FlexLayout>

{
  /* Navigation Secondary — used on alt/base navigation backgrounds */
}
;<FlexLayout
  className="ntnx-navigation-example"
  background="base"
  style={{ padding: 20 }}
>
  <Button type={Button.ButtonTypes.NAVIGATION_SECONDARY}>Click me</Button>
  <Button type={Button.ButtonTypes.NAVIGATION_SECONDARY} aria-disabled={true}>
    Aria Disabled
  </Button>
</FlexLayout>
```

#### Text Buttons

```tsx
import { Button, StackingLayout, FlexLayout } from '@nutanix-ui/prism-reactjs'

{
  /* Standard text button types */
}
;<StackingLayout>
  <FlexLayout>
    <Button type={Button.ButtonTypes.TEXT_NORMAL}>Save</Button>
    <Button type={Button.ButtonTypes.TEXT_PRIMARY}>Save</Button>
    <Button type={Button.ButtonTypes.TEXT_SECONDARY}>Save</Button>
    <Button type={Button.ButtonTypes.TEXT_DESTRUCTIVE}>Delete</Button>
  </FlexLayout>

  {/* With underline appearance */}
  <FlexLayout>
    <Button type={Button.ButtonTypes.TEXT_PRIMARY} appearance="underline">
      Learn More
    </Button>
  </FlexLayout>

  {/* Small size — replaces inline links only */}
  <FlexLayout>
    <Button
      type={Button.ButtonTypes.TEXT_PRIMARY}
      textButtonSize={Button.TextButtonSizes.SMALL}
    >
      Link-style action
    </Button>
  </FlexLayout>
</StackingLayout>
```

#### Styling a Link as a Button

```tsx
import { Button, StackingLayout, Paragraph } from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    If your design calls for a button that navigates to a new page or part of a
    page, add a role of "link" to the Button component for proper semantics.
    Buttons perform actions; links take you somewhere new.
  </Paragraph>
  <Button role="link">New page</Button>
</StackingLayout>
```

#### Using Button with Count

```tsx
import {
  FlexLayout,
  StackingLayout,
  Button,
  Title,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout alignItems="center">
  <Title size="h3">VMs</Title>
  {/* Explicit aria-label recommended when count is present */}
  <Button type={Button.ButtonTypes.SUCCESS} aria-label="Upgrade 1 VM" count={1}>
    Upgrade
  </Button>
  <Button
    type={Button.ButtonTypes.SUCCESS}
    aria-label="Upgrade 2 VMs"
    count={2}
  >
    Upgrade
  </Button>
</FlexLayout>
```

#### Split Button (ButtonGroup + Dropdown)

```tsx
import {
  Button,
  ButtonGroup,
  Dropdown,
  Menu,
  MenuItem,
  ChevronDownIcon,
} from '@nutanix-ui/prism-reactjs'

const menu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="1">Option 1</MenuItem>
    <MenuItem key="2">Option 2</MenuItem>
    <MenuItem key="3">Option 3</MenuItem>
  </Menu>
)

;<ButtonGroup>
  <Button type={Button.ButtonTypes.PRIMARY}>Save</Button>
  <Dropdown
    getPopupContainer={() => document.querySelector('.right-panel')}
    popup={menu}
  >
    <Button
      type={Button.ButtonTypes.PRIMARY}
      aria-label="Toggle options dropdown"
    >
      <ChevronDownIcon />
    </Button>
  </Dropdown>
</ButtonGroup>
```

#### Full-Width Button

```tsx
import { Button } from '@nutanix-ui/prism-reactjs'
;<Button fullWidth={true}>Looooooong Button</Button>
```

#### AdaptiveButtonGroup — Basic

```tsx
import { AdaptiveButtonGroup } from '@nutanix-ui/prism-reactjs'

const getPopupContainer = () => document.querySelector('.right-panel')

const secondary = [
  { key: 'edit', children: 'Edit' },
  { key: 'duplicate', children: 'Duplicate' },
  { key: 'download', children: 'Download' },
  { key: 'share', children: 'Share' },
]

;<AdaptiveButtonGroup
  aria-label="Document actions"
  primaryAction={{ children: 'Save' }}
  secondaryActions={secondary}
  moreButtonDropdownProps={{ getPopupContainer }}
/>
```

#### AdaptiveButtonGroup — Split Primary

```tsx
import { AdaptiveButtonGroup, Menu, MenuItem } from '@nutanix-ui/prism-reactjs'

const getPopupContainer = () => document.querySelector('.right-panel')

const saveMenu = (
  <Menu appearance={Menu.MenuAppearance.COMPACT}>
    <MenuItem key="save-and-new">Save and New</MenuItem>
    <MenuItem key="save-and-close">Save and Close</MenuItem>
    <MenuItem key="save-draft">Save as Draft</MenuItem>
  </Menu>
)

;<AdaptiveButtonGroup
  aria-label="Save actions"
  primaryAction={{
    children: 'Save',
    splitButtonProps: {
      'aria-label': 'More save options',
      dropdownProps: { popup: saveMenu, getPopupContainer },
    },
  }}
  secondaryActions={[
    { key: 'edit', children: 'Edit' },
    { key: 'duplicate', children: 'Duplicate' },
    { key: 'delete', children: 'Delete' },
  ]}
  moreButtonDropdownProps={{ getPopupContainer }}
/>
```

#### AdaptiveButtonGroup — Secondary with Dropdown Options

```tsx
import { AdaptiveButtonGroup } from '@nutanix-ui/prism-reactjs'

const getPopupContainer = () => document.querySelector('.right-panel')

;<AdaptiveButtonGroup
  aria-label="Document actions"
  primaryAction={{ children: 'Save' }}
  secondaryActions={[
    {
      key: 'export',
      children: 'Export',
      overflowLabel: 'Export as',
      dropdownProps: { getPopupContainer },
      dropdownOptions: [
        { key: 'export-csv', children: 'Export as CSV', onClick: () => {} },
        { key: 'export-json', children: 'Export as JSON', onClick: () => {} },
      ],
    },
    { key: 'delete', children: 'Delete', onClick: () => {} },
  ]}
  moreButtonDropdownProps={{ getPopupContainer }}
/>
```

#### TextButtonGroup — Standard

```tsx
import { TextButtonGroup, Button } from '@nutanix-ui/prism-reactjs'

const items = [
  { key: '1', children: 'Overview', type: Button.ButtonTypes.TEXT_PRIMARY },
  { key: '2', children: 'Details', type: Button.ButtonTypes.TEXT_PRIMARY },
  { key: '3', children: 'Settings', type: Button.ButtonTypes.TEXT_PRIMARY },
  { key: '4', children: 'Monitoring', type: Button.ButtonTypes.TEXT_PRIMARY },
  { key: '5', children: 'Diagnostics', type: Button.ButtonTypes.TEXT_PRIMARY },
]

;<TextButtonGroup
  items={items}
  aria-label="Section navigation"
  moreButtonProps={{ type: Button.ButtonTypes.TEXT_PRIMARY }}
/>
```

#### TextButtonGroup — With Dropdown Options and Tooltips

```tsx
import { TextButtonGroup, Button } from '@nutanix-ui/prism-reactjs'

const getPopupContainer = () => document.querySelector('.right-panel')

const items = [
  {
    key: 'edit',
    children: 'Edit',
    type: Button.ButtonTypes.TEXT_PRIMARY,
    tooltipProps: { content: 'Modify this resource' },
    onClick: () => console.log('Edit'),
  },
  {
    key: 'snapshot',
    children: 'Snapshot',
    type: Button.ButtonTypes.TEXT_PRIMARY,
    overflowLabel: 'Snapshot',
    dropdownProps: { getPopupContainer },
    dropdownOptions: [
      { key: 'snap-take', children: 'Take Snapshot', onClick: () => {} },
      {
        key: 'snap-restore',
        children: 'Restore from Snapshot',
        onClick: () => {},
      },
    ],
  },
  {
    key: 'delete',
    children: 'Delete',
    type: Button.ButtonTypes.TEXT_DESTRUCTIVE,
    tooltipProps: { content: 'Permanently delete this virtual machine' },
    onClick: () => console.log('Delete'),
  },
]

;<TextButtonGroup
  items={items}
  aria-label="Virtual machine actions"
  moreButtonDropdownProps={{ getPopupContainer }}
/>
```

### Usage Notes

- Prefer `Button.ButtonTypes.<KEY>` over raw type strings.
- Icon-only buttons must always have `aria-label`. When a tooltip duplicates the label, set `contentProps={{ 'aria-hidden': 'true' }}` on the `Tooltip`.
- Use `aria-disabled` (not `disabled`) when the button should stay focusable so users can discover why it is unavailable.
- Use `ButtonGroup` to visually group related actions with connected borders; use `AdaptiveButtonGroup` when the toolbar must respond to container width changes.
- Use `TextButtonGroup` for horizontal tab-like navigation or action bars built from text buttons.
- Keep `appearance="underline"` to text button types only.
- `BORDERLESS` and `NAVIGATION_BORDERLESS` are deprecated; replace with `SECONDARY` / `NAVIGATION_SECONDARY` within a layout element that sets the appropriate `background` context.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing around buttons.

<!-- SOURCE-API-END -->
