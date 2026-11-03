# Tag

Source: [https://ds.nutanix.design/components/tag](https://ds.nutanix.design/components/tag)
React: `Badge` (with tag variant)

---

## Overview

A Tag is a visual, non-interactive text label containing small amounts of keyword-categorized information or states (e.g. system status, category tags, filter states).

---

## Usage Guidelines

- **Categorization**: Use to group, organize, or label items using simple keyword descriptors.
- **Static Content**: Tags display passive information; they do not trigger actions and are non-interactive.
- **Length**: Keep tag labels extremely short to support scanning.

---

## Content Guidelines

- **Length limit**: Keep tag text short and concise, strictly **1–3 words per tag**. Never write full sentences.
- **Casing**: **Title Case** (e.g. `2 Ports Down`, `Partially Migrated`).
- **Consistency**: Apply the same wording for identical states across the entire product. Do not invent alternative terms.
- **Punctuation**: Do **not** use ending periods or exclamation marks.

---

## Accessibility

- **No Color-Only State**: If a tag uses color to convey status (e.g., error, warning, success), it **must include a supporting icon**.
- **Icon Alt Text**: Provide appropriate alternative text on the tag icon to describe its semantic meaning (e.g., "Success", "Error").
