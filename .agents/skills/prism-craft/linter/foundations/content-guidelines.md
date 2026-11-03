# Content Guidelines

Source: [https://ds.nutanix.design/foundations/content-guidelines](https://ds.nutanix.design/foundations/content-guidelines)

---

## Overview

Content guidelines outline the standards for creating clear, consistent, and user-focused communication across all our product flows. It defines the expected voice, tone, and language conventions to ensure alignment across teams and touchpoints.

_Refer to the official [Terminology PDF](https://ds.nutanix.design/pdfs/nutanix-terminology-playbook.pdf) for specific definitions, examples, and usage guidance._

---

## Voice & Tone

### Voice (Core Brand)

- **Insightful**: We communicate information that helps users understand context, purpose, or impact.
- **Clear**: We use direct, simple language that is easy to read and interpret.
- **Concise**: We deliver only the information needed, without unnecessary detail or repetition.
- **Trustworthy**: We provide accurate and reliable content that users can trust.

### Tone (Contextual Adaptation)

- **Honest**: Straightforward and transparent, without overstating or overselling.
- **Conversational**: Natural, everyday language that prioritizes readability while maintaining a professional tone.
- **Helpful**: Supportive through user journeys, providing solutions that do not overwhelm.

---

## Language & Structure

### U.S. English Default

All content must follow U.S. English spelling and grammar conventions.

- **Do**: Color, Standardize, Program, Customize, Analyze
- **Don't**: Colour, Standardise, Programme, Customise, Analyse

### Active Voice

Use active voice for all content by default to ensure communication is direct and easy to process.

- **Do**: _The Nutanix cluster automatically applies security patches during the scheduled maintenance window._
- **Don't**: _Security patches are automatically applied by the Nutanix cluster during the scheduled maintenance window._
- **Do**: _Security policy created_
- **Don't**: _The security policy has been created_

### No Contractions

Do not use contractions in our UI content to ensure clarity and reduce misinterpretation for a global audience.

- **Do**: _The system cannot detect the network_
- **Don't**: _The system can't detect the network_

---

## Grammar & UI Writing Rules

### UI Casing Rules

We use sentence case for long-form content and title case for short-form content.

- **Sentence Case** (Only the first letter capitalized): For alert banners, modal descriptions, inline errors, and tooltips.
  - _Example_: `Configure storage policies for your workloads`
- **Title Case** (All major words capitalized): For CTA buttons, table titles, tags, page headers, menu items, and steppers.
  - _Example_: `Configure Storage Policies For Your Workloads`

### Nouns (Proper vs. Common)

- **Proper Nouns**: Specific, unique entities (e.g. London, Google, Prism Element, Prism Central, Nutanix Disaster Recovery) are **always capitalized** (written in Title Case).
- **Common Nouns**: General concepts or industry-standard terms (e.g. clusters, recovery plans, volume groups, virtual machines, protection points, nodes) are **written in lowercase (sentence case)** unless they begin a sentence or appear in UI labels. _Over-capitalization reduces readability._

### Numbers

Always use digits/numbers to improve clarity and reduce cognitive load.

- **Do**: _The maximum allowed duration is 6 months_
- **Don't**: _The maximum allowed duration is six months_

### Dates

Use the format **DD MM YYYY** (no commas, no ordinal suffixes) to improve scanning in activities/logs.

- **Do**: `14 Jan 2025`
- **Don't**: `Jan 14 2024` or `14th Jan 2025`

**Date Ranges:**

- Use an en dash (–) without spaces in lists/ranges: `14 Jan 2025–25 Feb 2025`
- Use "from" and "to" in sentences: _This page is under maintenance from 14 Jan 2025 to 25 Feb 2025_
- Lead with the day when writing day and date: `Tue, 14 Jan 2025`

**Day/Month Abbreviations:**

- Mon, Tue, Wed, Thu, Fri, Sat, Sun
- Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec

### Time & Time Zones

- Use the **12-hour clock format** with a colon separating hours and minutes.
- Specify AM or PM (with a preceding space).
- Specify the time zone (abbreviated, no parentheses, separated by a space).
  - **Do**: `10:30 PM UTC`
  - **Don't**: `22:30 p.m.` or `10:30 PM (UTC)`
- **Ranges**: Use an en dash (–) with no spaces: `10:30 PM–12:30 AM`

### Durations & Timestamps

- Duration up to 23 hours: Lead with hours (e.g. `2 Hours ago`, `10 h 30 m 40 s`).
- Over 23 hours: Switch to days (e.g. `3 Days ago`).
- Over 7 days: Use relative or absolute timestamps based on severity. Never force the user to manually calculate timestamps.

### File Formats

Use capitalized file extensions without a leading dot.

- **Do**: _Upload a file in CSV format_
- **Don't**: _Upload a file in .csv format_

---

## Punctuation Rules

### Periods (.)

- **Do Use**: At the end of full sentences (multiple sentences, complete alert messages, long descriptions). Single space after periods.
- **Do NOT Use**: For headings, field labels, button names, tooltips, short help text, menu names, or lists made of fragments.

### Commas (,) & Oxford Comma

- Use the **Oxford (serial) comma** before the final item in a list to avoid ambiguity.
  - **Do**: _You can use the move tool to migrate files, VMs, and security policies._
  - **Don't**: _You can use the move tool to migrate files, VMs and security policies._

### Semicolons (;)

- Connect closely related independent sentences without conjunctions.
  - **Do**: _You can manage virtual machines across multiple clusters using Prism Central; this centralization simplifies operations._

### Hyphens (-), En Dash (–), and Em Dash (—)

- **Hyphen (`-`)**: Connect words functioning together as an adjective before a noun (e.g. `scale-out`, `user-friendly`). Replacing with a space when used as verbs.
- **En Dash (`–`)**: Range of values or connecting contrasting concepts (no spaces around en dash, e.g. `2022–2025`, `east–west traffic`).
- **Em Dash (`—`)**: Insert breaks in thought, add emphasis, or extra details (no spaces around em dash).
  - _Example_: `Nutanix delivers simplicity and performance—without compromise.`

### Exclamation Marks (!)

- **Do not use** exclamation marks in Nutanix products. They introduce false urgency and resemble warning/error icons.

### Brackets ( ) & Plural Forms

- **Avoid bracketed plurals** (e.g., `VM(s)`, `node(s)`). They slow readability.
- **Do**:
  - Use singular if only one input is allowed: _Add a VM_
  - Use plural if one or more inputs are allowed: _Add VMs_

### Ampersands (&)

- Write out "and" in almost all cases.
- Use ampersands **only** in extremely limited space (table headers, CTAs) or established business terms (e.g. _Terms & Conditions_).

---

## Words to Avoid

Do NOT use the following words in UI writing:

- `abort`, `are you sure?`, `black hat`, `blacklist`, `blackout`, `hang`, `he/him/his`, `kill`, `kill the application`, `oops`, `please`, `she/her`, `something went wrong`, `successfully`, `uh-oh`, `you can`, `you shall`.
