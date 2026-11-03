# Paragraph

## Figma

- **Library name:** Paragraph / Body Text (page: Data Display, frame: Typography)

## React

Import: `import { Paragraph } from '@nutanix-ui/prism-reactjs'`

### Enums

```ts
Paragraph.APPEARANCE.DEFAULT // "default"
Paragraph.APPEARANCE.NAVIGATION // "navigation"
```

> Note: the static member is `Paragraph.APPEARANCE`, **not** `Paragraph.ParagraphAppearance`. The exported TypeScript enum is `ParagraphAppearance` (used for type annotations), but runtime access goes through `Paragraph.APPEARANCE`.

### Props

| Prop                   | Type                                                     | Default                   | Required | Notes                                                                                                |
| ---------------------- | -------------------------------------------------------- | ------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `appearance`           | `ParagraphAppearance`                                    | —                         | No       | `NAVIGATION` for dark/nav backgrounds                                                                |
| `type`                 | `'primary' \| 'secondary' \| 'supplementary'`            | `'primary'`               | No       | Controls text styling weight/color                                                                   |
| `className`            | `string`                                                 | —                         | No       | `"no-wrap"` forces single line                                                                       |
| `maxLines`             | `number`                                                 | `0`                       | No       | Clamp lines; `0` = no limit                                                                          |
| `ellipses`             | `ReactNode`                                              | `'...'`                   | No       | Custom ellipsis node; default renders a `TripleDotHorizontal` icon button with tooltip               |
| `truncateBgColor`      | `string`                                                 | `'color-background-base'` | No       | CSS var name for the background behind the fade/ellipsis; must match the actual container background |
| `forceMultiLineHeight` | `boolean`                                                | `false`                   | No       | Always use multi-line height even when single line                                                   |
| `wrapperDivProps`      | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>` | —                         | No       | Props passed to the outer wrapper `<div>` when `maxLines` is set                                     |
| `ellipsesButtonProps`  | `ButtonProps`                                            | —                         | No       | Extra props for the default ellipsis `<Button>`                                                      |
| `ellipsesTooltipProps` | `ToolTipProps`                                           | —                         | No       | Extra props for the default ellipsis `<Tooltip>` (e.g. override `content`)                           |
| `ellipsesWrapperProps` | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>` | —                         | No       | Extra props for the `<div>` wrapping the ellipsis element                                            |
| `data-test`            | `string`                                                 | —                         | No       | Test selector on the `<p>` element                                                                   |
| `children`             | `ReactNode`                                              | —                         | No       | Body text content                                                                                    |

All other standard `React.HTMLProps<HTMLDivElement>` props (e.g. `style`, `onClick`, `onKeyDown`) are forwarded to the root element.

### Behaviour

- **Single vs multi-line height:** The component measures its own rendered height on mount and on window resize and applies either `single-line` or `multi-line` CSS class. `forceMultiLineHeight` skips the measurement and always applies `multi-line`.
- **`maxLines` truncation:** When `maxLines > 0` the component renders a hidden measurement `<p>` and a visible `<p>` inside a wrapper `<div>`. When the content overflows the clamped height, an ellipsis element appears at the bottom-right with a fade gradient.
- **Expand on click / keyboard:** A truncated paragraph can be expanded by clicking anywhere on it (mouse) or pressing `Enter` / `Space` when focused on the ellipsis button (keyboard / a11y). After expansion the mouse user can click again to re-collapse; keyboard users cannot re-collapse (Figma 24.4 a11y design decision).
- **`truncateBgColor`:** Must match the CSS variable name of the nearest ancestor with a background color (e.g. `"color-background-nav-base"` inside the nav rail, `"color-background-info-primary"` inside an Alert Info). Defaults to `"color-background-base"`.

### TSX Examples

```tsx
import { Paragraph } from '@nutanix-ui/prism-reactjs'

{
  /* Basic body text (primary type, default) */
}
;<Paragraph>
  Configure your model endpoints and manage inference workloads.
</Paragraph>

{
  /* Secondary type */
}
;<Paragraph type="secondary">
  Supporting detail shown at reduced emphasis.
</Paragraph>

{
  /* Supplementary type */
}
;<Paragraph type="supplementary">
  Hint text or metadata at lowest emphasis.
</Paragraph>

{
  /* Force multi-line height even for a single line */
}
;<Paragraph forceMultiLineHeight>
  One-line text that always reserves multi-line vertical space.
</Paragraph>

{
  /* Truncate to 2 lines with default ellipsis */
}
;<div style={{ maxWidth: 400 }}>
  <Paragraph maxLines={2}>
    Very long description that might overflow and should be clamped to two lines
    with an ellipsis at the end.
  </Paragraph>
</div>

{
  /* Truncate to 1 line — override tooltip and button labels */
}
;<div style={{ maxWidth: 400 }}>
  <Paragraph
    maxLines={1}
    ellipsesTooltipProps={{ content: 'Expand to Read More' }}
    ellipsesButtonProps={{ 'aria-label': 'Read More' }}
    wrapperDivProps={{ 'data-test-id': 'maxlines-one' }}
  >
    When paragraph text exceeds a single line this component will automatically
    adjust the line height accordingly.
  </Paragraph>
</div>

{
  /* Custom ellipsis node */
}
;<div style={{ maxWidth: 400 }}>
  <Paragraph
    maxLines={2}
    ellipses={<Button type={Button.ButtonTypes.TEXT_SECONDARY}>+++</Button>}
    ellipsesWrapperProps={{ style: { bottom: 2 } }}
  >
    Long text that will be truncated with a custom expand trigger.
  </Paragraph>
</div>

{
  /* Truncation on a non-default background */
}
;<Alert
  inline
  type={Alert.AlertTypes.INFO}
  message={
    <AlertLayout type={AlertLayout.AlertLayoutTypes.INLINE}>
      <Paragraph truncateBgColor="color-background-info-primary" maxLines={2}>
        Long alert message that will be truncated with the correct background
        fade.
      </Paragraph>
    </AlertLayout>
  }
/>

{
  /* Navigation appearance */
}
;<Paragraph appearance={Paragraph.APPEARANCE.NAVIGATION}>
  Logged in as admin@nutanix.com
</Paragraph>

{
  /* Navigation appearance — truncated, nav background */
}
;<Paragraph
  appearance={Paragraph.APPEARANCE.NAVIGATION}
  truncateBgColor="color-background-nav-base"
  maxLines={1}
>
  Very long nav label that should be clamped to one line.
</Paragraph>

{
  /* Paragraph with an inline Link */
}
;<Paragraph type="secondary">
  There is something wrong here. Visit our{' '}
  <Link type={Link.LINK_TYPE.ICON_RIGHT} icon={<ExternalLinkIcon />}>
    technical pages
  </Link>{' '}
  to see more details.
</Paragraph>
```

### Anti-patterns

- Don't use a raw `<p>` HTML tag — use `Paragraph`.
- Don't use CSS `text-overflow` or `-webkit-line-clamp` manually — use `maxLines`.
- Don't pass `Paragraph.ParagraphAppearance` at runtime — use `Paragraph.APPEARANCE`.
- Don't set `truncateBgColor` to a hex/rgb color; pass the CSS variable **name** (e.g. `"color-background-nav-base"`), not its value.

<!-- SOURCE-API-START -->

### Import

```tsx
import { Paragraph } from '@nutanix-ui/prism-reactjs'
```

### Enums / Constants

#### `ParagraphAppearance` (TypeScript enum, export name)

| Key          | Value          |
| ------------ | -------------- |
| `DEFAULT`    | `'default'`    |
| `NAVIGATION` | `'navigation'` |

Runtime access: `Paragraph.APPEARANCE.DEFAULT` / `Paragraph.APPEARANCE.NAVIGATION`

### Props Interfaces

#### `ParagraphProps`

Extends: `Omit<React.HTMLProps<HTMLDivElement>, 'ref'>, React.PropsWithChildren<any>`

| Prop                   | Type                                                     | Default                   | Description                                                                                                                  |
| ---------------------- | -------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `appearance`           | `ParagraphAppearance`                                    | —                         | Appearance of Paragraph (`DEFAULT` or `NAVIGATION`).                                                                         |
| `type`                 | `'primary' \| 'secondary' \| 'supplementary'`            | `'primary'`               | Force paragraph text styling (weight/color level).                                                                           |
| `className`            | `string`                                                 | —                         | Additional classname. `"no-wrap"` forces text to stay in one line.                                                           |
| `forceMultiLineHeight` | `boolean`                                                | `false`                   | Force paragraph to always use multi-line height styling.                                                                     |
| `maxLines`             | `number`                                                 | `0`                       | Limit number of lines to display. `0` = no limit.                                                                            |
| `ellipses`             | `React.ReactNode`                                        | `'...'`                   | Custom ellipsis shown when `maxLines` is reached. Default renders a `TripleDotHorizontalIcon` button wrapped in a `Tooltip`. |
| `truncateBgColor`      | `string`                                                 | `'color-background-base'` | CSS variable name of the container background; needed for the fade effect when the paragraph is truncated.                   |
| `wrapperDivProps`      | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>` | —                         | Props passed to the outer wrapper `<div>` (only rendered when `maxLines > 0`).                                               |
| `ellipsesButtonProps`  | `ButtonProps`                                            | —                         | Additional props for the default ellipsis `<Button>`.                                                                        |
| `ellipsesTooltipProps` | `ToolTipProps`                                           | —                         | Additional props for the default ellipsis `<Tooltip>`.                                                                       |
| `ellipsesWrapperProps` | `DataWrapperProps<React.HTMLAttributes<HTMLDivElement>>` | —                         | Additional props for the `<div>` wrapping the ellipsis element.                                                              |
| `data-test`            | `string`                                                 | —                         | `data-test` attribute on the `<p>` element.                                                                                  |
| `children`             | `React.ReactNode`                                        | —                         | Body text content.                                                                                                           |

### Static Members

- `Paragraph.APPEARANCE` = `ParagraphAppearance`

### Source Examples

These are adapted from the Prism source examples. Some older examples use inline `style` or `<div>` wrappers; when generating app code, translate layout and spacing to Prism layout props where possible.

#### Primary Example

```tsx
import { Paragraph } from '@nutanix-ui/prism-reactjs'
;<Paragraph data-test-id="type-primary">
  This is a single line paragraph text. By design single line has 10px line
  height.
</Paragraph>
```

#### Secondary Example

```tsx
import { Paragraph } from '@nutanix-ui/prism-reactjs'
;<Paragraph type="secondary" data-test-id="type-secondary">
  This is a single line paragraph text. By design single line has 10px line
  height.
</Paragraph>
```

#### Supplementary Example

```tsx
import { Paragraph } from '@nutanix-ui/prism-reactjs'
;<Paragraph type="supplementary" data-test-id="type-supplementary">
  This is a single line paragraph text. By design single line has 10px line
  height.
</Paragraph>
```

#### Limit to 1 Line (with custom tooltip and button labels)

```tsx
import { Paragraph } from '@nutanix-ui/prism-reactjs'
;<div style={{ maxWidth: 400 }}>
  <Paragraph
    maxLines={1}
    wrapperDivProps={{ 'data-test-id': 'maxlines-one' }}
    ellipsesTooltipProps={{
      content: 'Expand to Read More',
      className: 'my-tooltip-message',
    }}
    ellipsesButtonProps={{
      'aria-label': 'Read More',
    }}
  >
    When paragraph text exceeds a single line this component will automatically
    adjust the line height accordingly. Here is a very long paragraph.
  </Paragraph>
</div>
```

#### Limit to 2 Lines

```tsx
import { Paragraph } from '@nutanix-ui/prism-reactjs'
;<div style={{ maxWidth: 400 }}>
  <Paragraph
    maxLines={2}
    truncateBgColor="color-background-base"
    wrapperDivProps={{ 'data-test-id': 'maxlines-two' }}
    ellipsesButtonProps={{ 'data-test-id': 'expand-button' }}
  >
    When paragraph text exceeds 2 lines this component will automatically adjust
    the line height accordingly. Here is a very long paragraph.
  </Paragraph>
</div>
```

#### Custom Ellipsis Node

```tsx
import { Button, Paragraph } from '@nutanix-ui/prism-reactjs'
;<div style={{ maxWidth: 400 }}>
  <Paragraph
    maxLines={2}
    ellipses={<Button type={Button.ButtonTypes.TEXT_SECONDARY}>+++</Button>}
    ellipsesWrapperProps={{ style: { bottom: 2 } }}
  >
    When paragraph text exceeds 2 lines this component will automatically adjust
    the line height accordingly. Here is a very long paragraph.
  </Paragraph>
</div>
```

#### Non-default Background Color (Alert Info)

```tsx
import { Alert, AlertLayout, Paragraph } from '@nutanix-ui/prism-reactjs'
;<Alert
  inline
  type={Alert.AlertTypes.INFO}
  message={
    <AlertLayout type={AlertLayout.AlertLayoutTypes.INLINE}>
      <Paragraph truncateBgColor="color-background-info-primary" maxLines={2}>
        Maecenas posuere dui in ex placerat, sed tristique lorem hendrerit.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia Curae;
      </Paragraph>
    </AlertLayout>
  }
/>
```

#### Navigation Appearance — Truncated

```tsx
import { Paragraph } from '@nutanix-ui/prism-reactjs'
;<Paragraph
  appearance={Paragraph.APPEARANCE.NAVIGATION}
  truncateBgColor="color-background-nav-base"
  maxLines={1}
  wrapperDivProps={{ 'data-test-id': 'nav-background-color' }}
>
  When paragraph text exceeds a single line this component will automatically
  adjust the line height accordingly.
</Paragraph>
```

#### Navigation Appearance — Secondary Type

```tsx
import { Paragraph } from '@nutanix-ui/prism-reactjs'
;<Paragraph type="secondary" appearance={Paragraph.APPEARANCE.NAVIGATION}>
  Supporting text on a navigation background.
</Paragraph>
```

#### Navigation Appearance — Supplementary Type

```tsx
import { Paragraph } from '@nutanix-ui/prism-reactjs'
;<Paragraph type="supplementary" appearance={Paragraph.APPEARANCE.NAVIGATION}>
  Hint text on a navigation background.
</Paragraph>
```

#### Inline Link in Paragraph

```tsx
import { ExternalLinkIcon, Link, Paragraph } from '@nutanix-ui/prism-reactjs'
;<Paragraph type="secondary" data-test-id="link-me">
  There is something wrong here. Visit our{' '}
  <Link type={Link.LINK_TYPE.ICON_RIGHT} icon={<ExternalLinkIcon />}>
    technical pages
  </Link>{' '}
  to see more details.
</Paragraph>
```

#### Anatomy of a Paragraph (font-size / line-height diagram)

```tsx
import {
  FlexLayout,
  Paragraph,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout style={{ minWidth: 700, maxWidth: 700 }}>
  <FlexLayout itemGap="S">
    <FlexLayout
      itemGap="XS"
      alignItems="flex-start"
      style={{ minWidth: 60, paddingTop: 5 }}
    >
      <FlexLayout flexDirection="column" itemGap="S" alignItems="flex-end">
        <TextLabel
          type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}
          display={TextLabel.TEXT_LABEL_DISPLAY.BLOCK}
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          style={{ paddingTop: 2 }}
        >
          14px
        </TextLabel>
        <TextLabel
          display={TextLabel.TEXT_LABEL_DISPLAY.BLOCK}
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        >
          font size
        </TextLabel>
      </FlexLayout>
    </FlexLayout>
    <Paragraph type="secondary" forceMultiLineHeight>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus metus
      vel lacus feugiat, non sodales felis ultricies. Ut euismod tempor quam, ut
      aliquet justo in posuere.
    </Paragraph>
  </FlexLayout>
  <FlexLayout itemGap="S" alignItems="flex-start">
    <Paragraph forceMultiLineHeight type="secondary">
      Text Spacing (WCAG Level AA): The line height is set at 1.5x of the font
      size.
    </Paragraph>
  </FlexLayout>
</StackingLayout>
```

### Usage Notes

- Prefer documented enum/static values such as `Paragraph.APPEARANCE.<VALUE>` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- When `maxLines` is active, `wrapperDivProps` targets the outer wrapper `<div>` and `data-test` targets the inner `<p>`; use them accordingly for test selectors.

<!-- SOURCE-API-END -->
