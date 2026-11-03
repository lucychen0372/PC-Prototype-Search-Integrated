# Component Inventory

Import Prism React components from the main package:

```tsx
import { Button, FlexLayout, Table } from '@nutanix-ui/prism-reactjs'
```

## Source of Truth

Use these references in order:

1. [components/\_index.md](components/_index.md) -- directory/lookup table: use it to map a Figma name or React export to the right doc file.
2. `components/<component>.md` -- detailed component doc: read the mapped file for source API, enums/constants, prop tables, usage notes, and examples.
3. [icons.md](icons.md) -- public icon exports and Figma icon mappings. Icons are not documented as individual component refs.
4. Installed package files when needed: `node_modules/@nutanix-ui/prism-reactjs/lib/`. Check bundled `.d.ts` files for exact exported prop types in environments where the source repo is not available.

Current coverage from the Prism source entry point:

| Area                              | Count | Where to Look                                                        |
| --------------------------------- | ----: | -------------------------------------------------------------------- |
| Public non-icon exports covered   |   133 | Some exports share umbrella docs, e.g. `InputPassword` -> `input.md` |
| Physical component reference docs |    84 | One file per primary component/utility doc in `components/*.md`      |
| Public icon exports               |   210 | `icons.md`                                                           |
| Total public exports              |   343 | `node_modules/@nutanix-ui/prism-reactjs/lib/`                        |

## Component Reference Groups

These are navigation groups, not a replacement for the per-component API docs.

**Actions:** `Button`, `ButtonGroup`, `Dropdown`

**Data Input:** `Checkbox`, `CodeInput`, `DatePicker`, `Favorite`, `FileInput`, `Input`, `InputAddon`, `InputNumber`, `MultiInput`, `MultiSelect`, `Radio`, `RadioGroup`, `Select`, `Slider`, `Sorter`, `TextArea`, `TextInput`, `TimePicker`

**Form:** `Form`, `FormItemProvider`, and `FormItem*` wrappers documented under the relevant input refs.

**Data Display:** `Accordion`, `Alert`, `Badge`, `Calendar`, `Carousel`, `Divider`, `Loader`, `Notification`, `NotificationItem`, `OrderedList`, `Progress`, `StatusIcon`, `Table`, `WidgetTable`

**Layout:** `DashboardWidgetHeader`, `DashboardWidgetLayout`, `FlexLayout`, `HeaderFooterLayout`, `MainPageLayout`, `NavBarLayout`, `Scrollbar`, `Separator`, `SidePanel`, `StackingLayout`

**Navigation:** `Breadcrumb`, `Link`, `Menu`, `MenuItem`, `Pagination`, `Steps`, `Tabs`, `TreeView`, `ViewSwitcher`

**Modal & Overlay:** `ConfirmModal`, `FocusTrap`, `FullPageModal`, `Modal`, `ModalContent`, `Overlay`, `Popover`, `PopupProvider`, `PortalProvider`, `Tooltip`

**Typography:** `Paragraph`, `SrOnly`, `TextLabel`, `Title`, `Truncate`

**Tutorial:** `Tutorial`, `TutorialMouse`, `TutorialTip`

**React-Only Utilities:** `FileUploadProvider`, `IconWrapper`, `InfiniteScroll`, `InputWidthProvider`

## API Reference Rule

Do not rely on this inventory for exact props. Always open the component-specific doc in `references/components/` before generating usage. Those docs are source-derived and include the current props/API where available. If a project has a newer installed package, verify against `node_modules/@nutanix-ui/prism-reactjs/lib/` and its `.d.ts` files.

## Layout Prop Reference

### FlexLayout

| Prop             | Values                                                                                                    | Default     |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| `itemGap`        | `'none'` \| `'XS'` \| `'S'` \| `'M'` \| `'L'` \| `'XL'` \| `'XXL'`                                        | `'none'`    |
| `flexDirection`  | `'row'` \| `'row-reverse'` \| `'column'` \| `'column-reverse'`                                            | `'row'`     |
| `justifyContent` | `'flex-start'` \| `'flex-end'` \| `'center'` \| `'space-between'` \| `'space-around'` \| `'space-evenly'` | —           |
| `alignItems`     | `'flex-start'` \| `'flex-end'` \| `'center'` \| `'baseline'` \| `'stretch'`                               | `'stretch'` |
| `flexWrap`       | `'nowrap'` \| `'wrap'` \| `'wrap-reverse'`                                                                | `'nowrap'`  |
| `padding`        | `'0px'` \| `'5px'` \| `'10px'` \| `'15px'` \| `'20px'` \| `'30px'` \| `'40px'` \| `'V-H'` format          | —           |
| `display`        | `'flex'` \| `'inline-flex'`                                                                               | `'flex'`    |
| `itemFlexBasis`  | `'100pc'` for equal-width children                                                                        | —           |

### StackingLayout

| Prop          | Values                                                                                           | Default  |
| ------------- | ------------------------------------------------------------------------------------------------ | -------- |
| `itemGap`     | `'none'` \| `'XS'` \| `'S'` \| `'M'` \| `'L'` \| `'XL'` \| `'XXL'`                               | `'none'` |
| `padding`     | `'0px'` \| `'5px'` \| `'10px'` \| `'15px'` \| `'20px'` \| `'30px'` \| `'40px'` \| `'V-H'` format | —        |
| `itemDisplay` | `'block'` \| `'flex'`                                                                            | —        |
| `htmlTag`     | Any valid HTML tag                                                                               | `'div'`  |
| `background`  | Theme background types                                                                           | —        |
