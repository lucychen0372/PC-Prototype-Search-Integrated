# Steps

## Figma

- **Library name:** Navigation Container (page: N/A, frame: Navigation Container)

## React

Import: `import { Steps } from '@nutanix-ui/prism-reactjs'`

### StepItemStatus Enum

```ts
import { StepItemStatus } from '@nutanix-ui/prism-reactjs'
// or from StepItem directly — re-exported by Steps internally

enum StepItemStatus {
  PROCESS = 'process', // active / current step
  FINISH = 'finish', // completed step (shows checkmark)
  WAIT = 'wait', // upcoming step (not yet reachable)
}
```

Status is set **automatically** by `Steps` based on the `current` index. You only need to
set it manually if you render `StepItem` directly.

### StepItemProps Shape

Each object in the `data` array accepts:

| Prop             | Type                             | Required | Description                                                                                                            |
| ---------------- | -------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `title`          | `React.ReactNode`                | yes      | Step label. Should be a single line of text.                                                                           |
| `id`             | `string`                         | no       | Unique id; auto-generated from the parent `Steps` id + index if omitted.                                               |
| `stepNumber`     | `React.ReactNode`                | no       | Number/icon badge. Auto-assigned by `Steps` (1-based index).                                                           |
| `status`         | `StepItemStatus`                 | no       | Visual status. Auto-derived from `current`; override only when using `StepItem` standalone.                            |
| `hover`          | `boolean`                        | no       | Enable hover styling. Default `true`.                                                                                  |
| `panelIdPrefix`  | `string`                         | no       | Passed down automatically from `Steps`; do not set per-item.                                                           |
| `tooltipProps`   | `Omit<ToolTipProps, 'children'>` | no       | Tooltip displayed on the step badge area. Preferred over `titleSuffix` for accessibility.                              |
| `statusIconType` | `StatusIconTypes`                | no       | Icon from `StatusIcon` rendered after the title (e.g. `StatusIcon.StatusIconTypes.QUESTION`). Use with `tooltipProps`. |
| `titleSuffix`    | `React.ReactNode`                | no       | **Deprecated.** Element placed to the right of the title. Use `tooltipProps` + `statusIconType` instead.               |

### TSX Examples

```tsx
{
  /* Wizard steps — minimal */
}
;<Steps
  current={currentStep}
  data={[
    { title: 'Select Model' },
    { title: 'Configure' },
    { title: 'Review' },
    { title: 'Deploy' },
  ]}
  onStepChange={(step) => setCurrentStep(step)}
  panelIdPrefix={`wizard-${uniqueId}`}
/>
```

### Anti-patterns

- Don't create custom step indicators with numbers and lines — use `Steps`
- Don't use `label` / `description` / `disabled` in the `data` items — the real fields are `title`, `tooltipProps`, and `statusIconType`
- Always provide `panelIdPrefix` for accessibility (omitting it logs a console warning)
- Use inside `Modal` or `FullPageModal` for wizard flows
- Don't use `titleSuffix` for tooltips — it is deprecated; use `tooltipProps` + `statusIconType`

<!-- SOURCE-API-START -->

### Import

```tsx
import { Steps } from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash' // for generating panelIdPrefix
```

### Props Interfaces

#### `StepsProps`

Extends: `Omit<FlexLayoutProps, 'data'>` — all `FlexLayout` props (e.g. `flexDirection`, `id`, `className`, `aria-label`, `style`) are valid.

| Prop                      | Type                                                           | Required | Default | Description                                                                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                    | `StepItemProps[]`                                              | no       | `[]`    | Array of step item descriptors.                                                                                                                                                             |
| `current`                 | `number`                                                       | no       | —       | Active step index, 0-based.                                                                                                                                                                 |
| `onStepChange`            | `(currentStep: number, stepItems: StepsProps['data']) => void` | no       | —       | Callback when a **finished** (previous) step is clicked. Providing this prop enables backward navigation.                                                                                   |
| `panelIdPrefix`           | `string`                                                       | no       | —       | Unique prefix used to link each step tab to its `role="tabpanel"` via `aria-controls`. Required for accessibility (omitting it logs a warning). Use `uniqueId('steps-panel-')` from lodash. |
| `focusTargetOnStepChange` | `'tab'`                                                        | no       | —       | When set, programmatically moves focus to the active step tab button whenever `current` changes. Recommended for screen-reader accessibility.                                               |
| `flexDirection`           | `'row' \| 'column'`                                            | no       | `'row'` | Inherited from `FlexLayout`. Set to `'column'` for a vertical/sidebar layout. Also changes keyboard navigation axis.                                                                        |

#### `StepItemProps`

See [StepItemProps Shape](#stepitemprops-shape) above. Key points:

- `title` is the **only practically required** field (PropTypes marks it `isRequired`).
- `stepNumber` and `status` are managed by `Steps` automatically.
- `id` is auto-generated; set it only when you need a stable, predictable DOM id.

#### `StepItemStatus` enum

```ts
import { StepItemStatus } from '@nutanix-ui/prism-reactjs'

StepItemStatus.PROCESS // 'process' — active step
StepItemStatus.FINISH // 'finish'  — completed, shows CheckMarkIcon
StepItemStatus.WAIT // 'wait'    — upcoming, click disabled
```

### Keyboard Navigation

`Steps` implements the ARIA `tablist` roving-tabindex pattern:

| Key          | Horizontal layout   | Vertical layout (`flexDirection="column"`) |
| ------------ | ------------------- | ------------------------------------------ |
| `ArrowRight` | Focus next step     | —                                          |
| `ArrowLeft`  | Focus previous step | —                                          |
| `ArrowDown`  | —                   | Focus next step                            |
| `ArrowUp`    | —                   | Focus previous step                        |
| `Home`       | Focus first step    | Focus first step                           |
| `End`        | Focus last step     | Focus last step                            |

Focus cycles (wraps around). Keyboard focus only changes focus; it does **not** call `onStepChange`.

### ARIA Roles

| Element                | Role       | Notes                                                                                                                                                      |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Steps` root           | `tablist`  | `aria-orientation` set to `horizontal` or `vertical` based on `flexDirection`.                                                                             |
| Each `StepItem` button | `tab`      | `aria-selected`, `aria-current="step"`, `aria-disabled` for wait status, `aria-controls` linking to the panel.                                             |
| Content panel          | `tabpanel` | Must be provided by the application. Set `id="{panelIdPrefix}-{current + 1}"`, `role="tabpanel"`, `aria-labelledby="{stepsId}-{current}"`, `tabIndex={0}`. |

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
<StackingLayout style={{ maxWidth: 800 }}>
  <Paragraph>
    Note: the Steps component is a specialized type of the Tabs component.
    Please refer to the
    <Link href="#/Layouts/Navigation?id=tabs:~:text=Accessibility%20Guidelines">
      Tabs Accessibility Guidelines
    </Link>
    .
  </Paragraph>
  <Paragraph>
    When a step changes in a multi-step flow, the most accessible pattern is to
    move focus to the new step tab (focusTargetOnStepChange="tab"). This makes
    screen readers announce the new step (e.g., "Step 2, tab, selected") and
    reorients users before they enter the panel.
  </Paragraph>
  <Paragraph>
    If you opt to keep the default behavior (focus remains on the Next button),
    you must provide your own announcements so users know what became active and
    what's next.
  </Paragraph>
</StackingLayout>
```

#### UX Guidelines

```tsx
/* eslint-disable max-len */
const data = [
  'Step Forward: To get to step four from step one, the user must first complete steps one, two and three. Skipping the line may bring unintended consequences.',
  'Step Backward: The user can go back any number of steps from the current step without restriction.',
  'Navigating to the next step should always be provided in the current step content body. Navigating to any previous finished steps are disabled unless onStepChange callback is provided as in this example.',
]
/* eslint-enable max-len */

;<StackingLayout style={{ maxWidth: 800 }}>
  <UnorderedList data={data} />
</StackingLayout>
```

#### Basic Example (horizontal, with backward navigation)

```tsx
import React, { useState } from 'react'
import {
  Steps,
  Button,
  StackingLayout,
  FlexLayout,
  FlexItem,
} from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

const stepsData = [
  { title: 'First' },
  { title: 'Second' },
  { title: 'Third' },
  { title: 'Last' },
]

const BasicUsageSteps = () => {
  const [current, setCurrent] = useState(1)
  const [panelIdPrefix] = useState(uniqueId('steps-panel-'))

  const onStepChange = (nextCurrent) => setCurrent(nextCurrent)
  const onNextClick = () =>
    setCurrent((prev) => Math.min(prev + 1, stepsData.length - 1))

  const isLast = current === stepsData.length - 1
  const nextStepNumber = Math.min(current + 2, stepsData.length)

  return (
    <StackingLayout data-test-id="default">
      <Steps
        id="basic-usage"
        data={stepsData}
        current={current}
        onStepChange={onStepChange}
        panelIdPrefix={panelIdPrefix}
        aria-label="Basic example"
      />
      <FlexLayout
        id={`${panelIdPrefix}-${current + 1}`}
        flexDirection="column"
        alignItems="center"
        role="tabpanel"
        aria-labelledby={`basic-usage-${current}`}
        tabIndex={0}
      >
        <FlexItem>{`Step ${current + 1} form content`}</FlexItem>
        {isLast ? (
          <Button>Done</Button>
        ) : (
          <Button
            onClick={onNextClick}
            aria-label={`Next to step ${nextStepNumber}`}
          >
            Next
          </Button>
        )}
      </FlexLayout>
    </StackingLayout>
  )
}

;<BasicUsageSteps />
```

#### Accessibility-Recommended: Focus Active Tab on Step Change

```tsx
import React, { useState } from 'react'
import {
  Steps,
  Button,
  StackingLayout,
  FormLayout,
  FlexLayout,
  FlexItem,
  FormItemInput,
  Checkbox,
  RadioGroup,
  Radio,
} from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

const stepsData = [
  { title: 'First' },
  { title: 'Second' },
  { title: 'Third' },
  { title: 'Last' },
]

const FocusOnTabSteps = () => {
  const [current, setCurrent] = useState(0)
  const [panelIdPrefix] = useState(uniqueId('steps-panel-'))
  const [optChecked, setOptChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('one')

  const onNextClick = () =>
    setCurrent((prev) => Math.min(prev + 1, stepsData.length - 1))

  let buttonNode = <Button onClick={onNextClick}>Next</Button>
  if (current === stepsData.length - 1) {
    buttonNode = <Button>Done</Button>
  }

  return (
    <StackingLayout data-test-id="focus-on-tab">
      <Steps
        id="focus-on-tab"
        data={stepsData}
        current={current}
        panelIdPrefix={panelIdPrefix}
        focusTargetOnStepChange="tab"
        aria-label="Focus on active step example"
      />
      <FlexLayout
        id={`${panelIdPrefix}-${current + 1}`}
        flexDirection="column"
        alignItems="stretch"
        role="tabpanel"
        aria-labelledby={`focus-on-tab-${current}`}
        tabIndex={0}
        itemGap="M"
      >
        <FormLayout contentWidth="500px" contentProps={{ itemGap: 'L' }}>
          <FlexItem>{`Step ${current + 1} Form Content`}</FlexItem>
          <Checkbox
            id="checkbox"
            label="Checkbox"
            checked={optChecked}
            onChange={(e) => setOptChecked(e.target.checked)}
          />
          <FormItemInput id="id-1" label="Field A" helpText="Help text." />
          <FormItemInput id="id-2" label="Field B" helpText="Help text." />
          <RadioGroup
            label="Choose one"
            name={`rg-${panelIdPrefix}-${current}`}
            selectedValue={radioValue}
            onChange={(next) => setRadioValue(next)}
          >
            <Radio value="one">Radio One</Radio>
            <Radio value="two">Radio Two</Radio>
            <Radio value="three">Radio Three</Radio>
          </RadioGroup>
        </FormLayout>
        <FlexLayout itemSpacing="10px" alignSelf="center">
          {buttonNode}
        </FlexLayout>
      </FlexLayout>
    </StackingLayout>
  )
}

;<FocusOnTabSteps />
```

#### Vertical Layout with Tooltip Step

```tsx
import React, { useState } from 'react'
import {
  Steps,
  StatusIcon,
  Button,
  FlexLayout,
  FlexItem,
  Tooltip,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

const stepsData = [
  { title: 'First' },
  { title: 'Second' },
  {
    title: 'Third',
    tooltipProps: {
      oldTooltip: false,
      content:
        'Title of each step should fit in a single line. Use this tooltip technique if you need to be more descriptive.',
      placement: 'right',
      appearance: Tooltip.APPEARANCE.SECONDARY,
      contentProps: { style: { maxWidth: 300 } },
    },
    statusIconType: StatusIcon.StatusIconTypes.QUESTION,
  },
  { title: 'Last' },
]

const ColumnSteps = () => {
  const [current, setCurrent] = useState(1)
  const [panelIdPrefix] = useState(uniqueId('steps-panel-'))

  const onStepChange = (nextCurrent) => setCurrent(nextCurrent)
  const onNextClick = () =>
    setCurrent((prev) => Math.min(prev + 1, stepsData.length - 1))

  let buttonNode = <Button onClick={onNextClick}>Next</Button>
  if (current === stepsData.length - 1) {
    buttonNode = <Button>Done</Button>
  }

  return (
    <StackingLayout style={{ width: 500 }}>
      <FlexLayout>
        <Steps
          id="vertical"
          data={stepsData}
          current={current}
          onStepChange={onStepChange}
          flexDirection="column"
          panelIdPrefix={panelIdPrefix}
          aria-label="Vertical steps example"
        />
        <FlexLayout
          id={`${panelIdPrefix}-${current + 1}`}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flexGrow="1"
          role="tabpanel"
          aria-labelledby={`vertical-${current}`}
          tabIndex={0}
        >
          <FlexItem>{`Step ${current + 1} form content`}</FlexItem>
          {buttonNode}
        </FlexLayout>
      </FlexLayout>
    </StackingLayout>
  )
}

;<ColumnSteps />
```

#### Disabled Backward Navigation (fully controlled)

Omit `onStepChange` to disable click-back on completed steps. Provide your own Back/Next buttons.

```tsx
import React, { useState } from 'react'
import {
  Steps,
  Button,
  ChevronLeftIcon,
  FlexLayout,
  FlexItem,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

const stepsData = [
  { title: 'First' },
  { title: 'Second' },
  { title: 'Third' },
  { title: 'Last' },
]

const ControlledNavSteps = () => {
  const [current, setCurrent] = useState(1)
  const [panelIdPrefix] = useState(uniqueId('steps-panel-'))

  const onNextClick = () =>
    setCurrent((prev) => Math.min(prev + 1, stepsData.length - 1))
  const onPrevClick = () => setCurrent((prev) => Math.max(prev - 1, 0))

  const renderNavButtons = () => {
    const maxStepIndex = stepsData.length - 1
    let prevButton = (
      <Button onClick={onPrevClick} type="secondary">
        <ChevronLeftIcon aria-hidden="true" /> Back
      </Button>
    )
    let nextButton = <Button onClick={onNextClick}>Next</Button>
    if (current === 0) prevButton = null
    else if (current === maxStepIndex) nextButton = <Button>Done</Button>
    return (
      <FlexLayout>
        {prevButton}
        {nextButton}
      </FlexLayout>
    )
  }

  return (
    <StackingLayout style={{ width: 500 }}>
      {/* No onStepChange — clicking finished steps is disabled */}
      <Steps
        id="disabled-back"
        data={stepsData}
        current={current}
        panelIdPrefix={panelIdPrefix}
        aria-label="Disable default previous steps example"
      />
      <FlexLayout
        id={`${panelIdPrefix}-${current + 1}`}
        flexDirection="column"
        alignItems="center"
        role="tabpanel"
        aria-labelledby={`disabled-back-${current}`}
        tabIndex={0}
      >
        <FlexItem>{`Step ${current + 1} form content`}</FlexItem>
        {renderNavButtons()}
      </FlexLayout>
    </StackingLayout>
  )
}

;<ControlledNavSteps />
```

#### Loading State

Wrap with `Loader` and set `disableFocusOnLoading` to preserve focus.

```tsx
import React, { useState } from 'react'
import {
  Steps,
  Button,
  StackingLayout,
  FlexLayout,
  FlexItem,
  Loader,
} from '@nutanix-ui/prism-reactjs'
import { uniqueId } from 'lodash'

const stepsData = [
  { title: 'First' },
  { title: 'Second' },
  { title: 'Third' },
  { title: 'Last' },
]

const MySteps = () => {
  const [current, setCurrent] = useState(1)
  const [panelIdPrefix] = useState(uniqueId('steps-panel-'))

  const onStepChange = (nextCurrent) => setCurrent(nextCurrent)
  const onNextClick = () => setCurrent((prev) => prev + 1)

  let buttonNode = <Button onClick={onNextClick}>Next</Button>
  if (current === stepsData.length - 1) buttonNode = <Button>Done</Button>

  return (
    <Loader
      loading={true}
      tip="Please wait. Counting kittens..."
      disableFocusOnLoading={true}
    >
      <StackingLayout>
        <Steps
          id="loading"
          data={stepsData}
          current={current}
          onStepChange={onStepChange}
          panelIdPrefix={panelIdPrefix}
          aria-label="Loading Steps Example"
        />
        <FlexLayout
          id={`${panelIdPrefix}-${current + 1}`}
          flexDirection="column"
          alignItems="center"
          role="tabpanel"
          aria-labelledby={`loading-${current}`}
          tabIndex={0}
        >
          <FlexItem>{`Step ${current + 1} form content`}</FlexItem>
          {buttonNode}
        </FlexLayout>
      </StackingLayout>
    </Loader>
  )
}

;<MySteps />
```

### Usage Notes

- `data` items use **`title`** (not `label`). The field accepts `React.ReactNode` but should be kept to a single line of text for layout reasons.
- `panelIdPrefix` is technically optional (for backward compatibility) but **required for accessibility**; omitting it logs a console warning. Generate it with `uniqueId('steps-panel-')` from lodash and stabilise it with `useState`.
- The panel element must have `id="{panelIdPrefix}-{current + 1}"` (1-based) and `role="tabpanel"`. Set `aria-labelledby="{stepsId}-{current}"` where `stepsId` is the `id` prop passed to `<Steps>`.
- For tooltips on individual steps use `tooltipProps` + `statusIconType` on the step item object; `titleSuffix` is deprecated and should not be used in new code.
- Prefer `focusTargetOnStepChange="tab"` for improved screen-reader UX in wizard flows.
- Use `flexDirection="column"` on `<Steps>` for a sidebar/vertical wizard layout; keyboard navigation automatically switches to ArrowUp/ArrowDown when vertical.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
