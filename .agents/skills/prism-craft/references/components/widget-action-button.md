# WidgetActionButton

## Figma

- **Library name:** Action (page: N/A, frame: Action)
- **Design link:** [26.1 – node 52386-16459](https://www.figma.com/design/uVYOwzibyPcbzMrviI0zae/26.1?node-id=52386-16459&m=dev)

## React

Import: `import { WidgetActionButton } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { WidgetActionButton } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `WidgetActionButtonProps`

Extends: `Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>`

All standard HTML button attributes are supported (except `type`, which is hard-coded to `"button"`).

| Prop         | Type                                         | Required | Default                    | Description                                                                                                                                                                                 |
| ------------ | -------------------------------------------- | -------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`   | `React.ReactNode`                            | Yes      | —                          | SVG icon element to display in the button. Must be an SVG icon component.                                                                                                                   |
| `className`  | `string`                                     | No       | —                          | Additional custom class name.                                                                                                                                                               |
| `aria-label` | `string`                                     | No       | `"action"` (i18n fallback) | Accessible label for the button. Always provide a meaningful value describing the action (e.g. `"Close"`, `"Resize"`). Falls back to the i18n key `WidgetActionButton.action` when omitted. |
| `disabled`   | `boolean`                                    | No       | `false`                    | Disables the button. When `true`, the `onClick` handler is suppressed regardless of any handler passed via props.                                                                           |
| `onClick`    | `React.MouseEventHandler<HTMLButtonElement>` | No       | —                          | Click handler. Suppressed when `disabled` is `true`.                                                                                                                                        |
| `style`      | `React.CSSProperties`                        | No       | —                          | Inline styles. Commonly used to position the button absolutely within a widget (e.g. top-right close button).                                                                               |

> All other `ButtonHTMLAttributes` props (e.g. `onMouseEnter`, `data-*`, `id`) are forwarded to the underlying `<button>` element.

### Behaviour Notes

- Renders a `<button type="button">` element — `type` is not overridable.
- `onClick` is **silently suppressed** when `disabled={true}`; the native disabled attribute is also set.
- `aria-label` defaults to an i18n lookup (`WidgetActionButton → action` key) when not provided. Always supply an explicit, action-specific label for accessibility.
- This component is **exclusively intended for use as an action button on a dashboard widget** (e.g. a close or resize handle positioned over a widget card). Do not use it outside of dashboard widget contexts.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic Usage

Enabled and disabled states side by side:

```tsx
import {
  WidgetActionButton,
  FlexLayout,
  CloseIcon,
} from '@nutanix-ui/prism-reactjs'

const { CloseIconSize } = CloseIcon

;<div
  className="nsg-example-borderless-content"
  style={{ width: 400 }}
  data-test-id="basic-usage"
>
  <FlexLayout alignItems="center" itemSpacing="10px">
    <WidgetActionButton aria-label="Close">
      <CloseIcon size={CloseIconSize.SMALL} />
    </WidgetActionButton>
    <WidgetActionButton aria-label="Close" disabled={true}>
      <CloseIcon size={CloseIconSize.SMALL} />
    </WidgetActionButton>
  </FlexLayout>
</div>
```

#### Positioned Buttons (Dashboard Widget Pattern)

How PC Dashboard uses `WidgetActionButton` — absolutely positioned close and resize handles on a widget card:

```tsx
import {
  WidgetActionButton,
  TriangleUpDownIcon,
  ContainerLayout,
  CloseIcon,
} from '@nutanix-ui/prism-reactjs'

const { CloseIconSize } = CloseIcon

;<div
  className="nsg-example-borderless-content"
  style={{
    width: 400,
    height: 500,
    position: 'relative',
  }}
  data-test-id="positioned-buttons"
>
  <ContainerLayout
    backgroundColor="white"
    style={{
      position: 'relative',
      width: 300,
      height: 400,
    }}
  >
    PC Dashboard Widget.
    <WidgetActionButton
      aria-label="Close"
      style={{ position: 'absolute', top: -10, right: -10 }}
    >
      <CloseIcon size={CloseIconSize.SMALL} />
    </WidgetActionButton>
    <WidgetActionButton
      aria-label="Resize"
      style={{
        position: 'absolute',
        bottom: -10,
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'ns-resize',
      }}
    >
      <TriangleUpDownIcon />
    </WidgetActionButton>
  </ContainerLayout>
</div>
```

### Usage Notes

- **Dashboard widgets only.** This button is designed solely for action overlays on dashboard widget cards (close, resize, drag handles). Do not use it for general button needs — use `Button` or `IconButton` instead.
- Always provide a descriptive `aria-label` that names the action (e.g. `"Close"`, `"Resize"`). Relying on the i18n fallback is not recommended.
- Pass an SVG icon component as `children` (e.g. `<CloseIcon />`, `<TriangleUpDownIcon />`). Do not pass text or non-SVG content.
- Use `style` with `position: 'absolute'` to overlay the button on a widget card; ensure the widget container has `position: 'relative'`.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing where possible.

<!-- SOURCE-API-END -->
