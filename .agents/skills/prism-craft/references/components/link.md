# Link

## Figma

- **Library name:** Text Button (page: N/A, frame: Text Button)
- **Text Button variants:**
  - Type: Primary | Secondary | Delete | Forward | Backward | Expandable | Inline | Inline Secondary | Icon Default | Icon Secondary | Icon Link | Icon Navigation | Nav Primary | Nav Secondary | Nav Info | Alert Info | Alert Success | Alert Warning | Alert Error | Table Nav Primary | Tab Dropdown
  - Size: Small | Medium (default)

## React

Import: `import { Link } from '@nutanix-ui/prism-reactjs'`

### Figma -> React Prop Mapping

| Figma Property             | React Prop  | Value Mapping                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type                       | `type`      | Primary -> `Link.LINK_TYPE.PRIMARY` (default), Secondary -> `Link.LINK_TYPE.SECONDARY`, Delete -> `Link.LINK_TYPE.DELETE`, Forward -> `Link.LINK_TYPE.FORWARD`, Backward -> `Link.LINK_TYPE.BACKWARD`, Expandable -> `Link.LINK_TYPE.EXPANDABLE`, Inline -> `Link.LINK_TYPE.INLINE`, Inline Secondary -> `Link.LINK_TYPE.INLINE_SECONDARY`, Icon Default -> `Link.LINK_TYPE.ICON_DEFAULT`, Icon Secondary -> `Link.LINK_TYPE.ICON_SECONDARY`, Icon Link -> `Link.LINK_TYPE.ICON_LINK`, Icon Navigation -> `Link.LINK_TYPE.ICON_NAVIGATION`, Nav Primary -> `Link.LINK_TYPE.NAV_PRIMARY`, Nav Secondary -> `Link.LINK_TYPE.NAV_SECONDARY`, Nav Info -> `Link.LINK_TYPE.NAV_INFO`, Alert Info -> `Link.LINK_TYPE.ALERT_INFO`, Alert Success -> `Link.LINK_TYPE.ALERT_SUCCESS`, Alert Warning -> `Link.LINK_TYPE.ALERT_WARNING`, Alert Error -> `Link.LINK_TYPE.ALERT_ERROR`, Table Nav Primary -> `Link.LINK_TYPE.TABLE_NAV_PRIMARY`, Tab Dropdown -> `Link.LINK_TYPE.TAB_DROPDOWN` |
| Size                       | `size`      | Small -> `Link.LINK_SIZE.SMALL`, Medium -> `Link.LINK_SIZE.MEDIUM` (default)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Disabled                   | `disabled`  | true / false (default: false)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Underline                  | `underline` | true (default) / false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Expanded (Expandable type) | `expanded`  | true / false (default: false)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### TSX Examples

```tsx
// Basic primary link (default)
<Link href="/details">View Details</Link>

// Backward navigation (auto-renders ChevronLeft)
<Link type={Link.LINK_TYPE.BACKWARD} onClick={() => navigate(-1)}>
  Back to List
</Link>

// External link with icon (use ExternalLinkIcon with aria annotation)
<Link
  href="https://docs.example.com"
  target="_blank"
  iconRight={
    <ExternalLinkIcon
      aria-hidden="false"
      aria-label="Opens in a new tab"
      size={Link.LINK_SIZE.SMALL}
    />
  }
>
  Documentation
</Link>

// Inline link inside body text
<Paragraph>
  Learn more in the{' '}
  <Link type={Link.LINK_TYPE.INLINE} href="/docs">documentation</Link>.
</Paragraph>
```

### Anti-patterns

- Don't use `<a>` tags -- use `Link` component
- Don't use `Link` for button actions -- use `Button` with text types
- Use `Link.LINK_TYPE.INLINE` for links within body text, not `PRIMARY`
- Don't use `Link.LinkType` — the correct static accessor is `Link.LINK_TYPE`
- Don't use `Link.LINK_TYPE.INFO` — it is deprecated; use `SECONDARY` instead
- Don't use `Link.LINK_TYPE.WITH_ICON`, `ICON_LEFT`, or `ICON_RIGHT` types — deprecated; use `iconLeft` / `iconRight` props instead
- Icon-only links (`ICON_DEFAULT`, `ICON_SECONDARY`, `ICON_LINK`, `ICON_NAVIGATION`) must always have `aria-label` for accessibility

<!-- SOURCE-API-START -->

### Import

```tsx
import { Link } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `LinkType`

Access via `Link.LINK_TYPE.<VALUE>` in component code.

| Enum Key            | String Value          | Notes                                                                     |
| ------------------- | --------------------- | ------------------------------------------------------------------------- |
| `PRIMARY`           | `"primary"`           | Default type                                                              |
| `SECONDARY`         | `"secondary"`         |                                                                           |
| `BACKWARD`          | `"backward"`          | Auto-renders `ChevronLeftIcon` before children                            |
| `DELETE`            | `"delete"`            | Destructive action styling                                                |
| `INFO`              | `"info"`              | **Deprecated** — use `SECONDARY` instead                                  |
| `INLINE`            | `"inline"`            | For links embedded in body text; supports `iconLeft`/`iconRight`          |
| `INLINE_SECONDARY`  | `"inline-secondary"`  | Secondary color inline variant; supports `iconLeft`/`iconRight`           |
| `FORWARD`           | `"forward"`           | Auto-renders `ChevronRightIcon` after children                            |
| `EXPANDABLE`        | `"expandable"`        | Auto-renders `ChevronDownIcon`/`ChevronUpIcon` based on `expanded` prop   |
| `WITH_ICON`         | `"with-icon"`         | **Deprecated** — use `iconRight` or `iconLeft` props instead              |
| `ICON_RIGHT`        | `"icon-right"`        | **Deprecated** — use `iconRight` prop instead                             |
| `ICON_LEFT`         | `"icon-left"`         | **Deprecated** — use `iconLeft` prop instead                              |
| `ICON_DEFAULT`      | `"icon-default"`      | Icon-only; square aspect; requires `aria-label`                           |
| `ICON_SECONDARY`    | `"icon-secondary"`    | Icon-only; square aspect; requires `aria-label`                           |
| `ICON_LINK`         | `"icon-link"`         | Icon-only; square aspect; requires `aria-label`                           |
| `ICON_NAVIGATION`   | `"icon-navigation"`   | Icon-only; square aspect; for dark nav backgrounds; requires `aria-label` |
| `TAB_DROPDOWN`      | `"tab-dropdown"`      | Auto-renders chevron; use inside Tabs component                           |
| `TABLE_NAV_PRIMARY` | `"table-nav-primary"` | For table cell navigation; black text, turns blue on hover; weight 400    |
| `ALERT_INFO`        | `"alert-info"`        | Use only inside Alert components                                          |
| `ALERT_SUCCESS`     | `"alert-success"`     | Use only inside Alert components                                          |
| `ALERT_WARNING`     | `"alert-warning"`     | Use only inside Alert components                                          |
| `ALERT_ERROR`       | `"alert-error"`       | Use only inside Alert components                                          |
| `NAV_PRIMARY`       | `"nav-primary"`       | Navigation sidebar link                                                   |
| `NAV_SECONDARY`     | `"nav-secondary"`     | Navigation sidebar link                                                   |
| `NAV_INFO`          | `"nav-info"`          | Navigation sidebar link                                                   |

#### `LinkSize`

Access via `Link.LINK_SIZE.<VALUE>` in component code.

| Enum Key | String Value |
| -------- | ------------ |
| `SMALL`  | `"small"`    |
| `MEDIUM` | `"medium"`   |

### Props Interfaces

#### `LinkProps`

Extends: `Omit<React.HTMLProps<HTMLAnchorElement>, 'ref' | 'size'>`

All standard anchor props (`href`, `target`, `rel`, `onClick`, `aria-label`, etc.) are forwarded to the underlying `<a>` element.

| Prop        | Type                         | Default            | Required | Description                                                                                                                                    |
| ----------- | ---------------------------- | ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `className` | `string`                     | —                  | No       | Additional class name.                                                                                                                         |
| `children`  | `React.ReactNode`            | —                  | No       | Link label content.                                                                                                                            |
| `type`      | `LinkType \| LinkTypeString` | `LinkType.PRIMARY` | No       | Visual style variant. Prefer `Link.LINK_TYPE.*` enum constants over raw strings.                                                               |
| `size`      | `LinkSize \| LinkSizeString` | `LinkSize.MEDIUM`  | No       | Text size of the link. Prefer `Link.LINK_SIZE.*` enum constants.                                                                               |
| `underline` | `boolean`                    | `true`             | No       | Visually underline the link. Default `true` as of v2.39.0 to meet WCAG guidelines. Set `false` only for isolated links or icon-adjacent links. |
| `iconRight` | `React.ReactNode`            | —                  | No       | Icon rendered to the right of link text. Use for `INLINE` and standard types.                                                                  |
| `iconLeft`  | `React.ReactNode`            | —                  | No       | Icon rendered to the left of link text. Use for `INLINE` and standard types.                                                                   |
| `icon`      | `React.ReactNode`            | —                  | No       | **Deprecated** — use `iconRight` or `iconLeft` instead.                                                                                        |
| `disabled`  | `boolean`                    | `false`            | No       | Disables the link. Sets `aria-disabled`, suppresses `onClick`, does not remove from tab order.                                                 |
| `expanded`  | `boolean`                    | `false`            | No       | Required for `EXPANDABLE` and `TAB_DROPDOWN` types. Controls whether the chevron points up (`true`) or down (`false`).                         |
| `multiLine` | `boolean`                    | `false`            | No       | Enables multi-line text height when link text wraps.                                                                                           |
| `innerRef`  | `React.Ref<any>`             | —                  | No       | Ref forwarded to the inner `<a>` element.                                                                                                      |
| `tabIndex`  | `number`                     | `0`                | No       | Tab index of the link element. The component sets `tabIndex={0}` by default.                                                                   |
| `data-test` | `string`                     | —                  | No       | Test selector attribute.                                                                                                                       |

### Static Members

| Member           | Value           | Description                                              |
| ---------------- | --------------- | -------------------------------------------------------- |
| `Link.LINK_TYPE` | `LinkType` enum | Access all type constants, e.g. `Link.LINK_TYPE.PRIMARY` |
| `Link.LINK_SIZE` | `LinkSize` enum | Access all size constants, e.g. `Link.LINK_SIZE.SMALL`   |

### Behaviour Notes

- **Renders as `<a>`** with `role="link"` and `tabIndex={0}` always set.
- **Keyboard**: Enter and Space trigger the click action via `handleFocusAction`. `onKeyDown` handlers passed via props are called after the internal handler.
- **Disabled state**: Sets `aria-disabled={true}` on the anchor and suppresses `onClick`. The element remains in the tab order (accessible disabled pattern).
- **BACKWARD**: Automatically prepends `ChevronLeftIcon` before children text.
- **FORWARD**: Automatically appends `ChevronRightIcon` after children text.
- **EXPANDABLE / TAB_DROPDOWN**: Automatically appends `ChevronDownIcon` (collapsed) or `ChevronUpIcon` (expanded) based on `expanded` prop.
- **INLINE / INLINE_SECONDARY**: Render `iconLeft` and `iconRight` inline with the text span; the only types that natively support icons flowing with wrapped multi-line text.
- **Icon-only types** (`ICON_DEFAULT`, `ICON_SECONDARY`, `ICON_LINK`, `ICON_NAVIGATION`): Receive a `square` aspect via `data-appearance` attribute for a larger, consistent click target aligned with icon buttons. Always provide `aria-label`.
- **`underline` default changed in v2.39.0**: All links underline by default. Omit or set `underline={false}` only for isolated links (no adjacent text) or links already visually differentiated by an icon.

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Accessibility Guidelines

```tsx
import { Paragraph, StackingLayout, Title } from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ maxWidth: 800 }}>
  <Title size="h3">Do not rely on color alone to distinguish links.</Title>
  <Paragraph>
    Starting with v2.39.0, all usage of Link will be styled with
    props.underline=true by default to meet A11y guidelines. See the section
    below on when to use props.underline=false.
  </Paragraph>
  <Paragraph>
    Paragraph links require multiple visual distinctions from surrounding text.
    The standard solution is to use a distinct color and underline for text
    links. If color alone is used, there must be a 3:1 color contrast ratio
    between each color and its adjacent colors.
  </Paragraph>
</StackingLayout>
```

#### Primary Example

```tsx
import { FlexLayout, Link, StackingLayout } from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <FlexLayout data-test-id="link-primary-types" style={{ padding: '10px' }}>
    <Link data-test-id="link-primary-types-default">Primary Hover Me</Link>
    <Link underline={false}>When props.underline set to false.</Link>
    <Link data-test-id="link-primary-types-disabled" disabled={true}>
      {' '}
      Primary Disabled{' '}
    </Link>
  </FlexLayout>
</StackingLayout>
```

#### Secondary Example

```tsx
import { FlexLayout, Link } from '@nutanix-ui/prism-reactjs'
;<FlexLayout data-test-id="link-secondary-types" style={{ padding: '10px' }}>
  <Link type={Link.LINK_TYPE.SECONDARY}> Secondary Hover Me </Link>
  <Link type={Link.LINK_TYPE.SECONDARY} disabled={true}>
    {' '}
    Secondary Disabled{' '}
  </Link>
</FlexLayout>
```

#### Delete Example

```tsx
import { FlexLayout, Link } from '@nutanix-ui/prism-reactjs'
;<FlexLayout>
  <Link type={Link.LINK_TYPE.DELETE}> Delete Hover Me </Link>
  <Link type={Link.LINK_TYPE.DELETE} disabled={true}>
    {' '}
    Delete Disabled{' '}
  </Link>
</FlexLayout>
```

#### Forward Example

```tsx
import { FlexLayout, Link } from '@nutanix-ui/prism-reactjs'

// ChevronRightIcon is automatically appended — do not add it manually
;<FlexLayout data-test-id="link-forward-types" style={{ padding: '10px' }}>
  <Link type={Link.LINK_TYPE.FORWARD}>Forward</Link>
  <Link type={Link.LINK_TYPE.FORWARD} disabled={true}>
    Forward Disabled
  </Link>
</FlexLayout>
```

#### Backward Example

```tsx
import { FlexLayout, Link } from '@nutanix-ui/prism-reactjs'

// ChevronLeftIcon is automatically prepended — do not add it manually
;<FlexLayout data-test-id="link-backward-types" style={{ padding: '10px' }}>
  <Link type={Link.LINK_TYPE.BACKWARD}>Backward</Link>
  <Link type={Link.LINK_TYPE.BACKWARD} disabled={true}>
    Backward Disabled
  </Link>
</FlexLayout>
```

#### Expandable Content Example

```tsx
import { FlexLayout, Link } from '@nutanix-ui/prism-reactjs'

// Chevron direction controlled by `expanded` prop
;<FlexLayout data-test-id="link-expandable-types" style={{ padding: '10px' }}>
  <Link type={Link.LINK_TYPE.EXPANDABLE}>Show More</Link>
  <Link type={Link.LINK_TYPE.EXPANDABLE} expanded={true}>
    Show Less
  </Link>
  <Link type={Link.LINK_TYPE.EXPANDABLE} disabled={true}>
    Show More Disabled
  </Link>
</FlexLayout>
```

#### External Link Example

```tsx
import {
  FlexLayout,
  Link,
  ExternalLinkIcon,
  StackingLayout,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'

// Announce "opens in a new tab" via ExternalLinkIcon aria-label, not Link aria-label
;<StackingLayout style={{ maxWidth: 700 }} itemGap="M">
  <Paragraph>
    All links that open in new tab should be provided with an advanced warning.
    Set aria-hidden="false" and aria-label on ExternalLinkIcon.
  </Paragraph>
  <FlexLayout style={{ padding: '10px' }}>
    <Link
      href="https://www.w3.org/TR/WCAG20-TECHS/G200.html"
      iconRight={
        <ExternalLinkIcon
          aria-hidden="false"
          aria-label="Opens in a new tab"
          size={Link.LINK_SIZE.SMALL}
        />
      }
    >
      Learn more about using external links
    </Link>
  </FlexLayout>
</StackingLayout>
```

#### Links with Text and Icons (iconLeft / iconRight)

```tsx
import {
  FlexLayout,
  StackingLayout,
  Title,
  ContainerLayout,
  PlusIcon,
  RemoveIcon,
  Link,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout>
  <StackingLayout>
    <Title size="h3">Icon Right</Title>
    <ContainerLayout backgroundColor="white" border={true}>
      <FlexLayout alignItems="center" itemGap="XL" padding="20px">
        <Link iconRight={<PlusIcon size={Link.LINK_SIZE.SMALL} />}>Add</Link>
        <Link
          type={Link.LINK_TYPE.SECONDARY}
          iconRight={<PlusIcon size={Link.LINK_SIZE.SMALL} />}
        >
          Add
        </Link>
        <Link
          type={Link.LINK_TYPE.DELETE}
          iconRight={<RemoveIcon size={Link.LINK_SIZE.SMALL} />}
        >
          Delete
        </Link>
      </FlexLayout>
    </ContainerLayout>
  </StackingLayout>
  <StackingLayout>
    <Title size="h3">Icon Left</Title>
    <ContainerLayout backgroundColor="white" border={true}>
      <FlexLayout alignItems="center" itemGap="XL" padding="20px">
        <Link iconLeft={<PlusIcon size={Link.LINK_SIZE.SMALL} />}>Add</Link>
        <Link
          type={Link.LINK_TYPE.SECONDARY}
          iconLeft={<PlusIcon size={Link.LINK_SIZE.SMALL} />}
        >
          Add
        </Link>
        <Link
          type={Link.LINK_TYPE.DELETE}
          iconLeft={<RemoveIcon size={Link.LINK_SIZE.SMALL} />}
        >
          Delete
        </Link>
      </FlexLayout>
    </ContainerLayout>
  </StackingLayout>
</StackingLayout>
```

#### Icon-Only Links

```tsx
import {
  FlexLayout,
  StackingLayout,
  QuestionIcon,
  Link,
  Title,
  ContainerLayout,
} from '@nutanix-ui/prism-reactjs'

// Icon-only types render with square aspect for larger click target
// Always supply aria-label
;<StackingLayout>
  <StackingLayout>
    <Title size="h3">Default Appearance</Title>
    <ContainerLayout backgroundColor="white" border={true}>
      <FlexLayout alignItems="center" itemGap="XL" padding="20px">
        <Link type={Link.LINK_TYPE.ICON_DEFAULT} aria-label="help">
          <QuestionIcon />
        </Link>
        <Link
          type={Link.LINK_TYPE.ICON_DEFAULT}
          disabled={true}
          aria-label="help"
        >
          <QuestionIcon />
        </Link>
      </FlexLayout>
    </ContainerLayout>
  </StackingLayout>
  <StackingLayout>
    <Title size="h3">Secondary Appearance</Title>
    <ContainerLayout backgroundColor="white" border={true}>
      <FlexLayout alignItems="center" itemGap="XL" padding="20px">
        <Link type={Link.LINK_TYPE.ICON_SECONDARY} aria-label="help">
          <QuestionIcon />
        </Link>
        <Link
          type={Link.LINK_TYPE.ICON_SECONDARY}
          disabled={true}
          aria-label="help"
        >
          <QuestionIcon />
        </Link>
      </FlexLayout>
    </ContainerLayout>
  </StackingLayout>
  <StackingLayout>
    <Title size="h3">Navigation Appearance (dark backgrounds)</Title>
    <ContainerLayout backgroundColor="dark">
      <FlexLayout alignItems="center" itemGap="XL" padding="20px">
        <Link type={Link.LINK_TYPE.ICON_NAVIGATION} aria-label="help">
          <QuestionIcon />
        </Link>
        <Link
          type={Link.LINK_TYPE.ICON_NAVIGATION}
          disabled={true}
          aria-label="help"
        >
          <QuestionIcon />
        </Link>
      </FlexLayout>
    </ContainerLayout>
  </StackingLayout>
</StackingLayout>
```

#### Inline Link Example

```tsx
import { Paragraph, StackingLayout, Link } from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ padding: '10px' }}>
  <Paragraph>
    I am using inline link.
    <Link type={Link.LINK_TYPE.INLINE} href="https://example.com">
      Click Here
    </Link>{' '}
    to learn more.
  </Paragraph>
  <Paragraph>
    Secondary styling is available but not very common.
    <Link type={Link.LINK_TYPE.INLINE_SECONDARY} href="https://example.com">
      Click Here
    </Link>{' '}
    to learn more.
  </Paragraph>
</StackingLayout>
```

#### Inline Links With Icons

```tsx
import {
  Paragraph,
  StackingLayout,
  Link,
  ExternalLinkIcon,
  LinkIcon,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ padding: '10px', maxWidth: 250 }}>
  <Paragraph>
    Paragraph text with an{' '}
    <Link
      type={Link.LINK_TYPE.INLINE}
      iconRight={
        <ExternalLinkIcon
          aria-hidden="false"
          aria-label="Opens in a new tab"
          size={Link.LINK_SIZE.SMALL}
        />
      }
    >
      Inline link with icon right
    </Link>{' '}
    and some text after the link.
  </Paragraph>
  <Paragraph>
    Paragraph text with an{' '}
    <Link
      type={Link.LINK_TYPE.INLINE}
      iconLeft={<LinkIcon size={Link.LINK_SIZE.SMALL} />}
    >
      Inline link with icon left
    </Link>{' '}
    and some text after the link.
  </Paragraph>
</StackingLayout>
```

#### Alert Types Example

```tsx
import {
  Alert,
  FlexLayout,
  Link,
  StackingLayout,
  ExternalLinkIcon,
} from '@nutanix-ui/prism-reactjs'

// ALERT_* types should only be used inside Alert components
;<StackingLayout style={{ width: 500 }}>
  <Alert inline={true} message="Use alert link types only inside alerts." />
  <StackingLayout style={{ padding: '10px' }}>
    <FlexLayout justifyContent="space-between">
      <Link type={Link.LINK_TYPE.ALERT_INFO}>Info Alert Link</Link>
      <Link type={Link.LINK_TYPE.ALERT_SUCCESS}>Success Alert Link</Link>
      <Link type={Link.LINK_TYPE.ALERT_WARNING}>Warning Alert Link</Link>
      <Link type={Link.LINK_TYPE.ALERT_ERROR}>Error Alert Link</Link>
    </FlexLayout>
    <FlexLayout justifyContent="space-between">
      <Link
        type={Link.LINK_TYPE.ALERT_INFO}
        iconRight={<ExternalLinkIcon size={Link.LINK_SIZE.SMALL} />}
      >
        Info Alert Link with Icon
      </Link>
    </FlexLayout>
  </StackingLayout>
</StackingLayout>
```

#### Nav Types Example

```tsx
import {
  FlexLayout,
  Link,
  StackingLayout,
  ExternalLinkIcon,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ width: 600 }} itemGap="XL">
  <FlexLayout justifyContent="space-between">
    <Link type={Link.LINK_TYPE.NAV_PRIMARY}>Nav Primary Link</Link>
    <Link type={Link.LINK_TYPE.NAV_SECONDARY}>Nav Secondary Link</Link>
    <Link type={Link.LINK_TYPE.NAV_INFO}>Nav Info Link</Link>
  </FlexLayout>
  <FlexLayout justifyContent="space-between">
    <Link
      type={Link.LINK_TYPE.NAV_PRIMARY}
      iconRight={<ExternalLinkIcon size={Link.LINK_SIZE.SMALL} />}
      target="_blank"
      aria-label="Open nav primary link in a new tab"
    >
      Nav Primary with Icon
    </Link>
  </FlexLayout>
  <FlexLayout justifyContent="space-between">
    <Link size={Link.LINK_SIZE.SMALL} type={Link.LINK_TYPE.NAV_PRIMARY}>
      Small Nav Primary
    </Link>
    <Link size={Link.LINK_SIZE.SMALL} type={Link.LINK_TYPE.NAV_SECONDARY}>
      Small Nav Secondary
    </Link>
    <Link size={Link.LINK_SIZE.SMALL} type={Link.LINK_TYPE.NAV_INFO}>
      Small Nav Info
    </Link>
  </FlexLayout>
</StackingLayout>
```

#### Table Nav Primary Example

```tsx
import { FlexLayout, Link } from '@nutanix-ui/prism-reactjs'

// TABLE_NAV_PRIMARY is the only supported Link type inside table cells.
// Font is black at rest, turns blue on hover; weight 400 matches surrounding cell text.
;<FlexLayout style={{ padding: '10px' }} itemGap="XXL">
  <Link type={Link.LINK_TYPE.TABLE_NAV_PRIMARY}>Cell Nav</Link>
  <Link type={Link.LINK_TYPE.TABLE_NAV_PRIMARY} multiLine={true}>
    Multi-line Cell Nav
  </Link>
  <Link type={Link.LINK_TYPE.TABLE_NAV_PRIMARY} disabled={true}>
    Cell Nav Disabled
  </Link>
</FlexLayout>
```

#### Small Size Example

```tsx
import { FlexLayout, StackingLayout, Link } from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ width: 400, padding: '10px' }}>
  <FlexLayout justifyContent="space-between">
    <Link size={Link.LINK_SIZE.SMALL}>Primary Small</Link>
    <Link size={Link.LINK_SIZE.SMALL} disabled={true}>
      Primary Small Disabled
    </Link>
  </FlexLayout>
  <FlexLayout justifyContent="space-between">
    <Link size={Link.LINK_SIZE.SMALL} type={Link.LINK_TYPE.SECONDARY}>
      Secondary Small
    </Link>
    <Link size={Link.LINK_SIZE.SMALL} type={Link.LINK_TYPE.DELETE}>
      Delete Small
    </Link>
  </FlexLayout>
</StackingLayout>
```

#### Multi-Line Link Example

```tsx
import { FlexLayout, StackingLayout, Link } from '@nutanix-ui/prism-reactjs'

// Use multiLine when link text may wrap across multiple lines
;<StackingLayout style={{ width: 240, padding: '10px' }}>
  <FlexLayout>
    <Link multiLine={true}>I am a reaaallly long link that may wrap</Link>
    <Link multiLine={true} disabled={true}>
      Another long disabled link
    </Link>
  </FlexLayout>
  <FlexLayout>
    <Link size={Link.LINK_SIZE.SMALL} multiLine={true}>
      Small multi-line link
    </Link>
  </FlexLayout>
</StackingLayout>
```

#### Underline False Example

```tsx
import { FlexLayout, StackingLayout, Link } from '@nutanix-ui/prism-reactjs'

// Use underline={false} only for isolated links or icon-adjacent links.
// Links adjacent to plain text must always be underlined.
;<StackingLayout style={{ width: 550 }}>
  <FlexLayout justifyContent="space-between">
    <Link underline={false}>Primary Non Underlined</Link>
    <Link underline={false} type={Link.LINK_TYPE.SECONDARY}>
      Secondary Non Underlined
    </Link>
    <Link underline={false} type={Link.LINK_TYPE.DELETE}>
      Delete Non Underlined
    </Link>
  </FlexLayout>
</StackingLayout>
```

### Usage Notes

- Prefer documented enum/static values such as `Link.LINK_TYPE.<VALUE>` and `Link.LINK_SIZE.<VALUE>` over raw strings.
- Use `Link.LINK_TYPE.INLINE` (not `PRIMARY`) for links embedded within body text.
- Use `Link.LINK_TYPE.TABLE_NAV_PRIMARY` for all links inside table cells; it is the only officially supported type in that context.
- Alert link types (`ALERT_INFO`, `ALERT_SUCCESS`, `ALERT_WARNING`, `ALERT_ERROR`) should only appear inside `Alert` components.
- Nav link types (`NAV_PRIMARY`, `NAV_SECONDARY`, `NAV_INFO`) are for navigation sidebar usage.
- For external links that open in a new tab, use `ExternalLinkIcon` with `aria-hidden="false"` and `aria-label="Opens in a new tab"` as the `iconRight` value instead of adding the announcement to the Link's `aria-label`.
- `disabled` uses the accessible disabled pattern: `aria-disabled={true}` is set and `onClick` is suppressed, but the element stays in the tab order.
- Icon-only types always need `aria-label` since there is no visible text label.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.

<!-- SOURCE-API-END -->
