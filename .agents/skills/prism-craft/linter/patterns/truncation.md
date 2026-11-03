# Truncation

Source: [https://ds.nutanix.design/patterns/truncation](https://ds.nutanix.design/patterns/truncation)

---

## Overview

Truncation is the practice of shortening a string of text with an ellipsis (...) when it exceeds the available space of its container. Because truncation increases cognitive load (users have to guess what is missing) and requires browser resources to calculate layouts, it is **heavily discouraged** and should be a last resort. Whenever possible, prioritize **wrapping text**, **responsive layout adjustments**, or **expanding containers** to show the full information.

## Types of Truncation

- **React Component:** Our core library provides a specialized React component designed to mitigate accessibility gaps. Unlike static CSS methods, this component remains keyboard-focusable and supports screen readers by providing the full text via an ARIA-label or an integrated tooltip. It ensures that users navigating via keyboard can "discover" the hidden content that a mouse user might see on hover.
- **Basic CSS Truncation:** Usually implemented via `text-overflow: ellipsis`. This is a "set and forget" method that is highly performant but fundamentally inaccessible. Because the ellipsis is a visual-only treatment, the hidden text is often unreachable for screen reader users and provides no native way for a sighted user to reveal the clipped content without developer-side intervention (like adding a `title` attribute).
- **Middle Truncation:** Unlike standard right-aligned truncation, middle truncation is not supported by native CSS. It requires custom JavaScript to calculate the container width and programmatically split the string (e.g., `very_long_file_name...2024.pdf`). These methods are computationally expensive because the browser must constantly recalculate the string length during window resizing. From an accessibility standpoint, they are even more confusing as they break the natural flow of reading and often mask the most unique parts of a string.

## When to Use (Acceptable Exceptions)

Truncation is acceptable in specific UI patterns where context is secondary or space is strictly rigid:

- **Titles/Headers in Sidebars:** Where the primary goal is navigation and the full name is visible on the main page.
- **Dropdown Triggers:** To prevent a long selection from breaking the button UI.
- **Input Fields:** Where the user has already typed the value and knows what it contains.

## Implementation Rule

**Always use the React version instead of raw CSS.** This ensures that every instance of truncation in our product remains accessible, interactive, and consistent with our design tokens.

## Do's

- DO treat truncation as a last resort and prioritize text wrapping, responsive layouts, or expanding containers first.
- DO use the specialized **React component** for truncation instead of raw CSS to maintain accessibility.
- DO ensure that users navigating via keyboard can discover hidden/truncated content via an ARIA-label or integrated tooltip.
- DO only use truncation where space is strictly rigid and context is secondary (e.g. sidebar navigation, dropdown triggers, and input fields).

## Don'ts

- DON'T use basic CSS truncation (`text-overflow: ellipsis`) as it is fundamentally inaccessible and unreachable for screen readers.
- DON'T use middle truncation unless absolutely necessary, as it requires expensive JavaScript calculations and breaks the natural flow of reading.
- DON'T truncate critical user-facing information without offering a native way (like an accessible tooltip) to reveal the clipped content.
