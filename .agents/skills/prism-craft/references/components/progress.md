# Progress

## Figma

- **Library name:** Progress (page: Data Display, frame: Progress)

## React

Import: `import { Progress } from '@nutanix-ui/prism-reactjs'`

### Enums

```ts
Progress.ProgressType.HORIZONTAL // "horizontal"
Progress.ProgressType.CIRCLE // "circle"

Progress.ProgressStatus.ACTIVE // "active"
Progress.ProgressStatus.DANGER // "danger"
Progress.ProgressStatus.SUCCESS // "success"
Progress.ProgressStatus.WAITING // "waiting"
Progress.ProgressStatus.WARNING // "warning"

Progress.ProgressAppearance.DEFAULT // "default"
Progress.ProgressAppearance.NAVIGATION // "navigation"

Progress.ProgressLabelPosition.RIGHT // "right"
Progress.ProgressLabelPosition.TOP // "top"
```

### Props

`ProgressProps` extends `Omit<FlexLayoutProps, 'color' | 'label'>` — all `FlexLayout` and ARIA props pass through.

| Prop                           | Type                       | Default        | Notes                                                                                                                                        |
| ------------------------------ | -------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `percent`                      | `number`                   | `0`            | 0–100 progress value                                                                                                                         |
| `type`                         | `'circle' \| 'horizontal'` | `"horizontal"` | Bar or circle variant                                                                                                                        |
| `status`                       | `ProgressStatus`           | `"active"`     | Color/semantic state                                                                                                                         |
| `appearance`                   | `ProgressAppearance`       | —              | `"default"` or `"navigation"` (for nav-bar backgrounds)                                                                                      |
| `label`                        | `boolean \| ReactNode`     | —              | `true` shows default %; `false` hides label; ReactNode replaces it. Horizontal bars show label by default; circle bars do not.               |
| `labelPosition`                | `'right' \| 'top'`         | `"right"`      | Place label to the right or above the bar                                                                                                    |
| `fixedLabelWidth`              | `string`                   | —              | CSS width string applied to the label container (e.g. `"60px"`)                                                                              |
| `color`                        | `string`                   | —              | Hex color override (e.g. `"#3D85C8"`). Must be 6-character hex. Overrides `status` color.                                                    |
| `icon`                         | `ReactNode`                | —              | Icon shown inside circle progress. For circle at 100% with DANGER/WARNING/SUCCESS, the icon replaces the circle entirely.                    |
| `tooltipProps`                 | `boolean \| ToolTipProps`  | `{}`           | `true` forces tooltip visible; `false` hides it; object passes props to Tooltip. By default, tooltip shows when label is hidden.             |
| `additionalInfoId`             | `string`                   | —              | ID for the additional-info element. Recommended for a11y compliance (`aria-describedby`).                                                    |
| `ariaLabel`                    | `string`                   | `""`           | Accessible label for the progressbar role                                                                                                    |
| `announceValueChanges`         | `boolean`                  | `false`        | When `true`, progress value changes are announced to screen readers via an `aria-live` region (300 ms debounce). Also sets `aria-valuetext`. |
| `progressDoneText`             | `string`                   | —              | Label text when `percent === 100`                                                                                                            |
| `progressDoneWithErrorsText`   | `string`                   | i18n default   | Label text when `percent === 100` and `status === DANGER`                                                                                    |
| `progressDoneWithWarningsText` | `string`                   | i18n default   | Label text when `percent === 100`, `status === WARNING`, and `type === "circle"`                                                             |
| `progressWaitText`             | `string`                   | i18n default   | Label text when `status === WAITING`                                                                                                         |
| `className`                    | `string`                   | —              | Additional CSS class on the outer `FlexLayout`                                                                                               |
| `theme`                        | `'light' \| 'dark'`        | `"light"`      | **Deprecated.** Use `appearance` instead.                                                                                                    |

### TSX Examples

#### Minimal horizontal bar

```tsx
import { Progress } from '@nutanix-ui/prism-reactjs'
;<Progress
  percent={65}
  status={Progress.ProgressStatus.ACTIVE}
  fixedLabelWidth="60px"
  ariaLabel="Upload progress"
/>
```

#### All status variants (horizontal)

```tsx
import { Progress, StackingLayout } from '@nutanix-ui/prism-reactjs'
;<StackingLayout itemSpacing="20px" style={{ width: '500px' }}>
  <Progress
    fixedLabelWidth="60px"
    percent={60}
    status={Progress.ProgressStatus.WAITING}
  />
  <Progress
    fixedLabelWidth="60px"
    percent={5}
    status={Progress.ProgressStatus.ACTIVE}
  />
  <Progress
    fixedLabelWidth="60px"
    percent={100}
    status={Progress.ProgressStatus.SUCCESS}
  />
  <Progress
    fixedLabelWidth="60px"
    percent={82}
    status={Progress.ProgressStatus.WARNING}
  />
  <Progress
    fixedLabelWidth="60px"
    percent={100}
    status={Progress.ProgressStatus.DANGER}
  />
</StackingLayout>
```

#### Label hidden — tooltip fallback

```tsx
import { Progress, Tooltip } from '@nutanix-ui/prism-reactjs'
;<Progress
  percent={50}
  label={false}
  ariaLabel="Storage utilization"
  tooltipProps={{
    content: '50%',
    oldTooltip: false,
    appearance: Tooltip.APPEARANCE.SECONDARY,
    contentProps: { 'aria-hidden': 'true' },
  }}
/>
```

#### Label positioned above the bar

```tsx
import { Progress, FlexLayout, Tooltip } from '@nutanix-ui/prism-reactjs'
;<Progress
  labelPosition={Progress.ProgressLabelPosition.TOP}
  percent={40}
  status={Progress.ProgressStatus.WARNING}
  tooltipProps={{ oldTooltip: false, appearance: Tooltip.APPEARANCE.SECONDARY }}
  label={
    <FlexLayout justifyContent="space-between" alignItems="center">
      <span>Engineering Budget</span>
      <span>$721,000</span>
    </FlexLayout>
  }
  style={{ width: '206px' }}
/>
```

#### Circle type — in-progress

```tsx
import { Progress, Tooltip } from '@nutanix-ui/prism-reactjs'
;<Progress
  type={Progress.ProgressType.CIRCLE}
  percent={60}
  ariaLabel="VM migration progress"
  tooltipProps={{
    content: '60%',
    oldTooltip: false,
    appearance: Tooltip.APPEARANCE.SECONDARY,
  }}
/>
```

#### Circle type — completed with icon

When `percent === 100` and `status` is DANGER, WARNING, or SUCCESS and `icon` is provided, the icon replaces the SVG circle.

```tsx
import {
  Progress,
  CheckMarkIcon,
  CloseIcon,
  Tooltip,
} from '@nutanix-ui/prism-reactjs'

{
  /* Success */
}
;<Progress
  type={Progress.ProgressType.CIRCLE}
  percent={100}
  status={Progress.ProgressStatus.SUCCESS}
  icon={<CheckMarkIcon />}
  ariaLabel="Task completed"
  tooltipProps={{ oldTooltip: false, appearance: Tooltip.APPEARANCE.SECONDARY }}
/>

{
  /* Danger */
}
;<Progress
  type={Progress.ProgressType.CIRCLE}
  percent={100}
  status={Progress.ProgressStatus.DANGER}
  icon={<CloseIcon />}
  ariaLabel="Task failed"
  tooltipProps={{ oldTooltip: false, appearance: Tooltip.APPEARANCE.SECONDARY }}
/>
```

#### Navigation appearance (circle on dark nav background)

```tsx
import { Progress, CheckMarkIcon, Tooltip } from '@nutanix-ui/prism-reactjs'
;<Progress
  appearance={Progress.ProgressAppearance.NAVIGATION}
  type={Progress.ProgressType.CIRCLE}
  percent={100}
  status={Progress.ProgressStatus.SUCCESS}
  icon={<CheckMarkIcon />}
  ariaLabel="Task completed"
  tooltipProps={{ oldTooltip: false, appearance: Tooltip.APPEARANCE.SECONDARY }}
/>
```

#### Custom color (e.g. chart legend)

```tsx
import { Progress, ThemeManager } from '@nutanix-ui/prism-reactjs'

{
  /* Horizontal */
}
;<Progress
  fixedLabelWidth="60px"
  percent={60}
  color={ThemeManager.getVar('categorial-color-2')}
  ariaLabel="Series A"
/>

{
  /* Circle */
}
;<Progress
  type={Progress.ProgressType.CIRCLE}
  percent={60}
  color={ThemeManager.getVar('categorial-color-2')}
  ariaLabel="Series A"
/>
```

#### Custom completion label text

```tsx
import { Progress, StackingLayout } from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ width: '500px' }}>
  <Progress
    fixedLabelWidth="100px"
    percent={60}
    status={Progress.ProgressStatus.WAITING}
    progressWaitText="Queued…"
  />
  <Progress
    fixedLabelWidth="100px"
    percent={100}
    status={Progress.ProgressStatus.SUCCESS}
    progressDoneText="Complete!"
  />
  <Progress
    fixedLabelWidth="100px"
    percent={100}
    status={Progress.ProgressStatus.DANGER}
    progressDoneWithErrorsText="Failed"
  />
</StackingLayout>
```

#### Screen-reader live announcements

```tsx
import React, { useState } from 'react'
import { Progress, Button, StackingLayout } from '@nutanix-ui/prism-reactjs'

const ProgressDemo = () => {
  const [percent, setPercent] = useState(0)

  return (
    <StackingLayout style={{ width: '500px', textAlign: 'center' }}>
      <Progress
        fixedLabelWidth="60px"
        percent={percent}
        status={
          percent === 100
            ? Progress.ProgressStatus.SUCCESS
            : Progress.ProgressStatus.ACTIVE
        }
        announceValueChanges={true}
        ariaLabel="File upload"
      />
      <Button onClick={() => setPercent(50)}>50%</Button>
      <Button onClick={() => setPercent(100)}>Done</Button>
    </StackingLayout>
  )
}
```

#### Utilization bar with rich label

```tsx
import {
  Progress,
  FlexLayout,
  TextLabel,
  StatusIcon,
  Tooltip,
} from '@nutanix-ui/prism-reactjs'
;<Progress
  percent={80}
  aria-labelledby="disk-label"
  status={Progress.ProgressStatus.DANGER}
  tooltipProps={{ oldTooltip: false, appearance: Tooltip.APPEARANCE.SECONDARY }}
  label={
    <FlexLayout itemSpacing="10px" alignItems="center">
      <TextLabel id="disk-label" type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
        80 GB / 100 GB used
      </TextLabel>
      <StatusIcon
        tooltipProps={{ content: 'Low disk space', oldTooltip: false }}
      />
    </FlexLayout>
  }
/>
```

### Anti-patterns

- Don't create custom progress bars with CSS width tricks — use `Progress`
- Don't use color alone for status on circle type; always provide an `icon` for DANGER/WARNING/SUCCESS states at 100%
- Don't omit `ariaLabel` or `aria-labelledby` on circle type — circle bars have no visible label by default
- Don't use `showInfo` — this prop does not exist; use `label={false}` to hide the label

<!-- SOURCE-API-START -->

### Import

```tsx
import { Progress } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `ProgressAppearance`

- `DEFAULT` = `default`
- `NAVIGATION` = `navigation`

#### `ProgressStatus`

- `ACTIVE` = `active`
- `DANGER` = `danger`
- `SUCCESS` = `success`
- `WAITING` = `waiting`
- `WARNING` = `warning`

#### `ProgressType`

- `CIRCLE` = `circle`
- `HORIZONTAL` = `horizontal`

#### `ProgressLabelPosition`

- `RIGHT` = `right`
- `TOP` = `top`

### Props Interfaces

#### `ProgressProps`

Extends: `extends Omit<FlexLayoutProps, 'color' | 'label'>`

| Prop                           | Type                         | Description                                                                                                                                                                                                                               |
| ------------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`                    | `string`                     | Custom class name                                                                                                                                                                                                                         |
| `appearance`                   | `ProgressAppearance`         | Appearance of Progress. enum ProgressAppearance { DEFAULT = 'default', NAVIGATION = 'navigation' }                                                                                                                                        |
| `color`                        | `string`                     | Color of progress bar in hex format. e.g. #FFFFFF. Note: When set color will override the color used by `status` prop.                                                                                                                    |
| `fixedLabelWidth`              | `string`                     | Set a fixed width for label.                                                                                                                                                                                                              |
| `label`                        | `boolean \| React.ReactNode` | Label by default will show the current percentage or state of progress. Can set to a value or explicitly set true or false to show default value.                                                                                         |
| `type`                         | `'circle' \| 'horizontal'`   | Set the type. Options: line, circle                                                                                                                                                                                                       |
| `theme`                        | `'light' \| 'dark'`          | @deprecated Use prop `appearance` moving forward.                                                                                                                                                                                         |
| `percent`                      | `number`                     | to set the completion percentage                                                                                                                                                                                                          |
| `status`                       | `ProgressStatus`             | To set the status of the progress. enum ProgressStatus { ACTIVE = 'active', DANGER = 'danger', SUCCESS = 'success', WAITING = 'waiting', WARNING = 'warning' }                                                                            |
| `progressDoneText`             | `string`                     | To set the text of the progress when the status is 100 percent.                                                                                                                                                                           |
| `progressDoneWithErrorsText`   | `string`                     | To set the text of the progress when the status is 100 percent and error.                                                                                                                                                                 |
| `progressDoneWithWarningsText` | `string`                     | To set the text of the progress when the status is 100 percent and warning (circle type only).                                                                                                                                            |
| `progressWaitText`             | `string`                     | to set the text of the progress when the status is 'waiting'.                                                                                                                                                                             |
| `tooltipProps`                 | `boolean \| ToolTipProps`    | Add Tooltip. See Tooltip for all available props. On default, tooltip will show if label is not visible. Otherwise, set to {true} to force visibility or {false} to force hidden. See [Tooltip](#!/Tooltip) for list of valid properties. |
| `icon`                         | `React.ReactNode`            | React element. For circle type at 100% with DANGER/WARNING/SUCCESS status, the icon replaces the SVG circle entirely.                                                                                                                     |
| `ariaLabel`                    | `string`                     | Aria label description                                                                                                                                                                                                                    |
| `additionalInfoId`             | `string`                     | Provide custom ID to the additional info. Highly recommended to provide this prop to support a11y compliance.                                                                                                                             |
| `labelPosition`                | `'right' \| 'top'`           | Label position of the progress bar. Options: 'right', 'top'                                                                                                                                                                               |
| `announceValueChanges`         | `boolean`                    | Enable announcements for screen readers when progress value changes. When enabled, progress changes will be announced using an aria-live region (300 ms debounce). Also sets `aria-valuetext` on the progressbar.                         |

### Static Members

- `Progress.ProgressAppearance` = `Progress.APPEARANCE = ProgressAppearance`
- `Progress.ProgressStatus` = `Progress.STATUS = ProgressStatus`
- `Progress.ProgressType` = `Progress.TYPE = ProgressType`
- `Progress.ProgressLabelPosition` = `Progress.LABEL_POSITION = ProgressLabelPosition`

The `APPEARANCE`, `STATUS`, `TYPE`, and `LABEL_POSITION` aliases are **deprecated**; prefer the `Progress<EnumName>` form.

### Accessibility

- The component renders a `role="progressbar"` element with `aria-valuemin=0`, `aria-valuemax=100`, and `aria-valuenow={percent}`.
- All progress bars need an accessible label. If you hide the default label, add either `ariaLabel` or `aria-labelledby`.
- Do not use color alone to indicate error, warning, or success status. Always add an icon or text to convey that information.
- Circle type bars provide no visible label by default — `ariaLabel` or `aria-labelledby` is required.
- Screen readers will not announce progress updates by default. Add `announceValueChanges` to enable live announcements.
- Screen readers may announce the percentage twice (from the progressbar role and the tooltip). To avoid duplicate announcements, pass `contentProps: { 'aria-hidden': 'true' }` inside `tooltipProps`.
- If a progress bar disappears when complete, ensure it is no longer focusable for keyboard users.
- Use `additionalInfoId` to link supplementary description text via `aria-describedby`.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Presentation

```tsx
const wrapper = {
  width: '500px',
}
/* eslint-disable max-len, object-property-newline */
;<StackingLayout itemSpacing="40px" style={wrapper} data-test-id="all-bars">
  <Progress
    fixedLabelWidth="60px"
    percent={60}
    status={Progress.ProgressStatus.WAITING}
  />
  <Paragraph>
    Here we hide the default label and use aria-lablledby to add custom
    labeling.
  </Paragraph>
  <FlexLayout itemSpacing="10px" flexDirection="column">
    <TextLabel
      id="custom-id-3"
      type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
      display="block"
    >
      * Waiting extra label 1.
    </TextLabel>
    <TextLabel
      id="custom-id-4"
      type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
      display="block"
    >
      ** Waiting extra label 2.
    </TextLabel>
  </FlexLayout>
  <Progress
    fixedLabelWidth="60px"
    aria-labelledby="custom-id-3 custom-id-4"
    percent={60}
    status={Progress.ProgressStatus.WAITING}
    label={false}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
    }}
  />
  <Progress
    fixedLabelWidth="60px"
    percent={5}
    status={Progress.ProgressStatus.ACTIVE}
  />
  <Progress
    fixedLabelWidth="60px"
    percent={50}
    status={Progress.ProgressStatus.ACTIVE}
    ariaLabel="tooltip example"
    label={false}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
    }}
    data-test-id="has-tooltip"
  />
  <Progress
    fixedLabelWidth="60px"
    percent={100}
    status={Progress.ProgressStatus.SUCCESS}
    label={
      <FlexLayout itemSpacing="10px" alignItems="center">
        <span>100%</span>
        <StatusIcon
          type={StatusIcon.StatusIconTypes.VALID}
          tooltipProps={{ content: 'Working as expected.', oldTooltip: false }}
        />
      </FlexLayout>
    }
  />
</StackingLayout>
```

#### Progress without Label

```tsx
const wrapper = {
  width: '500px',
}
;<StackingLayout style={wrapper}>
  <Progress
    percent={5}
    label={false}
    ariaLabel="Progress without info"
    tooltipProps={{
      contentProps: { 'aria-hidden': 'true' },
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
    }}
  />
</StackingLayout>
```

#### Label positioned above the bar

```tsx
const wrapper = {
  width: '206px',
}
;<StackingLayout
  itemSpacing="40px"
  style={wrapper}
  data-test-id="top-label-bars"
>
  <Progress
    labelPosition="top"
    percent={40}
    status={Progress.ProgressStatus.DANGER}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
    }}
    label={
      <FlexLayout justifyContent="space-between" alignItems="center">
        <span>Engineering</span>
        <FlexLayout alignItems="center" itemGap="S">
          <span>721,000$</span>
          <StatusIcon type={StatusIcon.StatusIconTypes.DANGER} />
        </FlexLayout>
      </FlexLayout>
    }
  />
  <Progress
    labelPosition="top"
    percent={40}
    status={Progress.ProgressStatus.ACTIVE}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
    }}
    label={
      <FlexLayout justifyContent="space-between" alignItems="center">
        <span>Engineering</span>
        <span>721,0000$</span>
      </FlexLayout>
    }
  />
</StackingLayout>
```

#### Circle type — all states

```tsx
<StackingLayout data-test-id="all-circles">
  <FlexLayout itemSpacing="40px">
    <Progress
      percent={0}
      ariaLabel="first progress circle example"
      type={Progress.ProgressType.CIRCLE}
      tooltipProps={{
        oldTooltip: false,
        appearance: Tooltip.APPEARANCE.SECONDARY,
      }}
    />
    <Progress
      percent={60}
      ariaLabel="waiting progress"
      status={Progress.ProgressStatus.WAITING}
      type={Progress.ProgressType.CIRCLE}
      tooltipProps={{
        oldTooltip: false,
        appearance: Tooltip.APPEARANCE.SECONDARY,
      }}
    />
    <Progress
      percent={60}
      ariaLabel="Warning progress"
      status={Progress.ProgressStatus.WARNING}
      icon={<ExclamationIcon />}
      type={Progress.ProgressType.CIRCLE}
      tooltipProps={{
        oldTooltip: false,
        appearance: Tooltip.APPEARANCE.SECONDARY,
      }}
    />
    <Progress
      percent={100}
      ariaLabel="Danger complete"
      status={Progress.ProgressStatus.DANGER}
      icon={<CloseIcon />}
      type={Progress.ProgressType.CIRCLE}
      tooltipProps={{
        oldTooltip: false,
        appearance: Tooltip.APPEARANCE.SECONDARY,
      }}
    />
    <Progress
      percent={100}
      ariaLabel="Success complete"
      status={Progress.ProgressStatus.SUCCESS}
      icon={<CheckMarkIcon />}
      type={Progress.ProgressType.CIRCLE}
      tooltipProps={{
        oldTooltip: false,
        appearance: Tooltip.APPEARANCE.SECONDARY,
      }}
    />
  </FlexLayout>
</StackingLayout>
```

#### Navigation appearance (circle)

```tsx
<FlexLayout className="ntnx-navigation-example" itemSpacing="40px">
  <Progress
    appearance={Progress.ProgressAppearance.NAVIGATION}
    percent={50}
    ariaLabel="nav progress"
    type={Progress.ProgressType.CIRCLE}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
    }}
  />
  <Progress
    appearance={Progress.ProgressAppearance.NAVIGATION}
    percent={100}
    ariaLabel="nav complete"
    status={Progress.ProgressStatus.SUCCESS}
    icon={<CheckMarkIcon />}
    type={Progress.ProgressType.CIRCLE}
    tooltipProps={{
      oldTooltip: false,
      appearance: Tooltip.APPEARANCE.SECONDARY,
    }}
  />
</FlexLayout>
```

#### Custom color

```tsx
<FlexLayout itemSpacing="40px">
  <Progress
    type={Progress.ProgressType.CIRCLE}
    ariaLabel="custom color circle"
    percent={60}
    color={ThemeManager.getVar('categorial-color-2')}
  />
  <Progress
    style={{ width: '500px' }}
    fixedLabelWidth="60px"
    percent={60}
    color={ThemeManager.getVar('categorial-color-2')}
    ariaLabel="custom color bar"
  />
</FlexLayout>
```

#### Custom completion label text

```tsx
const style = { width: '500px' }
;<StackingLayout style={style}>
  <Progress
    fixedLabelWidth="100px"
    percent={60}
    status={Progress.ProgressStatus.WAITING}
    progressWaitText="Help me..."
  />
  <Progress
    fixedLabelWidth="100px"
    percent={100}
    status={Progress.ProgressStatus.SUCCESS}
    progressDoneText="You did it!"
  />
  <Progress
    fixedLabelWidth="100px"
    percent={100}
    status={Progress.ProgressStatus.DANGER}
    progressDoneWithErrorsText="Ouch!"
  />
</StackingLayout>
```

#### Interactive Progress with Screen Reader Announcements (Demo)

```tsx
const ProgressAnnouncementExample = () => {
  const [percent, setPercent] = useState(45)
  const [status, setStatus] = useState(Progress.ProgressStatus.ACTIVE)
  const [progressType, setProgressType] = useState(
    Progress.ProgressType.HORIZONTAL,
  )

  const handleSetProgress = useCallback((newPercent) => {
    setPercent(newPercent)
    setStatus(
      newPercent === 100
        ? Progress.ProgressStatus.SUCCESS
        : Progress.ProgressStatus.ACTIVE,
    )
  }, [])

  const handleSetStatus = useCallback((newStatus) => {
    setStatus(newStatus)
  }, [])

  const handleTypeChange = useCallback((value) => {
    setProgressType(value)
  }, [])

  return (
    <StackingLayout
      style={{ width: '600px', textAlign: 'center', padding: '20px' }}
      data-test-id="progress-announcements-demo"
    >
      <StackingLayout itemSpacing="20px">
        <StackingLayout itemSpacing="15px">
          <Title size="h4">Choose Progress Type</Title>
          <RadioGroup
            name="progressType"
            selectedValue={progressType}
            onChange={handleTypeChange}
            layout={RadioGroup.RadioGroupLayout.HORIZONTAL}
          >
            <Radio value={Progress.ProgressType.HORIZONTAL}>Horizontal</Radio>
            <Radio value={Progress.ProgressType.CIRCLE}>Circle</Radio>
          </RadioGroup>
        </StackingLayout>

        <Title size="h4" role="status" id="progress-title">
          {progressType === Progress.ProgressType.CIRCLE
            ? 'Circle'
            : 'Horizontal'}{' '}
          Progress Bar ({status})
        </Title>

        {progressType === Progress.ProgressType.HORIZONTAL ? (
          <Progress
            fixedLabelWidth="60px"
            percent={percent}
            status={status}
            announceValueChanges={true}
            aria-labelledby="progress-title"
          />
        ) : (
          <FlexLayout justifyContent="center">
            <Progress
              percent={percent}
              type={Progress.ProgressType.CIRCLE}
              status={status}
              announceValueChanges={true}
              aria-labelledby="progress-title"
              tooltipProps={{ content: `${percent}%`, oldTooltip: false }}
            />
          </FlexLayout>
        )}
      </StackingLayout>
    </StackingLayout>
  )
}
```

### Usage Notes

- Prefer documented enum/static values such as `Progress.<EnumName>.<VALUE>` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- The `color` prop must be a valid 6-character hex string; an invalid value will log a PropTypes error.
- For circle type at 100% with DANGER, WARNING, or SUCCESS — if `icon` is provided, the icon completely replaces the SVG circle. Without an icon, the filled circle renders (deprecated pattern per source).

<!-- SOURCE-API-END -->
