# Carousel

## Figma

- **Library name:** Carousel Tabs (page: N/A, frame: Carousel Tabs)
- **Also matches:** Carousel

## React

Import: `import { Carousel } from '@nutanix-ui/prism-reactjs'`

### TSX Examples

```tsx
import { useState } from 'react'
import { Carousel, FlexLayout } from '@nutanix-ui/prism-reactjs'

const SlideItem = ({ label }: { label: string }) => (
  <FlexLayout
    justifyContent="center"
    alignItems="center"
    style={{
      background: 'var(--color-background-info-neutral)',
      height: '200px',
      flex: '0 0 100%',
    }}
  >
    {label}
  </FlexLayout>
)

const BasicCarousel = () => {
  const [currentStep, setStep] = useState(0)
  return (
    <Carousel
      currentStep={currentStep}
      stepItemAction={setStep}
      leftButtonAction={(step) => setStep(step - 1)}
      rightButtonAction={(step) => setStep(step + 1)}
      wrapperProps={{ 'aria-label': 'Feature highlights' }}
    >
      <SlideItem label="Feature 1" />
      <SlideItem label="Feature 2" />
      <SlideItem label="Feature 3" />
    </Carousel>
  )
}
```

### Anti-patterns

- Don't build custom slideshows — use `Carousel`
- Limit to 5 or fewer slides for usability (more than 8 triggers a scrolling step-button strip)
- Don't omit `wrapperProps['aria-label']` — it is required for screen-reader accessibility
- Avoid `showStepsButtons={false}` unless you provide another accessible navigation mechanism

<!-- SOURCE-API-START -->

### Import

```tsx
import { Carousel } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `ArrowButtonsPositionSuffix`

Accessed as `Carousel.ArrowButtonsPositionSuffix.<VALUE>`.

| Key       | Value                    |
| --------- | ------------------------ |
| `INSIDE`  | `'arrow-buttons-inside'` |
| `OUTSIDE` | `''`                     |

#### `StepButtonsPositionSuffix`

Accessed as `Carousel.StepButtonsPositionSuffix.<VALUE>`.

| Key       | Value                   |
| --------- | ----------------------- |
| `INSIDE`  | `'step-buttons-inside'` |
| `OUTSIDE` | `''`                    |

#### `ArrowButtonsAppearanceSuffix`

Accessed as `Carousel.ArrowButtonsAppearanceSuffix.<VALUE>`.

| Key       | Value                             |
| --------- | --------------------------------- |
| `HOVER`   | `'arrow-button-appearance-hover'` |
| `DEFAULT` | `''`                              |

### Props Interfaces

#### `CarouselProps`

All props are optional.

| Prop                        | Type                                                     | Default                                | Description                                                                                                                                                                                                                                     |
| --------------------------- | -------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`                 | `string`                                                 | `''`                                   | Additional class name applied to the inner carousel FlexLayout.                                                                                                                                                                                 |
| `children`                  | `React.ReactNode \| React.ReactNode[]`                   | `null`                                 | Slide content. Each direct child becomes one slide. Using more than 5 slides may hurt UX. Passing no children renders a Warning Alert instead.                                                                                                  |
| `itemProps`                 | `FlexLayoutProps`                                        | `{}`                                   | Props spread onto the inner `carousel-inner` FlexLayout that wraps all slides.                                                                                                                                                                  |
| `carouselItemWrappersProps` | `FlexLayoutProps[]`                                      | `[]`                                   | Per-slide wrapper props (index-aligned with `children`). Use the `id` field here to satisfy the `aria-controls` linkage from step buttons to slide panels.                                                                                      |
| `currentStep`               | `number`                                                 | `0`                                    | Zero-based index of the currently visible slide. Must be controlled externally.                                                                                                                                                                 |
| `stepItemAction`            | `(step: number) => void`                                 | —                                      | Called with the target step index whenever a step dot, arrow button, or timer advance fires. Typically `setStep` from `useState`.                                                                                                               |
| `leftButtonAction`          | `(step: number) => void`                                 | —                                      | Called with `currentStep` when the left arrow is clicked and `steps` is empty. When `steps` is provided the component calculates the previous enabled step internally and calls `stepItemAction` instead.                                       |
| `rightButtonAction`         | `(step: number) => void`                                 | —                                      | Same as `leftButtonAction` but for the right arrow.                                                                                                                                                                                             |
| `showPaginationButtons`     | `boolean`                                                | `true`                                 | Show/hide the left and right arrow navigation buttons.                                                                                                                                                                                          |
| `customLeftArrowButton`     | `React.ReactElement`                                     | `null`                                 | Replaces the built-in left `<Button appearance="mini">` with a custom element. The component clones the element and injects click/keyboard/aria props.                                                                                          |
| `customRightArrowButton`    | `React.ReactElement`                                     | `null`                                 | Same as `customLeftArrowButton` but for the right side.                                                                                                                                                                                         |
| `arrowButtonsPosition`      | `ArrowButtonsPositionSuffix`                             | `ArrowButtonsPositionSuffix.OUTSIDE`   | `OUTSIDE` places arrow buttons beside the slide area; `INSIDE` overlays them on top of it with gradient shadow overlays. Setting `arrowButtonsAppearance` to `HOVER` also forces the `INSIDE` layout.                                           |
| `arrowButtonsAppearance`    | `ArrowButtonsAppearanceSuffix`                           | `ArrowButtonsAppearanceSuffix.DEFAULT` | `DEFAULT` always shows arrow buttons; `HOVER` shows them only on hover/focus (implicitly forces `INSIDE` position).                                                                                                                             |
| `showStepsButtons`          | `boolean`                                                | `true`                                 | Show/hide the dot step-indicator buttons below the slide.                                                                                                                                                                                       |
| `steps`                     | `Array<boolean>`                                         | `[]`                                   | Index-aligned array of booleans indicating whether each slide's step dot is enabled. Shorter arrays are padded with `true`. `[false]` disables only the first dot. `[false, false, false]` disables all dots and also hides both arrow buttons. |
| `stepButtonsProps`          | `ButtonProps[]`                                          | `[]`                                   | Per-step button props (index-aligned). Use `id` and `aria-label` here to give screen readers a meaningful name for each dot. The `id` is also used to link each slide panel (`aria-describedby`).                                               |
| `stepButtonsPosition`       | `StepButtonsPositionSuffix`                              | `StepButtonsPositionSuffix.OUTSIDE`    | `OUTSIDE` places dot buttons below the slide; `INSIDE` overlays them on the slide.                                                                                                                                                              |
| `timer`                     | `number`                                                 | `null`                                 | Auto-advance interval in seconds. `0` or negative falls back to `6`. Omit (or pass `null`) to disable auto-play entirely. When active, a play/pause button is rendered alongside the dots.                                                      |
| `wrapperProps`              | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>` | `{}`                                   | Props spread onto the outermost `<section>` element. **`aria-label` is required** for screen-reader accessibility. Also accepts `data-test-id` and standard HTML div attributes.                                                                |

### Static Members

- `Carousel.ArrowButtonsPositionSuffix` → `ArrowButtonsPositionSuffix` enum
- `Carousel.StepButtonsPositionSuffix` → `StepButtonsPositionSuffix` enum
- `Carousel.ArrowButtonsAppearanceSuffix` → `ArrowButtonsAppearanceSuffix` enum

### Behaviour Notes

- **Controlled component.** `currentStep` is not managed internally; the consuming component must hold state and wire `stepItemAction` (and optionally `leftButtonAction` / `rightButtonAction`) to update it.
- **Timer auto-play.** When `timer` is set the carousel advances through enabled slides on a repeating interval. Auto-play **pauses** on mouse-enter or focus-in and **resumes** on mouse-leave or blur. Clicking the play/pause button overrides the hover/focus pause behaviour until the next hover/focus cycle.
- **`prefers-reduced-motion`.** When the system accessibility setting "Reduce Motion" is on, the carousel starts paused (play button shown) and the user must explicitly press play. The slide transition CSS (`transform .3s ease-out`) still runs but the auto-advance timer does not start automatically.
- **Empty children.** When `children` is `null`, `undefined`, or an empty array the component renders a Warning `<Alert>` with text from the i18n key `Carousel.missing_data` instead of the slide area.
- **All steps disabled.** When every entry in `steps` is `false` both arrow buttons are hidden regardless of `showPaginationButtons`.
- **Large step counts (> 8).** The step-button strip scrolls horizontally via `scrollBy` to keep the active dot in view when there are more than 8 slides.
- **Slide transition.** Uses a CSS `translateX` + opacity fade. The active slide fades from opacity `0.3` to `1`; the outgoing slide fades back to `0.3`.

### Accessibility & Keyboard

- The outer `<section>` has `role="group"` and `aria-roledescription="carousel"`. Provide a meaningful label via `wrapperProps['aria-label']`.
- The dot strip has `role="tablist"` and `aria-label` (i18n `Carousel.slides`).
- Each dot button has `role="tab"`, `aria-selected`, `aria-disabled`, and `aria-label` (defaults to "Slide N"; override via `stepButtonsProps[n]['aria-label']`).
- Each slide panel has `role="tabpanel"`, `aria-roledescription="slide"`, and `aria-label` ("Slide N of M"). When `stepButtonsProps[n].id` is set the panel gets a matching `aria-describedby`.
- Arrow buttons carry `aria-label` ("Previous slide" / "Next slide") and `aria-disabled` when at the boundary.
- `aria-live="polite"` is set on the slide track while auto-play is inactive; it switches to `aria-live="off"` during auto-play to prevent screen readers from announcing each auto-advanced slide.
- **Keyboard navigation within the dot strip:** `ArrowRight` moves focus to and activates the next dot; `ArrowLeft` does the same in reverse. Non-active dots have `tabIndex={-1}`; the active dot has `tabIndex={0}`.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style`; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Default carousel

```tsx
import { useState } from 'react'
import { FlexLayout, Carousel } from '@nutanix-ui/prism-reactjs'

const Placeholder = ({ item }) => (
  <FlexLayout
    justifyContent="center"
    alignItems="center"
    style={{
      background: 'var(--color-background-info-neutral)',
      fontSize: '25px',
      height: '200px',
      flex: '0 0 100%',
    }}
  >
    {item}
  </FlexLayout>
)

const DefaultCarousel = () => {
  const [currentStep, setStep] = useState(0)
  const data = [1, 2, 3, 4, 5]

  return (
    <Carousel
      stepItemAction={setStep}
      rightButtonAction={(step) => setStep(step + 1)}
      leftButtonAction={(step) => setStep(step - 1)}
      currentStep={currentStep}
      wrapperProps={{ 'data-test-id': 'default' }}
    >
      {data.map((item, idx) => (
        <Placeholder item={item} key={`carousel-${idx}`} />
      ))}
    </Carousel>
  )
}
```

#### With auto-play timer

By default the carousel advances through all enabled slides sequentially. Hovering or focusing pauses it; the play/pause button overrides that. For users with "Reduce Motion" enabled it starts paused.

```tsx
import { useState } from 'react'
import { FlexLayout, Carousel } from '@nutanix-ui/prism-reactjs'

const Placeholder = ({ item }) => (
  <FlexLayout
    justifyContent="center"
    alignItems="center"
    style={{
      background: 'var(--color-background-info-neutral)',
      fontSize: '25px',
      height: '200px',
      flex: '0 0 100%',
    }}
  >
    {item}
  </FlexLayout>
)

const CarouselWithTimer = () => {
  const [currentStep, setStep] = useState(0)
  const data = [1, 2, 3, 4, 5, 6]

  return (
    <Carousel
      stepItemAction={setStep}
      currentStep={currentStep}
      timer={3}
      steps={[false]}
    >
      {data.map((item, idx) => (
        <Placeholder item={item} key={`carousel-${idx}`} />
      ))}
    </Carousel>
  )
}
```

#### Disabled steps

Steps at positions that map to `false` have their dot rendered as `aria-disabled` and cannot be navigated to directly. The arrow buttons skip over them.

```tsx
import { useState } from 'react'
import { FlexLayout, Carousel } from '@nutanix-ui/prism-reactjs'

const CarouselWithDisabledSteps = () => {
  const [currentStep, setStep] = useState(0)
  const data = [1, 2, 3, 4, 5]
  const steps = [true, false, true] // positions 3-4 auto-fill as true

  return (
    <Carousel
      steps={steps}
      stepItemAction={setStep}
      rightButtonAction={(step) => setStep(step + 1)}
      leftButtonAction={(step) => setStep(step - 1)}
      currentStep={currentStep}
      wrapperProps={{ 'data-test-id': 'disabled-steps' }}
    >
      {data.map((item, idx) => (
        <FlexLayout
          key={`carousel-${idx}`}
          justifyContent="center"
          alignItems="center"
          style={{
            background: 'var(--color-background-info-neutral)',
            height: '200px',
            flex: '0 0 100%',
          }}
        >
          {item}
        </FlexLayout>
      ))}
    </Carousel>
  )
}
```

#### Arrow buttons inside the slide area

```tsx
<Carousel
  stepItemAction={setStep}
  rightButtonAction={(step) => setStep(step + 1)}
  leftButtonAction={(step) => setStep(step - 1)}
  currentStep={currentStep}
  arrowButtonsPosition={Carousel.ArrowButtonsPositionSuffix.INSIDE}
  wrapperProps={{ 'data-test-id': 'arrow-buttons-inside' }}
>
  {/* slides */}
</Carousel>
```

#### Arrow buttons visible only on hover

Setting `HOVER` appearance implicitly positions arrows inside the slide area.

```tsx
<Carousel
  stepItemAction={setStep}
  rightButtonAction={(step) => setStep(step + 1)}
  leftButtonAction={(step) => setStep(step - 1)}
  currentStep={currentStep}
  arrowButtonsAppearance={Carousel.ArrowButtonsAppearanceSuffix.HOVER}
  wrapperProps={{ 'data-test-id': 'arrow-buttons-on-hover' }}
>
  {/* slides */}
</Carousel>
```

#### Step buttons inside the slide area

```tsx
<Carousel
  stepItemAction={setStep}
  rightButtonAction={(step) => setStep(step + 1)}
  leftButtonAction={(step) => setStep(step - 1)}
  currentStep={currentStep}
  stepButtonsPosition={Carousel.StepButtonsPositionSuffix.INSIDE}
  wrapperProps={{ 'data-test-id': 'step-buttons-inside' }}
>
  {/* slides */}
</Carousel>
```

#### Without arrow buttons

```tsx
<Carousel
  stepItemAction={setStep}
  currentStep={currentStep}
  showPaginationButtons={false}
  wrapperProps={{ 'data-test-id': 'no-arrow-buttons' }}
>
  {/* slides */}
</Carousel>
```

#### Without step dots (accessibility discouraged)

```tsx
<Carousel
  stepItemAction={setStep}
  rightButtonAction={(step) => setStep(step + 1)}
  leftButtonAction={(step) => setStep(step - 1)}
  currentStep={currentStep}
  showStepsButtons={false}
  wrapperProps={{ 'data-test-id': 'no-steps' }}
>
  {/* slides */}
</Carousel>
```

#### Full accessibility wiring

Provide `id` on each `carouselItemWrappersProps` entry and a matching `id` + `aria-label` on each `stepButtonsProps` entry so screen readers can announce slide names and link dots to panels.

```tsx
import { useState } from 'react'
import { FlexLayout, Carousel, Link } from '@nutanix-ui/prism-reactjs'

const data = [
  <Link>718 - 2 seaters sport coupe</Link>,
  <Link>911 - 2 seaters high performance sport coupe</Link>,
  <Link>Taycan - 4 seaters EV sedan</Link>,
]

const stepButtonsProps = [
  { id: '718', 'aria-label': 'Porsche 718' },
  { id: '911', 'aria-label': 'Porsche 911' },
  { id: 'Taycan', 'aria-label': 'Porsche Taycan' },
]

const carouselItemWrappersProps = [
  { id: 'carousel-panel-718' },
  { id: 'carousel-panel-911' },
  { id: 'carousel-panel-Taycan' },
]

const A11yCarousel = () => {
  const [currentStep, setStep] = useState(0)

  return (
    <Carousel
      stepItemAction={setStep}
      rightButtonAction={(step) => setStep(step + 1)}
      leftButtonAction={(step) => setStep(step - 1)}
      currentStep={currentStep}
      stepButtonsProps={stepButtonsProps}
      carouselItemWrappersProps={carouselItemWrappersProps}
      wrapperProps={{ 'aria-label': 'Porsche models', 'data-test-id': 'a11y' }}
    >
      {data.map((item, idx) => (
        <FlexLayout
          key={carouselItemWrappersProps[idx].id}
          justifyContent="center"
          alignItems="center"
          style={{
            background: 'var(--color-background-info-neutral)',
            height: '200px',
            flex: '0 0 100%',
          }}
        >
          {item}
        </FlexLayout>
      ))}
    </Carousel>
  )
}
```

### Usage Notes

- Always hold `currentStep` in state and pass both `stepItemAction` (for dot/timer navigation) and `leftButtonAction` / `rightButtonAction` (for arrow navigation) unless arrow buttons are hidden.
- Prefer `Carousel.<EnumName>.<VALUE>` over raw strings for `arrowButtonsPosition`, `stepButtonsPosition`, and `arrowButtonsAppearance`.
- Use `wrapperProps['aria-label']` on every usage — it is the primary accessible name for the carousel region.
- For rich accessibility, pair `stepButtonsProps[n].id` with `carouselItemWrappersProps[n].id` so dots and panels are linked via `aria-controls` / `aria-describedby`.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) inside slide children instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
