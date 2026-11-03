# SidePanel

## Figma

- **Library name:** Side Panel (page: N/A, frame: Side Panel)
- **Side Panel variants:**
  - Size: Small | Large

## React

Import: `import { SidePanel } from '@nutanix-ui/prism-reactjs'`

### Figma -> React Prop Mapping

| Figma Property | React Prop | Value Mapping                                                                      |
| -------------- | ---------- | ---------------------------------------------------------------------------------- |
| Size           | `size`     | Small -> `SidePanel.SidePanelSize.SMALL`, Large -> `SidePanel.SidePanelSize.LARGE` |

### TSX Examples

```tsx
<SidePanel
  visible={panelOpen}
  title="Endpoint Details"
  onClose={() => setPanelOpen(false)}
  size={SidePanel.SidePanelSize.SMALL}
  enableFocusTrap={true}
  restoreFocus={true}
>
  <StackingLayout itemGap="L" padding="20px">
    <Title size={Title.SIZES.H3}>{endpoint.name}</Title>
    <FlexLayout itemGap="XS">
      <TextLabel type={TextLabel.TextLabelType.SECONDARY}>Status:</TextLabel>
      <Badge color={Badge.BadgeColorTypes.GREEN}>Active</Badge>
    </FlexLayout>
  </StackingLayout>
</SidePanel>
```

### Anti-patterns

- Don't create custom sliding panels -- use `SidePanel`
- Always set `enableFocusTrap` and `restoreFocus` for accessibility
- Don't omit `onClose` when `enableFocusTrap` is true — Escape key fires `onClose` and without a handler the panel cannot be dismissed by keyboard

<!-- SOURCE-API-START -->

### Import

```tsx
import { SidePanel } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `SidePanelSize`

- `SMALL` = `"small"`
- `LARGE` = `"large"`

### Props Interfaces

#### `SidePanelProps`

Extends: `TransitionLayoutProviderProps` (which itself extends `React.HTMLProps<HTMLDivElement>`, omitting `size` and `title`)

| Prop                           | Type                                             | Default                                       | Required | Description                                                                                                                                                                     |
| ------------------------------ | ------------------------------------------------ | --------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`                     | `React.ReactNode`                                | —                                             | yes      | Content rendered inside the side panel body.                                                                                                                                    |
| `title`                        | `React.ReactElement`                             | —                                             | no       | Title element rendered in the panel header.                                                                                                                                     |
| `titleProps`                   | `Omit<TitleProps, 'children'>`                   | `{ size: TitleSizes.H3, tag: TitleSizes.H2 }` | no       | Custom props forwarded to the internal `Title` component. Default renders as an H3-styled, H2-semantic heading. See [Title](#!/Title) for all supported properties.             |
| `size`                         | `SidePanelSize`                                  | `SidePanelSize.SMALL`                         | no       | Current size of the side panel. Controls which entry in `sizeStyleMap` is applied and which resize icon is shown.                                                               |
| `sizeStyleMap`                 | `Record<SidePanelSize, React.CSSProperties>`     | —                                             | no       | Map of inline styles applied per size value. Commonly used to set `width` / `minWidth` for each size.                                                                           |
| `visible`                      | `boolean`                                        | `true`                                        | no       | Whether the side panel is shown. Drives the underlying `TransitionLayoutProvider` enter/exit animation.                                                                         |
| `onClose`                      | `(e: React.MouseEvent \| KeyboardEvent) => void` | —                                             | no       | Called when the close button is clicked or when Escape is pressed (only when `enableFocusTrap` is `true`).                                                                      |
| `onSizeChange`                 | `(size: SidePanelSize) => void`                  | `() => 0`                                     | no       | Called when the resize button is clicked. Receives the **new** target size.                                                                                                     |
| `enableFocusTrap`              | `boolean`                                        | `false`                                       | no       | When `true` and `visible` is `true`, keyboard focus is confined inside the panel. Also adds `role="dialog"` and `aria-labelledby` pointing to the panel title.                  |
| `restoreFocus`                 | `boolean`                                        | `false`                                       | no       | When `enableFocusTrap` is `true`, returns focus to the element that triggered the panel after it closes.                                                                        |
| `focusOnFirstFocusableElement` | `boolean`                                        | —                                             | no       | When using focus trap, automatically focuses the first focusable element inside the panel on open.                                                                              |
| `closeBtnProps`                | `ButtonProps`                                    | `{}`                                          | no       | Additional props merged into the close `Button`. Use to override `aria-label`, add `data-test-id`, etc.                                                                         |
| `sizeBtnProps`                 | `ButtonProps`                                    | `{}`                                          | no       | Additional props merged into the resize `Button`.                                                                                                                               |
| `headerFooterLayoutProps`      | `HeaderFooterLayoutProps`                        | —                                             | no       | Props forwarded to the internal `HeaderFooterLayout` wrapper. Use to add a sticky footer or override layout behaviour. See [HeaderFooterLayout](#!/HeaderFooterLayout).         |
| `contentBefore`                | `React.ReactNode`                                | `null`                                        | no       | Node rendered **before** the panel container (outside `HeaderFooterLayout`). Useful for a spacer gap between the table and the panel.                                           |
| `contentAfter`                 | `React.ReactNode`                                | `null`                                        | no       | Node rendered **after** the panel container (outside `HeaderFooterLayout`).                                                                                                     |
| `className`                    | `string`                                         | —                                             | no       | Additional CSS class added to the root element.                                                                                                                                 |
| `style`                        | `React.CSSProperties`                            | —                                             | no       | Inline styles applied to the root element (merged with the active `sizeStyleMap` entry).                                                                                        |
| `nodeRef`                      | `React.Ref<any>`                                 | —                                             | no       | Ref forwarded to the transitioning DOM node (from `TransitionLayoutProviderProps`). Required when wrapping with an external `TransitionLayoutProvider` that supplies `nodeRef`. |
| `rtgProps`                     | `Partial<RTGTransitionProps>`                    | `{}`                                          | no       | Extra props forwarded to the underlying `react-transition-group` `<Transition>` component (e.g. `unmountOnExit`, `onEntered`, `onExited`).                                      |
| `styleStates`                  | `Record<TransitionStatus, React.CSSProperties>`  | fade + width collapse                         | no       | Per-state inline styles for transition phases: `entering`, `entered`, `exiting`, `exited`. Override to implement slide-in or width-based animations.                            |
| `onKeyDown`                    | `(e: React.KeyboardEvent) => void`               | —                                             | no       | Keydown handler. **Only fires when `enableFocusTrap` is `true`.**                                                                                                               |

> All other standard `HTMLDivElement` props (e.g. `data-test-id`) are spread onto the root element.

### Static Members

- `SidePanel.SidePanelSize` = `SidePanelSize` enum (`SMALL` | `LARGE`)

### Behaviour Notes

- The root element receives a `data-size` attribute reflecting the current `size` value (`"small"` or `"large"`). This can be used for CSS targeting.
- When `enableFocusTrap` is `true` **and** `visible` is `true`, the component renders with `role="dialog"` and `aria-labelledby` set to an auto-generated (or `titleProps.id`-overridden) ID that matches the panel title. This satisfies ARIA dialog requirements without extra wiring.
- Pressing **Escape** while focus is trapped calls `onClose` and stops event propagation. Provide an `onClose` handler whenever `enableFocusTrap` is `true`.
- The internal transition duration is **300 ms** (`ease-in-out`). `styleStates` overrides are merged on top of base transition styles.
- The resize button shows `ExpandPanelIcon` when `size === SMALL` (calls `onSizeChange(LARGE)`) and `ShrinkPanelIcon` when `size === LARGE` (calls `onSizeChange(SMALL)`). Omit `onSizeChange` to hide the size-toggle interaction effectively (the button still renders but calling it is a no-op by default).

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Presentation

```tsx
import {
  Alert,
  ChevronRightIcon,
  FlexLayout,
  SidePanel,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout className="nsg-example-borderless-content">
  <Alert
    message="The side panel can be large or small. The size is customizable."
    inline={true}
  />
  <FlexLayout>
    <SidePanel
      title={
        <span>
          VM One <ChevronRightIcon />
        </span>
      }
      size={SidePanel.SidePanelSize.SMALL}
      sizeStyleMap={{
        small: { width: 450 },
        large: { width: 800 },
      }}
      data-test-id="presentation"
    >
      <FlexLayout
        alignItems="center"
        justifyContent="center"
        style={{ width: '100%', height: 400 }}
      >
        <TextLabel>I am a small side panel.</TextLabel>
      </FlexLayout>
    </SidePanel>
    <SidePanel
      title={
        <span>
          VM One <ChevronRightIcon />
        </span>
      }
      size={SidePanel.SidePanelSize.LARGE}
      sizeStyleMap={{
        small: { width: 450 },
        large: { width: 800 },
      }}
    >
      <FlexLayout
        alignItems="center"
        justifyContent="center"
        style={{ width: '100%', height: 400 }}
      >
        <TextLabel>I am a large side panel.</TextLabel>
      </FlexLayout>
    </SidePanel>
  </FlexLayout>
</StackingLayout>
```

#### Interaction Example (show/hide + resize)

```tsx
import {
  ChevronRightIcon,
  FlexLayout,
  Button,
  TextLabel,
  SidePanel,
} from '@nutanix-ui/prism-reactjs'

function MyApp() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [size, setSize] = React.useState(SidePanel.SidePanelSize.SMALL)

  return (
    <FlexLayout
      className="nsg-example-borderless-content"
      style={{ height: 550, position: 'relative', overflow: 'hidden' }}
      itemSpacing="0px"
    >
      <SidePanel
        title={
          <span>
            VM One <ChevronRightIcon />
          </span>
        }
        size={size}
        onSizeChange={setSize}
        onClose={() => setIsVisible(false)}
        visible={isVisible}
        sizeStyleMap={{
          small: { width: 450 },
          large: { width: 800 },
        }}
      >
        <div style={{ height: 400 }} />
      </SidePanel>
    </FlexLayout>
  )
}
```

#### Table + SidePanel with Focus Trap

A `TransitionLayoutProvider` wraps the panel to animate width. The table adjusts its visible columns based on panel size and visibility.

```tsx
import {
  ChevronRightIcon,
  FlexLayout,
  Button,
  Table,
  StackingLayout,
  TextLabel,
  SidePanel,
  TransitionLayoutProvider,
} from '@nutanix-ui/prism-reactjs'

const SIZE = { SMALL: 450, LARGE: 800 }

function MyTableExplorer() {
  const [visible, setVisible] = React.useState(true)
  const [size, setSize] = React.useState(SidePanel.SidePanelSize.SMALL)

  const currentSizePx =
    size === SidePanel.SidePanelSize.SMALL ? SIZE.SMALL : SIZE.LARGE

  return (
    <FlexLayout itemSpacing="0px" padding="20px">
      <Table dataSource={dataSource} columns={columns} border={false} />
      <TransitionLayoutProvider
        visible={visible}
        style={{ display: 'flex', overflow: 'hidden' }}
        styleStates={{
          entering: {
            opacity: 1,
            width: currentSizePx,
            minWidth: currentSizePx,
          },
          entered: {
            opacity: 1,
            width: currentSizePx,
            minWidth: currentSizePx,
          },
          exiting: { opacity: 1, width: 0, minWidth: 0 },
          exited: { opacity: 1, width: 0, minWidth: 0 },
        }}
      >
        <SidePanel
          contentBefore={<div style={{ width: 20 }} />}
          title={
            <span>
              Item Name <ChevronRightIcon />
            </span>
          }
          style={{ display: 'flex', position: 'relative' }}
          sizeStyleMap={{
            small: { width: SIZE.SMALL, minWidth: SIZE.SMALL },
            large: { width: SIZE.LARGE, minWidth: SIZE.LARGE },
          }}
          styleStates={{
            entering: { opacity: 1, right: 0 },
            entered: { opacity: 1, right: 0 },
            exiting: { opacity: 1, right: `-${currentSizePx}px` },
            exited: { opacity: 1, right: `-${currentSizePx}px` },
          }}
          size={size}
          onSizeChange={(panelSize) => setSize(panelSize)}
          onClose={() => setVisible(false)}
          visible={visible}
          enableFocusTrap={true}
          restoreFocus={true}
          data-test-id="table-side-panel"
        >
          {/* panel content */}
        </SidePanel>
      </TransitionLayoutProvider>
    </FlexLayout>
  )
}
```

#### Percentage-Based Width SidePanel

Use percentage strings in `sizeStyleMap` and in an outer `TransitionLayoutProvider` `styleStates` to make the panel responsive to container width changes.

```tsx
import {
  ChevronRightIcon,
  FlexLayout,
  SidePanel,
  TransitionLayoutProvider,
} from '@nutanix-ui/prism-reactjs'

const PANEL_SIZE = { SMALL: '25%', LARGE: '50%' }

function MySidePanel({
  activeItem,
  width,
  size,
  nodeRef,
  visible,
  enableFocusTrap,
  onAnimationEnd,
  onSizeChange,
  onClose,
}) {
  return (
    <TransitionLayoutProvider
      rtgProps={{
        onEntered: onAnimationEnd,
        onExited: onAnimationEnd,
        unmountOnExit: true,
      }}
      nodeRef={nodeRef}
      visible={visible}
      style={{ display: 'flex', overflow: 'hidden', width: 'auto' }}
      styleStates={{
        entering: { opacity: 1, width: size, minWidth: size },
        entered: { opacity: 1, width: size, minWidth: size },
        exiting: { opacity: 1, width: 0, minWidth: 0 },
        exited: { opacity: 1, width: 0, minWidth: 0 },
      }}
    >
      <SidePanel
        contentBefore={<div style={{ width: 20, minWidth: 20 }} />}
        enableFocusTrap={enableFocusTrap}
        restoreFocus={true}
        title={
          <span>
            {activeItem?.name} <ChevronRightIcon />
          </span>
        }
        style={{
          position: 'relative',
          display: 'flex',
          width,
          minWidth: width,
        }}
        size={
          size === PANEL_SIZE.LARGE
            ? SidePanel.SidePanelSize.LARGE
            : SidePanel.SidePanelSize.SMALL
        }
        onSizeChange={onSizeChange}
        onClose={onClose}
      >
        {/* panel content */}
      </SidePanel>
    </TransitionLayoutProvider>
  )
}
```

### Usage Notes

- Prefer `SidePanel.SidePanelSize.SMALL` / `SidePanel.SidePanelSize.LARGE` over raw strings `"small"` / `"large"`.
- Keep labels, help text, and validation visible and persistent for form controls inside the panel; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing inside the panel body.
- When animating width (show/hide alongside a table), wrap `SidePanel` in a `TransitionLayoutProvider` that manages width and use `styleStates` on both the outer provider and the panel itself for smooth transitions.
- When using percentage-based widths, set both `width` and `minWidth` in `styleStates` to ensure flexbox respects the correct size during transitions.
- `contentBefore` is the idiomatic way to add a spacer gap between a table and the panel without an extra layout wrapper.
- `headerFooterLayoutProps` can supply a `footer` node (e.g. Save/Cancel buttons) via `HeaderFooterLayout`'s footer slot.

<!-- SOURCE-API-END -->
