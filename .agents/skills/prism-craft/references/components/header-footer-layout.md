# HeaderFooterLayout

## Figma

- **Library name:** Header (page: N/A, frame: Header)

## React

Import: `import { HeaderFooterLayout } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { HeaderFooterLayout } from '@nutanix-ui/prism-reactjs'
```

### Props Interfaces

#### `HeaderFooterLayoutProps`

Extends `FlexLayoutProps` (which in turn extends `FlexItemProps`). All FlexLayout props — `display`, `flexDirection`, `flexWrap`, `justifyContent`, `alignItems`, `padding`, `itemSpacing`, `itemGap`, `itemFlexBasis` — are passed through to the root FlexLayout wrapper, except that `flexDirection` is internally forced to `"column"` and `itemSpacing` defaults to `"0px"`.

| Prop               | Type              | Required | Default     | Description                                                                                                                                |
| ------------------ | ----------------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `bodyContent`      | `React.ReactNode` | **Yes**  | —           | Body element. Grows to fill remaining height; adds `overflow: hidden auto` scroll when content overflows.                                  |
| `header`           | `React.ReactNode` | No       | `undefined` | Header element. Renders inside a `FlexLayout` wrapper with `alignItems="center"`. Min-height 40px; separated from body by a bottom border. |
| `footer`           | `React.ReactNode` | No       | `undefined` | Footer element. Renders inside a `FlexLayout` wrapper with `alignItems="center"`. Min-height 40px; separated from body by a top border.    |
| `headerProps`      | `FlexLayoutProps` | No       | `undefined` | Additional FlexLayout props applied to the header wrapper (e.g. `justifyContent`, `itemFlexBasis`).                                        |
| `footerProps`      | `FlexLayoutProps` | No       | `undefined` | Additional FlexLayout props applied to the footer wrapper.                                                                                 |
| `bodyContentProps` | `FlexLayoutProps` | No       | `undefined` | Additional FlexLayout props applied to the body content wrapper.                                                                           |
| `className`        | `string`          | No       | `undefined` | Additional CSS class applied to the root element.                                                                                          |

Inherited `FlexLayoutProps` props most relevant to this component (see [FlexLayout](#!/FlexLayout) for the full list):

| Prop             | Type     | Values                                                                                                                                                                           | Default                                                                                                |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `itemSpacing`    | `string` | `'0px'` `'2px'` `'5px'` `'10px'` `'15px'` `'20px'` `'30px'` `'40px'` `'60px'` `'80px'`                                                                                           | `'20px'` (FlexLayout default; **overridden internally to `'0px'`**) — **deprecated**, prefer `itemGap` |
| `itemGap`        | `string` | `'none'` `'XS'` `'S'` `'M'` `'L'` `'XL'` `'XXL'`                                                                                                                                 | `undefined`                                                                                            |
| `padding`        | `string` | `'0px'` `'5px'` `'10px'` `'15px'` `'20px'` `'30px'` `'40px'` `'0px-5px'` `'0px-10px'` `'0px-15px'` `'0px-20px'` `'5px-0px'` `'10px-0px'` `'15px-0px'` `'20px-0px'` `'15px-20px'` | `undefined`                                                                                            |
| `alignItems`     | `string` | `'flex-start'` `'flex-end'` `'center'` `'baseline'` `'stretch'`                                                                                                                  | `undefined`                                                                                            |
| `justifyContent` | `string` | `'flex-start'` `'flex-end'` `'center'` `'space-between'` `'space-around'` `'space-evenly'`                                                                                       | `undefined`                                                                                            |
| `flexWrap`       | `string` | `'nowrap'` `'wrap'` `'wrap-reverse'`                                                                                                                                             | `undefined`                                                                                            |
| `itemFlexBasis`  | `string` | `'100pc'`                                                                                                                                                                        | `undefined`                                                                                            |
| `display`        | `string` | `'flex'` `'inline-flex'`                                                                                                                                                         | `'flex'`                                                                                               |

### Internal Structure

```
<FlexLayout flexDirection="column" itemSpacing="0px" className="ntnx ntnx-header-footer-layout">
  {header && <FlexLayout className="header" alignItems="center" {...headerProps}>…</FlexLayout>}
  <FlexLayout className="body-content" {...bodyContentProps}>…</FlexLayout>
  {footer && <FlexLayout className="footer" alignItems="center" {...footerProps}>…</FlexLayout>}
</FlexLayout>
```

**CSS behaviour (from source):**

- Root: `height: 100%` — the component fills its parent. **The parent container must define an explicit height.**
- `.header` / `.footer`: `min-height: 40px`, `width: 100%`. Header has a bottom separator border; footer has a top separator border.
- `.body-content`: `flex-basis: 100%`, `width: 100%`, `overflow: hidden auto` — scrolls vertically when content overflows.
- The root CSS class is `ntnx-header-footer-layout` (prefixed by the active theme prefix, e.g. `ntnx`).

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Basic Usage

```tsx
import { HeaderFooterLayout, Title } from '@nutanix-ui/prism-reactjs'

const bodyContent = `The body will grow to the height of the parent dom container.
If overflow then scroll will be added. Viverra eu nunc magna vitae rhoncus,
augue et exercitation vel, hac neque risus augue nullam et, nonummy dolor vel,
eros felis leo. Nec in nam ligula ut orci, erat est. Duis in.
Sed quam dictumst id orci id morbi. Mauris sit. Enim vestibulum.
Aliquam vitae ut tristique quis sit, ante quis et, vitae lectus,
et arcu arcu ac vestibulum a, elit feugiat sed.
At parturient exercitationem maecenas velit, elit ultricies quis tenetur et dignissim.`

;<div style={{ height: 200 }}>
  <HeaderFooterLayout
    itemSpacing="0px"
    header=<Title size="h3">Header</Title>
    footer=<Title size="h3">Footer</Title>
    bodyContent={bodyContent}
  />
</div>
```

#### Body only (no header or footer)

Header and footer are optional. The body still takes the full height of the container.

```tsx
import { HeaderFooterLayout } from '@nutanix-ui/prism-reactjs'
;<div style={{ height: 200 }}>
  <HeaderFooterLayout bodyContent="No Header or footer." />
</div>
```

#### Custom properties for the header and the footer

```tsx
import { HeaderFooterLayout, Title } from '@nutanix-ui/prism-reactjs'
;<div style={{ height: 200 }}>
  <HeaderFooterLayout
    itemSpacing="0px"
    header=<Title size="h3">Header</Title>
    headerProps={{ justifyContent: 'center' }}
    footer=<Title size="h3">Footer</Title>
    footerProps={{ justifyContent: 'center' }}
    bodyContent="The body content goes here."
  />
</div>
```

#### Complex header with title and select

Use `headerProps={ { itemFlexBasis: '100pc' } }` to make inner items share header space equally.

```tsx
import {
  HeaderFooterLayout,
  Title,
  FlexLayout,
  Select,
} from '@nutanix-ui/prism-reactjs'

const menuItems = [
  { label: 'None', value: 'none' },
  { label: 'Hypervisor', value: 'hypervisor' },
  { label: 'VMs', value: 'vms' },
]

const header = (
  <FlexLayout justifyContent="space-between" alignItems="center">
    <Title size="h3">Header</Title>
    <Select
      autoSize={true}
      type="mini"
      rowsData={menuItems}
      selectedRow={menuItems[1]}
    />
  </FlexLayout>
)

;<div style={{ height: 200 }}>
  <HeaderFooterLayout
    itemSpacing="0px"
    header={header}
    headerProps={{ itemFlexBasis: '100pc' }}
    footer=<Title size="h3">Footer</Title>
    footerProps={{ justifyContent: 'center' }}
    bodyContent="The body content goes here."
  />
</div>
```

### Usage Notes

- `bodyContent` is **required**. All other slots (`header`, `footer`) are optional.
- The component sets `height: 100%` on its root. **The parent element must have a defined height**; otherwise the layout collapses.
- `itemSpacing` is deprecated on `FlexLayoutProps` — prefer `itemGap` for new code. The internal structure already uses `itemSpacing="0px"` on the root, so passing `itemSpacing` from outside will be overridden by the internal default.
- Header and footer wrappers default to `alignItems="center"`. Override via `headerProps` / `footerProps`.
- Use `headerProps={ { justifyContent: 'space-between' } }` to place an action on the right side of the header without extra wrapper markup.
- Use `headerProps={ { itemFlexBasis: '100pc' } }` to give all direct children of the header equal width.
- Arbitrary HTML attributes (e.g. `data-test`) pass through to the root `div` via the `FlexLayout` spread.
- This component is commonly used as a dashboard widget container (widget title in `header`, actions/pagination in `footer`, chart or list in `bodyContent`).

<!-- SOURCE-API-END -->
