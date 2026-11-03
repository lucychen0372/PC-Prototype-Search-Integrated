# Alert Banner

Source: [https://ds.nutanix.design/components/alert-banner](https://ds.nutanix.design/components/alert-banner)
React: `Alert`

---

## Overview

Alert Banners are high-priority placeholders used at a section or page level to communicate critical, time-sensitive system status changes, warnings, or errors.

---

## Severity Levels

- **Info (Blue)**: Default alert used to notify users of high-priority system status changes.
- **Success (Green)**: Confirms that an instruction was processed successfully.
- **Warning (Yellow)**: Alerts users of potentially unfavorable, critical situations. If immediate attention is required, use a critical error banner.
- **Critical (Red)**: Major error preventing a user from continuing, requiring manual actions to resolve.

---

## Variants & Props

- **With Link**: Link text in alert banners must use **underlines instead of blue color** to meet contrast rules.
- **With Pagination**: Used when multiple alert messages exist, sorted chronologically.
- **Inside Modals**: Full-width page banners align with the width of the page container, not the content.
- **Section Banners**: Rounded-corner cards that align specifically with the width of the local content area.
- **Succinct Copy**: Keep alert banners as short as possible, displaying only the most critical information.

---

## Content Guidelines (Writing for Alerts)

Alert banner copy must be clear, concise, and helpful. Follow these basic guidelines:

- **Voice & Tone**: Insightful, clear, and helpful. Do not use technical jargon, sorry-words, or blame the user.
- **Active Voice**: Write all descriptions in active voice.
- **Casing**: **Sentence case** for body descriptions. Keep proper nouns capitalized. Action links/buttons are written in sentence case.
- **Punctuation**: Do **not** use ending periods for short phrases or fragments. Use periods only for complete sentences. Never use exclamation marks (`!`) or ellipses (`…`).
- **Words to Avoid**: `Please`, `successfully`, `oops`, `sorry`, `uh-oh`, `something went wrong`, `you shall`, `you can`.

### Structural Formula:

An effective message must describe one or more of:

1. **What happened**: State the trigger.
2. **Why/How it happened**: Briefly state the cause if helpful.
3. **What to do next**: Explicit, actionable resolution steps.
4. **Alternative solution**: Present a workaround if immediate resolution is not available.

_Example (Critical Alert)_:

- _Message_: `Unable to migrate 6 NSX policies attached to the selected VMs. These policies require FNS equivalents to preserve security configuration during migration. Create the corresponding policies manually in FNS before continuing with VM migration.`

---

## Accessibility

- **Descriptive Icons**: Background color alone must not be the sole means of distinguishing severity. Accompany all alerts with descriptive, built-in icons.
- **Alt Text**: Alt text is pre-baked into the banner's severity level (e.g. Warning, Success, Error). Do **not** repeat the icon's alternative text inside the text body of the banner.

---

## Compliance Checklist

- [ ] **Underlined alert links**: Any embedded links inside alert banners are underlined.
- [ ] **Sentence Case body description**: Alert banner text is written in sentence case.
- [ ] **No words to avoid**: The text contains no instances of forbidden words (e.g., "successfully", "please", "oops").
- [ ] **Active voice phrasing**: Descriptions are written in direct active voice.
- [ ] **No exclamation marks**: The text contains no exclamation marks.
- [ ] **Icons present**: Banner displays the appropriate severity status icon.
- [ ] **No period on short fragments**: Short phrases or title alerts do not end with periods.
