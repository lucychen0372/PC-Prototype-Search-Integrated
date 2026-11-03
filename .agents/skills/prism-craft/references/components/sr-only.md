# SrOnly

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not usually mapped directly from a Figma component.

## React

Import: `import { SrOnly } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { SrOnly } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `SrOnlyProps`

Extends: `Omit<HTMLAttributes<HTMLSpanElement>, 'children'>`

All standard `HTMLSpanElement` HTML attributes are accepted and spread onto the root `<span>` (e.g. `id`, `aria-*`, `data-*`, `className`, `style`).

| Prop       | Type              | Required | Default | Description                                                                               |
| ---------- | ----------------- | -------- | ------- | ----------------------------------------------------------------------------------------- |
| `children` | `React.ReactNode` | **Yes**  | —       | Content rendered inside the hidden span. Visually hidden but announced by screen readers. |

> **Note:** `children` is required — `SrOnly` has no meaning without content.

### Ref forwarding

`SrOnly` is implemented with `React.forwardRef`. The forwarded ref resolves to the underlying `HTMLSpanElement`.

```tsx
const ref = React.useRef<HTMLSpanElement>(null)
;<SrOnly ref={ref}>Screen reader label</SrOnly>
```

### Behaviour

#### Visual hiding

The component uses the standard sr-only CSS technique: `position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap`. It is positioned at `top: 0; left: 0` of its nearest positioned ancestor to avoid phantom overflow scrolling.

#### Focusable children — automatic `tabindex="-1"`

On every render that changes `children`, `SrOnly` traverses all focusable descendant elements (`<a>`, `<button>`, `<input>`, etc.) and sets `tabindex="-1"` on each. This prevents hidden interactive content from appearing in the tab order.

### Source Examples

These are adapted from the Prism source examples.

#### Interactive example — screen-reader-only button context

```tsx
import {
  StackingLayout,
  Button,
  Paragraph,
  SrOnly,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout data-test-id="interactive">
  <Paragraph>
    To check this out, fire up the screen reader and focus the button below
  </Paragraph>
  <Button>
    Deploy
    <SrOnly>to server</SrOnly>
  </Button>
</StackingLayout>
```

#### Hidden title example — landmark navigation

```tsx
import {
  StackingLayout,
  Paragraph,
  SrOnly,
  Title,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout data-test-id="title">
  <Paragraph>
    To check this out, use the screen reader's feature to jump to heading
  </Paragraph>
  <SrOnly>
    <Title size="h2">Hidden title</Title>
  </SrOnly>
  <Paragraph>This is a paragraph following a hidden h2 title.</Paragraph>
</StackingLayout>
```

### Usage Notes

#### Do

- Pass `string` content or text-based Prism components (`TextLabel`, `Paragraph`, `Title`) as children.
- Use `SrOnly` for information that is conveyed visually (by icon, position, or colour) but needs a textual alternative for screen reader users.
- Pair with interactive elements like `Button` or icon-only controls to provide an accessible label without altering the visual design.

#### Don't

- Do **not** place interactive children (buttons, links, inputs) inside `SrOnly`. They are automatically removed from the tab order (`tabindex="-1"`), but their presence can still confuse assistive technology.

#### Warning

- Use with caution. In general, text should be available to all users. A good use-case is information available through visual context that needs a text explanation for screen reader users only.
- Prefer higher-level Prism components when they satisfy the design (e.g. `aria-label` on a `Button`, or visible labels via Prism layout).
- Keep generated app code aligned with repository rules: Prism layout components for layout, persistent accessible labels, and no custom CSS for spacing.

<!-- SOURCE-API-END -->
