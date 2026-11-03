# Scrollbar

## Figma

- **Library name:** Scrollbar (page: Layout, frame: Layout)

## React

Import: `import { Scrollbar } from '@nutanix-ui/prism-reactjs'`

> **Accessibility warning:** This component currently does not meet accessibility standards. Use with caution. If you customize scrollbars, you must satisfy WCAG requirements for [color contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) and [target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html#user-agent-control). It is strongly recommended that you avoid styling or other customizations.

### Enums

`ScrollbarContainerTypes` is a **named export** from the package — it is _not_ a static property on the `Scrollbar` default export.

```ts
import { ScrollbarContainerTypes } from '@nutanix-ui/prism-reactjs'

ScrollbarContainerTypes.COMPONENT // "component"
ScrollbarContainerTypes.PAGE // "page"
```

### Props

`ScrollbarProps` extends `Partial<ScrollbarsProps>` (from `rc-scrollbars`). All `rc-scrollbars` props are accepted via spread except the three listed under "Behaviour" below which are locked internally.

| Prop            | Type                      | Default                        | Required | Notes                                                                                                              |
| --------------- | ------------------------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `children`      | `React.ReactNode`         | —                              | **yes**  | Scrollable content                                                                                                 |
| `containerType` | `ScrollbarContainerTypes` | `ScrollbarContainerTypes.PAGE` | no       | `PAGE` renders a larger thumb; `COMPONENT` renders a thinner thumb and smaller border-radius                       |
| `className`     | `string`                  | —                              | no       | Extra class name applied to the Scrollbar root `div`                                                               |
| `ref`           | `React.Ref<Scrollbars>`   | —                              | no       | Forwarded ref to the underlying `rc-scrollbars` `Scrollbars` instance; use to access the scroll container DOM node |
| `style`         | `React.CSSProperties`     | —                              | no       | Passed through to `rc-scrollbars`; commonly used to set a fixed `height` or `maxWidth`                             |

#### Behaviour fixed by the implementation (not user-overridable)

| `rc-scrollbars` prop      | Locked value | Reason                                    |
| ------------------------- | ------------ | ----------------------------------------- |
| `autoHide`                | `false`      | Always show tracks when content overflows |
| `disableDefaultStyles`    | `true`       | Uses Prism CSS instead                    |
| `hideTracksWhenNotNeeded` | `true`       | Tracks hidden when content fits           |

`autoHeight` defaults to `true` internally but **can** be overridden via the spread (it is set before `...props`).

### Internal CSS classes

Applied by the component — useful when you need to select the scroll viewport node (e.g. for `Anchor` container):

| Class              | Element                       |
| ------------------ | ----------------------------- |
| `scrollbar-view`   | The scrollable viewport `div` |
| `track-horizontal` | Horizontal scroll track       |
| `thumb-horizontal` | Horizontal scroll thumb       |
| `track-vertical`   | Vertical scroll track         |
| `thumb-vertical`   | Vertical scroll thumb         |

Access the viewport node via `ref.current.container.querySelector('.scrollbar-view')`.

### TSX Examples

#### Basic usage (vertical scroll, auto-height)

`autoHeight` is `true` by default, so the container grows with content and scrollbars appear when the window is too small.

```tsx
import { Scrollbar } from '@nutanix-ui/prism-reactjs'
;<Scrollbar>
  <p>Long content…</p>
  <p>More content…</p>
</Scrollbar>
```

#### Fixed height with horizontal and vertical scroll

```tsx
import { Scrollbar } from '@nutanix-ui/prism-reactjs'
;<Scrollbar style={{ maxWidth: 600, height: 200 }}>
  <div style={{ width: 800 }}>
    <p>Content wider than the container triggers a horizontal scrollbar.</p>
    <p>Tall content triggers a vertical scrollbar.</p>
  </div>
</Scrollbar>
```

#### Component-level scrollbar (thinner thumb)

Use `ScrollbarContainerTypes.COMPONENT` inside panels, modals, or any component-scoped scroll area.

```tsx
import {
  Scrollbar,
  ScrollbarContainerTypes,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
;<Scrollbar
  containerType={ScrollbarContainerTypes.COMPONENT}
  style={{ height: 400 }}
>
  <StackingLayout itemGap="S">
    {items.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </StackingLayout>
</Scrollbar>
```

#### With Anchor navigation (ref pattern)

Use a forwarded `ref` to pass the Scrollbar viewport as the `container` for `Anchor`.

```tsx
import { useRef, useEffect, useState } from 'react'
import {
  Anchor,
  AnchorLink,
  Scrollbar,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
import type { Scrollbars } from 'rc-scrollbars'

const AnchorExample = () => {
  const [anchorContainer, setAnchorContainer] = useState<Element | undefined>()
  const scrollbarRef = useRef<Scrollbars>(null)

  useEffect(() => {
    const viewport =
      scrollbarRef.current?.container?.querySelector('.scrollbar-view')
    if (viewport) {
      setAnchorContainer(viewport)
    }
  }, [])

  return (
    <StackingLayout>
      <Anchor container={anchorContainer}>
        <AnchorLink linkId="section1" title="Section 1" />
        <AnchorLink linkId="section2" title="Section 2" />
        <AnchorLink linkId="section3" title="Section 3" />
      </Anchor>
      <Scrollbar ref={scrollbarRef} style={{ height: '400px' }}>
        <div id="section1" style={{ marginBottom: 800 }}>
          Section 1
        </div>
        <div id="section2" style={{ marginBottom: 800 }}>
          Section 2
        </div>
        <div id="section3" style={{ marginBottom: 800 }}>
          Section 3
        </div>
      </Scrollbar>
    </StackingLayout>
  )
}
```

### Anti-patterns

- Don't use browser-native scrollbars in styled containers — use `Scrollbar` for a consistent cross-browser appearance.
- Don't reference `Scrollbar.ScrollbarContainerTypes` — that static property does not exist. Import `ScrollbarContainerTypes` as a named export instead.
- Use `containerType={ScrollbarContainerTypes.COMPONENT}` for component-scoped scroll areas (panels, modals, dropdowns); use `PAGE` (the default) for full-page scroll.
- Avoid overriding the locked props (`autoHide`, `disableDefaultStyles`, `hideTracksWhenNotNeeded`) — they are enforced after the `...props` spread and cannot be changed.
- Don't apply custom CSS to `.scrollbar-view`, `.track-*`, or `.thumb-*` class names beyond what Prism provides — doing so risks breaking WCAG contrast and target-size requirements.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Scrollbar, ScrollbarContainerTypes } from '@nutanix-ui/prism-reactjs'
// ScrollbarProps type (if needed for TypeScript):
import type { ScrollbarProps } from '@nutanix-ui/prism-reactjs/components/v2/Scrollbar/Scrollbar'
```

### Enums / Constants

#### `ScrollbarContainerTypes` (named export)

| Key         | Value         | Use                                                 |
| ----------- | ------------- | --------------------------------------------------- |
| `COMPONENT` | `"component"` | Thinner thumb; use inside panels, modals, dropdowns |
| `PAGE`      | `"page"`      | Larger thumb; default for full-page scroll areas    |

### Props Interfaces

#### `ScrollbarProps`

Extends: `Partial<ScrollbarsProps>` (from `rc-scrollbars`)

| Prop            | Type                      | Default                        | Required | Description                                                    |
| --------------- | ------------------------- | ------------------------------ | -------- | -------------------------------------------------------------- |
| `children`      | `React.ReactNode`         | —                              | **yes**  | Content to be displayed with scrollbars                        |
| `containerType` | `ScrollbarContainerTypes` | `ScrollbarContainerTypes.PAGE` | no       | Controls thumb size and border-radius; smaller for `COMPONENT` |
| `className`     | `string`                  | —                              | no       | Custom class name for the Scrollbar root `div`                 |
| `ref`           | `React.Ref<Scrollbars>`   | —                              | no       | Forwarded ref to the underlying `rc-scrollbars` instance       |

All other `ScrollbarsProps` from `rc-scrollbars` are accepted. See the [rc-scrollbars API docs](https://rc-scrollbars.vercel.app/api) for the full list. Note: `autoHide`, `disableDefaultStyles`, and `hideTracksWhenNotNeeded` are locked and cannot be overridden.

### Usage Notes

- Prefer `ScrollbarContainerTypes.COMPONENT` / `ScrollbarContainerTypes.PAGE` over raw strings `"component"` / `"page"`.
- Use Prism layout props (`itemGap`, `padding`) inside the scrollable area rather than custom CSS for spacing.
- To integrate with `Anchor`, retrieve the viewport DOM node via `ref.current.container.querySelector('.scrollbar-view')` after mount.

<!-- SOURCE-API-END -->
