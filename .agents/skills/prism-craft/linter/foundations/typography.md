# Typography

Source: [https://ds.nutanix.design/foundations/typography](https://ds.nutanix.design/foundations/typography)

---

## Nutanix Soft

Nutanix Soft is our brand's exclusive custom-designed typeface. It is designed to improve Proxima Nova's legibility at smaller sizes, reinforce brand identity, and maintain visual consistency across all digital products.

### Guidelines

- **Exclusive Usage**: Nutanix Soft is the only typeface used throughout our design system.
- **Universal Application**: Used for all titles, copy, navigation, form elements, and buttons.
- **Improved Legibility**: Optimized for smaller sizes to ensure readability across all devices.
- **Weight Usage**: Use weights systematically to define visual hierarchy:
  - **Regular (400)**: Primary weight for body text and general content.
  - **Medium (500)**: Used for emphasis, secondary headings, and form labels.
  - **Semibold (600)**: Used for primary headings and key interactive elements.
  - **Thin (100)**: Reserved exclusively for large titles and display text.
- **No Italic Styling**: The use of italic text is **not supported** in our system.

---

## Heading Scale

Headings use size to indicate their relative importance in the content hierarchy, helping users quickly scan structure.

| Level  | Size | Weight          | Usage                                    |
| ------ | ---- | --------------- | ---------------------------------------- |
| **H1** | 32px | Thin / Semibold | Page titles, major section headers       |
| **H2** | 24px | Semibold        | Section headers, card titles             |
| **H3** | 20px | Medium          | Subsection headers, feature titles       |
| **H4** | 16px | Medium          | Minor section titles, list headers       |
| **H5** | 14px | Semibold        | Small section titles, emphasized content |

### Figma & React Implementation

- Always apply the appropriate text style from the design library.
- Titles should use appropriate line-height values (generally 1.2–1.3× the font size).
- Maintain consistent spacing between titles and content (typically Medium spacing).
- **React mapping**: Always use the `<Title size={Title.SIZES.H1-H4}>` component. Do not use generic headings or static inline CSS.

---

## Paragraph

Paragraphs form the foundation of our content, starting on a new line and appearing as blocks.

| Style          | Size | Weight  | Usage                                        |
| -------------- | ---- | ------- | -------------------------------------------- |
| **Body Large** | 16px | Regular | Primary content, important information       |
| **Body**       | 14px | Regular | Standard content, descriptions, most UI text |
| **Body Small** | 12px | Regular | Secondary information, UI support text       |

### Figma & React Implementation

- Use consistent line height (generally 1.5× the font size for paragraphs).
- Apply proper paragraph spacing (typically Small spacing between paragraphs).
- **React mapping**: Always use the `<Paragraph>` component for body content.

---

## Label

Small text elements used to describe, associate, or inform without drawing attention away from the primary content.

| Style       | Size | Weight  | Usage                                   |
| ----------- | ---- | ------- | --------------------------------------- |
| **Label**   | 12px | Medium  | Form field labels, secondary navigation |
| **Caption** | 10px | Regular | Supporting text, timestamps, metadata   |

### Figma & React Implementation

- Maintain consistent spacing between labels and associated elements (typically Extra Small spacing).
- **React mapping**: Always use the `<TextLabel>` component.

---

## Code & Monospaced Font

For code representation, we use **Menlo** as our monospaced typeface. Its characters have equal spacing, making it ideal for rendering code and terminal outputs.

| Style    | Size | Typeface | Usage                                                   |
| -------- | ---- | -------- | ------------------------------------------------------- |
| **Code** | 13px | Menlo    | Standard code blocks, terminal commands, configurations |

### Figma & React Implementation

- Use Menlo font for all code representations.
- Apply dedicated code block components or wrap in appropriate inline code markers when displaying code.

---

## Typographic Scale (Outdated Reference)

For visual check support, our baseline scale is based on an exponential progression starting at 10px:

- Size 1: 10px (Caption, smallest UI text)
- Size 2: 12px (Small UI text, labels)
- Size 3: 14px (Body text, standard UI)
- Size 4: 16px (Large body text, important UI)
- Size 5: 20px (Small headings)
- Size 6: 24px (Medium headings)
- Size 7: 32px (Large headings, page titles)
