# Link

Source: [https://ds.nutanix.design/components/link](https://ds.nutanix.design/components/link)
React: `Link`

---

## Overview

The Link component navigates the user to a specific URL or page.

---

## Weight & Styling

- **Primary (Blue)**: Use when there are only a few links on a page, to highlight an important link, or when the link is inline within a paragraph.
- **Neutral**: Use when there are multiple links grouped in the same layout (e.g. tables or widgets).
- **Underline Rule**:
  - Links adjacent to non-interactive text **must be underlined** (including in tables, paragraphs, and sentences).
  - Isolated links or links with an icon do **not** need to be underlined by default.
  - Links in tables must always be underlined and use the `table-nav-primary` type (weight 400).

---

## Variants & Props

- **Types**: Primary (Blue), Secondary (Dark gray), Table-Nav-Primary (Dark gray, weight 400, always underlined).
- **Icons**: Can be placed on the left or right of the text.
  - `External Link Icon`: Use for external links that open in a new tab, switch apps, or cause a significant workflow switch/long load times.
  - `Chevron Icon`: Use for links that move users forward or expand summaries into detailed views.
- **Icon Link**: Wraps just an icon as a hyperlink.
- **Sizing**: Default size is 14px. Only use small (12px) if the link is part of a 12px text body.

---

## Content Guidelines

- **Structure**: Write exactly what the link allows the user to do. Do **not** use vague or generic labels.
  - **Do**: _Disable auto renewal_, _Read about recovery points_, _View events_
  - **Don't**: _Disable_, _Read more_, _View_
- **Casing**: Sentence case. Keep proper nouns capitalized.
- **Punctuation**: Do **not** use punctuation (such as periods) in links.
- **Placement**: Place links either at the beginning or the end of a sentence. Avoid embedding them in the middle of a sentence to ensure scanning ease.

---

## Accessibility

- **Contrast standard**: Sighted links must have a contrast ratio of at least 3:1 with surrounding text. If contrast is insufficient, always accompany links with underlines or supporting icons.
- **Interactive Role**: Distinguish links (which navigate) from text buttons (which perform actions like "Add Disk") for screen readers during handoff.

---

## Compliance Checklist

- [ ] **Underline adjacent links**: Links next to other body text or inside tables are underlined.
- [ ] **Descriptive anchor text**: Avoid generic text like "Read more" or "Click here".
- [ ] **Table-nav-primary settings**: Table links use `table-nav-primary` (weight 400).
- [ ] **No mid-sentence links**: Links are at the start or end of a sentence.
- [ ] **Appropriate external icons**: Links navigating out of the current context or opening a new tab use the External Link icon.
