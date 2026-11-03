# DatePicker

## Figma

- **Library name:** Date Picker (page: N/A, frame: Date Picker)

## React

Import: `import { DatePicker } from '@nutanix-ui/prism-reactjs'`

### Figma Form Field Composition

In Figma, a Date Picker / Time Picker with Label Top / Label Bottom is a single component. In React, use `FormItemDatePicker` or `FormItemTimePicker`.

**Preferred: use `FormItemDatePicker` / `FormItemTimePicker`**:

```tsx
import { FormItemDatePicker, FormItemTimePicker } from '@nutanix-ui/prism-reactjs'

<FormItemDatePicker
  id="start-date"
  label="Start Date"                       // -> Figma Label Top
  helpText={errors.startDate}              // -> Figma Label Bottom
  error={!!errors.startDate}
  value={startDate}
  onChange={(date) => setStartDate(date)}
  oldDatePicker={false}
  dateFormat="YYYY-MM-DD"
/>

<FormItemTimePicker
  id="start-time"
  label="Start Time"
  value={startTime}
  onChange={(time) => setStartTime(time)}
/>
```

**Manual approach**:

```tsx
<StackingLayout itemGap="XS">
  <TextLabel id="start-label">Start Date</TextLabel>
  <DatePicker
    oldDatePicker={false}
    value={startDate}
    onChange={(date) => setStartDate(date)}
    dateFormat="YYYY-MM-DD"
    aria-labelledby="start-label"
  />
  {errors.startDate && (
    <TextLabel id="start-error" type={TextLabel.TextLabelType.ERROR}>
      {errors.startDate}
    </TextLabel>
  )}
</StackingLayout>
```

See `input.md` for the full Label Bottom Type -> React mapping table and `FormItemProvider` props reference.

### TSX Examples

```tsx
{
  /* Basic date picker (no label -- standalone use only) */
}
;<DatePicker
  oldDatePicker={false}
  value={startDate}
  onChange={(date) => setStartDate(date)}
  dateFormat="YYYY-MM-DD"
/>
```

### Anti-patterns

- Don't use `<input type="date">` -- use `DatePicker`
- Don't create custom calendar pickers -- use `Calendar` for inline calendars
- Don't render bare `DatePicker` when Figma shows Label Top or Label Bottom -- use `FormItemDatePicker`
- Always set `oldDatePicker={false}` for new code; the default is `true` (legacy mode) and will be removed in a future version

<!-- SOURCE-API-START -->

### Import

```tsx
import { DatePicker } from '@nutanix-ui/prism-reactjs'
import { DatePickerMini } from '@nutanix-ui/prism-reactjs'
import { FormItemDatePicker } from '@nutanix-ui/prism-reactjs'
import { Calendar } from '@nutanix-ui/prism-reactjs'
```

---

### Component: `DatePicker`

Top-level component that automatically delegates to `DateSelect` (single date) or `RangeSelect` (date range) based on the shape of `value` / `defaultValue`.

#### `DatePickerProps`

Extends: `Omit<DateSelectProps, 'value' | 'defaultValue' | 'onChange'>` & `Omit<RangeSelectProps, 'value' | 'defaultValue' | 'onChange'>` plus the three overridden props below.

| Prop            | Type                                                            | Default | Required | Description                                                                                                                                |
| --------------- | --------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `value`         | `DateType \| RangeDates`                                        | —       | No       | Controlled value. Single date: `string \| Date \| moment.Moment`. Range: `{ startDate?: DateType, endDate?: DateType }`.                   |
| `defaultValue`  | `DateType \| RangeDates`                                        | —       | No       | Uncontrolled initial value. Same shapes as `value`.                                                                                        |
| `onChange`      | `(selectedDate: string \| moment.Moment \| RangeDates) => void` | —       | No       | Called on every date selection. Receives `moment.Moment` when valid, plain `string` when the typed value is an invalid date.               |
| `oldDatePicker` | `boolean`                                                       | `true`  | No       | Set to `false` to use the v2.7+ implementation. **Always set `false` for new code.** The old implementation is deprecated and unsupported. |

All props from `DateSelectProps` and `RangeSelectProps` (documented below) are also accepted and forwarded.

---

### Shared Props: `DatePickerCommonProps`

These props are available on both `DatePicker` (single), `DatePicker` (range), `FormItemDatePicker`, and `DatePickerMini`.

| Prop                   | Type                                              | Default    | Required | Description                                                                                                                                |
| ---------------------- | ------------------------------------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                   | `string`                                          | —          | No       | Unique id applied to the root wrapper and used to build internal element IDs.                                                              |
| `className`            | `string`                                          | —          | No       | Additional CSS class on the root element.                                                                                                  |
| `dateFormat`           | `string`                                          | locale `L` | No       | Moment.js [format string](https://momentjs.com/docs/#/displaying/format/) for display and `string` value parsing.                          |
| `initialViewDate`      | `DateType`                                        | —          | No       | Date the calendar navigates to when the dropdown opens (does not select a date). `DateType = string \| Date \| moment.Moment`.             |
| `closeOnSelect`        | `boolean`                                         | `false`    | No       | Close the calendar dropdown immediately after a date is selected.                                                                          |
| `readOnly`             | `boolean`                                         | `false`    | No       | Makes the input read-only; the calendar popup cannot be opened.                                                                            |
| `disabled`             | `boolean`                                         | `false`    | No       | Fully disables interaction with the picker.                                                                                                |
| `locale`               | `string`                                          | —          | No       | Moment.js locale string (e.g. `"de"`). The corresponding `moment/locale/<code>` must be imported by the application first.                 |
| `strictParsing`        | `boolean`                                         | —          | No       | Pass `true` to enable strict Moment.js format matching when parsing string values.                                                         |
| `error`                | `boolean`                                         | `false`    | No       | Highlights the input in error styling (red border).                                                                                        |
| `errorType`            | `ErrorType`                                       | —          | No       | `ErrorType.WARNING` (`"warning"`) or `ErrorType.CRITICAL` (`"critical"`). Import: `import { ErrorType } from '@nutanix-ui/prism-reactjs'`. |
| `onBlur`               | `(e: React.FocusEvent<HTMLInputElement>) => void` | —          | No       | Called when focus leaves the component entirely.                                                                                           |
| `onFocus`              | `(e: React.FocusEvent<HTMLInputElement>) => void` | —          | No       | Called when focus enters the component from outside.                                                                                       |
| `focusDateOnPopupOpen` | `boolean`                                         | `true`     | No       | When `true`, keyboard focus is moved onto the calendar grid as soon as the dropdown opens.                                                 |
| `popupProviderProps`   | `Omit<PopupProviderProps, 'children'>`            | `{}`       | No       | Props forwarded to the `PopupProvider`/`Popover` wrapper (see table below).                                                                |
| `wrapperProps`         | `React.HTMLAttributes<HTMLDivElement>`            | —          | No       | Props forwarded to the outermost `<div>` of the component.                                                                                 |
| `background`           | `'base' \| 'alt'`                                 | —          | No       | Override the calendar background colour. Normally inferred from `BackgroundContext`.                                                       |
| `data-test`            | `string`                                          | —          | No       | Sets both `data-test` and `data-test-id` on the wrapper; appends `-dropdown` / `-calendar-popover` suffixes on internal elements.          |
| `aria-describedby`     | `string`                                          | —          | No       | Additional ARIA description IDs appended to the internal `aria-describedby` (which already includes a hidden date-format hint element).    |
| **Deprecated**         |                                                   |            |          |                                                                                                                                            |
| `defaultViewDate`      | `DateType`                                        | —          | No       | **Deprecated.** Use `initialViewDate` instead.                                                                                             |
| `placeholder`          | `string`                                          | —          | No       | **Deprecated.** Use `inputProps.placeholder` instead.                                                                                      |
| `popupClassName`       | `string`                                          | —          | No       | **Deprecated.** Use `popupProviderProps.popupClassName` instead.                                                                           |
| `getPopupContainer`    | `() => HTMLElement`                               | —          | No       | **Deprecated.** Use `popupProviderProps.getPopupContainer` instead.                                                                        |
| `input`                | `boolean`                                         | —          | No       | **Deprecated.** Use `inputProps.readOnly` instead.                                                                                         |
| `open`                 | `boolean`                                         | —          | No       | **Deprecated.** Use `popupProviderProps.popupVisible` instead.                                                                             |

#### `popupProviderProps` Shape (commonly used keys)

| Key                    | Type                           | Description                                                                                                                                                              |
| ---------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `popupClassName`       | `string`                       | Extra CSS class on the calendar popup element.                                                                                                                           |
| `getPopupContainer`    | `() => HTMLElement`            | Returns the DOM node the popup should mount into.                                                                                                                        |
| `popupPlacement`       | `string`                       | One of `'bottomLeft' \| 'bottom' \| 'bottomRight' \| 'topLeft' \| 'top' \| 'topRight' \| 'leftTop' \| 'left' \| 'leftBottom' \| 'rightTop' \| 'right' \| 'rightBottom'`. |
| `popupVisible`         | `boolean`                      | Fully controlled open/close state.                                                                                                                                       |
| `onPopupVisibleChange` | `(visible: boolean) => void`   | Called when the popup opens or closes.                                                                                                                                   |
| `action`               | `'click' \| 'hover' \| 'none'` | What triggers the popup (default: controlled via focus/click internally).                                                                                                |

---

### Single-Date Props: `DateSelectProps`

Extends `DatePickerCommonProps` plus the following:

| Prop             | Type                                                                    | Default                   | Required | Description                                                                                                                             |
| ---------------- | ----------------------------------------------------------------------- | ------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `value`          | `DateType`                                                              | —                         | No       | Controlled single date (`string \| Date \| moment.Moment`).                                                                             |
| `defaultValue`   | `DateType`                                                              | —                         | No       | Uncontrolled initial single date.                                                                                                       |
| `onChange`       | `(selectedDate: string \| moment.Moment) => void`                       | —                         | No       | Called on selection. `string` when typed value is invalid; `moment.Moment` when valid.                                                  |
| `inputProps`     | `Omit<InputProps, 'prefix'>`                                            | `{}`                      | No       | Props passed to the internal `Input` component. Useful keys: `placeholder`, `readOnly`, `inputRef`, `'aria-label'`, `name`, `onChange`. |
| `name`           | `string`                                                                | —                         | No       | `name` attribute for the underlying `<input>`.                                                                                          |
| `type`           | `'normal' \| 'mini'`                                                    | `'normal'`                | No       | `'mini'` is used internally by `DatePickerMini`; use `'normal'` for all standard date pickers.                                          |
| `dateFormatter`  | `(date: moment.Moment, dateFormat?, strictParsing?, locale?) => string` | —                         | No       | Custom formatter for the trigger label text (mini variant only).                                                                        |
| `InputComponent` | `React.ComponentType`                                                   | `Input`                   | No       | Custom input component (mini variant only; used internally by `DatePickerMini`).                                                        |
| `popoverProps`   | `PopoverProps`                                                          | `{ popupVisible: false }` | No       | Props passed to the `Popover` wrapper (mini variant only).                                                                              |

---

### Range-Date Props: `RangeSelectProps`

Extends `DatePickerCommonProps` plus the following. The range picker renders when `value` or `defaultValue` is an object with `startDate`/`endDate`.

| Prop                  | Type                                 | Default | Required | Description                                                                                   |
| --------------------- | ------------------------------------ | ------- | -------- | --------------------------------------------------------------------------------------------- |
| `value`               | `RangeDates`                         | —       | No       | Controlled range value: `{ startDate?: DateType, endDate?: DateType }`.                       |
| `defaultValue`        | `RangeDates`                         | —       | No       | Uncontrolled initial range. Pass `{}` for empty range.                                        |
| `onChange`            | `(selectedDate: RangeDates) => void` | —       | No       | Called after each date selection in the range.                                                |
| `startDateInputProps` | `TextInputProps`                     | `{}`    | No       | Props for the start-date `TextInput`. Useful keys: `placeholder`, `inputRef`, `'aria-label'`. |
| `endDateInputProps`   | `TextInputProps`                     | `{}`    | No       | Props for the end-date `TextInput`. Useful keys: `placeholder`, `inputRef`, `'aria-label'`.   |

> **Range selection behaviour:** The component tracks which input has focus to know whether to update `startDate` or `endDate`. Selecting a start date after the end date clears the end date, and vice-versa. The range is auto-swapped if `startDate > endDate` on controlled update.

---

### Component: `DatePickerMini`

A compact date picker with a `Button` or `Link` trigger (no text input box). Delegates to `DateSelect` with `type="mini"`.

```tsx
import { DatePickerMini } from '@nutanix-ui/prism-reactjs'
```

#### `DatePickerMiniProps`

Extends most of `DatePickerProps` (excluding `onChange`, which is typed to `CalendarProps['onChange']`).

| Prop              | Type                                                                    | Default         | Required | Description                                                                    |
| ----------------- | ----------------------------------------------------------------------- | --------------- | -------- | ------------------------------------------------------------------------------ |
| `trigger`         | `'button' \| 'link'`                                                    | `'link'`        | Yes      | Use `'button'` for new code — `'link'` triggers an a11y warning since v2.24.0. |
| `placeholder`     | `string`                                                                | `'Select Date'` | No       | Text shown in the trigger when no date is selected.                            |
| `onChange`        | `(selectedDate: moment.Moment) => void`                                 | —               | No       | Called with a `moment.Moment` on each selection.                               |
| `value`           | `DateType`                                                              | —               | No       | Controlled single date.                                                        |
| `defaultValue`    | `DateType`                                                              | —               | No       | Uncontrolled initial date.                                                     |
| `dateFormatter`   | `(date: moment.Moment, dateFormat?, strictParsing?, locale?) => string` | locale format   | No       | Custom formatter for the trigger label.                                        |
| `buttonProps`     | `Omit<LinkProps, 'children'>`                                           | —               | No       | Props forwarded to the `Button` trigger (`trigger="button"`).                  |
| `linkProps`       | `Omit<LinkProps, 'children'>`                                           | `{}`            | No       | **Deprecated.** Props for the `Link` trigger (`trigger="link"`).               |
| `popoverProps`    | `PopoverProps`                                                          | —               | No       | Passed to the internal `Popover`.                                              |
| `popupOffset`     | `{ x?: string, y?: string }`                                            | —               | No       | CSS offset for the popup container.                                            |
| `calendarProps`   | `CalendarProps`                                                         | `{}`            | No       | Props forwarded to the `Calendar` inside the popup.                            |
| `disable`         | `boolean`                                                               | —               | No       | Alias for `disabled` (sets disabled styling).                                  |
| `closeOnSelect`   | `boolean`                                                               | `false`         | No       | Close the popup after a date is selected.                                      |
| `dateFormat`      | `string`                                                                | —               | No       | Moment format string.                                                          |
| `locale`          | `string`                                                                | —               | No       | Moment locale string.                                                          |
| `strictParsing`   | `boolean`                                                               | —               | No       | Strict Moment format matching.                                                 |
| `initialViewDate` | `DateType`                                                              | —               | No       | Calendar view date when the popup first opens.                                 |
| `background`      | `'base' \| 'alt'`                                                       | —               | No       | Calendar background override.                                                  |
| `readOnly`        | `boolean`                                                               | —               | No       | Read-only; hides the `TriangleUpDownIcon` arrow.                               |

---

### Component: `FormItemDatePicker`

Wraps `DatePicker` with `FormItemProvider` to add a `label`, `helpText`, and validation.

```tsx
import { FormItemDatePicker } from '@nutanix-ui/prism-reactjs'
```

#### `FormItemDatePickerProps`

Extends `DatePickerProps` + `FormItemProviderProps`.

| Prop         | Type                   | Default | Required | Description                                                                                              |
| ------------ | ---------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `id`         | `string`               | —       | **Yes**  | Unique id; used as the `<input>` id and for label association.                                           |
| `label`      | `React.ReactNode`      | —       | No       | Label displayed above the input (Label Top).                                                             |
| `helpText`   | `React.ReactNode`      | —       | No       | Text below the input (Label Bottom). Shown in error colour when `error={true}`.                          |
| `error`      | `boolean`              | —       | No       | Error state; highlights input and colours `helpText`.                                                    |
| `formHelper` | `DatePickerFormHelper` | —       | No       | Validation helper object injected by `<Form>`; overrides `error`, `helpText`, and `value` when provided. |

All `DatePickerProps` (including `oldDatePicker`, `onChange`, `value`, `dateFormat`, `isValidDate`, etc.) are also accepted.

---

### Component: `Calendar`

Inline calendar (no input / popup). Used inside `DatePicker`; can also be rendered standalone.

```tsx
import { Calendar } from '@nutanix-ui/prism-reactjs'
```

#### Enums

```tsx
import { Calendar } from '@nutanix-ui/prism-reactjs'

Calendar.ViewMode.DAYS // 'days'
Calendar.ViewMode.MONTHS // 'months'
Calendar.ViewMode.YEARS // 'years'  (view only; not selectable)

// Deprecated alias:
Calendar.VIEW_MODE.DAYS
```

#### `CalendarProps`

| Prop                       | Type                                                                                                         | Default                 | Required | Description                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `value`                    | `moment.Moment \| Date \| string \| { startDate?: moment.Moment, endDate?: moment.Moment }`                  | `''`                    | No       | Selected date or range. When an object with `startDate`/`endDate` is passed, range-selection highlighting is enabled. |
| `onChange`                 | `(selectedDate: moment.Moment) => void`                                                                      | —                       | No       | Called when a day is clicked. **Without this prop the calendar is non-selectable (display-only).**                    |
| `initialViewDate`          | `moment.Moment \| Date \| string`                                                                            | —                       | No       | Sets the month/year visible when the calendar first mounts.                                                           |
| `initialViewMode`          | `CalendarViewMode.DAYS \| CalendarViewMode.MONTHS`                                                           | `CalendarViewMode.DAYS` | No       | Which view is shown first.                                                                                            |
| `dateFormat`               | `string`                                                                                                     | locale `L`              | No       | Moment format for parsing string `value`.                                                                             |
| `id`                       | `string`                                                                                                     | —                       | No       | ID of the calendar root element.                                                                                      |
| `className`                | `string`                                                                                                     | —                       | No       | Additional CSS class.                                                                                                 |
| `wrapperProps`             | `FlexLayoutProps`                                                                                            | `{}`                    | No       | Props on the `FlexLayout` root wrapper.                                                                               |
| `borderless`               | `boolean`                                                                                                    | `false`                 | No       | Removes the border; useful on darker backgrounds.                                                                     |
| `disableNavigation`        | `boolean`                                                                                                    | `false`                 | No       | Hides prev/next navigation arrows.                                                                                    |
| `renderPrevNextMonthDates` | `boolean`                                                                                                    | `true`                  | No       | When `false`, cells outside the current month are hidden.                                                             |
| `isValidDate`              | `(currentDate: moment.Moment, selectedDate: moment.Moment) => boolean`                                       | —                       | No       | Return `false` to disable a day cell (prevents selection).                                                            |
| `renderDay`                | `(currentDate: moment.Moment, selectedDate: moment.Moment, defaultRender: () => JSX.Element) => JSX.Element` | —                       | No       | Custom renderer for each day cell.                                                                                    |
| `locale`                   | `string`                                                                                                     | —                       | No       | Moment locale string.                                                                                                 |
| `background`               | `'base' \| 'alt'`                                                                                            | —                       | No       | Colour theme for the calendar. Normally inferred from `BackgroundContext`.                                            |
| `rangeFocusOn`             | `RangeFocusOn`                                                                                               | `RangeFocusOn.start`    | No       | Used internally by `RangeSelect` to indicate which end of the range is active.                                        |
| `calendarRef`              | `React.Ref<ReactDateTime>`                                                                                   | —                       | No       | Ref to the underlying `react-datetime` instance for imperative navigation.                                            |

#### `CalendarRef` (via `React.forwardRef`)

```tsx
type CalendarRef = {
  focusOnDay: (date: moment.Moment, ignoreView?: boolean) => void
}
```

---

### Enums and Types

```tsx
// ErrorType — imported from Input
import { ErrorType } from '@nutanix-ui/prism-reactjs'
// ErrorType.WARNING  = 'warning'
// ErrorType.CRITICAL = 'critical'

// CalendarViewMode — accessible as Calendar.ViewMode
import { Calendar } from '@nutanix-ui/prism-reactjs'
// Calendar.ViewMode.DAYS   = 'days'
// Calendar.ViewMode.MONTHS = 'months'
// Calendar.ViewMode.YEARS  = 'years'

// RangeDates type
type RangeDates = {
  startDate?: string | Date | moment.Moment
  endDate?: string | Date | moment.Moment
}

// DateType
type DateType = string | Date | moment.Moment
```

---

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic Example

```tsx
import { DatePicker } from '@nutanix-ui/prism-reactjs'
;<DatePicker
  oldDatePicker={false}
  popupProviderProps={{
    popupClassName: 'my-datepicker',
    getPopupContainer: () => document.querySelector('.right-panel'),
  }}
  inputProps={{ name: 'basic-usage' }}
  onChange={(selectedDate) => console.log(selectedDate)}
  data-test="default"
/>
```

#### Custom Width and Calendar Placement

```tsx
import { useState } from 'react'
import moment from 'moment'
import {
  DatePicker,
  StackingLayout,
  FlexLayout,
  FlexItem,
  InputNumber,
  FormItemSelect,
} from '@nutanix-ui/prism-reactjs'

const calendarPlacementOptions = [
  'leftTop',
  'left',
  'leftBottom',
  'topLeft',
  'top',
  'topRight',
  'rightTop',
  'right',
  'rightBottom',
  'bottomLeft',
  'bottom',
  'bottomRight',
]

const rowsData = calendarPlacementOptions.map((item, idx) => ({
  key: idx,
  label: item,
  value: item,
}))

const Example = () => {
  const [width, setWidth] = useState(300)
  const [popupPlacement, setPopupPlacement] = useState(
    rowsData.find((r) => r.value === 'topRight'),
  )

  return (
    <StackingLayout>
      <FlexLayout flexDirection="row">
        <FlexItem>
          <FormItemSelect
            id="calendar-position"
            rowsData={rowsData}
            onSelectedChange={setPopupPlacement}
            selectedRow={popupPlacement}
            label="Calendar Position"
            getPopupContainer={() => document.querySelector('.right-panel')}
          />
        </FlexItem>
        <FlexItem>
          <InputNumber
            id="calendar-width"
            step={10}
            onValueChange={setWidth}
            label="Width (px)"
            defaultValue={width}
          />
        </FlexItem>
      </FlexLayout>
      <DatePicker
        oldDatePicker={false}
        popupProviderProps={{
          getPopupContainer: () => document.querySelector('.right-panel'),
          popupPlacement: popupPlacement.value,
        }}
        inputProps={{ name: 'date-picker-custom-width' }}
        onChange={(selectedDate) => console.log(selectedDate)}
        wrapperProps={{ style: { width: `${width}px` } }}
        data-test="custom-width-and-calendar-placement"
      />
      <DatePicker
        oldDatePicker={false}
        defaultValue={{
          startDate: moment('2021-01-01'),
          endDate: moment('2021-01-15'),
        }}
        popupProviderProps={{
          getPopupContainer: () => document.querySelector('.right-panel'),
          popupPlacement: popupPlacement.value,
        }}
        wrapperProps={{ style: { width: `${width}px` } }}
        onChange={(selectedDate) => console.log(selectedDate)}
      />
    </StackingLayout>
  )
}
```

#### closeOnSelect and Open on Hover

```tsx
import { DatePicker, StackingLayout } from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  {/* Close calendar immediately after selection */}
  <DatePicker
    name="datepicker-with-closeOnSelect"
    closeOnSelect={true}
    oldDatePicker={false}
    popupProviderProps={{
      getPopupContainer: () => document.querySelector('.right-panel'),
    }}
  />

  {/* Open on hover — avoid for a11y reasons */}
  <DatePicker
    name="datepicker-with-open-on-hover"
    oldDatePicker={false}
    popupProviderProps={{
      getPopupContainer: () => document.querySelector('.right-panel'),
      action: 'hover',
    }}
  />
</StackingLayout>
```

#### Range Selection (uncontrolled)

```tsx
import { DatePicker } from '@nutanix-ui/prism-reactjs'
import moment from 'moment'
;<DatePicker
  name="datepicker-with-range"
  oldDatePicker={false}
  defaultValue={{
    startDate: moment('2021-01-01'),
    endDate: moment('2021-01-15'),
  }}
  popupProviderProps={{
    popupClassName: 'my-datepicker',
    getPopupContainer: () => document.querySelector('.right-panel'),
  }}
  onChange={(selectedDate) => console.log(selectedDate)}
/>
```

#### Range Selection (controlled) with Custom Input Placeholders

```tsx
import React, { useState } from 'react'
import { DatePicker } from '@nutanix-ui/prism-reactjs'

const Example = () => {
  const [value, setValue] = useState({})

  return (
    <DatePicker
      name="datepicker-controlled-range"
      oldDatePicker={false}
      value={value}
      startDateInputProps={{ placeholder: 'Start Date' }}
      endDateInputProps={{ placeholder: 'End Date' }}
      popupProviderProps={{
        getPopupContainer: () => document.querySelector('.right-panel'),
      }}
      onChange={(newRange) => setValue(newRange)}
    />
  )
}
```

#### initialViewDate and defaultValue

```tsx
import {
  DatePicker,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'
import moment from 'moment'
;<StackingLayout>
  <Paragraph>Display Jan 2020 calendar on initial render.</Paragraph>
  <DatePicker
    oldDatePicker={false}
    name="datepicker-with-initial-date"
    initialViewDate={moment('2020-01-01')}
    inputProps={{ placeholder: 'Select date' }}
    popupProviderProps={{
      getPopupContainer: () => document.querySelector('.right-panel'),
    }}
    onChange={(d) => console.log(d)}
  />
  <Paragraph>Pre-select a date.</Paragraph>
  <DatePicker
    oldDatePicker={false}
    defaultValue={moment('2020-01-01')}
    popupProviderProps={{
      getPopupContainer: () => document.querySelector('.right-panel'),
    }}
    onChange={(d) => console.log(d)}
  />
</StackingLayout>
```

#### Blocking Specific Dates (isValidDate)

```tsx
import { FormItemDatePicker } from '@nutanix-ui/prism-reactjs'
import moment from 'moment'

{
  /* Weekdays only */
}
;<FormItemDatePicker
  id="work-day-picker"
  label="Work day picker"
  oldDatePicker={false}
  isValidDate={(currentDate) =>
    currentDate.isoWeekday() !== 6 && currentDate.isoWeekday() !== 7
  }
/>

{
  /* Future dates only (range picker) */
}
;<FormItemDatePicker
  id="future-range-picker"
  label="Date in future range picker"
  defaultValue={{}}
  oldDatePicker={false}
  isValidDate={(currentDate) => currentDate.diff(moment().startOf('day')) >= 0}
/>
```

#### Custom Date Format

```tsx
import { DatePicker } from '@nutanix-ui/prism-reactjs'
;<DatePicker
  oldDatePicker={false}
  dateFormat="YYYY-MM-DD"
  defaultValue={new Date()}
  inputProps={{ placeholder: 'Select date' }}
  name="datepicker-with-custom-format"
  popupProviderProps={{
    getPopupContainer: () => document.querySelector('.right-panel'),
  }}
  onChange={(d) => console.log(d)}
/>
```

#### Read-only

```tsx
import { DatePicker, StackingLayout } from '@nutanix-ui/prism-reactjs'
import moment from 'moment'
;<StackingLayout>
  <DatePicker
    oldDatePicker={false}
    readOnly={true}
    name="datepicker-read-only"
    defaultValue={{
      startDate: moment('2021-01-01'),
      endDate: moment('2021-01-15'),
    }}
    popupProviderProps={{
      getPopupContainer: () => document.querySelector('.right-panel'),
    }}
  />
  <DatePicker
    oldDatePicker={false}
    readOnly={true}
    inputProps={{ placeholder: 'Select date' }}
    popupProviderProps={{
      getPopupContainer: () => document.querySelector('.right-panel'),
    }}
  />
</StackingLayout>
```

#### Disabled

```tsx
import { DatePicker, StackingLayout } from '@nutanix-ui/prism-reactjs'
import moment from 'moment'
;<StackingLayout>
  <DatePicker
    oldDatePicker={false}
    disabled={true}
    defaultValue={{
      startDate: moment('2021-01-01'),
      endDate: moment('2021-01-15'),
    }}
    popupProviderProps={{
      getPopupContainer: () => document.querySelector('.right-panel'),
    }}
  />
  <DatePicker
    oldDatePicker={false}
    disabled={true}
    inputProps={{ placeholder: 'Select date' }}
    popupProviderProps={{
      getPopupContainer: () => document.querySelector('.right-panel'),
    }}
  />
</StackingLayout>
```

#### Fully Controlled Open/Close (popupVisible)

```tsx
import { useState } from 'react'
import {
  DatePicker,
  Checkbox,
  FlexLayout,
  FlexItem,
} from '@nutanix-ui/prism-reactjs'

const Example = () => {
  const [popupVisible, setPopupVisible] = useState(false)
  return (
    <FlexLayout flexDirection="row">
      <FlexItem>
        <DatePicker
          name="datepicker-full-control"
          oldDatePicker={false}
          popupProviderProps={{
            getPopupContainer: () => document.querySelector('.right-panel'),
            popupVisible,
          }}
        />
      </FlexItem>
      <FlexItem alignSelf="center">
        <Checkbox
          id="toggle-popup"
          type={Checkbox.CheckboxTypes.TOGGLE}
          label="Show calendar"
          checked={popupVisible}
          onChange={() => setPopupVisible((p) => !p)}
        />
      </FlexItem>
    </FlexLayout>
  )
}
```

#### Locale

```tsx
import { DatePicker } from '@nutanix-ui/prism-reactjs'
import 'moment/locale/de' // must be imported before use
;<DatePicker
  oldDatePicker={false}
  defaultValue={new Date()}
  name="datepicker-de-locale"
  locale="de"
  popupProviderProps={{
    getPopupContainer: () => document.querySelector('.right-panel'),
  }}
  onChange={(d) => console.log(d)}
/>
```

#### Imperative Input Ref

```tsx
import { useRef } from 'react'
import { DatePicker, Button, StackingLayout } from '@nutanix-ui/prism-reactjs'

const Example = () => {
  const inputRef = useRef()
  return (
    <StackingLayout>
      <DatePicker
        name="datepicker-input-ref"
        oldDatePicker={false}
        inputProps={{
          placeholder: 'Select date',
          inputRef,
          'data-test-id': 'datepicker-input-ref-id',
        }}
      />
      <Button onClick={() => inputRef.current.focus()}>Focus Input</Button>
    </StackingLayout>
  )
}
```

#### DatePickerMini (button trigger)

```tsx
import { DatePickerMini } from '@nutanix-ui/prism-reactjs'
;<DatePickerMini
  trigger="button"
  closeOnSelect={true}
  placeholder="Choose a date"
  buttonProps={{ 'data-test-id': 'mini-picker' }}
  inputProps={{ 'aria-label': 'Report date' }}
  onChange={(date) => console.log(date)}
/>
```

#### Inline Calendar (display-only)

```tsx
import { Calendar } from '@nutanix-ui/prism-reactjs'
import moment from 'moment'

{
  /* Non-selectable — no onChange */
}
;<Calendar value={moment()} />

{
  /* Selectable */
}
;<Calendar
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  initialViewMode={Calendar.ViewMode.DAYS}
/>
```

---

### Accessibility and Keyboard Behaviour

The calendar popup is rendered as a `role="dialog" aria-modal="true"` element.

| Context                | Key               | Behaviour                                                             |
| ---------------------- | ----------------- | --------------------------------------------------------------------- |
| Input (DatePicker)     | `↓ ArrowDown`     | Opens the calendar popup and focuses the selected/today/first cell    |
| Input (DatePicker)     | `Escape`          | Closes the popup and returns focus to the input                       |
| Input (DatePickerMini) | `Enter` / `Space` | Opens the popup                                                       |
| Calendar grid          | `Arrow keys`      | Move focus between day cells; wraps across weeks and navigates months |
| Calendar grid          | `PageUp`          | Go back one month (`+Shift` = one year)                               |
| Calendar grid          | `PageDown`        | Go forward one month (`+Shift` = one year)                            |
| Calendar grid          | `Home`            | Move to first cell in current row                                     |
| Calendar grid          | `End`             | Move to last cell in current row                                      |
| Calendar grid          | `Enter` / `Space` | Select the focused date                                               |
| Calendar grid          | `Escape`          | Close popup, return focus to input                                    |
| Calendar header nav    | Arrow keys        | Suppressed (preventDefault) to avoid scroll interference              |

- The input has `role="combobox"`, `aria-haspopup="dialog"`, `aria-controls`, and `aria-expanded`.
- A visually-hidden element announces the expected date format (e.g. "Format: MM/DD/YYYY") and is referenced via `aria-describedby`.
- Each day cell has `aria-selected`, `aria-disabled`, and `aria-current="date"` (today).
- The range picker start/end inputs each have `aria-label="Start date"` / `aria-label="End date"` and separate format hint elements.
- Opening the calendar on hover (`popupProviderProps.action="hover"`) causes accessibility issues and should be avoided.

---

### Usage Notes

- Always set `oldDatePicker={false}` for new code. The default `true` is a legacy compatibility shim; the old API is deprecated and no longer supported.
- Use `FormItemDatePicker` when Figma shows a Date Picker with a label — it handles label, `helpText`, error wiring, and Form validation automatically.
- Prefer `dateFormat` strings over locale defaults for consistent cross-locale display (e.g. `"YYYY-MM-DD"`).
- Use `isValidDate` to restrict selectable dates (e.g. weekdays only, future-only).
- For range pickers, initialise `defaultValue` with `{}` (empty object) to start with an empty range, not `undefined` (which triggers single-date mode).
- Use `popupProviderProps.getPopupContainer` to mount the popup inside a specific scrollable container and avoid z-index / overflow issues.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
