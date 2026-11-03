# Loader

## Figma

- **Library name:** Loader (page: N/A, frame: Loader)

## React

Import: `import { Loader } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Components in this family

| Component        | Export                      | Use when                                                               |
| ---------------- | --------------------------- | ---------------------------------------------------------------------- |
| `Loader`         | `@nutanix-ui/prism-reactjs` | Page, section, or overlay spinner; wraps children with an overlay      |
| `DottedLoader`   | `@nutanix-ui/prism-reactjs` | Inline / cell-level placeholder (table cells, stat tiles, inline text) |
| `SkeletonLoader` | `@nutanix-ui/prism-reactjs` | Shape-preserving placeholder when the content layout is known          |
| `LoadingWrapper` | `@nutanix-ui/prism-reactjs` | Groups multiple loaders so screen readers hear one announcement        |

---

## `Loader`

### Import

```tsx
import { Loader } from '@nutanix-ui/prism-reactjs'
```

### Props Interface

#### `LoaderProps`

Extends: `FlexLayoutProps`

| Prop                    | Type                              | Default     | Required | Description                                                                                                                                                                |
| ----------------------- | --------------------------------- | ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `loading`               | `boolean`                         | `true`      | No       | Controls spinner visibility. When `false` no spinner is rendered (children remain).                                                                                        |
| `className`             | `string`                          | —           | No       | Additional class on the root `<div>`.                                                                                                                                      |
| `loaderClassName`       | `string`                          | —           | No       | Space-separated modifier tokens applied to the donut SVG element. Combinable: `-blue`, `-gray`, `-large`, `-navigation-inner`. See **loaderClassName tokens** below.       |
| `children`              | `React.ReactNode`                 | —           | No       | When provided the spinner is rendered as an overlay centred over the children.                                                                                             |
| `overlay`               | `boolean \| 'compact'`            | —           | No       | Force overlay style even when no children are present. `'compact'` renders the overlay semi-transparently so the content beneath is visible.                               |
| `tip`                   | `React.ReactNode`                 | —           | No       | Content shown below the spinner. A plain string is also used as the `aria-label` fallback. When a non-string ReactNode is supplied, also provide an explicit `aria-label`. |
| `paragraphProps`        | `ParagraphProps`                  | —           | No       | Props forwarded to the `<Paragraph>` that wraps `tip`.                                                                                                                     |
| `wrapperProps`          | `FlexLayoutProps`                 | —           | No       | Props forwarded to the `FlexLayout` that wraps the spinner and tip.                                                                                                        |
| `underlyingRef`         | `React.RefObject<HTMLDivElement>` | —           | No       | Ref to the element overlaid by the loader. Used with `disableFocusOnLoading` when the loader and its covered content are siblings (not parent/child).                      |
| `disableFocusOnLoading` | `boolean`                         | `false`     | No       | When `true`, focus is moved to the spinner when loading starts and restored when loading ends. The covered element receives the `inert` attribute while loading.           |
| `aria-label`            | `string`                          | `"Loading"` | No       | Overrides the accessible label on the spinner `role="img"` element. Takes priority over `tip`.                                                                             |
| `data-test`             | `string`                          | —           | No       | Selector for test automation.                                                                                                                                              |

#### `loaderClassName` tokens

Tokens are combined as a space-separated string, e.g. `"-gray -large"`.

| Token               | Effect                        |
| ------------------- | ----------------------------- |
| `-blue`             | Blue spinner (default colour) |
| `-gray`             | Gray spinner                  |
| `-large`            | Large size spinner            |
| `-navigation-inner` | Navigation-bar colour variant |

> No static enum is exported for these tokens. Pass them as raw strings.

### `aria-label` resolution order

1. Explicit `aria-label` prop (highest priority)
2. `tip` prop when it is a plain `string`
3. Default i18n `"Loading"` string

### Source Examples

#### Basic spinners

```tsx
import { FlexLayout, Loader } from '@nutanix-ui/prism-reactjs'
;<FlexLayout itemSpacing="40px" alignItems="center">
  <Loader data-test-id="default" />
  <Loader loaderClassName="-large" data-test-id="large" />
  <Loader loaderClassName="-gray" data-test-id="gray" />
  <Loader loaderClassName="-gray -large" data-test-id="gray-large" />
</FlexLayout>
```

#### Navigation-colour variant

```tsx
import { FlexLayout, Loader } from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  itemSpacing="40px"
  alignItems="center"
  className="ntnx-navigation-example"
>
  <Loader loaderClassName="-navigation-inner" data-test-id="nav-appearance" />
  <Loader
    loaderClassName="-navigation-inner -large"
    data-test-id="nav-appearance-large"
  />
  <Loader
    loaderClassName="-navigation-inner -gray"
    data-test-id="nav-appearance-gray"
  />
  <Loader
    loaderClassName="-navigation-inner -gray -large"
    data-test-id="nav-appearance-gray-large"
  />
</FlexLayout>
```

#### Spinner with tip

```tsx
import { Loader } from '@nutanix-ui/prism-reactjs'
;<Loader tip="Loading..." data-test-id="with-tip" />
```

#### Explicit aria-label overriding tip

```tsx
import { Loader, StackingLayout } from '@nutanix-ui/prism-reactjs'

// aria-label takes precedence over tip for screen readers
;<StackingLayout>
  <Loader tip="Loading..." aria-label="Loading VM instance..." />
</StackingLayout>
```

#### Overlay wrapping children

```tsx
import React from 'react'
import {
  Checkbox,
  ContainerLayout,
  FlexLayout,
  Loader,
  NutanixLogo,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'

const OverlayExample = () => {
  const [loading, setLoading] = React.useState(false)

  return (
    <StackingLayout>
      <ContainerLayout
        backgroundColor="white"
        style={{ height: 200, maxWidth: 400 }}
      >
        <Loader
          loading={loading}
          tip="Loading..."
          style={{ height: '100%' }}
          aria-live="polite"
        >
          <FlexLayout
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            itemSpacing="10px"
            style={{ height: '100%' }}
          >
            <NutanixLogo />
            <TextLabel size={TextLabel.TEXT_LABEL_SIZE.SMALL}>
              Go Beyond the Cloud
            </TextLabel>
          </FlexLayout>
        </Loader>
      </ContainerLayout>
      <Checkbox
        checked={loading}
        id="show-loader"
        type="toggle"
        label="Enable Loader"
        onChange={(e) => setLoading(e.target.checked)}
      />
    </StackingLayout>
  )
}
```

> Elements covered by the overlay must not be keyboard-focusable while loading. Use `disableFocusOnLoading={true}` or manually apply `inert` / hide the interactive elements.

#### Force overlay without children (e.g. while fetching initial data)

```tsx
import { Loader } from '@nutanix-ui/prism-reactjs'
;<Loader tip="Loading..." overlay={true} data-test-id="overlay" />
```

#### Compact overlay (content remains partially visible)

```tsx
import { Loader } from '@nutanix-ui/prism-reactjs'
;<Loader tip="Loading" overlay="compact" style={{ width: '100%' }}>
  {/* existing content */}
</Loader>
```

#### Focus management with `disableFocusOnLoading`

When `disableFocusOnLoading={true}`, the loader traps focus on the spinner while loading and restores it when loading ends. The covered element receives `inert` automatically.

```tsx
import React from 'react'
import {
  Button,
  FormItemInput,
  Loader,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const FocusExample = () => {
  const [loading, setLoading] = React.useState(false)

  return (
    <Loader
      loading={loading}
      tip="Loading..."
      style={{ height: '100%' }}
      disableFocusOnLoading={true}
    >
      <StackingLayout itemGap="S">
        <FormItemInput id="dummy-input" label="Name" />
        <Button>Submit</Button>
      </StackingLayout>
    </Loader>
  )
}
```

#### Focus management with `underlyingRef` (loader and content are siblings)

Use `underlyingRef` when the `<Loader>` and the content it covers are sibling elements rather than parent/child.

```tsx
import React from 'react'
import {
  Button,
  FormItemInput,
  Loader,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'

const UnderlyingRefExample = () => {
  const [loading, setLoading] = React.useState(false)
  const buttonWrapperRef = React.useRef<HTMLDivElement>(null)

  return (
    <StackingLayout style={{ position: 'relative' }}>
      <Loader
        loading={loading}
        tip="Loading..."
        disableFocusOnLoading={true}
        overlay={true}
        underlyingRef={buttonWrapperRef}
        style={{ position: 'absolute' }}
      />
      <StackingLayout itemGap="S" parentDivRef={buttonWrapperRef}>
        <FormItemInput id="dummy-input" label="Name" />
        <Button>Create</Button>
      </StackingLayout>
    </StackingLayout>
  )
}
```

---

## `DottedLoader`

Use for individual text elements, table cells, and inline placeholders. For page or section loading use `Loader` instead.

### Import

```tsx
import { DottedLoader } from '@nutanix-ui/prism-reactjs'
```

### Props Interface

#### `DottedLoaderProps`

| Prop         | Type      | Default     | Required | Description                                   |
| ------------ | --------- | ----------- | -------- | --------------------------------------------- |
| `loading`    | `boolean` | `true`      | No       | When `false` the component renders `null`.    |
| `className`  | `string`  | —           | No       | Additional class on the root element.         |
| `aria-label` | `string`  | `"Loading"` | No       | Accessible label on the `role="img"` element. |
| `data-test`  | `string`  | —           | No       | Selector for test automation.                 |

### Source Examples

#### Basic

```tsx
import { DottedLoader } from '@nutanix-ui/prism-reactjs'
;<DottedLoader data-test-id="dotted-loader-basic" />
```

#### Table cell placeholder

```tsx
import { DottedLoader, Table } from '@nutanix-ui/prism-reactjs'

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  { title: 'Address', key: 'address', render: () => <DottedLoader /> },
]

const dataSource = [
  { key: '1', name: 'John Brown', age: 32, address: null },
  { key: '2', name: 'Jim Green', age: 42, address: null },
]

;<Table
  showCustomScrollbar={true}
  dataSource={dataSource}
  columns={columns}
  aria-label="People with addresses still loading"
/>
```

---

## `SkeletonLoader`

Use as a shape-preserving placeholder when the layout of the incoming content is known. Must be paired with a `LoadingWrapper` (or a top-level `Loader`) to satisfy WCAG — standalone skeleton loaders are decorative and do not meet compliance on their own.

### Import

```tsx
import { SkeletonLoader } from '@nutanix-ui/prism-reactjs'
// SkeletonLoaderShape enum is a named export from the component module, not from the package root
import { SkeletonLoaderShape } from '@nutanix-ui/prism-reactjs/dist/components/v2/Loader/SkeletonLoader'
```

> In practice, pass shape values as raw strings (`"circle"` / `"rounded-rectangle"`) since `SkeletonLoaderShape` is not re-exported from the package root `index.ts`.

### Props Interface

#### `SkeletonLoaderProps`

| Prop             | Type                                                     | Default               | Required | Description                                                                                             |
| ---------------- | -------------------------------------------------------- | --------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `shape`          | `SkeletonLoaderShape \| 'circle' \| 'rounded-rectangle'` | `'rounded-rectangle'` | No       | Visual shape of the placeholder.                                                                        |
| `pauseAnimation` | `boolean`                                                | `false`               | No       | Freezes the shimmer animation (useful for `prefers-reduced-motion` contexts).                           |
| `loadingMsg`     | `string`                                                 | `"Loading"`           | No       | Screen-reader-only announcement text. Suppressed automatically when rendered inside a `LoadingWrapper`. |
| `className`      | `string`                                                 | —                     | No       | Additional class on the root element.                                                                   |

#### `SkeletonLoaderShape` enum values

| Constant                                | String value          |
| --------------------------------------- | --------------------- |
| `SkeletonLoaderShape.CIRCLE`            | `'circle'`            |
| `SkeletonLoaderShape.ROUNDED_RECTANGLE` | `'rounded-rectangle'` |

### Source Examples

#### Basic shapes

```tsx
import { FlexLayout, SkeletonLoader } from '@nutanix-ui/prism-reactjs'
;<FlexLayout itemSpacing="40px" alignItems="center">
  <SkeletonLoader shape="circle" data-test-id="circle" />
  <SkeletonLoader shape="rounded-rectangle" data-test-id="rounded-rectangle" />
</FlexLayout>
```

#### Custom size (width/height via `style`)

```tsx
import { SkeletonLoader } from '@nutanix-ui/prism-reactjs';

// Text-M placeholder
<SkeletonLoader style={{ width: 60, height: 8 }} />

// Icon placeholder
<SkeletonLoader shape="circle" />
```

#### Widget with skeleton placeholders inside `LoadingWrapper`

```tsx
import React from 'react'
import {
  Badge,
  Checkbox,
  ContainerLayout,
  FlexLayout,
  HeaderFooterLayout,
  LoadingWrapper,
  Paragraph,
  SkeletonLoader,
  StackingLayout,
  Title,
} from '@nutanix-ui/prism-reactjs'

const WidgetExample = () => {
  const [loading, setLoading] = React.useState(true)

  const titleReady = (
    <FlexLayout
      style={{ paddingInline: '20px' }}
      alignItems="center"
      itemGap="S"
    >
      <Title size="h3">Data Fetched!</Title>
      <Badge color="green" count="22" />
    </FlexLayout>
  )
  const titleSkeleton = (
    <FlexLayout
      style={{ paddingInline: '20px' }}
      alignItems="center"
      itemGap="M"
    >
      <SkeletonLoader style={{ width: 80 }} />
      <SkeletonLoader style={{ width: 20 }} />
    </FlexLayout>
  )
  const bodyReady = (
    <Paragraph style={{ padding: '20px' }}>
      Content loaded successfully.
    </Paragraph>
  )
  const bodySkeleton = (
    <FlexLayout
      flexDirection="column"
      itemGap="M"
      style={{ paddingInline: '20px', paddingBlock: '25px' }}
    >
      <SkeletonLoader style={{ width: 300 }} />
      <SkeletonLoader style={{ width: 300 }} />
      <SkeletonLoader style={{ width: 150 }} />
    </FlexLayout>
  )

  return (
    <StackingLayout>
      <LoadingWrapper
        wrapperNode={ContainerLayout}
        backgroundColor="white"
        style={{ height: 150, maxWidth: 400 }}
        loading={loading}
        loadingMsg="Content for this widget is being fetched"
        loadingCompleteMsg="The widget content is ready"
      >
        <HeaderFooterLayout
          itemSpacing="0px"
          header={loading ? titleSkeleton : titleReady}
          bodyContent={loading ? bodySkeleton : bodyReady}
        />
      </LoadingWrapper>
      <Checkbox
        checked={loading}
        id="toggle-loading"
        type="toggle"
        label="Enable Loading State"
        onChange={(e) => setLoading(e.target.checked)}
      />
    </StackingLayout>
  )
}
```

---

## `LoadingWrapper`

Provides a single grouped screen-reader announcement (`"Loading"` / `"Loading complete"`) for any loader-driven section. Child `SkeletonLoader` and `DottedLoader` instances inside the wrapper automatically suppress their own individual announcements via `LoadingContext`.

### Import

```tsx
import { LoadingWrapper } from '@nutanix-ui/prism-reactjs'
```

### Props Interface

#### `LoadingWrapperProps`

| Prop                 | Type                | Default              | Required | Description                                                                                                                                                               |
| -------------------- | ------------------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`           | `React.ReactNode`   | —                    | **Yes**  | Content to render inside the wrapper.                                                                                                                                     |
| `loading`            | `boolean`           | `true`               | No       | When `true` announces `loadingMsg`; when `false` announces `loadingCompleteMsg`.                                                                                          |
| `loadingMsg`         | `string`            | `"Loading"`          | No       | Screen-reader-only text announced while loading.                                                                                                                          |
| `loadingCompleteMsg` | `string`            | `"Loading complete"` | No       | Screen-reader-only text announced when loading finishes.                                                                                                                  |
| `wrapperNode`        | `React.ElementType` | `'div'`              | No       | Root element type. Accepts any HTML tag or a Prism layout component (`ContainerLayout`, `FlexLayout`, `StackingLayout`, etc.). Extra props are forwarded to this element. |
| `className`          | `string`            | —                    | No       | Additional class on the root element.                                                                                                                                     |

### Source Examples

#### Widget with skeleton loaders

See the `SkeletonLoader` widget example above — `LoadingWrapper` wraps the entire widget.

#### Widget with dotted loaders

```tsx
import React from 'react'
import {
  Badge,
  Checkbox,
  ContainerLayout,
  DottedLoader,
  FlexLayout,
  HeaderFooterLayout,
  LoadingWrapper,
  Paragraph,
  StackingLayout,
  Title,
} from '@nutanix-ui/prism-reactjs'

// DottedLoader announces "Loading" on its own by default, but inside a
// LoadingWrapper it becomes aria-hidden so the wrapper owns the announcement.
const WrapperWithDotted = () => {
  const [loading, setLoading] = React.useState(true)

  return (
    <StackingLayout>
      <LoadingWrapper
        wrapperNode={ContainerLayout}
        backgroundColor="white"
        style={{ height: 150, maxWidth: 400 }}
        loading={loading}
        loadingMsg="Content for this widget is being fetched"
        loadingCompleteMsg="The widget content is ready"
      >
        <HeaderFooterLayout
          itemSpacing="0px"
          header={
            loading ? (
              <FlexLayout
                style={{ paddingInline: '20px' }}
                alignItems="center"
                itemGap="M"
              >
                <DottedLoader />
                <DottedLoader />
              </FlexLayout>
            ) : (
              <FlexLayout
                style={{ paddingInline: '20px' }}
                alignItems="center"
                itemGap="S"
              >
                <Title size="h3">Data Fetched!</Title>
                <Badge color="green" count="22" />
              </FlexLayout>
            )
          }
          bodyContent={
            loading ? (
              <FlexLayout
                flexDirection="column"
                itemGap="M"
                style={{ paddingInline: '20px', paddingBlock: '25px' }}
              >
                <DottedLoader />
                <DottedLoader />
                <DottedLoader />
              </FlexLayout>
            ) : (
              <Paragraph style={{ padding: '20px' }}>Content loaded.</Paragraph>
            )
          }
        />
      </LoadingWrapper>
      <Checkbox
        checked={loading}
        id="toggle-loading"
        type="toggle"
        label="Enable Loading State"
        onChange={(e) => setLoading(e.target.checked)}
      />
    </StackingLayout>
  )
}
```

---

## Accessibility

### Screen Readers

The `Loader` spinner (`role="img"`) does not make live-region announcements by default. Depending on the context:

- Add `aria-live="polite"` directly on the `<Loader>` element to announce loading state changes.
- Or move focus programmatically to the spinner when it becomes active (e.g. via `disableFocusOnLoading`).
- When loading completes, provide a "Loading complete" message — use `SrOnly` text or `LoadingWrapper`'s `loadingCompleteMsg` to communicate completion to screen reader users.

### `aria-label` on `Loader`

- If `tip` is a plain string, it is used as the accessible label automatically.
- Provide an explicit `aria-label` when `tip` is a ReactNode or when a more specific label is needed (e.g. `"Loading VM instance..."`).
- `aria-label` always takes precedence over `tip`.

### Keyboard / Focus (`disableFocusOnLoading`)

- When `disableFocusOnLoading={true}` and the focused element is inside the overlaid container, focus moves to the spinner on loading start.
- The covered container receives the `inert` attribute, preventing keyboard access to elements beneath the overlay.
- Focus is restored to the last focused element (or the first focusable child) when loading ends, unless the user manually navigated away during loading.
- When using the `underlyingRef` pattern (sibling loader), pass the ref of the covered container to `underlyingRef` so the wrapper controls `inert` correctly.

### Movement and Auto-Updating (WCAG 2.2.2)

WCAG Success Criterion [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) requires that moving/animated content lasting more than 5 seconds can be paused, stopped, or hidden. If a load is expected to exceed 5 seconds, prefer the `Progress` component. For users with `prefers-reduced-motion` set, use a static indicator.

### Skeleton Loader WCAG note

A standalone `SkeletonLoader` is decorative and does **not** meet WCAG compliance on its own. Always pair it with a `LoadingWrapper` (or a top-level `Loader`) that provides a grouped announcement.

---

## Usage Notes

- Use `Loader` for page, section, or modal-level loading. Use `DottedLoader` for individual inline elements (table cells, stat tiles). Use `SkeletonLoader` when the shape of the forthcoming content is known.
- When multiple loaders are visible simultaneously, wrap them in `LoadingWrapper` so screen readers hear one announcement instead of one per loader.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- The `loaderClassName` tokens (e.g. `-gray`, `-large`) are raw strings — no enum is exported for them.
- Do not set `overlay="compact"` without also rendering children or a defined container height; the overlay needs a sized parent to display correctly.

<!-- SOURCE-API-END -->
