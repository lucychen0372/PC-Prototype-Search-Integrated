# Truncate

## Figma

- **Library name:** N/A
- **Use case:** React-only utility HOC; not mapped to a Figma component.

## React

Import: `import { Truncate } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { Truncate } from '@nutanix-ui/prism-reactjs'
```

### Overview

`Truncate` is a **Higher-Order Component (HOC) factory**, not a React component itself. You call it with a component or HTML tag string and it returns a new component that:

1. Applies CSS `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` via the `ntnx-truncate` class.
2. Tracks on `mouseenter` whether the element is actually overflowing (`scrollWidth > clientWidth`).
3. When overflow is detected **without** `tooltipProps`: adds a native `title` attribute with the full text.
4. When overflow is detected **with** `tooltipProps`: wraps the element in a `<Tooltip>` (with `mouseEnterDelay={300}` by default).
5. When `tooltipProps` is supplied **or** the wrapped element is focusable (e.g. `<a>`, `Link`), the element is wrapped in an outer `<div className="ntnx-truncate-container">` so truncation layout is preserved.
6. Re-evaluates truncation on `componentDidMount` and whenever `children` changes (`componentDidUpdate`).

### Signature

```tsx
function Truncate<T extends React.ComponentType | keyof JSX.IntrinsicElements>(
  Component: T,
): React.ComponentType<
  React.ComponentPropsWithoutRef<T> & TruncateComponentProps
>
```

The returned component accepts **all props of the wrapped component** plus the `TruncateComponentProps` listed below.

### Props Interface

#### `TruncateComponentProps`

| Prop           | Type                                                     | Required | Default     | Description                                                                                                                                                                                                                           |
| -------------- | -------------------------------------------------------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`     | `React.ReactNode`                                        | Yes      | —           | Content to render and potentially truncate.                                                                                                                                                                                           |
| `tooltipProps` | `Omit<ToolTipProps, 'children'>`                         | No       | `undefined` | Tooltip configuration. When provided, a Prism `Tooltip` is shown on hover/focus instead of the native `title` attribute. Recommended for accessibility.                                                                               |
| `wrapperProps` | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>` | No       | `{}`        | Props spread onto the outer `<div className="ntnx-truncate-container">`. Only rendered when `tooltipProps` is set or the wrapped element is focusable. Supports arbitrary `data-*` attributes in addition to standard HTML div props. |
| `data-test-id` | `string`                                                 | No       | `undefined` | Test hook placed on the inner wrapped element. Omitted when the string is empty.                                                                                                                                                      |

> **Note:** The wrapped component's own props (e.g. `href`, `type`, `className`, `onMouseEnter`, etc.) are passed through transparently. An externally-supplied `onMouseEnter` is merged with the internal handler — both are called.

### Behaviour Details

| Scenario                                      | Behaviour                                                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Text fits in container                        | No `title`, no tooltip. Element renders normally with truncation styles applied.                        |
| Text overflows, no `tooltipProps`             | `title` attribute set to the full text (native browser tooltip).                                        |
| Text overflows, `tooltipProps` set            | Prism `<Tooltip>` shown with `mouseEnterDelay={300}` and any additional `tooltipProps` merged in.       |
| `tooltipProps` set but text does not overflow | Outer wrapper `<div>` rendered but no tooltip shown.                                                    |
| Wrapped element is focusable (link, button)   | Always wrapped in outer `<div>` so focus ring and layout are preserved, regardless of truncation state. |
| `children` prop changes                       | Truncation state is re-evaluated on update.                                                             |

### CSS Classes

| Class                     | Applied to                                 |
| ------------------------- | ------------------------------------------ |
| `ntnx-truncate`           | The inner wrapped element (always).        |
| `ntnx-truncate-container` | The outer `<div>` wrapper (when rendered). |

### Accessibility

- **Prefer `tooltipProps` over native `title`** — `tooltipProps` triggers the tooltip on keyboard focus (`Tab`), making content accessible to keyboard-only users. The legacy `title` only appears on hover.
- Truncated text can cause problems for users relying on zoom, screen magnifiers, small screens, or alternative input. Prefer wrapping text when possible.
- Do not truncate text that is essential to understanding or operating the UI.
- Prefer truncation triggered by explicit user actions (e.g. resizing a table column) rather than always-on truncation.
- Truncated `Link` components retain a visible focus ring when keyboard-focused (WCAG 2.1 SC 2.4.7).
- **Truncation does not work with iconized Links** (Links that render an icon rather than text).

---

### Examples

#### Minimal example — truncated `<span>` with tooltip

```tsx
import { Truncate, Tooltip } from '@nutanix-ui/prism-reactjs'

const TruncateSpan = Truncate('span')

const tooltipProps = {
  placement: 'top-start',
  appearance: Tooltip.APPEARANCE.SECONDARY,
  oldTooltip: false,
}

// Constrain width to force truncation
;<div style={{ width: '80px' }}>
  <TruncateSpan tooltipProps={tooltipProps}>
    long long very long text
  </TruncateSpan>
</div>
```

#### Interactive text toggle (focus or hover to see full text)

```tsx
import React, { useState } from 'react'
import {
  Truncate,
  StackingLayout,
  Tooltip,
  Button,
} from '@nutanix-ui/prism-reactjs'

const TruncateSpan = Truncate('span')

const TruncateExample = () => {
  const TEXT_TYPE = {
    SMALL: 'small text',
    LONG: 'long long very long text',
  }
  const [text, setText] = useState(TEXT_TYPE.LONG)
  const tooltipProps = {
    placement: 'top-start',
    appearance: Tooltip.APPEARANCE.SECONDARY,
    oldTooltip: false,
  }

  return (
    <div>
      <StackingLayout itemSpacing="10px">
        <div style={{ width: '80px' }}>
          <TruncateSpan data-test-id="basic" tooltipProps={tooltipProps}>
            {text}
          </TruncateSpan>
        </div>
        <div>
          <Button onClick={() => setText(TEXT_TYPE.SMALL)}>
            {TEXT_TYPE.SMALL}
          </Button>
        </div>
        <div>
          <Button onClick={() => setText(TEXT_TYPE.LONG)}>
            {TEXT_TYPE.LONG}
          </Button>
        </div>
      </StackingLayout>
      <br />
      <div>
        <StackingLayout>
          {/* No forced width — text does not truncate, but tooltipProps still wraps in container */}
          <TruncateSpan
            data-test-id="basic-without-forced-width"
            tooltipProps={tooltipProps}
          >
            My text without truncation but with tooltipProps.
          </TruncateSpan>
        </StackingLayout>
      </div>
    </div>
  )
}

;<TruncateExample />
```

#### Wrapping Prism typography components (Title, TextLabel, Link)

> Truncating does **not** work with iconized Links.

```tsx
import {
  Title,
  TextLabel,
  Link,
  StackingLayout,
  Truncate,
  Tooltip,
} from '@nutanix-ui/prism-reactjs'

const TruncateTitle = Truncate(Title)
const TruncateTextLabel = Truncate(TextLabel)
const TruncateLink = Truncate(Link)

const tooltipProps = {
  placement: 'top-start',
  appearance: Tooltip.APPEARANCE.SECONDARY,
  oldTooltip: false,
}

;<div style={{ width: '120px' }}>
  <StackingLayout data-test-id="title-label-link">
    <TruncateTitle data-test-id="title">Main wide header</TruncateTitle>
    <TruncateTextLabel
      type={TextLabel.TEXT_LABEL_TYPE.WARNING}
      data-test-id="label"
    >
      Pay attention please!
    </TruncateTextLabel>
    <TruncateLink tooltipProps={tooltipProps} data-test-id="link">
      Click here to go somewhere
    </TruncateLink>
  </StackingLayout>
</div>
```

#### Nested block elements with `wrapperProps`

Use `wrapperProps` to pass an `id` or `data-*` attribute to the outer container `<div>` when needed (e.g. for `aria-labelledby` relationships).

```tsx
import {
  Title,
  TextLabel,
  Truncate,
  Tooltip,
  FlexLayout,
  Badge,
} from '@nutanix-ui/prism-reactjs'

const TruncateTitle = Truncate(Title)

const tooltipProps = {
  placement: 'top-start',
  appearance: Tooltip.APPEARANCE.SECONDARY,
  oldTooltip: false,
}

;<div style={{ width: '120px' }} data-test-id="nested-block-elements">
  <FlexLayout alignItems="center" itemGap="S">
    <TruncateTitle
      tooltipProps={tooltipProps}
      wrapperProps={{ id: 'truncate-container' }}
      type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
    >
      Main wide header
    </TruncateTitle>
    <Badge color="blue" count="tag" />
  </FlexLayout>
</div>
```

#### Truncated `<span>` inside a Table

```tsx
import React from 'react'
import { Table, Truncate } from '@nutanix-ui/prism-reactjs'

const TruncateSpan = Truncate('span')

;<div style={{ width: '310px' }}>
  <Table
    wrapperProps={{ 'data-test-id': 'table' }}
    columns={[
      { title: 'Name', key: 'name' },
      { title: 'Description', key: 'description' },
    ]}
    structure={{
      columnWidths: {
        name: '100px',
        description: '200px',
      },
    }}
    dataSource={[
      {
        key: '1',
        name: <TruncateSpan>AppType</TruncateSpan>,
        description: (
          <TruncateSpan>Type of application being shown</TruncateSpan>
        ),
      },
      {
        key: '2',
        name: <TruncateSpan>Environment</TruncateSpan>,
        description: (
          <TruncateSpan>
            Distinction between development and production
          </TruncateSpan>
        ),
      },
    ]}
  />
</div>
```

#### Truncated `Link` in a Table with tooltip toggle

```tsx
import React, { useState } from 'react'
import {
  Badge,
  Checkbox,
  FlexLayout,
  Link,
  Paragraph,
  StackingLayout,
  Table,
  Truncate,
  Tooltip,
} from '@nutanix-ui/prism-reactjs'

const TruncateLink = Truncate(Link)

const tooltipProps = {
  placement: 'top-start',
  appearance: Tooltip.APPEARANCE.SECONDARY,
  oldTooltip: false,
}

const longUrl =
  'https://example.com/some/really/long/path/that/would/overflow/without/truncation'
const minWidth = 450
const maxWidth = 800

const LinkDemo = () => {
  const [showTooltip, setShowTooltip] = useState(true)
  const [smallTable, setSmallTable] = useState(true)

  return (
    <StackingLayout style={{ minWidth, maxWidth }}>
      <Paragraph>
        Truncated Link retains a visible focus ring when keyboard-focused.
      </Paragraph>
      <Table
        wrapperProps={{
          'data-test-id': 'table-link',
          style: {
            width: smallTable ? minWidth : maxWidth,
            transition: 'all 0.3s ease',
          },
        }}
        structure={{
          columnWidths: {
            name: '115px',
            id: '50px',
            description: 'auto',
            url: 'auto',
          },
        }}
        columns={[
          { title: 'Name', key: 'name' },
          { title: 'ID', key: 'id' },
          { title: 'Description', key: 'description' },
          { title: 'URL', key: 'url' },
        ]}
        dataSource={[
          {
            key: '1',
            id: (
              <FlexLayout
                itemGap="XS"
                flexGrow="0"
                flexShrink="1"
                style={{ minWidth: 0 }}
              >
                <TruncateLink
                  type="inline-secondary"
                  size="medium"
                  underline
                  href="#"
                  data-test-id="focus-short-link"
                >
                  1
                </TruncateLink>
              </FlexLayout>
            ),
            name: (
              <TruncateLink
                href="#"
                tooltipProps={showTooltip ? tooltipProps : undefined}
              >
                AppType
              </TruncateLink>
            ),
            description: (
              <TruncateLink
                href="#"
                data-test-id="focus-this-link"
                tooltipProps={showTooltip ? tooltipProps : undefined}
              >
                Type of application being shown
              </TruncateLink>
            ),
            url: (
              <TruncateLink
                type="inline-secondary"
                target="_blank"
                href={longUrl}
                data-test-id="focus-inline-link"
                tooltipProps={showTooltip ? tooltipProps : undefined}
              >
                {longUrl}
              </TruncateLink>
            ),
          },
        ]}
      />
      <FlexLayout itemGap="M">
        <Checkbox
          id="showTooltip"
          checked={showTooltip}
          onChange={(e) => setShowTooltip(e.target.checked)}
          type={Checkbox.CheckboxTypes.TOGGLE}
          label="Enable Tooltip Props"
        />
        <Checkbox
          id="smallTable"
          checked={smallTable}
          onChange={(e) => setSmallTable(e.target.checked)}
          type={Checkbox.CheckboxTypes.TOGGLE}
          label="Enable Small Table"
        />
      </FlexLayout>
    </StackingLayout>
  )
}

;<LinkDemo />
```

#### Truncated label inside `FormItemInput`

```tsx
import { FormItemInput, Truncate, Tooltip } from '@nutanix-ui/prism-reactjs'

const TruncateSpan = Truncate('span')

const tooltipProps = {
  popupPlacement: 'topLeft',
  appearance: Tooltip.APPEARANCE.SECONDARY,
}

const TruncateExample = () => (
  <div style={{ width: '80px' }} data-test-id="truncate-form-input-label">
    <FormItemInput
      id="input-id"
      label={
        <TruncateSpan
          data-test-id="form-input-label"
          tooltipProps={tooltipProps}
        >
          long long very long text
        </TruncateSpan>
      }
      helpText="Help text"
      placeholder="This is a placeholder"
    />
  </div>
)

;<TruncateExample />
```

### Usage Notes

- `Truncate` is a **factory**, not a component. Call `Truncate(Component)` once (outside render) to create a stable component class. Do **not** call it inside a render function — this recreates the class on every render and causes remounting.
- Pass any HTML tag name as a string (`'span'`, `'div'`, `'a'`) or any React component class/function.
- The returned component's `displayName` is set to `Truncate<ComponentName>` (e.g. `TruncateSpan`, `TruncateTitle`).
- All extra props you pass are forwarded to the underlying component unchanged (including `className`, `href`, `type`, `onMouseEnter`, etc.).
- The internal `onMouseEnter` and any externally supplied `onMouseEnter` are both called — you can safely pass your own handler.
- `className` values you pass are merged with the internal `ntnx-truncate` and `ntnx` classes.
- Use `wrapperProps` (not direct style/className) to style the outer container when `tooltipProps` is active.
- The `Tooltip` used internally defaults to `mouseEnterDelay={300}`. This can be overridden via `tooltipProps`.
- These are React-only helpers. Prefer higher-level Prism components when they already handle truncation (e.g. table cell renderers).

<!-- SOURCE-API-END -->
