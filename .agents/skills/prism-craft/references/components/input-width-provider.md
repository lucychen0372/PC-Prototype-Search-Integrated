# InputWidthProvider

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not mapped to a Figma component.

## React

Import: `import { InputWidthProvider } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { InputWidthProvider } from '@nutanix-ui/prism-reactjs'
```

### Overview

`InputWidthProvider` is a **higher-order component (HOC)** — not a rendered component itself. It wraps any input component that exposes an `inputRef` (or a custom ref prop) and adds dynamic width calculation: the wrapped input grows/shrinks to fit its current `value` text, falling back to the `placeholder` text when the field is empty.

**Signature**

```tsx
function InputWidthProvider<P extends Record<string, any>>(
  InputComponent: React.ComponentType<P>,
  refProp?: string, // default: 'inputRef'
): React.ComponentClass<P & { inputRef?: React.Ref<HTMLInputElement> }>
```

- `InputComponent` — any React component whose underlying `<input>` is reachable via the ref prop named by `refProp`.
- `refProp` — the prop name used to forward a ref to the `<input>`. Defaults to `'inputRef'`. Pass a custom string when wrapping a component that uses a different prop (e.g. `'ref'`).

The returned class component accepts **all props of `InputComponent`** plus the additional props described below.

---

### PropTypes / Props

These are the props added by the HOC wrapper itself. All other props are forwarded verbatim to the wrapped `InputComponent`.

| Prop           | Type                                                                                  | Default | Required | Description                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `inputRef`     | `React.RefObject<HTMLInputElement> \| ((instance: HTMLInputElement \| null) => void)` | —       | No       | Ref forwarded to the underlying `<input>` element inside the wrapped component. Merged with the HOC's own internal ref via `mergeRefs`.                            |
| `value`        | `string \| number`                                                                    | —       | No       | Controlled value. When provided (even as `''`), the component operates in **controlled mode** and the sizer mirrors `value` on every update.                       |
| `defaultValue` | `string \| number`                                                                    | —       | No       | Initial value for **uncontrolled mode**. Used to seed the sizer on first render.                                                                                   |
| `placeholder`  | `string`                                                                              | —       | No       | Shown in the sizer when `value`/`defaultValue` is empty, so the input is at least as wide as the placeholder text.                                                 |
| `onChange`     | `React.ChangeEventHandler<HTMLInputElement>`                                          | —       | No       | Change handler. In uncontrolled mode the HOC also updates the sizer value before delegating to the caller's `onChange`.                                            |
| `style`        | `React.CSSProperties`                                                                 | `{}`    | No       | Passed through to the wrapped input. `style.minWidth`, `style.maxWidth`, and `style.width` are all respected by the width calculation logic (see Behaviour notes). |

---

### Behaviour

- **Sizer element:** A hidden `<div>` with CSS matching the input's computed `fontSize`, `fontFamily`, `fontWeight`, `fontStyle`, `letterSpacing`, `textTransform`, `paddingLeft`, `paddingRight`, `boxSizing`, `borderRight`, and `borderLeft` is inserted into the DOM alongside the input. The input's width is set to `sizerDiv.scrollWidth + 2`.
- **`style.minWidth`:** The input will not shrink below this value; it only grows. Useful to keep a comfortable minimum size while still expanding.
- **`style.maxWidth`:** Once `scrollWidth + 2` exceeds this value the HOC stops updating the width, effectively capping growth.
- **`style.width`:** If a fixed `width` is provided and is larger than the sizer width, the fixed value wins; otherwise the sizer width wins.
- **Controlled vs uncontrolled:** Determined at construction time by the presence of a `value` prop (including `''`). Controlled instances update the sizer via `getDerivedStateFromProps`; uncontrolled instances update it inside `handleInputChange`.
- **Wrapper element:** The HOC renders a `<div className="ntnx-input-width-provider ntnx">` with `display` matching the wrapped input's own computed `display` style (falls back to `inline-block`).

---

### Usage Notes

- `InputWidthProvider` is a factory — call it **once at module scope**, not inside `render()`. Re-creating the enhanced component on every render causes remounting.
- All props valid on the wrapped `InputComponent` are valid on the enhanced component.
- Used internally by `Select` and `Slider` components in Prism to size their inline inputs.
- Prefer higher-level Prism components when they already satisfy the design; reach for `InputWidthProvider` when you need a standalone auto-sizing input.
- Keep generated app code aligned with repository rules: use Prism layout components for spacing; do not add custom CSS for layout.

---

### Source Examples

These are taken directly from the Prism source. Translate `<div>` wrappers and inline `style` for layout/spacing to Prism layout components in app code.

#### Auto-width TextInput (uncontrolled)

```tsx
import {
  InputWidthProvider,
  TextInput,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

// Create the enhanced component once, at module scope.
const AutoWidthInput = InputWidthProvider(TextInput)

function Example() {
  return (
    <StackingLayout>
      <Paragraph>
        By default the width is sized to the input value text, but if there is
        no input value the placeholder text is used instead. As soon as you type
        a value the width shrinks immediately.
      </Paragraph>
      <AutoWidthInput placeholder="Start Typing" />

      <Paragraph>
        Here we use style.minWidth so that the input only grows and will not
        shrink on first input.
      </Paragraph>
      <AutoWidthInput placeholder="Start Typing" style={{ minWidth: 100 }} />
    </StackingLayout>
  )
}
```

#### Auto-width Input (controlled, with maxWidth cap)

```tsx
import React from 'react'
import { InputWidthProvider, Input } from '@nutanix-ui/prism-reactjs'

// Create the enhanced component once, at module scope.
const AutoWidthInput = InputWidthProvider(Input)

class MyInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(event) {
    this.setState({ value: event.currentTarget.value })
  }

  render() {
    return (
      <AutoWidthInput
        {...this.state}
        onChange={this.handleOnChange}
        placeholder="Start Searching"
        search={true}
        appearance="nested"
        style={{ maxWidth: 150 }}
      />
    )
  }
}
```

#### TypeScript — wrapping a typed component

```tsx
import React from 'react'
import { InputWidthProvider, TextInput } from '@nutanix-ui/prism-reactjs'
import type { TextInputProps } from '@nutanix-ui/prism-reactjs'

const AutoWidthInput = InputWidthProvider<TextInputProps>(TextInput)

function TypedExample() {
  const inputRef = React.createRef<HTMLInputElement>()
  return (
    <AutoWidthInput
      inputRef={inputRef}
      placeholder="Type here"
      style={{ minWidth: 80, maxWidth: 300 }}
    />
  )
}
```

#### Custom refProp

Use the second argument when wrapping a component that does not use `inputRef` as its ref prop.

```tsx
import { InputWidthProvider } from '@nutanix-ui/prism-reactjs'
import { MyCustomInput } from './MyCustomInput' // exposes ref via 'innerRef'

const AutoWidthCustom = InputWidthProvider(MyCustomInput, 'innerRef')
```

<!-- SOURCE-API-END -->
