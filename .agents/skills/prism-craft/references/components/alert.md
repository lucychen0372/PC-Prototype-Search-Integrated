# Alert

## Figma

- **Library name:** Alert Banner (page: N/A, frame: Alert Banner)
- **Alert Banner variants:**
  - Type: Info | Error | Success | Warning

## React

Import: `import { Alert } from '@nutanix-ui/prism-reactjs'`

### Enums

#### `Alert.AlertTypes` (also `Alert.TYPE` — deprecated alias)

| Key             | Value                                   |
| --------------- | --------------------------------------- |
| `INFO`          | `'info'`                                |
| `ERROR`         | `'error'`                               |
| `SUCCESS`       | `'success'`                             |
| `WARNING`       | `'warning'`                             |
| `SUPPLEMENTARY` | `'supplementary'` _(internal use only)_ |

### Props

`AlertProps` extends `FlexLayoutProps`. All `FlexLayoutProps` (and therefore HTML div attributes such as `role`, `style`, `data-*`) are accepted and forwarded to the root element.

The `showCloseIcon`, `onClose`, and `closeButtonLabel` props are governed by a discriminated union (`ConditionalAlertProps`):

- When `showCloseIcon={false}`, `onClose` and `closeButtonLabel` are **not allowed**.
- When `showCloseIcon` is `true` (or omitted), all three are available.

| Prop                  | Type                                                     | Default           | Required | Description                                                                                                                                                |
| --------------------- | -------------------------------------------------------- | ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `message`             | `React.ReactNode`                                        | —                 | **Yes**  | String or React element. Strings are auto-wrapped in `<Paragraph>`. React elements are rendered as-is; the app is responsible for styling.                 |
| `type`                | `AlertTypes`                                             | `AlertTypes.INFO` | No       | Alert severity. Use `Alert.AlertTypes.*` enum values.                                                                                                      |
| `visible`             | `boolean`                                                | `true`            | No       | Controls visibility; when `false` the component renders `null`. Changes to this prop are synced via `useEffect`.                                           |
| `inline`              | `boolean`                                                | `false`           | No       | Use when the alert is nested within content and should not stretch to container edges.                                                                     |
| `showCloseIcon`       | `boolean`                                                | `true`            | No       | Show/hide the close button. When `false`, `onClose` and `closeButtonLabel` are **disallowed** (TypeScript error).                                          |
| `onClose`             | `(e: React.MouseEvent) => void`                          | —                 | No       | Custom close handler. When provided the app **must** update `visible` itself. When absent, the component hides itself internally by setting its own state. |
| `closeButtonLabel`    | `string`                                                 | `'Close alert'`   | No       | Accessible `aria-label` for the close button (rendered as an icon-only `Button`). Only valid when `showCloseIcon` is not `false`.                          |
| `closeIconProps`      | `CloseIconProps`                                         | —                 | No       | Props forwarded to the `<CloseIcon>` inside the close button.                                                                                              |
| `paragraphProps`      | `ParagraphProps`                                         | —                 | No       | Props forwarded to the `<Paragraph>` that wraps a string `message`. Has no effect when `message` is a React element.                                       |
| `contentWrapperProps` | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>` | —                 | No       | Props for the inner content wrapper `FlexLayout`. Useful for setting a custom width.                                                                       |
| `contentIconProps`    | `StandardIconWrapperProps`                               | —                 | No       | Props for the status icon on the left. Useful to override `aria-label` / `aria-hidden`.                                                                    |
| `className`           | `string`                                                 | —                 | No       | Additional CSS class appended to the root element.                                                                                                         |

#### Data attributes set on the root element

These are set automatically and can be used for CSS selectors or test queries:

| Attribute           | Values                                                                   |
| ------------------- | ------------------------------------------------------------------------ |
| `data-type`         | `'info'` \| `'error'` \| `'success'` \| `'warning'` \| `'supplementary'` |
| `data-inline`       | `true` \| `false`                                                        |
| `data-close-icon`   | `true` \| `false`                                                        |
| `data-message-type` | `'string'` \| `'non-string'`                                             |

---

## AlertLayout

A companion layout wrapper for custom `message` content. Provides correct spacing when using React elements as the `message` prop.

Import: `import { AlertLayout } from '@nutanix-ui/prism-reactjs'`

### `AlertLayout.AlertLayoutTypes`

| Key         | Value         | Description                                                              |
| ----------- | ------------- | ------------------------------------------------------------------------ |
| `CONTAINER` | `'container'` | Default. Full-width container layout.                                    |
| `INLINE`    | `'inline'`    | Compact inline layout; use when embedding links or short inline content. |

### AlertLayout Props

`AlertLayoutProps` extends `Omit<React.HTMLProps<HTMLDivElement>, 'ref'>`.

| Prop        | Type               | Default                      | Description                                        |
| ----------- | ------------------ | ---------------------------- | -------------------------------------------------- |
| `children`  | `React.ReactNode`  | —                            | Content to render inside the layout.               |
| `type`      | `AlertLayoutTypes` | `AlertLayoutTypes.CONTAINER` | Controls spacing/layout variant.                   |
| `className` | `string`           | —                            | Additional CSS class appended to the root element. |
| `data-test` | `string`           | —                            | Test ID passthrough.                               |

---

## Figma → React Prop Mapping

| Figma Property | React Prop | Value Mapping                                                                                                                                |
| -------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Type           | `type`     | Info → `Alert.AlertTypes.INFO`, Error → `Alert.AlertTypes.ERROR`, Success → `Alert.AlertTypes.SUCCESS`, Warning → `Alert.AlertTypes.WARNING` |

---

## Accessibility

- `Alert` is purely presentational — **no `role` is set by default**.
- Add `role="alert"` for urgent/error messages (equivalent to `aria-live="assertive"` + `aria-atomic="true"`).
- Add `role="status"` for non-urgent informational updates (equivalent to `aria-live="polite"` + `aria-atomic="true"`).
- Use `role="alert"` sparingly; it interrupts the user immediately.
- If `aria-live` is off, `role` will have no effect on screen reader announcements.
- Do not rely on background color alone to convey meaning — the built-in icons carry accessibility annotations per type:

| Type            | Icon                    | Default `aria-hidden` | Default `aria-label`          |
| --------------- | ----------------------- | --------------------- | ----------------------------- |
| `INFO`          | `InformationStatusIcon` | `true`                | —                             |
| `SUCCESS`       | `SuccessStatusIcon`     | `true`                | —                             |
| `WARNING`       | `WarningStatusIcon`     | `false`               | `'warning'` (via I18nManager) |
| `ERROR`         | `AlertTriangleIcon`     | `false`               | `'error'` (via I18nManager)   |
| `SUPPLEMENTARY` | _(none)_                | —                     | —                             |

- Override icon accessibility via `contentIconProps` (e.g. `{ 'aria-label': 'Notice', 'aria-hidden': false }`).
- To draw keyboard focus to the alert (e.g. after form submission fails), put a focusable element inside `message` and call `.focus()` on it via a `ref`.

---

## TSX Examples

### Basic type variants

```tsx
import { Alert } from '@nutanix-ui/prism-reactjs'

{
  /* Info (default) */
}
;<Alert
  type={Alert.AlertTypes.INFO}
  message="Heads up! This alert needs your attention, but it's not super important."
/>

{
  /* Success */
}
;<Alert
  type={Alert.AlertTypes.SUCCESS}
  message="Well done! You successfully read this important alert message."
/>

{
  /* Warning — urgent, use role="alert" */
}
;<Alert
  type={Alert.AlertTypes.WARNING}
  role="alert"
  message="Warning! Better check yourself, you're not looking too good."
/>

{
  /* Error — urgent, use role="alert" */
}
;<Alert
  type={Alert.AlertTypes.ERROR}
  role="alert"
  message="Oh snap! Change a few things up and try submitting again."
/>
```

### Info as live region (non-urgent)

```tsx
import { Alert } from '@nutanix-ui/prism-reactjs'
;<Alert
  type={Alert.AlertTypes.INFO}
  role="status"
  message="Changes confirmed. Updates may take up to 24 hours to appear."
/>
```

### Not closable

```tsx
import { Alert } from '@nutanix-ui/prism-reactjs'
;<Alert
  showCloseIcon={false}
  message="This alert cannot be closed even if you tried."
/>
```

### Inline variant

```tsx
import { Alert } from '@nutanix-ui/prism-reactjs'

{
  /* Use inline when the alert is nested inside content */
}
;<Alert inline={true} message="You must construct additional pylons." />
```

### Controlled visibility with custom onClose

```tsx
import { useState } from 'react'
import { Alert } from '@nutanix-ui/prism-reactjs'

const MyAlert = () => {
  const [visible, setVisible] = useState(true)

  return (
    <Alert
      type={Alert.AlertTypes.WARNING}
      role="alert"
      visible={visible}
      onClose={() => setVisible(false)}
      message="Running low on memory."
    />
  )
}
```

### Visibility controlled by message presence

```tsx
import { useState } from 'react'
import { Alert, StackingLayout, Checkbox } from '@nutanix-ui/prism-reactjs'

const AlertWithConditionalVisibility = () => {
  const [isChecked, setIsChecked] = useState(true)
  const msg = isChecked ? 'Hello world! This is an alert message.' : null

  return (
    <StackingLayout>
      <Checkbox
        id="toggle_alert_checkbox"
        type={Checkbox.CheckboxTypes.TOGGLE}
        label="Toggle Alert Message"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <Alert message={msg} visible={!!msg} />
    </StackingLayout>
  )
}
```

### Multi-line string message

```tsx
import { Alert } from '@nutanix-ui/prism-reactjs'

const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`

;<Alert message={message} />
```

### Custom paragraphProps (e.g. overflow control)

```tsx
import { Alert } from '@nutanix-ui/prism-reactjs'
;<Alert
  message="Pneumonoultramicroscopicsilicovolcanoconiosis"
  paragraphProps={{
    style: { overflowWrap: 'anywhere' },
  }}
/>
```

### Custom contentIconProps (override icon accessibility)

```tsx
import { Alert } from '@nutanix-ui/prism-reactjs'
;<Alert
  type={Alert.AlertTypes.INFO}
  role="status"
  contentIconProps={{
    'aria-label': 'Notice',
    'aria-hidden': false,
  }}
  message="Important notice."
/>
```

### Custom contentWrapperProps (e.g. set max width)

```tsx
import { Alert } from '@nutanix-ui/prism-reactjs'
;<Alert
  message="You can use contentWrapperProps to style the content, such as setting a custom width."
  contentWrapperProps={{
    style: { width: '700px' },
  }}
/>
```

### Alert with a link in the message (use AlertLayout + Link)

```tsx
import { Alert, AlertLayout, Paragraph, Link } from '@nutanix-ui/prism-reactjs'
;<Alert
  type={Alert.AlertTypes.INFO}
  message={
    <AlertLayout type={AlertLayout.AlertLayoutTypes.INLINE}>
      <Paragraph>
        Normal text with a{' '}
        <Link type={`alert-${Alert.AlertTypes.INFO}`}>link</Link> that matches
        my color.
      </Paragraph>
    </AlertLayout>
  }
/>
```

### Alert with focusable error list (draw keyboard focus on show)

```tsx
import { useRef } from 'react'
import {
  Alert,
  AlertLayout,
  Paragraph,
  Link,
  UnorderedList,
  Button,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const Example = () => {
  const linkRef = useRef()
  const handleBtnClick = () => {
    linkRef.current.focus()
  }
  const list = [
    <Link href="#field-1" innerRef={linkRef} type={Link.LINK_TYPE.ALERT_ERROR}>
      First error
    </Link>,
    <Link href="#field-2" type={Link.LINK_TYPE.ALERT_ERROR}>
      Second error
    </Link>,
    <Link href="#field-3" type={Link.LINK_TYPE.ALERT_ERROR}>
      Third error
    </Link>,
  ]

  return (
    <StackingLayout>
      <Alert
        type={Alert.AlertTypes.ERROR}
        role="alert"
        message={
          <AlertLayout type={AlertLayout.AlertLayoutTypes.INLINE}>
            <Paragraph>Please fix the following errors:</Paragraph>
            <UnorderedList data={list} />
          </AlertLayout>
        }
      />
      <Button onClick={handleBtnClick}>Jump to the Alert</Button>
    </StackingLayout>
  )
}
```

### Alert inside a Modal

```tsx
import { useState } from 'react'
import {
  Button,
  StackingLayout,
  Modal,
  Paragraph,
  Alert,
} from '@nutanix-ui/prism-reactjs'

const AlertExample = () => {
  const [visible, setVisible] = useState(false)

  const customClose = () => setVisible(false)

  return (
    <div>
      <Button
        type={Button.ButtonTypes.PRIMARY}
        onClick={() => setVisible(true)}
      >
        Open Modal
      </Button>
      <Modal
        visible={visible}
        title="Modal"
        primaryButtonLabel="Done"
        primaryButtonOnClick={customClose}
        onClose={customClose}
      >
        <Alert
          type={Alert.AlertTypes.WARNING}
          role="alert"
          message="Warning! Better check yourself, you're not looking too good."
        />
        <StackingLayout padding="20px">
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Paragraph>
        </StackingLayout>
      </Modal>
    </div>
  )
}
```

### Alert used inside a form (inline error banner pattern)

```tsx
import {
  Alert,
  Button,
  Form,
  FormSection,
  FormItemInput,
  FormItemSelect,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const roleData = [
  { key: 'warchief', label: 'War Chief' },
  { key: 'sergeant', label: 'Sergeant' },
  { key: 'scout', label: 'Scout' },
]

const validations = {
  username: {
    [Form.VALIDATION_RULE.REQUIRED]: true,
    message: 'Username is required.',
  },
}

const MyFormExample = () => {
  return (
    <Form
      validations={validations}
      onSubmit={(values) => {
        /* handle submit */
      }}
    >
      {(formHelper) => {
        const { hasError } = formHelper
        return (
          <StackingLayout style={{ maxWidth: 400 }}>
            {hasError && (
              <Alert
                message="Please fill out the form again."
                inline={true}
                type={Alert.AlertTypes.ERROR}
                role="alert"
              />
            )}
            <FormSection>
              <FormItemInput
                id="username"
                label="Username"
                autoComplete="off"
                formHelper={formHelper}
              />
              <FormItemSelect
                id="rank"
                label="Rank"
                rowsData={roleData}
                formHelper={formHelper}
              />
              <Button onClick={formHelper.handleSubmit} fullWidth={true}>
                Submit
              </Button>
            </FormSection>
          </StackingLayout>
        )
      }}
    </Form>
  )
}
```

### Paginated alerts with custom message (AlertLayout + CONTAINER type)

When showing multiple rotating alerts, render all messages but use `SrOnly` to hide non-active ones from visual display while keeping them announced. Annotate with a hidden index for screen reader context. `VerticalSeparator` can optionally be placed beside the pagination controls; its `type` should match the active alert type.

```tsx
import { useState } from 'react'
import {
  Alert,
  AlertLayout,
  Paragraph,
  SrOnly,
  FlexLayout,
  FlexItem,
  Pagination,
  Button,
  VerticalSeparator,
} from '@nutanix-ui/prism-reactjs'

const DEFAULT_CURRENT_PAGE = 1
const alertTypes = [
  {
    alertMessage: 'Info banner message',
    alertType: Alert.AlertTypes.INFO,
    verticalType: VerticalSeparator.VerticalSeparatorTypes.INFO,
    paginationButtonType: Button.ButtonTypes.PRIMARY,
  },
  {
    alertMessage: 'Warning banner message',
    alertType: Alert.AlertTypes.WARNING,
    verticalType: VerticalSeparator.VerticalSeparatorTypes.WARNING,
    paginationButtonType: Button.ButtonTypes.WARNING,
  },
  {
    alertMessage: 'Success banner message',
    alertType: Alert.AlertTypes.SUCCESS,
    verticalType: VerticalSeparator.VerticalSeparatorTypes.SUCCESS,
    paginationButtonType: Button.ButtonTypes.SUCCESS,
  },
  {
    alertMessage: 'Error banner message',
    alertType: Alert.AlertTypes.ERROR,
    verticalType: VerticalSeparator.VerticalSeparatorTypes.ERROR,
    paginationButtonType: Button.ButtonTypes.DESTRUCTIVE,
  },
]

const AlertWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE)
  const onPageChange = (page: number) => {
    setCurrentPage(page > alertTypes.length ? DEFAULT_CURRENT_PAGE : page)
  }

  const {
    alertType = '',
    verticalType = '',
    paginationButtonType,
  } = alertTypes[currentPage - DEFAULT_CURRENT_PAGE] || {}

  const isUrgent =
    alertType === Alert.AlertTypes.WARNING ||
    alertType === Alert.AlertTypes.ERROR

  return (
    <Alert
      role={isUrgent ? 'alert' : 'status'}
      type={alertType}
      message={
        <AlertLayout style={{ padding: '14px 0', flexGrow: '1' }}>
          <FlexLayout alignItems="center">
            <FlexItem alignSelf="center" flexGrow="1">
              {alertTypes.map(({ alertMessage }, index) => {
                const Wrapper =
                  index === currentPage - DEFAULT_CURRENT_PAGE
                    ? Paragraph
                    : SrOnly
                return (
                  <React.Fragment key={index}>
                    <SrOnly>Alert number {index + 1}</SrOnly>
                    <Wrapper>{alertMessage}</Wrapper>
                  </React.Fragment>
                )
              })}
            </FlexItem>
            <FlexItem alignSelf="flex-start" flexShrink="0">
              <FlexLayout style={{ marginTop: '4px' }}>
                <Pagination
                  total={alertTypes.length}
                  currentPage={currentPage}
                  pageSize={DEFAULT_CURRENT_PAGE}
                  showOnlyPage={true}
                  onChange={onPageChange}
                  nextProps={{ type: paginationButtonType }}
                  prevProps={{ type: paginationButtonType }}
                />
                <VerticalSeparator
                  type={verticalType}
                  style={{ opacity: '.3' }}
                />
              </FlexLayout>
            </FlexItem>
          </FlexLayout>
        </AlertLayout>
      }
    />
  )
}
```

### Supplementary type (internal use — layout demo only)

`Alert.AlertTypes.SUPPLEMENTARY` renders no status icon and applies a neutral supplementary style. It is reserved for internal Nutanix tooling; do not use it in product features.

```tsx
import { Alert, AlertLayout } from '@nutanix-ui/prism-reactjs'
;<Alert
  type={Alert.AlertTypes.SUPPLEMENTARY}
  inline={true}
  message={<AlertLayout>Internal supplementary content goes here.</AlertLayout>}
/>
```

---

## Migration: v1 (Ant Design) → v2

The v2 Alert was rebuilt from scratch without the Ant Design dependency. The DOM structure and stylesheets changed completely.

### Removed props (no v2 equivalent)

| v1 prop       | Notes                                                                          |
| ------------- | ------------------------------------------------------------------------------ |
| `afterClose`  | No replacement.                                                                |
| `banner`      | No replacement.                                                                |
| `closable`    | Replaced by `showCloseIcon`.                                                   |
| `closeText`   | No replacement.                                                                |
| `description` | Pass description content inside `message` instead.                             |
| `icon`        | No replacement; icon is determined by `type`. Override via `contentIconProps`. |
| `showIcon`    | Replaced by `showCloseIcon` (close button) + `contentIconProps` (status icon). |

### `onClose` behaviour change

In v1, clicking the close icon always dismissed the alert regardless of whether `onClose` was defined. In v2, if `onClose` is provided the component does **not** dismiss itself — the application is responsible for setting `visible={false}`.

```tsx
// v2 — application controls dismissal when onClose is defined
const [visible, setVisible] = useState(true)
;<Alert visible={visible} onClose={() => setVisible(false)} message="..." />
```

If no `onClose` is provided, v2 dismisses itself internally (same as v1 default).

### Stylesheet class changes

Search your codebase for `.ant-alert-*` selectors and remove or replace them; those classes no longer exist.

---

## Anti-patterns

- Don't create custom colored banners — use `Alert` with the appropriate `type`.
- Don't pass raw strings like `type="error"` — use `Alert.AlertTypes.ERROR`.
- Don't omit `message` — it is required.
- Don't use `Alert.AlertTypes.SUPPLEMENTARY` in product code — it is for internal use only.
- Don't add `role="alert"` to info/success alerts — those are non-urgent; use `role="status"` or omit.
- Don't pass a `title` prop — `Alert` does not have a `title` prop; put title text inside the `message` node.
- Don't pass `onClose` or `closeButtonLabel` when `showCloseIcon={false}` — the TypeScript discriminated union disallows it.
- Don't use `Alert.TYPE` — it is a deprecated alias for `Alert.AlertTypes`; use `Alert.AlertTypes` instead.
