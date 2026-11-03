# Calendar

## Figma

- **Library name:** Calendar (page: Data Input, frame: Input)
- **Figma design:** [25.5](https://www.figma.com/design/hGHwVoUgB4zxtHzGh13Vvb/25.5?node-id=20991-169617)

## React

Import: `import { Calendar } from '@nutanix-ui/prism-reactjs'`

> **Tip:** Use `Calendar` for always-visible, inline date display or selection. Use `DatePicker` for an input-triggered calendar popup.

### Enums / Constants

#### `CalendarViewMode` (via `Calendar.ViewMode`)

Access via the static property — prefer `Calendar.ViewMode` over the raw string.
`Calendar.VIEW_MODE` is a **deprecated** alias for the same enum.

```ts
Calendar.ViewMode.DAYS // "days"
Calendar.ViewMode.MONTHS // "months"
Calendar.ViewMode.YEARS // "years"  (only used internally; not a valid initialViewMode value)
```

#### `RangeFocusOn`

Numeric enum exported from the module alongside the component.

```ts
import { Calendar, RangeFocusOn } from '@nutanix-ui/prism-reactjs'

RangeFocusOn.start // 0
RangeFocusOn.end // 1
```

### Exported Types

#### `CalendarRef`

The ref handle exposed when using `React.forwardRef`. Pass a `React.RefObject<CalendarRef>` to the component's `ref` prop.

```ts
type CalendarRef = {
  focusOnDay: (date: moment.Moment, ignoreView?: boolean) => void
}
```

### Props

`CalendarProps` extends `Omit<ReactDateTime.DatetimepickerProps, 'value' | 'onChange'>`.

| Prop                       | Type                                                                                                          | Default                 | Required | Notes                                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value`                    | `moment.Moment \| Date \| string \| { startDate?: moment.Moment; endDate?: moment.Moment }`                   | `''`                    | No       | Controlled selected date. Pass `{ startDate, endDate }` for range selection. Parsed by Moment.js.                                                            |
| `onChange`                 | `(selectedDate: moment.Moment) => void`                                                                       | —                       | No       | Providing this callback enables date selection. Without it the calendar is display-only.                                                                     |
| `initialViewDate`          | `moment.Moment \| Date \| string`                                                                             | —                       | No       | Date to display on first render. Takes precedence over `value` for the initial view. Only applies at mount; use `calendarRef.current.focusOnDay` afterwards. |
| `initialViewMode`          | `CalendarViewMode.DAYS \| CalendarViewMode.MONTHS`                                                            | `CalendarViewMode.DAYS` | No       | Starting view. Only `DAYS` and `MONTHS` are valid; `YEARS` is used internally only.                                                                          |
| `dateFormat`               | `string`                                                                                                      | locale `L` format       | No       | Moment.js [format string](https://momentjs.com/docs/#/displaying/format/). Defaults to locale-aware long date format.                                        |
| `borderless`               | `boolean`                                                                                                     | `false`                 | No       | Removes the outer border. Useful on darker or `alt` backgrounds.                                                                                             |
| `disableNavigation`        | `boolean`                                                                                                     | `false`                 | No       | Hides the built-in prev/next navigation buttons. Use with a custom header (e.g. multi-month layouts).                                                        |
| `renderPrevNextMonthDates` | `boolean`                                                                                                     | `true`                  | No       | When `false`, cells from the previous/next month are hidden.                                                                                                 |
| `renderDay`                | `(currentDate: moment.Moment, selectedDate: moment.Moment, defaultRender: () => JSX.Element) => JSX.Element`  | —                       | No       | Custom day-cell renderer. Call `defaultRender()` to fall back to the default rendering.                                                                      |
| `renderMonth`              | `(month: number, year: number, selectedDate: moment.Moment, defaultRender: () => JSX.Element) => JSX.Element` | —                       | No       | Custom month-cell renderer used in the months view.                                                                                                          |
| `isValidDate`              | `(currentDate: moment.Moment, selectedDate: moment.Moment) => boolean`                                        | —                       | No       | Return `true` to mark a date as selectable, `false` to disable it.                                                                                           |
| `rangeFocusOn`             | `RangeFocusOn`                                                                                                | `RangeFocusOn.start`    | No       | When using range `value`, determines whether the calendar highlights from the start or end anchor.                                                           |
| `locale`                   | `string`                                                                                                      | —                       | No       | Moment.js locale string (e.g. `"fr"`). The corresponding locale file must be imported separately.                                                            |
| `background`               | `'base' \| 'alt'`                                                                                             | —                       | No       | Override background context. Prefer using `BackgroundContext` or a layout `background` prop instead.                                                         |
| `calendarRef`              | `React.Ref<ReactDateTime>`                                                                                    | —                       | No       | Low-level ref to the underlying `react-datetime` instance. Prefer the forwarded `ref` (typed as `CalendarRef`) for navigation.                               |
| `wrapperProps`             | `FlexLayoutProps`                                                                                             | `{}`                    | No       | Props spread onto the outermost `FlexLayout` wrapper (e.g. `data-test-id`, `style`).                                                                         |
| `id`                       | `string`                                                                                                      | —                       | No       | Id applied to the root element. Falls back to an auto-generated id.                                                                                          |
| `className`                | `string`                                                                                                      | —                       | No       | Additional CSS class on the root element.                                                                                                                    |

### Forwarded Ref (`ref`)

`Calendar` is implemented with `React.forwardRef`. Pass a `React.RefObject<CalendarRef>` to get access to `focusOnDay`:

```tsx
const ref = React.useRef<CalendarRef>(null)
// Navigate programmatically after mount:
ref.current?.focusOnDay(moment('2024-06-15'))

<Calendar ref={ref} onChange={setDate} value={date} />
```

### TSX Examples

#### Basic static display (no selection)

```tsx
import { Calendar } from '@nutanix-ui/prism-reactjs'
;<Calendar />
```

#### Controlled date selection

```tsx
import React, { useState } from 'react'
import { Calendar } from '@nutanix-ui/prism-reactjs'

const MyCalendar = () => {
  const [value, setValue] = useState('2023-04-18')

  return (
    <Calendar
      dateFormat="YYYY-MM-DD"
      wrapperProps={{ 'data-test-id': 'with-date-event-selection' }}
      onChange={(newValue) => setValue(newValue)}
      value={value}
    />
  )
}
```

#### Initial view date

`initialViewDate` sets the displayed month/year on first render and takes precedence over `value` for the view. Pass a `moment` instance, a `Date`, or a formatted string.

```tsx
import { FlexLayout, Calendar } from '@nutanix-ui/prism-reactjs'
import moment from 'moment'
;<FlexLayout>
  <Calendar
    initialViewDate={moment('2021-01-01', 'YYYY-MM-DD')}
    value={moment('2021-01-15', 'YYYY-MM-DD')}
  />
  <Calendar
    initialViewDate={new Date(2021, 0, 1)}
    value={new Date(2021, 0, 15)}
  />
  <Calendar
    initialViewDate="01/01/2021"
    value="01/15/2021"
    dateFormat="MM/DD/YYYY"
  />
  <Calendar
    initialViewDate="01-01-2021"
    dateFormat="MM-DD-YYYY"
    value="01-15-2021"
  />
</FlexLayout>
```

#### Locale

Import the Moment.js locale file before rendering.

```tsx
import { Calendar } from '@nutanix-ui/prism-reactjs'
// import 'moment/locale/fr'
;<Calendar locale="fr" />
```

#### Borderless

```tsx
import { FlexLayout, Calendar } from '@nutanix-ui/prism-reactjs'
;<FlexLayout justifyContent="center" alignItems="center">
  <Calendar borderless={true} />
</FlexLayout>
```

#### Date range display

Pass `{ startDate, endDate }` as `value` to render a highlighted range. `rangeFocusOn` controls which anchor is treated as "selected".

```tsx
import { Calendar, RangeFocusOn } from '@nutanix-ui/prism-reactjs'
import moment from 'moment'
;<Calendar
  value={{
    startDate: moment('2021-02-12'),
    endDate: moment('2021-02-20'),
  }}
  rangeFocusOn={RangeFocusOn.start}
/>
```

Only `startDate` or only `endDate` can also be provided when the user is mid-selection.

#### Restricting selectable dates (`isValidDate`)

```tsx
import React, { useState } from 'react'
import { Calendar } from '@nutanix-ui/prism-reactjs'

const MyCalendar = () => {
  const [value, setValue] = useState('')

  const isSelectedDateValid = (currentDate) => {
    const day = currentDate.day()
    return day !== 0 && day !== 6 // disable weekends
  }

  return (
    <Calendar
      isValidDate={isSelectedDateValid}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  )
}
```

#### Custom day renderer (`renderDay`)

`renderDay` receives `(currentDate, selectedDate, defaultRender)`. Call `defaultRender()` to fall through to the default cell content.

```tsx
import { Calendar } from '@nutanix-ui/prism-reactjs'

const customRenderDay = (currentDate, selectedDate, defaultRender) => {
  const day = currentDate.day()
  if (day === 0 || day === 6) {
    return <span style={{ color: 'red' }}>{currentDate.date()}</span>
  }
  return defaultRender()
}

;<Calendar renderDay={customRenderDay} />
```

#### Multi-month layout with custom navigation

Use `disableNavigation`, `borderless`, and `renderPrevNextMonthDates={false}` together with externally managed `initialViewDate` keys to build a custom multi-month picker.

```tsx
import React, { useState } from 'react'
import {
  FlexLayout,
  StackingLayout,
  Link,
  Calendar,
} from '@nutanix-ui/prism-reactjs'
import moment from 'moment'

const My3MonthsCalendar = (props) => {
  const [viewDate, setViewDate] = useState(moment())

  const calendarProps = {
    disableNavigation: true,
    borderless: true,
    renderPrevNextMonthDates: false,
    ...props,
  }

  return (
    <StackingLayout>
      <FlexLayout>
        <Link
          onClick={() => setViewDate((prev) => prev.clone().add(-3, 'months'))}
        >
          Prev 3 Months
        </Link>
        <Link
          onClick={() => setViewDate((prev) => prev.clone().add(3, 'months'))}
        >
          Next 3 Months
        </Link>
      </FlexLayout>
      <FlexLayout itemSpacing="0px">
        <Calendar
          {...calendarProps}
          key={`month-1-${viewDate.format('YYYY-MM')}`}
          initialViewDate={viewDate}
        />
        <Calendar
          {...calendarProps}
          key={`month-2-${viewDate.clone().add(1, 'months').format('YYYY-MM')}`}
          initialViewDate={viewDate.clone().add(1, 'months')}
        />
        <Calendar
          {...calendarProps}
          key={`month-3-${viewDate.clone().add(2, 'months').format('YYYY-MM')}`}
          initialViewDate={viewDate.clone().add(2, 'months')}
        />
      </FlexLayout>
    </StackingLayout>
  )
}
```

> **Note:** Changing `initialViewDate` after mount does not navigate the calendar. Force a re-mount by changing the `key` prop (as shown above) or call `ref.current.focusOnDay(date)` via the forwarded ref.

### Keyboard Navigation

The calendar grid uses a roving `tabIndex` pattern. Focus moves into the grid on Tab, then within it using:

| Key                | Days view                                                   | Months view                                      |
| ------------------ | ----------------------------------------------------------- | ------------------------------------------------ |
| `ArrowUp`          | Move focus one row up; wraps to previous week               | Move focus one row up; wraps to previous year    |
| `ArrowDown`        | Move focus one row down; wraps to next week                 | Move focus one row down; wraps to next year      |
| `ArrowLeft`        | Move focus one cell left; wraps to previous day across rows | Move focus one cell left; wraps to previous year |
| `ArrowRight`       | Move focus one cell right; wraps to next day across rows    | Move focus one cell right; wraps to next year    |
| `Home`             | Move focus to first column in the current row               | Same                                             |
| `End`              | Move focus to last column in the current row                | Same                                             |
| `PageUp`           | Go back 1 month (same day)                                  | Go back 1 year                                   |
| `Shift + PageUp`   | Go back 1 year (same day)                                   | Go back 10 years                                 |
| `PageDown`         | Go forward 1 month (same day)                               | Go forward 1 year                                |
| `Shift + PageDown` | Go forward 1 year (same day)                                | Go forward 10 years                              |
| `Enter` / `Space`  | Select focused date                                         | Select focused month / switch to days view       |

The calendar header is excluded from arrow-key navigation; arrow keys pressed while the header buttons are focused are prevented from scrolling the page.

### Accessibility

- The grid renders as `role="grid"` with `aria-labelledby` pointing to the current month/year header.
- Each day cell renders as `role="gridcell"` with `aria-selected`, `aria-disabled`, and `aria-current="date"` (for today).
- Day-of-week column headers use `scope="col"` and `aria-label` with the full weekday name.
- The header label announces month/year changes via `aria-live="polite"`.

### Anti-patterns

- Use `DatePicker` for input-triggered calendar; use `Calendar` for always-visible calendar.
- Do **not** pass `YEARS` as `initialViewMode` — the `YEARS` view is used internally by the navigation header only.
- Avoid the `background` prop directly on `<Calendar>`; prefer wrapping in a `<FlexLayout background="alt">` or providing a `BackgroundContext` so the calendar adapts automatically.
- Do not use `Calendar.VIEW_MODE` — it is deprecated. Use `Calendar.ViewMode` instead.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Calendar } from '@nutanix-ui/prism-reactjs'
// For range selection focus control:
import { Calendar, RangeFocusOn } from '@nutanix-ui/prism-reactjs'
// For the ref type:
import type { CalendarRef } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `CalendarViewMode`

Accessed via `Calendar.ViewMode` (preferred) or the named export `CalendarViewMode`.
`Calendar.VIEW_MODE` is a **deprecated** alias.

- `DAYS` = `"days"`
- `MONTHS` = `"months"`
- `YEARS` = `"years"` (internal; not valid for `initialViewMode`)

#### `RangeFocusOn`

Numeric enum. Import as a named export.

- `start` = `0`
- `end` = `1`

### Props Interfaces

#### `CalendarProps`

Extends: `Omit<ReactDateTime.DatetimepickerProps, 'value' | 'onChange'>`

| Prop                       | Type                                                                                                          | Default                 | Description                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `wrapperProps`             | `FlexLayoutProps`                                                                                             | `{}`                    | Props spread onto the outermost `FlexLayout` wrapper.                                                         |
| `id`                       | `string`                                                                                                      | auto-generated          | Id of the calendar root element.                                                                              |
| `className`                | `string`                                                                                                      | —                       | Additional CSS class on the root element.                                                                     |
| `value`                    | `moment.Moment \| Date \| string \| { startDate?: moment.Moment; endDate?: moment.Moment }`                   | `''`                    | Controlled selected date. Parsed by Moment.js. Pass `{ startDate, endDate }` for range display.               |
| `initialViewDate`          | `moment.Moment \| Date \| string`                                                                             | —                       | Initial displayed date. Takes precedence over `value` for the view position. Only applies at mount.           |
| `onChange`                 | `(selectedDate: moment.Moment) => void`                                                                       | —                       | Enables date selection. Without this prop the calendar is display-only.                                       |
| `initialViewMode`          | `CalendarViewMode.MONTHS \| CalendarViewMode.DAYS`                                                            | `CalendarViewMode.DAYS` | Starting view mode. Only `DAYS` and `MONTHS` are accepted.                                                    |
| `dateFormat`               | `string`                                                                                                      | locale `L` format       | Moment.js [format string](https://momentjs.com/docs/#/displaying/format/).                                    |
| `borderless`               | `boolean`                                                                                                     | `false`                 | Removes the outer border; useful on darker backgrounds.                                                       |
| `disableNavigation`        | `boolean`                                                                                                     | `false`                 | Hides the built-in prev/next navigation buttons.                                                              |
| `renderPrevNextMonthDates` | `boolean`                                                                                                     | `true`                  | When `false`, cells from adjacent months are not rendered.                                                    |
| `renderDay`                | `(currentDate: moment.Moment, selectedDate: moment.Moment, defaultRender: () => JSX.Element) => JSX.Element`  | —                       | Custom day-cell renderer. Signature: `renderDay(currentDate, selectedDate, defaultRender)`.                   |
| `renderMonth`              | `(month: number, year: number, selectedDate: moment.Moment, defaultRender: () => JSX.Element) => JSX.Element` | —                       | Custom month-cell renderer (months view). Signature: `renderMonth(month, year, selectedDate, defaultRender)`. |
| `isValidDate`              | `(currentDate: moment.Moment, selectedDate: moment.Moment) => boolean`                                        | —                       | Return `true` to allow selection of a date. `isValidDate(currentDate, selectedDate)`.                         |
| `calendarRef`              | `React.Ref<ReactDateTime>`                                                                                    | —                       | Low-level ref to the underlying `react-datetime` instance. Prefer the forwarded `ref` typed as `CalendarRef`. |
| `locale`                   | `string`                                                                                                      | —                       | Moment.js locale string. The locale file must be imported separately (e.g. `import 'moment/locale/fr'`).      |
| `background`               | `'base' \| 'alt'`                                                                                             | —                       | Explicit background override. Prefer `BackgroundContext` or layout `background` prop.                         |
| `rangeFocusOn`             | `RangeFocusOn`                                                                                                | `RangeFocusOn.start`    | For range `value`, whether the calendar anchors selection on `start` or `end`.                                |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Using props.onChange and props.value to control date selection.

```tsx
const MyCalendar = () => {
  const [value, setValue] = useState('2023-04-18')

  const handleOnChange = (newValue) => {
    setValue(newValue)
  }

  return (
    <Calendar
      dateFormat="YYYY-MM-DD"
      wrapperProps={{ 'data-test-id': 'with-date-event-selection' }}
      onChange={handleOnChange}
      value={value}
    />
  )
}

;<MyCalendar />
```

#### To show the calendar at a particular date (initialViewDate) and select a particular date (value).

Note: if both `initialViewDate` and `value` are assigned, `initialViewDate` takes precedence for the initial rendered view. `initialViewDate` is only for initial render; use `calendarRef.current.focusOnDay` to navigate after mount.

```tsx
<FlexLayout>
  <Calendar
    initialViewDate={moment('2021-01-01', 'YYYY-MM-DD')}
    value={moment('2021-01-15', 'YYYY-MM-DD')}
  />
  <Calendar
    initialViewDate={new Date(2021, 0, 1)}
    value={new Date(2021, 0, 15)}
  />
  <Calendar
    initialViewDate="01/01/2021"
    value="01/15/2021"
    dateFormat="MM/DD/YYYY"
  />
  <Calendar
    initialViewDate="01-01-2021"
    dateFormat="MM-DD-YYYY"
    value="01-15-2021"
  />
</FlexLayout>
```

#### Setting locale. You must import the proper moment locale file.

```tsx
// import 'moment/locale/fr';

<Calendar locale="fr" />
```

#### Customize rendering of the day cell using props.renderDay. Here Sat/Sun are styled red.

It is up to the application to style the cell properly.

```tsx
const customRenderDay = (currentDate, selectedDate, defaultRender) => {
  const day = currentDate.day()
  if (day === 0 || day === 6) {
    return <span style={{ color: 'red' }}>{currentDate.date()}</span>
  }
  return defaultRender()
}

;<Calendar renderDay={customRenderDay} />
```

#### Control which dates are selectable using props.isValidDate. Here weekends can't be selected.

```tsx
const MyCalendar = () => {
  const [value, setValue] = useState('')

  const isSelectedDateValid = (currentDate, selectedDate) => {
    const day = currentDate.day()
    return day !== 0 && day !== 6
  }

  return (
    <Calendar
      isValidDate={isSelectedDateValid}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  )
}

;<MyCalendar />
```

#### Disable header navigation and show only days belonging to the given month — 3-month custom navigation.

```tsx
import React, { useState } from 'react'
import {
  FlexLayout,
  StackingLayout,
  Link,
  Calendar,
} from '@nutanix-ui/prism-reactjs'
import moment from 'moment'

const My3MonthsCalendar = (props) => {
  const [viewDate, setViewDate] = useState(moment())

  const handleNext = () => {
    setViewDate((prev) => prev.clone().add(3, 'months'))
  }

  const handlePrev = () => {
    setViewDate((prev) => prev.clone().add(-3, 'months'))
  }

  const calendarProps = {
    disableNavigation: true,
    borderless: true,
    renderPrevNextMonthDates: false,
    ...props,
  }

  return (
    <StackingLayout>
      <FlexLayout>
        <Link onClick={handlePrev}>Prev 3 Months</Link>
        <Link onClick={handleNext}>Next 3 Months</Link>
      </FlexLayout>
      <FlexLayout itemSpacing="0px">
        <Calendar
          {...calendarProps}
          key={`month-1-${viewDate.format('YYYY-MM')}`}
          initialViewDate={viewDate}
        />
        <Calendar
          {...calendarProps}
          key={`month-2-${viewDate.clone().add(1, 'months').format('YYYY-MM')}`}
          initialViewDate={viewDate.clone().add(1, 'months')}
        />
        <Calendar
          {...calendarProps}
          key={`month-3-${viewDate.clone().add(2, 'months').format('YYYY-MM')}`}
          initialViewDate={viewDate.clone().add(2, 'months')}
        />
      </FlexLayout>
    </StackingLayout>
  )
}

;<My3MonthsCalendar />
```

#### Range selection display.

The Calendar can display range highlights; for interactive range selection see `DatePicker`.

```tsx
import { Calendar } from '@nutanix-ui/prism-reactjs'
import moment from 'moment'
;<div>
  <Calendar
    wrapperProps={{ 'data-test-id': 'selected-range' }}
    value={{
      startDate: moment('2021-02-12'),
      endDate: moment('2021-02-20'),
    }}
  />
  <Calendar value={{ startDate: moment('2021-02-12') }} />
  <Calendar value={{ endDate: moment('2021-02-20') }} />
</div>
```

### Usage Notes

- Prefer `Calendar.ViewMode.<VALUE>` over raw strings when specifying `initialViewMode`.
- `Calendar` is always-visible; use `DatePicker` / `FormItemDatePicker` for input-triggered pickers.
- When building a multi-month layout, force re-mount via `key` changes rather than relying on `initialViewDate` updates after mount.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.

<!-- SOURCE-API-END -->
