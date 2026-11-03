# InfiniteScroll

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not usually mapped directly from a Figma component.

## React

Import: `import { InfiniteScroll } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { InfiniteScroll } from '@nutanix-ui/prism-reactjs'
```

`ISRenderType` and `ISListContainer` are **not** re-exported from `@nutanix-ui/prism-reactjs`. Import them directly from the component module if needed:

```tsx
import InfiniteScroll, {
  ISRenderType,
  ISListContainer,
  Range,
} from '@nutanix-ui/prism-reactjs/components/v2/Utility/InfiniteScroll'
```

### Exported Types

#### `Range`

```ts
type Range = [number, number]
```

A tuple representing a `[start, end]` index range used internally for virtual scrolling and context tracking.

#### `ISListContainer`

```ts
type ISListContainer = React.ReactNode
```

Alias for the `listContainer` prop type.

### Enums / Constants

#### `ISRenderType`

Describes the internal render classification of each list slot. Passed as the `type` argument to function-form `listElement` and `listContainer`.

| Constant             | Value                 |
| -------------------- | --------------------- |
| `DATA`               | `'data'`              |
| `PLACEHOLDER`        | `'placeholder'`       |
| `PLACEHOLDER_TOP`    | `'placeholderTop'`    |
| `PLACEHOLDER_BOTTOM` | `'placeholderBottom'` |
| `SPACER_HEAD`        | `'headSpacer'`        |
| `SPACER_TAIL`        | `'tailSpacer'`        |
| `SPACER_TOP`         | `'bodySpacerTop'`     |
| `SPACER_MID`         | `'bodySpacerMiddle'`  |
| `SPACER_BOTTOM`      | `'bodySpacerBottom'`  |

### Props Interface

#### `InfiniteScrollProps`

| Prop               | Type                                                                                        | Default   | Required | Description                                                                                                                                                                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`             | `any[]`                                                                                     | `[]`      | No       | Array of items to render. Each element's properties are spread onto the rendered `listElement`.                                                                                                                                                                                                                           |
| `listContainer`    | `React.ReactNode \| ((props: Record<string, any>, i: number, type: string) => JSX.Element)` | —         | No       | Element or function used as the scroll container. When omitted, a Prism `Scrollbar` component is rendered automatically. If a custom component is used, it **must** forward its ref. When passed as a function, receives `(props, i, type)`.                                                                              |
| `listElement`      | `React.ReactNode \| ((props: Record<string, any>, i: number, type: string) => JSX.Element)` | `<div />` | No       | Element or function used to render each list item (data rows and placeholder rows). Custom components **must** forward their ref. When passed as a function, receives `(props, index, type)` where `type` is `'data'` or `'placeholder'`.                                                                                 |
| `loader`           | `React.ReactNode \| ((props: Record<string, any>, i: number, type: string) => JSX.Element)` | —         | No       | Loader element rendered at the head and tail of the list. The head loader is only shown when `headIndex > 0` (i.e., more data may exist above).                                                                                                                                                                           |
| `initialScrollY`   | `{ scrollTop?: number; index?: number }`                                                    | —         | No       | Set the initial scroll position on mount. `index` scrolls to a data index (takes priority over `scrollTop`). `scrollTop` sets the pixel offset from the top.                                                                                                                                                              |
| `offset`           | `number`                                                                                    | `0`       | No       | The starting index of the current `data` slice within the full data set. Required when tracking a dynamic (rolling) data set with server-side pagination.                                                                                                                                                                 |
| `onFetchRequest`   | `(value: { offset: number; count: number }, context: Record<any, any>) => Record<any, any>` | —         | No       | Called when the scroll position approaches the buffer threshold and more data is needed. `value` contains `{ offset, count }` for the optimal fetch window. `context` is the current `getInstance()` snapshot (see below).                                                                                                |
| `onScroll`         | `(event: React.UIEvent, context: Record<any, any>) => void`                                 | —         | No       | Called on each (throttled) scroll event. `context` is the current instance snapshot.                                                                                                                                                                                                                                      |
| `onUpdate`         | `(context: Record<any, any>) => void`                                                       | —         | No       | Called on `componentDidUpdate` when the data range changes or the scroll client size changes. Useful for syncing external pagination state. `context` is the current instance snapshot.                                                                                                                                   |
| `pageBufferSize`   | `number`                                                                                    | `2`       | No       | Number of pages to pre-render above and below the viewport (virtual scroll buffer). A value of `2` means 2 pages above + 1 visible page + 2 pages below = 5 pages total rendered at any time. Increase for smaller viewports; decrease for larger ones.                                                                   |
| `scrollTarget`     | `HTMLElement \| ((sync: (target: HTMLElement) => HTMLElement) => HTMLElement)`              | —         | No       | A parent DOM element that provides the scroll container (instead of the internal one). Pass as a function returning the element (e.g. `() => document.querySelector('.container')`). If the parent is not yet mounted, the provided `sync` callback finalises InfiniteScroll mount side-effects once the parent is ready. |
| `scrollThrottle`   | `number`                                                                                    | `5`       | No       | Scroll event throttle in milliseconds. Larger values reduce scroll handler call frequency.                                                                                                                                                                                                                                |
| `scrollTracking`   | `boolean`                                                                                   | `true`    | **Yes**  | Enables placeholder rendering and position tracking for data outside the current loaded window. Required to be explicitly passed; controls whether head/tail index state expands beyond the current data slice.                                                                                                           |
| `spacerElement`    | `React.ReactNode \| ((props: Record<string, any>, i: number, type: string) => JSX.Element)` | `<div />` | No       | Element used to render virtual scroll spacers. Spacers maintain scrollbar size and position for items outside the rendered buffer. Custom components **must** forward their ref.                                                                                                                                          |
| `virtualScrolling` | `boolean`                                                                                   | `true`    | No       | Enables virtual scrolling (item unmount/remount outside the buffer threshold). Recommended for large data sets. When enabled, uncontrolled component state inside list items will reset when they leave and re-enter the buffer.                                                                                          |

### Instance / Context Object

The `context` argument passed to `onFetchRequest`, `onScroll`, and `onUpdate` is the result of `getInstance()`. Key fields:

| Field            | Type                                         | Description                                                   |
| ---------------- | -------------------------------------------- | ------------------------------------------------------------- |
| `currentIndex`   | `number`                                     | Current scroll position expressed as a data index.            |
| `scrollTop`      | `number`                                     | Current pixel scroll position.                                |
| `scrollHeight`   | `number`                                     | Total scrollable height of the container.                     |
| `clientHeight`   | `number`                                     | Visible height of the scroll container.                       |
| `clientWidth`    | `number`                                     | Visible width of the scroll container.                        |
| `pageSize`       | `number`                                     | Calculated number of items visible in the viewport.           |
| `bufferSize`     | `number`                                     | Calculated number of items pre-rendered outside the viewport. |
| `formattedSizes` | `{ pageSize: number; bufferSize: number }`   | Ceiling-rounded page/buffer sizes.                            |
| `readyToFetch`   | `false \| { offset: number; count: number }` | The optimal fetch request, or `false` if no fetch is needed.  |
| `scrollContext`  | `Array<[scrollTop, height]>`                 | Cached scroll positions and heights for each measured item.   |
| `headIndex`      | `number`                                     | Minimum tracked data index (expands as data is loaded above). |
| `tailIndex`      | `number`                                     | Maximum tracked data index (expands as data is loaded below). |
| `offset`         | `number`                                     | Current data `offset` prop value.                             |
| `count`          | `number`                                     | Current `data.length`.                                        |

### Behaviour Notes

- **Default container:** When `listContainer` is not provided, InfiniteScroll renders a Prism `Scrollbar` component (`containerType=COMPONENT`, `autoHeightMax="100%"`) as its scroll container. You can pass `style`, `className`, and other DOM props directly to `<InfiniteScroll>` and they will be forwarded to the container.
- **Virtual scrolling:** When `virtualScrolling={true}` (default), items outside the `pageBufferSize` threshold are unmounted. Any uncontrolled lifecycle (e.g. `useState` without a key) will restart when items re-enter the buffer.
- **Ref forwarding required:** Custom components passed as `listContainer`, `listElement`, or `spacerElement` must use `React.forwardRef`. InfiniteScroll attaches refs internally to measure item heights.
- **Loader visibility:** The head loader is only rendered when `headIndex > 0` — meaning there may be more data above the current window. The tail loader is always rendered when `loader` is provided.
- **Scroll anchoring:** When new data is prepended (offset decreases), InfiniteScroll automatically adjusts `scrollTop` to keep the current viewport stable.
- **`scrollTracking` is required:** Although TypeScript marks it as required (`scrollTracking: boolean` with no `?`), the `defaultProps` provides `true`. Always pass it explicitly when you need to disable placeholder tracking.
- **`offset` and rolling data:** When using a sliding/rolling data window (server-side virtual scroll), always pass `offset` matching the starting index of the current `data` slice. This lets InfiniteScroll track positions for data that has scrolled out of the loaded window.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Minimal working example

```tsx
import React from 'react'
import { InfiniteScroll } from '@nutanix-ui/prism-reactjs'

const generateData = (count: number, startIndex = 0) =>
  Array.from({ length: count }, (_, i) => ({
    key: `item-${startIndex + i}`,
    id: startIndex + i,
    label: `Item ${startIndex + i}`,
  }))

const SimpleList = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const { id, label, style, ...rest } = props
  return (
    <div
      ref={ref}
      {...rest}
      style={{
        height: 40,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        ...style,
      }}
    >
      {label ?? '—'}
    </div>
  )
})

function MyInfiniteList() {
  const [data, setData] = React.useState(() => generateData(50))

  function handleFetchRequest(request: { offset: number; count: number }) {
    // Append more data when scrolling to the bottom
    setData((prev) => [...prev, ...generateData(request.count, prev.length)])
  }

  return (
    <InfiniteScroll
      data={data}
      listElement={<SimpleList />}
      onFetchRequest={handleFetchRequest}
      scrollTracking={true}
      style={{ height: 400 }}
    />
  )
}
```

#### Dynamic row heights with function listElement

```tsx
import React from 'react'
import {
  FlexLayout,
  Loader,
  StackingLayout,
  InfiniteScroll,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'

const boxStyle = {
  height: '40px',
  background: 'var(--color-background-info-neutral)',
  border: '1px solid var(--color-background-base)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const getRandomSize = (max, min) =>
  Math.floor(Math.random() * (max - min) + min)

const generateData = (rowHeight, count, startIndex = 0) => {
  const data = []
  for (let i = startIndex; i < startIndex + count; i++) {
    data.push({
      id: i,
      placeholder: `value${i}`,
      label: `label${i}`,
      height: rowHeight === 'dynamic' ? getRandomSize(80, 20) : rowHeight,
    })
  }
  return data
}

const ListItem = React.forwardRef((props, ref) => {
  const { height, id, index, style = {}, ...otherProps } = props
  const itemHeight = height || style.height

  return (
    <div
      {...otherProps}
      ref={ref}
      style={{ ...boxStyle, ...style, height: itemHeight }}
    >
      {id !== undefined && (
        <FlexLayout itemSpacing="10px" style={{ width: '50px' }}>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>{id}</TextLabel>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            {itemHeight}
          </TextLabel>
        </FlexLayout>
      )}
    </div>
  )
})

class MyApp extends React.Component {
  constructor(props) {
    super()
    this.state = { data: props.data, loading: false }
    this.handleFetchRequest = this.handleFetchRequest.bind(this)
  }

  handleFetchRequest(request) {
    if (!this.state.loading && request) {
      this.setState({ loading: true }, () => {
        setTimeout(() => {
          this.setState((prev) => ({
            data: [
              ...prev.data,
              ...generateData('dynamic', 20, prev.data.length),
            ],
            loading: false,
          }))
        }, 1000)
      })
    }
  }

  render() {
    const { data, loading } = this.state
    return (
      <StackingLayout>
        {loading && <Loader tip="Loading..." />}
        <InfiniteScroll
          data={data}
          initialScrollY={{ index: 200 }}
          listElement={(props, i) => <ListItem {...props} index={i} />}
          loader={
            <div style={boxStyle}>
              <Loader tip="Fetching data..." />
            </div>
          }
          onFetchRequest={this.handleFetchRequest}
          scrollTracking={true}
          style={{ height: '400px' }}
        />
      </StackingLayout>
    )
  }
}

// Usage
;<MyApp data={generateData('dynamic', 1000, 0)} />
```

#### Dynamic offset (rolling/server-side window at extreme scale)

```tsx
import React from 'react'
import {
  Checkbox,
  FlexLayout,
  Loader,
  StackingLayout,
  InfiniteScroll,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'

const generateData = (rowHeight, count, startIndex = 0) => {
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    height:
      rowHeight === 'dynamic' ? Math.floor(Math.random() * 60) + 20 : rowHeight,
  }))
}

const ListItem = React.forwardRef((props, ref) => {
  const { height, id, style = {}, ...rest } = props
  const itemHeight = height || style.height
  return (
    <div
      {...rest}
      ref={ref}
      style={{
        height: itemHeight,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        borderBottom: '1px solid var(--color-background-base)',
        ...style,
      }}
    >
      {id !== undefined ? (
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          Item {id}
        </TextLabel>
      ) : null}
    </div>
  )
})

class MyApp extends React.Component {
  constructor(props) {
    super()
    this.state = {
      data: props.data,
      offset: props.offset,
      loading: false,
      fetchingEnabled: true,
    }
    this.handleFetchRequest = this.handleFetchRequest.bind(this)
  }

  handleFetchRequest(request, instance) {
    const { fetchingEnabled, loading } = this.state
    if (!loading && fetchingEnabled) {
      this.setState({ loading: true }, () => {
        setTimeout(() => {
          // Simulate server: return a rolling window at the requested offset
          this.setState({
            data: generateData('dynamic', request.count, request.offset),
            offset: request.offset,
            loading: false,
          })
        }, 800)
      })
    }
  }

  render() {
    const { data, fetchingEnabled, loading, offset } = this.state
    return (
      <StackingLayout>
        <FlexLayout
          style={{ position: 'relative' }}
          justifyContent="space-between"
        >
          <TextLabel>Offset: {offset}</TextLabel>
          {loading && (
            <Loader
              style={{ position: 'absolute', right: 0 }}
              tip="Fetching..."
            />
          )}
        </FlexLayout>
        <InfiniteScroll
          data={data}
          initialScrollY={{ index: 9000 }}
          listElement={(props, i) => <ListItem {...props} index={i} />}
          loader={
            <div style={{ height: 40, textAlign: 'center' }}>
              <Loader tip="Fetching data..." />
            </div>
          }
          offset={offset}
          onFetchRequest={this.handleFetchRequest}
          scrollTracking={true}
        />
        <Checkbox
          id="toggle-fetching"
          type="toggle"
          label="Enable Fetch Requests"
          checked={fetchingEnabled}
          onChange={(e) => this.setState({ fetchingEnabled: e.target.checked })}
        />
      </StackingLayout>
    )
  }
}

const defaultOffset = 8960
;<MyApp
  count={100}
  data={generateData('dynamic', 100, defaultOffset)}
  offset={defaultOffset}
/>
```

#### Custom listContainer with React.forwardRef

When the default `Scrollbar` container does not suit the layout, pass a custom `listContainer`. The component **must** forward its ref so InfiniteScroll can attach scroll listeners.

```tsx
import React from 'react'
import {
  FlexLayout,
  Loader,
  StackingLayout,
  InfiniteScroll,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'

const ListContainer = React.forwardRef((props, ref) => {
  const { children, ...other } = props
  return (
    <div
      {...other}
      ref={ref}
      style={{ display: 'block', height: '400px', overflow: 'auto' }}
    >
      <StackingLayout itemSpacing="0px">{children}</StackingLayout>
    </div>
  )
})

const ListItem = React.forwardRef((props, ref) => {
  const { height, id, style = {}, ...otherProps } = props
  const itemHeight = height || style.height
  return (
    <div
      {...otherProps}
      ref={ref}
      style={{
        height: itemHeight,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        ...style,
      }}
    >
      {id !== undefined ? (
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          Item {id}
        </TextLabel>
      ) : null}
    </div>
  )
})

function MyApp({ data: initialData }) {
  const [data, setData] = React.useState(initialData)
  const [loading, setLoading] = React.useState(false)

  function handleFetchRequest(request) {
    if (!loading && request) {
      setLoading(true)
      setTimeout(() => {
        setData((prev) => [
          ...prev,
          ...Array.from({ length: 20 }, (_, i) => ({
            id: prev.length + i,
            height: 40,
          })),
        ])
        setLoading(false)
      }, 1000)
    }
  }

  return (
    <StackingLayout>
      {loading && <Loader tip="Loading..." />}
      <InfiniteScroll
        data={data}
        initialScrollY={{ index: 200 }}
        listContainer={<ListContainer />}
        listElement={(props, i) => <ListItem {...props} index={i} />}
        loader={
          <div style={{ height: 40, textAlign: 'center' }}>
            <Loader tip="Fetching data..." />
          </div>
        }
        onFetchRequest={handleFetchRequest}
        scrollTracking={true}
      />
    </StackingLayout>
  )
}
```

#### Using InfiniteScroll inside a Prism Table (via `infiniteScroll` prop)

`Table` has built-in InfiniteScroll support via its `infiniteScroll` prop. `InfiniteScrollProps` are passed through `infiniteScrollProps`:

```tsx
import React from 'react'
import { Table, Loader } from '@nutanix-ui/prism-reactjs'

function MyTableWithInfiniteScroll({ data, offset, onFetchRequest }) {
  return (
    <Table
      showCustomScrollbar={true}
      columnKey="id"
      columns={[
        { title: 'Name', id: 'name' },
        { title: 'Age', id: 'age' },
        { title: 'Address', id: 'address' },
      ]}
      dataSource={data}
      infiniteScroll={{
        scrollOffsetIndicator: true,
        infiniteScrollProps: {
          offset,
          onFetchRequest,
          scrollTracking: true,
        },
      }}
      structure={{ bodyMaxHeight: '400px' }}
    />
  )
}
```

### Usage Notes

- **Prefer `Table` with `infiniteScroll` prop** for tabular data — it handles column layout, row selection, sorting, and InfiniteScroll integration out of the box.
- Use `InfiniteScroll` directly for custom list layouts where `Table` is not appropriate (e.g. card grids, feed layouts, virtualised trees).
- `listElement` and `listContainer` as functions receive `(props, index, type)` — use `type` (an `ISRenderType` value) to differentiate data rows from placeholder rows if custom placeholder rendering is needed.
- These exports are React-only helpers or lower-level utilities. Prefer higher-level Prism components when they satisfy the design.
- Keep generated app code aligned with repository rules: Prism layout components for layout, persistent accessible labels, and no custom CSS for spacing.

<!-- SOURCE-API-END -->
