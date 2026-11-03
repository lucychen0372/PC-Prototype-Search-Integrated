# IconWrapper

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not usually mapped directly from a Figma component.

## React

Import: `import { IconWrapper } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { IconWrapper } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `IconWrapperProps`

Extends: `Omit<React.SVGProps<SVGSVGElement>, 'size' | 'ref'>`

All standard SVG attributes (`onClick`, `style`, `role`, `aria-label`, etc.) are valid except `size` and `ref` (use `innerRef` instead).

| Prop          | Type                           | Default     | Required | Description                                                                                                                                                                                            |
| ------------- | ------------------------------ | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color`       | `string`                       | `'inherit'` | No       | Color of the icon. Accepts any CSS color name, hex code, RGB value, or CSS class name paired attr selector. Inherits parent font color when unset.                                                     |
| `size`        | `IconWrapperSize`              | `'medium'`  | No       | Size of the icon. One of `'small'`, `'medium'`, `'large'`.                                                                                                                                             |
| `className`   | `string`                       | —           | No       | Custom CSS class name appended to the SVG element.                                                                                                                                                     |
| `viewBox`     | `string`                       | —           | No       | SVG `viewBox` attribute string (e.g. `'0 0 12 12'`).                                                                                                                                                   |
| `children`    | `React.ReactNode`              | —           | No       | SVG path/shape elements rendered inside the `<svg>` tag.                                                                                                                                               |
| `data-test`   | `string`                       | —           | No       | Test automation selector. Rendered as a `data-test` attribute on the SVG.                                                                                                                              |
| `innerRef`    | `React.Ref<any>`               | —           | No       | Ref forwarded to the inner `<svg>` element. Accepts a `RefObject` or a ref callback.                                                                                                                   |
| `aria-hidden` | `boolean \| 'true' \| 'false'` | `true`      | No       | Hides the element from assistive technology without visually hiding it. Defaults to `true` because icons are typically decorative; set to `false` or provide `aria-label` when the icon is meaningful. |

#### `IconWrapperSize` type

```tsx
type IconWrapperSize = 'small' | 'medium' | 'large'
```

Imported alongside `IconWrapper` from `@nutanix-ui/prism-reactjs` if needed:

```tsx
import { IconWrapper } from '@nutanix-ui/prism-reactjs'
import type { IconWrapperSize } from '@nutanix-ui/prism-reactjs'
```

### Rendered Output

`IconWrapper` renders an `<svg>` element with:

- CSS classes `ntnx ntnx-icon size-{size}` (e.g. `ntnx ntnx-icon size-medium`)
- `xmlns="http://www.w3.org/2000/svg"`
- `aria-hidden={true}` by default
- `color` set to `'inherit'` by default

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Minimal working example (custom icon using IconWrapper directly)

```tsx
import { IconWrapper } from '@nutanix-ui/prism-reactjs'
;<IconWrapper
  viewBox="0 0 12 12"
  size="medium"
  aria-hidden={false}
  aria-label="Custom icon"
>
  <path d="M6 1L11 11H1L6 1Z" fill="currentColor" />
</IconWrapper>
```

#### Using `size`

```tsx
import { FlexLayout, AlertIcon } from '@nutanix-ui/prism-reactjs'
;<FlexLayout alignItems="center">
  <AlertIcon size="large" />
  <AlertIcon size="medium" />
  <AlertIcon size="small" />
</FlexLayout>
```

#### Using `color`

```tsx
import { FlexLayout, TaskIcon } from '@nutanix-ui/prism-reactjs'
;<FlexLayout className="nsg-example-borderless-content" alignItems="center">
  <TaskIcon color="white" />
  <TaskIcon color="light-gray" />
  <TaskIcon color="gray" />
  <TaskIcon color="dark" />
  <TaskIcon color="light" />
  <TaskIcon color="red" />
  <TaskIcon color="green" />
</FlexLayout>
```

#### Using `innerRef`

```tsx
import React, { useRef } from 'react'
import { IconWrapper } from '@nutanix-ui/prism-reactjs'

const ref = useRef<SVGSVGElement>(null)

;<IconWrapper innerRef={ref} viewBox="0 0 10 10" />
```

#### Standard icons (System)

```tsx
import {
  FlexLayout,
  HomeIcon,
  UserIcon,
  AlertIcon,
  MagGlassIcon,
  SettingsIcon,
  DashboardIcon,
  ToolIcon,
  TaskIcon,
  HealthIcon,
  AnalyzeIcon,
  BugIcon,
  QuarantineIcon,
  StoreIcon,
  AnomalyIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  style={{ color: 'var(--color-text-primary-label)' }}
  alignItems="center"
  flexWrap="wrap"
>
  <HomeIcon /> Home
  <UserIcon /> User
  <AlertIcon size="large" />
  <AlertIcon />
  <AlertIcon size="small" /> Alert
  <MagGlassIcon /> Search (MagGlass)
  <SettingsIcon /> Settings
  <DashboardIcon /> Dashboard
  <ToolIcon /> Tool
  <TaskIcon /> Task
  <HealthIcon /> Health
  <AnalyzeIcon /> Analyze
  <BugIcon /> Bug
  <QuarantineIcon /> Quarantine
  <StoreIcon /> Store
  <AnomalyIcon />
  <AnomalyIcon size="small" /> Anomaly
</FlexLayout>
```

#### Standard icons (UI Controls)

```tsx
import {
  FlexLayout,
  DateIcon,
  TimeIcon,
  UploadIcon,
  DownloadIcon,
  ExportIcon,
  ImportIcon,
  QuestionIcon,
  ExclamationIcon,
  FilterIcon,
  ColorByIcon,
  GroupByIcon,
  SortByIcon,
  EditIcon,
  RemoveIcon,
  ZoomInIcon,
  ZoomOutIcon,
  StarIcon,
  EmptyStarIcon,
  KeyboardIcon,
  ConsoleIcon,
  LabelIcon,
  OpenInNewWindowIcon,
  LockIcon,
  UnlockIcon,
  PinIcon,
  UnpinIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  style={{ color: 'var(--color-text-primary-label)' }}
  alignItems="center"
  flexWrap="wrap"
>
  <DateIcon /> Date
  <TimeIcon /> Time
  <UploadIcon /> Upload
  <DownloadIcon /> Download
  <ExportIcon /> Export
  <ImportIcon /> Import
  <QuestionIcon /> Question
  <ExclamationIcon /> Exclamation
  <FilterIcon /> Filter
  <ColorByIcon /> Color By
  <GroupByIcon /> Group By
  <SortByIcon /> Sort By
  <EditIcon />
  <EditIcon size="small" /> Edit
  <RemoveIcon /> Remove
  <ZoomInIcon /> Zoom In
  <ZoomOutIcon /> Zoom Out
  <StarIcon /> Star
  <EmptyStarIcon /> Empty Star
  <KeyboardIcon /> Keyboard
  <ConsoleIcon /> Console
  <LabelIcon /> Label
  <OpenInNewWindowIcon /> Open in N. W.
  <LockIcon /> Lock
  <UnlockIcon /> Unlock
  <PinIcon /> Pin
  <UnpinIcon /> Unpin
</FlexLayout>
```

#### Standard icons (Actions)

```tsx
import {
  FlexLayout,
  RestartIcon,
  RunIcon,
  SuspendIcon,
  PowerIcon,
  EjectIcon,
  CloneIcon,
  SnapshotIcon,
  MigrateIcon,
  ExternalLinkIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  style={{ color: 'var(--color-text-primary-label)' }}
  alignItems="center"
  flexWrap="wrap"
>
  <RestartIcon /> Restart
  <RunIcon />
  <RunIcon size="small" /> Run
  <SuspendIcon />
  <SuspendIcon size="small" /> Suspend
  <PowerIcon /> Power
  <EjectIcon /> Eject
  <CloneIcon /> Clone
  <SnapshotIcon /> Snapshot
  <MigrateIcon /> Migrate
  <ExternalLinkIcon /> External Link
</FlexLayout>
```

#### Standard icons (Hardware)

```tsx
import {
  FlexLayout,
  MemoryIcon,
  StorageIcon,
  CPUIcon,
  PowerSupplyIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  style={{ color: 'var(--color-text-primary-label)' }}
  alignItems="center"
  flexWrap="wrap"
>
  <MemoryIcon /> Memory
  <StorageIcon /> Storage
  <CPUIcon /> CPU
  <PowerSupplyIcon /> Power Supply
</FlexLayout>
```

#### Special icons

```tsx
import {
  FlexLayout,
  CloseIcon,
  CheckMarkIcon,
  PlusIcon,
  MinusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  BackIcon,
  TriangleUpDownIcon,
  TriangleRightIcon,
  DotIcon,
  DoubleDotVerticalIcon,
  TripleDotHorizontalIcon,
  TripleDotVerticalIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  style={{ color: 'var(--color-text-primary-label)' }}
  alignItems="center"
  flexWrap="wrap"
>
  <CloseIcon />
  <CloseIcon size="small" /> Cross (Close)
  <CheckMarkIcon /> Tick (CheckMark)
  <PlusIcon />
  <PlusIcon size="small" /> Plus
  <MinusIcon /> Minus
  <ChevronLeftIcon /> Chevron Left
  <ChevronRightIcon /> Chevron Right
  <ChevronUpIcon /> Chevron Up
  <ChevronDownIcon /> Chevron Down
  <BackIcon /> Back
  <TriangleUpDownIcon /> Double Arrow (TriangleUpDown)
  <TriangleRightIcon /> Triangle (TriangleRight)
  <DotIcon /> DotIcon
  <DoubleDotVerticalIcon /> DoubleDotVerticalIcon
  <TripleDotHorizontalIcon /> Triple Dot Horizontal
  <TripleDotVerticalIcon /> Triple Dot Vertical
</FlexLayout>
```

#### Logo icons

```tsx
import {
  FlexLayout,
  BeamLogoIcon,
  CalmLogoIcon,
  ClustersLogoIcon,
  EraLogoIcon,
  FilesLogoIcon,
  FlowLogoIcon,
  FrameLogoIcon,
  InsightsLogoIcon,
  IoTLogoIcon,
  KarbonLogoIcon,
  LeapLogoIcon,
  MineLogoIcon,
  MoveLogoIcon,
  NutanixLogo,
  NutanixLogoIcon,
  ObjectsLogoIcon,
  PrismLogoIcon,
  PrismOpsLogoIcon,
  TestDriveLogoIcon,
  VolumesLogoIcon,
  XrayLogoIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  style={{ color: 'var(--color-text-primary-label)' }}
  alignItems="center"
  flexWrap="wrap"
>
  <BeamLogoIcon /> BeamLogoIcon
  <CalmLogoIcon /> CalmLogoIcon
  <ClustersLogoIcon /> ClustersLogoIcon
  <EraLogoIcon /> EraLogoIcon
  <FilesLogoIcon /> FilesLogoIcon
  <FlowLogoIcon /> FlowLogoIcon
  <FrameLogoIcon /> FrameLogoIcon
  <InsightsLogoIcon /> InsightsLogoIcon
  <IoTLogoIcon /> IoTLogoIcon
  <KarbonLogoIcon /> KarbonLogoIcon
  <LeapLogoIcon /> LeapLogoIcon
  <MineLogoIcon /> MineLogoIcon
  <MoveLogoIcon /> MoveLogoIcon
  <NutanixLogo /> NutanixLogo
  <NutanixLogoIcon /> NutanixLogoIcon
  <ObjectsLogoIcon /> ObjectsLogoIcon
  <PrismLogoIcon /> PrismLogoIcon
  <PrismOpsLogoIcon /> PrismOpsLogoIcon
  <TestDriveLogoIcon /> TestDriveLogoIcon
  <VolumesLogoIcon /> VolumesLogoIcon
  <XrayLogoIcon /> XrayLogoIcon
</FlexLayout>
```

#### Other icons

```tsx
import {
  FlexLayout,
  MenuIcon,
  BoldTextIcon,
  BulletPointIcon,
  IndentIcon,
  ItalicsTextIcon,
  NumberIcon,
  UnderlineIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  style={{ color: 'var(--color-text-primary-label)' }}
  alignItems="center"
  flexWrap="wrap"
>
  <MenuIcon /> Menu
  <BoldTextIcon /> Bold
  <BulletPointIcon /> Bullet Point
  <IndentIcon /> Indent
  <ItalicsTextIcon /> Italics
  <NumberIcon /> Number
  <UnderlineIcon /> Underline
</FlexLayout>
```

#### Deprecated icons

These icons are deprecated; prefer their replacements when available.

```tsx
import {
  FlexLayout,
  CheckBoxIcon,
  ClockIcon,
  ExclamationMarkIcon,
  GearIcon,
  InfoTooltipIcon,
  PencilIcon,
  QuestionMarkIcon,
  QuestionTooltipIcon,
  RoundedPlusIcon,
  StarSketchIcon,
  TriangleDownIcon,
  TriangleLeftIcon,
  TriangleUpIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout
  style={{ color: 'var(--color-text-primary-label)' }}
  alignItems="center"
  flexWrap="wrap"
>
  <CheckBoxIcon /> CheckBoxIcon
  <ClockIcon /> ClockIcon
  <ExclamationMarkIcon /> ExclamationMarkIcon
  <GearIcon /> GearIcon
  <InfoTooltipIcon /> InfoTooltipIcon
  <PencilIcon /> PencilIcon
  <QuestionMarkIcon /> QuestionMarkIcon
  <QuestionTooltipIcon /> QuestionTooltipIcon
  <RoundedPlusIcon /> RoundedPlusIcon
  <StarSketchIcon /> StarSketchIcon
  <TriangleDownIcon /> TriangleDownIcon
  <TriangleLeftIcon /> TriangleLeftIcon
  <TriangleUpIcon /> TriangleUpIcon
</FlexLayout>
```

#### Dark-theme examples

Pass a dark color via the parent's CSS `color` property; icons inherit it via `currentColor`.

```tsx
import {
  FlexLayout,
  HomeIcon,
  AlertIcon,
  UserIcon,
} from '@nutanix-ui/prism-reactjs'
;<FlexLayout alignItems="center" flexWrap="wrap" style={{ color: '#7C8D9F' }}>
  <HomeIcon /> Home
  <AlertIcon /> Alert
  <UserIcon /> User
</FlexLayout>
```

### Accessibility

- `aria-hidden` defaults to `true` because icons are typically decorative and accompanied by visible text.
- For standalone meaningful icons (no adjacent label), set `aria-hidden={ false }` and add an `aria-label` to the icon, or wrap in a `<button>` / `<span>` with an accessible label.
- `IconWrapper` does **not** add `role="img"` automatically. If the icon conveys meaning without a label, add `role="img"` explicitly.

### Usage Notes

- `IconWrapper` is the base component all Prism icon components are built on. Prefer the named icon exports (e.g. `<AlertIcon>`) over using `IconWrapper` directly unless building a custom SVG icon.
- The `color` prop sets the SVG `color` attribute. Icon paths use `fill="currentColor"` to inherit it, so setting `color` or the parent element's CSS `color` both work.
- All props beyond the documented ones are spread onto the underlying `<svg>` element (`React.SVGProps<SVGSVGElement>` minus `size` and `ref`).
- Use `innerRef` instead of `ref` to access the underlying `<svg>` DOM node.
- These exports are React-only helpers or lower-level utilities. Prefer higher-level Prism components when they satisfy the design.
- Keep generated app code aligned with repository rules: Prism layout components for layout, persistent accessible labels, and no custom CSS for spacing.

<!-- SOURCE-API-END -->
