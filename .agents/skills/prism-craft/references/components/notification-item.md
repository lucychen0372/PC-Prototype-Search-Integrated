# NotificationItem

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not usually mapped directly from a Figma component. Used internally by `Notification` and `NotificationTrigger`.

## React

Import: `import { NotificationItem } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
```

`NotificationIconType` is re-exported from the same package:

```tsx
import {
  NotificationItem,
  NotificationIconType,
} from '@nutanix-ui/prism-reactjs'
// or via the static property:
// NotificationItem.NotificationIconType
```

### Enums / Constants

#### `NotificationIconType`

Controls which built-in icon appears to the left of the message. Accessible via the enum or as a static property on the component.

| Key       | Value       |
| --------- | ----------- |
| `SUCCESS` | `'success'` |
| `ERROR`   | `'error'`   |
| `WARNING` | `'warning'` |
| `INFO`    | `'info'`    |
| `DONE`    | `'done'`    |

```tsx
// via enum import
import { NotificationIconType } from '@nutanix-ui/prism-reactjs';
type={ NotificationIconType.SUCCESS }

// via static property
type={ NotificationItem.NotificationIconType.ERROR }
```

> **Deprecated alias:** `NotificationItem.TYPES` is a deprecated alias for `NotificationItem.NotificationIconType`. Prefer `NotificationIconType` or `NotificationItem.NotificationIconType`.

---

### Props Interfaces

#### `NotificationItemProps`

Extends: `Omit<ContainerLayoutProps, 'type'>`

All `ContainerLayoutProps` (except `type`) are forwarded to the root `ContainerLayout` element. Notable passthrough props include `style`, `onMouseEnter`, `onMouseLeave`, `onFocus`, and `onBlur`.

| Prop                  | Type                                              | Default                     | Required          | Description                                                                                                                                                               |
| --------------------- | ------------------------------------------------- | --------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `string`                                          | —                           | **Yes** (runtime) | Unique identifier. When rendering a list of `NotificationItem`s, every item must have a unique `id`. Passed as the second argument to `onDismiss` and dropdown `onClick`. |
| `message`             | `React.ReactNode`                                 | —                           | **Yes**           | The notification message. Plain strings are automatically wrapped in a `Paragraph` and styled. For React nodes you are responsible for styling.                           |
| `className`           | `string`                                          | —                           | No                | Additional CSS class applied to the root element.                                                                                                                         |
| `messageProps`        | `ParagraphProps`                                  | —                           | No                | Extra props forwarded to the inner `Paragraph` when `message` is a string.                                                                                                |
| `messageMaxHeight`    | `number`                                          | `128`                       | No                | Maximum height (px) of the message container when `message` is a string. Content scrolls when it overflows.                                                               |
| `minMessageLineCount` | `number`                                          | `2`                         | No                | Minimum number of text lines to display before truncation. Set to `0` to always show the full text.                                                                       |
| `type`                | `NotificationIconType \| (() => React.ReactNode)` | `NotificationIconType.INFO` | No                | Selects the built-in icon, or accepts a render function for a custom icon. Custom icon must be **40×40 px**.                                                              |
| `actions`             | `NotificationItemActions \| null`                 | Default Dismiss button      | No                | Configures the footer actions shown on hover. Set to `null` to suppress all actions.                                                                                      |
| `onDismiss`           | `(event: React.MouseEvent, id: string) => void`   | —                           | No                | Called when the Dismiss button is clicked. Receives the mouse event and the `id` prop.                                                                                    |
| `width`               | `number`                                          | `300`                       | No                | Width (px) of the notification card.                                                                                                                                      |

---

#### `NotificationItemActions`

Shape of the `actions` prop.

```ts
type NotificationItemActions = {
  dismissButton?: {
    label: string // defaults to i18n 'Dismiss'
    buttonProps?: ButtonProps
  } | null // set to null to hide the Dismiss button

  actionButton?: {
    label: string
    buttonProps?: ButtonProps
  } | null

  dropdownMenu?: {
    label: string // trigger button label
    menuItems: React.ReactElement<MenuItem>[] // array of MenuItem elements
    menuProps?: NotificationItemMenuProps // see below
  }
}
```

- If `actions` is `null`, no footer is rendered.
- If `actions.dismissButton` is `null`, the Dismiss button is hidden.
- `actionButton` and `dropdownMenu` are mutually exclusive in rendering — only the first truthy one is shown alongside Dismiss.

---

#### `NotificationItemMenuProps`

Extends: `Omit<MenuProps, 'onClick'>`

| Prop      | Type                                       | Description                                                                                             |
| --------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `onClick` | `(arg1: MenuItemInfo, id: string) => void` | Called when a dropdown menu item is clicked. Receives `MenuItemInfo` and the `NotificationItem`'s `id`. |

---

### Behaviour Notes

- **Hover / focus reveals actions:** The actions footer is hidden by default and becomes visible when the card is hovered or focused. Internally the component sets `data-hover="true"` on the root element and uses CSS to show the footer.
- **Keyboard accessibility:** The component handles `onFocus` and `onBlur` to toggle the hover state, so keyboard users can access actions without a mouse.
- **`data-hover` attribute:** The root element exposes `data-hover` (`"true"` / `"false"`) — useful for testing or custom CSS selectors.
- **`data-dropdown-visible` attribute:** Set to `"true"` while the dropdown menu is open, preventing the hover state from collapsing the footer.
- **String vs node messages:** Only plain string `message` values receive automatic truncation / `Paragraph` wrapping. React node messages are rendered as-is.
- **Accessibility label:** When `message` is a string, a visually-hidden `<span>` announces the notification type (e.g. "info notification") to screen readers.
- **Icon sizing:** Custom icon render functions must return a **40×40 px** element.

---

### Source Examples

#### Basic usage — `id` and `message` are required

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
;<NotificationItem id="notification-1" message="Lorem ipsum dolor sit amet." />
```

#### Long text with word-break

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
;<NotificationItem
  id="notification-2"
  message="very_long_text_very_long_text_very_long_text_very_long_text_very_long_text_very_long_text"
  messageProps={{ wrapperDivProps: { style: { wordBreak: 'break-word' } } }}
/>
```

#### Various built-in icon types

```tsx
import { NotificationItem, StackingLayout } from '@nutanix-ui/prism-reactjs'

const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

;<StackingLayout>
  <NotificationItem
    id="n1"
    type={NotificationItem.NotificationIconType.SUCCESS}
    message={message}
  />
  <NotificationItem
    id="n2"
    type={NotificationItem.NotificationIconType.ERROR}
    message={message}
  />
  <NotificationItem
    id="n3"
    type={NotificationItem.NotificationIconType.WARNING}
    message={message}
  />
  <NotificationItem
    id="n4"
    type={NotificationItem.NotificationIconType.INFO}
    message={message}
  />
  <NotificationItem
    id="n5"
    type={NotificationItem.NotificationIconType.DONE}
    message={message}
  />
</StackingLayout>
```

#### Custom icon via render function (must be 40×40 px)

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
;<NotificationItem
  id="notification-custom-icon"
  message="Custom icon notification."
  type={() => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill="#E9F6FE" />
      {/* your custom icon paths */}
    </svg>
  )}
/>
```

#### Actions — customise the Dismiss button label

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
;<NotificationItem
  id="notification-dismiss"
  message="Hover to see a custom dismiss label."
  actions={{
    dismissButton: { label: 'Dismiss Me' },
  }}
  onDismiss={(event, id) => console.log('dismissed', id)}
/>
```

#### Actions — hide the Dismiss button (`dismissButton: null`)

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
;<NotificationItem
  id="notification-no-dismiss"
  message="No dismiss button shown."
  actions={{ dismissButton: null }}
/>
```

#### Actions — optional action button alongside Dismiss

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
;<NotificationItem
  id="notification-action"
  message="Hover to see the action button."
  actions={{
    actionButton: {
      label: 'Say Yo',
      buttonProps: { onClick: () => alert('Yo') },
    },
  }}
/>
```

#### Actions — optional action button, no Dismiss

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
;<NotificationItem
  id="notification-action-only"
  message="Hover to see the action button. Dismiss is suppressed."
  actions={{
    actionButton: {
      label: 'Say Yo',
      buttonProps: { onClick: () => alert('Yo') },
    },
    dismissButton: null,
  }}
/>
```

#### Actions — suppress all actions (`actions={null}`)

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
;<NotificationItem
  id="notification-no-actions"
  message="No footer actions at all."
  actions={null}
/>
```

#### Actions — dropdown menu

```tsx
import {
  NotificationItem,
  StackingLayout,
  MenuItem,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <NotificationItem
    id="notification-dropdown"
    message="Hover to open the dropdown menu."
    actions={{
      dropdownMenu: {
        label: 'Actions',
        menuItems: [
          <MenuItem key="1">Power On</MenuItem>,
          <MenuItem key="2">Power Off</MenuItem>,
          <MenuItem key="3">Migrate</MenuItem>,
        ],
        menuProps: {
          onClick: (info, notificationId) =>
            alert(`item ${info.key} clicked on notification ${notificationId}`),
        },
      },
    }}
  />
</StackingLayout>
```

#### Custom width and message display bounds

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
;<NotificationItem
  id="notification-wide"
  width={400}
  messageMaxHeight={400}
  minMessageLineCount={4}
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
/>
```

---

### Usage Notes

- `NotificationItem` is the card primitive used by `Notification` and `NotificationTrigger`. Prefer those higher-level components for full notification panel behaviour.
- Use `NotificationItem` directly when you need a standalone notification card or are building a custom notification container.
- Actions are revealed only on hover or keyboard focus — do not rely on them being persistently visible.
- Keep `id` unique per list; it is surfaced in `onDismiss` and dropdown `onClick` callbacks so you can identify which item was acted on.
- Use Prism layout components (`StackingLayout`, `FlexLayout`) to arrange multiple `NotificationItem`s; do not add custom CSS for spacing.

<!-- SOURCE-API-END -->
