# Empty, First-Run, Prerequisite, And Moved States

"No data" is a designed pattern, not a default. Pick the right variant based
on **why** content is absent. Picking the wrong one is one of the most common
ways prototypes drift from the real product.

In this repo, every empty state renders **inside the body slot of the
existing global shell** in [`__root.tsx`](/apps/web/src/routes/__root.tsx).
The dark top bar and the global `SideNav` stay put on every variant —
no empty state hides, replaces, or unmounts them. Even the "fully white
first-run welcome" variant paints its own body content on white;
everything outside the body slot (top bar, side nav) remains.

For the canonical "filtered empty results" variant on an entity list, EBR
keeps its filter/action/browser chrome visible and renders the empty message
inside the browser region. Use raw `Table.customMessages` only for non-EBR
operations/status lists.

Reference screenshots:

- Filtered empty results inside the table: [`../assets/list-alerts-empty-filtered.png`](../assets/list-alerts-empty-filtered.png)
- First-time empty list with toolbar retained: [`../assets/list-templates-empty.png`](../assets/list-templates-empty.png)
- Fully white feature welcome (Data Protection): [`../assets/empty-first-run-fullwhite.png`](../assets/empty-first-run-fullwhite.png)
- Header-retained first-run pitch (Protection Policies List tab): [`../assets/empty-first-run-header-retained.png`](../assets/empty-first-run-header-retained.png)
- Prerequisite-blocked (Security Policies needs larger PC): [`../assets/empty-prerequisite-blocked.png`](../assets/empty-prerequisite-blocked.png)
- Moved capability (Operations moved): [`../assets/empty-moved-capability.png`](../assets/empty-moved-capability.png)
- Settings configuration empty/setup (External KMS): [`../assets/settings-config-empty-setup.png`](../assets/settings-config-empty-setup.png)
- Settings hub prompt (no item selected yet): [`../assets/settings-hub-prompt.png`](../assets/settings-hub-prompt.png)

## Pick by reason, not by visual

| Reason content is absent                                                               | Variant                                         | What you keep                                                                                                                   | What changes                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Filter combination yields zero rows                                                    | **Filtered empty results**                      | Header strip, tabs, banner, and EBR browser chrome (actions, filters, count/pagination as configured)                           | The EBR rows area renders a centered "No matching <Entity> for your current filter."                                                                                                                                                                       |
| Object type exists but no rows have been created yet                                   | **Empty entity list with toolbar (onboarding)** | Page title, List tab, and EBR browser chrome                                                                                    | The EBR region holds a centered educational message ("There are no Templates available.") and may expose a create action through `gettingStarted` or actions                                                                                               |
| Brand-new feature, never configured at the product level                               | **Fully white first-run feature landing**       | Dark top bar + global `SideNav` (both stay)                                                                                     | Inside the body content area, replaces the grey canvas with a full white welcome surface: centered headline + subhead + multi-column feature illustrations with captions + CTA row (secondary "Try on Test Drive" + primary "Get Started", centered)       |
| Feature exists, but a sub-list has never been used (e.g. Protection Policies List tab) | **Header-retained first-run landing**           | Page title and active tab in the white header strip                                                                             | The grey canvas hosts the centered feature pitch (illustration columns + CTA row) instead of a list                                                                                                                                                        |
| Current Prism Central deployment can't run this feature (size, edition, capability)    | **Prerequisite-blocked / unsupported**          | Shell remains. Global `SideNav` stays mounted (the user may have collapsed it via the hamburger, but the route never hides it). | Yellow `ⓘ` warning banner spans the full content width at the top of the main page area, with `×` close. Below it: centered illustration + headline + body + a single primary CTA which is often **disabled** ("Open Intelligent Operations" lighter blue) |
| Capability has moved elsewhere (Admin Center, Operations Dashboard)                    | **Moved-capability**                            | Same warning-banner-on-top + centered explanation as prerequisite                                                               | Main content points to the new location ("Intelligent Operations has moved...") with one primary CTA                                                                                                                                                       |
| Settings hub but no item selected yet                                                  | **Settings hub prompt**                         | Dark top bar + global `SideNav` + the in-body settings menu                                                                     | Main panel (right of the in-body settings menu): centered large gear icon, "Prism Central Settings" headline, "Choose an item on the left to configure" copy                                                                                               |
| Settings page selected but the integration / configuration hasn't been set up          | **Settings configuration empty/setup**          | Dark top bar + global `SideNav` + the in-body settings menu with the item highlighted                                           | Right-of-menu grey canvas with H2 title + thin separator at top, then centered illustration + multi-column explanation + optional "Support Portal ↗" link + primary CTA ("+ Add External KMS")                                                            |

## Anatomy of each variant

### Filtered empty results

Lives inside the EBR rows/browser region for entity lists. Everything outside
the rows area (header strip, tabs, banner, actions, filters, count/pagination
as configured) stays exactly as it was when rows existed. Do not collapse the
page chrome.

Copy: "No matching <Entity> for your current filter." Keep it short. Pair
with a "Clear filters" affordance only if the browser does not already expose
filter-chip removal or a clear action.

### First-time empty list with toolbar (onboarding)

Used when the entity type exists but no instances have been created. Keep the
page title and List tab. Keep the primary "+ Create" action through EBR
actions or `gettingStarted` (sometimes disabled if a prerequisite is missing).
The browser region holds a centered educational message instead of rows.
Examples: VM Templates when no templates exist.

### Fully white first-run feature landing

Used the **first time** a user visits a feature area that has never been
configured. Inside the body content area, replaces the grey canvas with
a fully white surface. The dark top bar and the global `SideNav` both
remain — only the body content changes. Structure of the white surface:

1. Large centered H1 ("Data Protection and Recovery").
2. Short explanatory subtitle.
3. Two or more illustrated capability tiles, each with its own headline and
   short description ("Protection Policies", "Recovery Plans").
4. CTA row centered at the bottom: secondary ("Try on Test Drive") + primary
   ("Get Started").

This pattern is not for "list with zero rows" — it is for "feature that has
never been turned on at all". For zero-row lists with a real configured
feature, use the header-retained variant or the empty-list-with-toolbar
variant.

### Header-retained first-run landing

Same content shape as the fully white welcome (illustration columns + CTA
row), but the **standard page title and tab strip remain** in the white
header strip, and the body stays on the grey canvas. Used when the feature
itself is configured but a specific tab has no objects yet (Protection
Policies List tab).

### Prerequisite-blocked / unsupported

Use when the deployment can't run the feature. Two stacked elements:

1. A **yellow warning banner** at `y = 60` (above where the header strip
   would be), spanning the full main area width, with an `ⓘ` icon, message
   ("This Prism Central size does not support Flow"), inline "Learn More"
   link, and `×` close.
2. Centered illustration + headline + body + a single primary CTA. The CTA
   is often **disabled** because the user cannot proceed without first
   resolving the prerequisite — a disabled enablement button (lighter blue)
   is preferable to no CTA at all.

The shell remains visible: the dark top bar and the global `SideNav`
stay where they are, so the user keeps their place in the product.

### Moved-capability

Same shape as prerequisite-blocked: warning banner + centered explanation +
primary CTA. The difference is **intent** — this isn't an inability, it's a
relocation. Banner copy points to the new location ("Intelligent Operations
has moved to Operations Dashboard"), and the primary CTA navigates to the new
location ("Open Intelligent Operations", "Manage Licenses in Admin Center").

### Settings hub prompt

The first thing a user sees when they land on Settings without selecting
an item. Inside the body content area, the route shows a fixed-width
white settings menu on the left and a centered prompt on the right (gear
illustration + "Prism Central Settings" + "Choose an item on the left to
configure"). The global `SideNav` is still mounted to the left of the
body, untouched.

### Settings configuration empty/setup

A specific settings page where setup hasn't been done. Inside the body
content area, the in-body settings menu shows the selected item. The
grey canvas to the right of that menu starts with an H2 title (e.g.
"External KMS") and a thin horizontal separator. Below that: centered
illustration + multi-column explanation + optional "Support Portal ↗"
link + primary CTA ("+ Add External KMS"). The global `SideNav` is
unaffected. See [`settings.md`](settings.md) for the broader settings
layout.

## Common slot mapping (Prism React)

| Variant                 | Components                                                                                                                                                                                                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Filtered empty          | EBR empty rows/no-results state for entity lists; `Table.customMessages` only for non-EBR operations/status lists                                                                                                                                                                                             |
| Empty list onboarding   | EBR `gettingStarted` or entity action config for entity lists; hand-built CTA only for non-EBR pages                                                                                                                                                                                                          |
| Fully white welcome     | The route renders a single white `StackingLayout background="base"` filling the body slot, containing centered `FlexLayout` columns of illustration + caption (use `prism-craft` illustrations), `Button.ButtonTypes.PRIMARY` + `Button.ButtonTypes.SECONDARY`. The `__root.tsx` shell stays intact above it. |
| Header-retained landing | `<PageHeader />` from `~/components/common` + same illustration + CTA body on the grey canvas (do not remove the strip)                                                                                                                                                                                       |
| Prerequisite/moved      | `Alert type={Alert.AlertTypes.WARNING} showCloseIcon` at top + centered illustration + `Title` + `Paragraph` + `Button` (often `disabled`)                                                                                                                                                                    |
| Settings hub prompt     | Centered illustration + `Title size={Title.SIZES.H2}` + `Paragraph`                                                                                                                                                                                                                                           |
| Settings config empty   | `Title size={Title.SIZES.H2}` + `Divider` + centered illustration block + `Button.ButtonTypes.PRIMARY`                                                                                                                                                                                                        |

## Anti-patterns

- "No data" rendered as bare text on the grey canvas with no card and no
  illustration.
- Hiding EBR actions/filters/browser chrome when a list is empty.
- Using the fully white welcome for "filter yields zero rows".
- Using the prerequisite banner for "user hasn't created any rows yet".
- Removing the disabled CTA on a prerequisite-blocked page (keeping a visible
  disabled CTA is part of the pattern — it tells the user what they would do
  once unblocked).
- Stripping the standard page header for a first-time empty list. The header
  retains identity and lets the user navigate sibling tabs.
