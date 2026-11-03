# Notification

## Figma

- **Library name:** Notification (page: N/A, frame: Notification)
- **Figma spec:** https://www.figma.com/file/KVbKkR0QAFRbTVpwysQLWw/Spec-Library?version-id=3368532166&node-id=21338-167522

## React

The notification system is composed of three cooperating exports:

| Export                | Role                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| `Notification`        | Container component — mounts once near the root; renders the popup anchor |
| `NotificationTrigger` | Singleton utility — call `.add()` / `.dismiss()` from anywhere            |
| `NotificationItem`    | Individual card — used internally but also exported for static use        |

```tsx
import {
  Notification,
  NotificationTrigger,
  NotificationItem,
  NotificationTriggerCls, // the class itself, for creating independent instances
} from '@nutanix-ui/prism-reactjs'
```

### Anti-patterns

- Don't use `Alert` for transient messages — use `Notification`
- Don't create custom toast components — use `Notification`
- `Alert` is for inline banners; `Notification` is for toast-style popups
- Don't call `NotificationTrigger.add()` before `<Notification>` is mounted — no listener will receive the event

<!-- SOURCE-API-START -->

### Import

```tsx
import {
  Notification,
  NotificationTrigger,
  NotificationItem,
} from '@nutanix-ui/prism-reactjs'
```

---

## `Notification` component

### Props — `NotificationProps`

Extends `Omit<React.HTMLProps<HTMLDivElement>, 'ref'>`.

| Prop                  | Type                             | Default                            | Required | Description                                                                                                                    |
| --------------------- | -------------------------------- | ---------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `children`            | `React.ReactNode`                | —                                  | No       | Anchor element the notification popup is positioned relative to. Typically a fixed empty `<div>` to pin the stack to a corner. |
| `className`           | `string`                         | —                                  | No       | Additional class applied to the notification container `<div>`.                                                                |
| `role`                | `string`                         | `'alert'`                          | No       | ARIA role for the notification container.                                                                                      |
| `zIndex`              | `number`                         | `ZIndexes['notification-z-index']` | No       | CSS z-index for the notification popup layer.                                                                                  |
| `popupProviderProps`  | `PopupProviderProps`             | `{}`                               | No       | Props forwarded to the underlying `PopupProvider`.                                                                             |
| `notificationTrigger` | `NotificationTrigger` (instance) | global singleton                   | No       | Custom `NotificationTrigger` instance. Only needed when multiple independent containers are required simultaneously.           |
| `data-test`           | `string`                         | —                                  | No       | Selector attribute for test automation.                                                                                        |

All other `HTMLDivElement` props are spread onto the container `<div>` (excluding `ref`).

---

## `NotificationTrigger` (singleton utility)

The default export is a pre-constructed singleton instance of the `NotificationTrigger` class.  
`NotificationTriggerCls` is the class itself, for creating additional independent instances.

### `NotificationTrigger.add(notificationItem)`

Queues a new notification. Accepts all `NotificationItemProps` plus the extra field below.

| Extra field            | Type     | Default | Description                                                                                                                                    |
| ---------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoDismissDelaySecs` | `number` | `5`     | Seconds before the notification is automatically removed. Set to `0` to disable auto-dismiss (notification persists until manually dismissed). |

### `NotificationTrigger.dismiss(id)`

Programmatically removes a notification by its `id`. Cancels any pending auto-dismiss timer.

### `NotificationTrigger.register(callback)`

Subscribes a listener to notification list changes.

```ts
callback(action: NotificationTriggerAction, id: string, notificationItems: NotificationItemProps[]): void
```

### `NotificationTrigger.unregister(callback)`

Removes a previously registered listener. Call in cleanup / `useEffect` teardown.

### `NotificationTriggerAction` enum

```ts
enum NotificationTriggerAction {
  ADD = 'add',
  DISMISS = 'dismiss',
  AUTO_DISMISS = 'auto-dismiss',
}
```

### Custom instance (multiple independent containers)

```tsx
import { NotificationTriggerCls } from '@nutanix-ui/prism-reactjs'

const myTrigger = new NotificationTriggerCls({ storeName: 'my-panel' })
```

Pass the instance to `<Notification notificationTrigger={myTrigger}>` and call `myTrigger.add(...)` to scope that container independently.

---

## `NotificationItem` component

Used internally by `Notification`, but also directly exported for standalone static rendering.

> `id` and `message` are **required**.

### Props — `NotificationItemProps`

Extends `Omit<ContainerLayoutProps, 'type'>`.

| Prop                  | Type                                              | Default                                   | Required | Description                                                                                                             |
| --------------------- | ------------------------------------------------- | ----------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `string`                                          | —                                         | **Yes**  | Unique identifier for this notification. Required when managing a list.                                                 |
| `message`             | `React.ReactNode`                                 | —                                         | **Yes**  | Notification message. Plain strings are automatically wrapped in a styled `Paragraph`; React nodes must be self-styled. |
| `type`                | `NotificationIconType \| (() => React.ReactNode)` | `NotificationIconType.INFO`               | No       | Icon variant. Pass one of the enum values or a render function returning a 40×40 px React node for a custom icon.       |
| `actions`             | `NotificationItemActions \| null`                 | `{ dismissButton: { label: 'Dismiss' } }` | No       | Footer action buttons. Set to `null` to show no actions at all (useful for out-of-band dismiss flows).                  |
| `onDismiss`           | `(event: React.MouseEvent, id: string) => void`   | —                                         | No       | Called when the Dismiss button is clicked. Receives the mouse event and the notification `id`.                          |
| `messageProps`        | `ParagraphProps`                                  | —                                         | No       | Props forwarded to the inner `Paragraph` when `message` is a string.                                                    |
| `messageMaxHeight`    | `number`                                          | `128`                                     | No       | Max-height (px) of the scrollable message container.                                                                    |
| `minMessageLineCount` | `number`                                          | `2`                                       | No       | Minimum visible lines before truncation. Set to `0` to always show full text.                                           |
| `width`               | `number`                                          | `300`                                     | No       | Width (px) of the notification card.                                                                                    |
| `className`           | `string`                                          | —                                         | No       | Additional CSS class on the root element.                                                                               |
| `style`               | `React.CSSProperties`                             | —                                         | No       | Inline style merged with the default `width` style.                                                                     |

Mouse / focus events (`onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`) are also accepted and forwarded via `ContainerLayoutProps`.

### `NotificationIconType` enum

Exported on `NotificationItem.NotificationIconType` and as a standalone named export from the component file.

```ts
enum NotificationIconType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DONE = 'done',
}
```

> `NotificationItem.TYPES` is a **deprecated alias** for `NotificationItem.NotificationIconType`. Prefer the non-deprecated form.

### `NotificationItemActions` type

```ts
type NotificationItemActions = {
  /** Dismiss button — shown by default. Set to null to hide it. */
  dismissButton?: {
    label: string // default: 'Dismiss'
    buttonProps?: ButtonProps
  } | null

  /** Single optional action button rendered alongside Dismiss. */
  actionButton?: {
    label: string
    buttonProps?: ButtonProps
  }

  /** Dropdown actions menu rendered alongside Dismiss. */
  dropdownMenu?: {
    label: string
    menuItems: React.ReactElement<MenuItem>[]
    menuProps?: MenuProps & {
      onClick: (info: MenuItemInfo, id: string) => void
    }
  }
}
```

---

## TSX Examples

### Minimal — mount the container and trigger a notification

```tsx
import { Notification, NotificationTrigger } from '@nutanix-ui/prism-reactjs'

// Somewhere in your app root:
;<Notification>
  {/* Anchor to a fixed corner — notifications stack here */}
  <div style={{ position: 'fixed', top: '80px', right: '340px' }} />
</Notification>

// From any component or event handler:
NotificationTrigger.add({
  id: 'vm-created',
  message: 'Virtual machine created successfully.',
  type: 'success',
})
```

### Auto-dismiss variants

```tsx
import { NotificationTrigger } from '@nutanix-ui/prism-reactjs'

// Default: auto-dismisses after 5 seconds
NotificationTrigger.add({ message: 'Saved.' })

// Custom delay: 10 seconds
NotificationTrigger.add({
  message: 'This stays for 10 seconds.',
  autoDismissDelaySecs: 10,
})

// Persistent: stays until manually dismissed
NotificationTrigger.add({
  id: 'persistent-error',
  message: 'Upload failed. Click Dismiss to clear.',
  type: 'error',
  autoDismissDelaySecs: 0,
})
```

### All icon types

```tsx
import {
  NotificationTrigger,
  NotificationItem,
} from '@nutanix-ui/prism-reactjs'

NotificationTrigger.add({
  message: 'Info',
  type: NotificationItem.NotificationIconType.INFO,
})
NotificationTrigger.add({
  message: 'Success',
  type: NotificationItem.NotificationIconType.SUCCESS,
})
NotificationTrigger.add({
  message: 'Warning',
  type: NotificationItem.NotificationIconType.WARNING,
})
NotificationTrigger.add({
  message: 'Error',
  type: NotificationItem.NotificationIconType.ERROR,
})
NotificationTrigger.add({
  message: 'Done',
  type: NotificationItem.NotificationIconType.DONE,
})
```

### Custom icon (40×40 render function)

```tsx
import { NotificationTrigger } from '@nutanix-ui/prism-reactjs'

NotificationTrigger.add({
  id: 'custom-icon',
  message: 'Custom icon notification',
  type: () => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill="#E9F6FE" />
      {/* your icon paths */}
    </svg>
  ),
})
```

### Out-of-band dismiss (actions=null)

```tsx
import { NotificationTrigger } from '@nutanix-ui/prism-reactjs'

// Add with no action buttons — app code drives the dismiss
NotificationTrigger.add({
  id: 'background-job',
  message: 'Processing… you can dismiss this manually.',
  actions: null,
  autoDismissDelaySecs: 0,
})

// Later, when the job finishes:
NotificationTrigger.dismiss('background-job')
```

### Single action button

```tsx
import {
  NotificationTrigger,
  NotificationItem,
} from '@nutanix-ui/prism-reactjs'

NotificationTrigger.add({
  id: 'undo-delete',
  type: NotificationItem.NotificationIconType.WARNING,
  message: 'VM deleted.',
  autoDismissDelaySecs: 10,
  actions: {
    actionButton: {
      label: 'Undo',
      buttonProps: { onClick: () => undoDelete() },
    },
  },
  onDismiss: (event, id) => console.log('dismissed', id),
})
```

### Dropdown actions menu

```tsx
import {
  NotificationTrigger,
  NotificationItem,
  MenuItem,
} from '@nutanix-ui/prism-reactjs'

NotificationTrigger.add({
  id: 'vm-actions',
  type: NotificationItem.NotificationIconType.SUCCESS,
  message: 'VM is ready.',
  autoDismissDelaySecs: 0,
  actions: {
    dropdownMenu: {
      label: 'Actions',
      menuItems: [
        <MenuItem key="on">Power On</MenuItem>,
        <MenuItem key="off">Power Off</MenuItem>,
        <MenuItem key="migrate">Migrate</MenuItem>,
      ],
      menuProps: {
        onClick: (info, id) => console.log('menu click', info.key, id),
      },
    },
  },
})
```

### Listening for notification events

```tsx
import React, { useEffect, useCallback } from 'react'
import {
  NotificationTrigger,
  NotificationTriggerAction,
} from '@nutanix-ui/prism-reactjs'

function MyComponent() {
  const handleChange = useCallback(
    (action: NotificationTriggerAction, id: string) => {
      console.log(`Notification ${action}: ${id}`)
    },
    [],
  )

  useEffect(() => {
    NotificationTrigger.register(handleChange)
    return () => NotificationTrigger.unregister(handleChange)
  }, [handleChange])

  return null
}
```

### Long message with truncation control

```tsx
import { NotificationTrigger } from '@nutanix-ui/prism-reactjs'

NotificationTrigger.add({
  id: 'long-msg',
  message:
    'This is a very long message. Click to expand and read the rest of the details…',
  autoDismissDelaySecs: 0,
  type: 'info',
  minMessageLineCount: 2, // shows 2 lines; user clicks to expand
})
```

### `NotificationItem` used standalone (static, not via trigger)

```tsx
import { NotificationItem } from '@nutanix-ui/prism-reactjs'
;<NotificationItem
  id="static-note"
  type={NotificationItem.NotificationIconType.SUCCESS}
  message="Your changes have been saved."
  width={400}
  messageMaxHeight={200}
  minMessageLineCount={0} // show full text always
  onDismiss={(event, id) => console.log('dismissed', id)}
/>
```

### Multiple independent notification containers

```tsx
import { Notification, NotificationTriggerCls } from '@nutanix-ui/prism-reactjs'

const panelTrigger = new NotificationTriggerCls({ storeName: 'side-panel' })

// In app root:
;<>
  {/* Global notifications */}
  <Notification>
    <div style={{ position: 'fixed', top: 80, right: 340 }} />
  </Notification>

  {/* Panel-scoped notifications */}
  <Notification notificationTrigger={panelTrigger}>
    <div style={{ position: 'absolute', bottom: 0, left: 0 }} />
  </Notification>
</>

// Trigger only the panel container:
panelTrigger.add({ id: 'panel-note', message: 'Panel saved.' })
```

---

### Accessibility & Keyboard Notes

- The notification container renders with `role="alert"` by default, causing screen readers to announce new items automatically.
- Notifications are appended to the end of the DOM and **do not receive focus** when they appear — keyboard users must Tab through the page to reach notification action buttons.
- When using `actions` (e.g. Dismiss or custom buttons), use a generous `autoDismissDelaySecs` (≥ 10 s) so keyboard users have time to reach the actions.
- Setting `autoDismissDelaySecs=0` keeps the notification permanently visible; use with caution — it can block content and is hard to dismiss for keyboard users.
- For critical information that must be acknowledged, prefer [`Alert`](#!/Alert) (inline) or a [`Modal`](#!/Modal) (blocking) over a notification.
- Custom icon render functions must produce a **40×40 px** element; otherwise alignment with the message text will break.

### Usage Notes

- Mount `<Notification>` once near the app root (e.g. inside the main layout). Mounting it multiple times will create multiple stacks all listening to the same global trigger.
- The `children` prop is the **anchor element** — the popup stacks relative to it. A `position: fixed` empty `<div>` is the canonical pattern.
- Prefer `NotificationItem.NotificationIconType.<VALUE>` over raw strings for `type` to benefit from type-safety.
- Use `data-test` on `<Notification>` and `data-test-id` on `<NotificationItem>` for test automation selectors.

<!-- SOURCE-API-END -->
