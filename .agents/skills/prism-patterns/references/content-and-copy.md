# Content And Copy Conventions

Picking the right page archetype is half the battle; using the right copy
is the other half. These are the small, consistent pieces of text and
behavior that make the prototype read as Prism Central rather than as a
generic admin app.

## Count language

Lists begin with a count line in one of three forms:

| Situation          | Form                                                                         | Example                                                               |
| ------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| All rows visible   | `Viewing all N <Entity>`                                                     | "Viewing all 18 Storage Containers", "Viewing all 7 Hosts"            |
| Filters applied    | `N Filtered <Entity> out of M`                                               | "40 Filtered Alerts out of 54", "Viewing 1 filtered VM"               |
| Zero rows total    | `There are no <Entity> available.`                                           | "There are no Templates available.", "There are no Alerts available." |
| Filters yield zero | Inside the white table body: `No matching <Entity> for your current filter.` | (filter row + chips remain visible)                                   |

Pluralize the entity name. Capitalize each word ("Storage Containers", "VM
Templates", "Recovery Points"). Don't drop the count — even at zero, the
count line is the first cue the user reads.

## Detail-page header counts

Detail headers use **inline tag chips with linked counts** for related
entities:

- `Cluster <name> ⌄`
- `Host 1 Hosts ⌄` (entity has 1 host child; clicking goes to the filtered
  Hosts list)
- `VM 2 VMs ⌄` (entity has 2 VM children)

Always pluralize correctly. The count is a link, not just text. The trailing
`⌄` indicates the chip can switch scope.

## Action labels

Use the real product's verbs. Each archetype has a set:

| Archetype                                 | Common labels                                                                                                                                             |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| List toolbar — primary                    | "+ Create <Entity>", "+ New <Entity>", "Register <Entity>", "Import"                                                                                      |
| List toolbar — secondary (often disabled) | "Update", "Clear", "Delete", "Acknowledge", "Resolve", "Rename", "Extend", "Manage Categories", "Deploy", "Launch Console", "Power Operations", "Migrate" |
| List toolbar — view controls              | "Group by ⌄", "View by General ⌄"                                                                                                                         |
| List utilities                            | "Export", "Show: 20 rows ⌄", "≡ Modify Filters", "× Clear all"                                                                                            |
| Detail toolbar                            | "Update", "Launch Console", "Power Operations", "Clone", "Create VM Template", "Upgrade Software", "Rack Configuration", "Manage Categories", "More"      |
| Wizard footer                             | "Cancel", "Next", "Back", "Save" (final step)                                                                                                             |
| Modal footer                              | "Cancel" / "Skip for now", primary action ("Got it", "Get Started", "Enable", "Continue", "Done")                                                         |
| Dashboard widgets                         | "View all <N> ...", "View Details", "Configure", "Manage"                                                                                                 |
| Empty/moved states                        | "Get Started", "Try on Test Drive", "Create Protection Policies", "Open Intelligent Operations", "Manage Licenses in Admin Center", "+ Add External KMS"  |

Avoid generic verbs like "Submit", "OK", "Apply" unless the screen specifically
calls for one (filter panels can use "Apply"; "OK" is rare in this product).

## Disabled-but-visible rule

Three places this rule shows up; do not break it:

1. **List row-selection actions.** Update / Delete / Acknowledge / Rename
   stay visible in the toolbar even when no row is selected; they render
   disabled.
2. **Prerequisite-blocked CTAs.** On unsupported / moved / blocked pages, the
   primary CTA renders **disabled** in lighter blue rather than disappearing.
3. **Overflow menus.** Disabled items remain visible (greyed text), often
   with a tooltip explaining why ("Host cannot be removed: Minimum host
   count needs to be greater than 3...").

This rule teaches what's possible. Hiding actions makes the page feel inert.

## Banner copy

Notice / migration banners are short, structured: a status icon (`ⓘ` or `⚠`),
one sentence of explanation, and an inline "Learn More" link, with `×` close
at the right edge.

Examples observed:

- "PC Monitoring is moving to Admin Center. This page will disappear from
  Infrastructure in future releases. Learn More ↗"
- "Intelligent Operations widgets... are now available in Operations
  Dashboard."
- "This Prism Central size does not support Flow. Learn More ↗"

Keep it to one sentence + one link. Don't expand banners into multi-paragraph
notes — that's what the centered explanation is for on a moved/prerequisite
page.

## Empty / first-run copy

Three guiding shapes:

- **Filtered empty:** one line, "No matching <Entity> for your current
  filter."
- **Onboarding (object exists, no rows):** "There are no <Entity>
  available." inside the white table region, optionally with "+ Create" CTA.
- **First-run feature welcome:** large H1 + short subhead + 2-3 illustrated
  capability tiles + CTA pair (secondary "Try on Test Drive" + primary "Get
  Started"). The capability tile copy is two lines: a short headline and a
  one-sentence description of what the capability does.

## Inline relationships

Wherever you'd otherwise show a foreign-key value, show it as `<entity-type
chip> <linked name or count> ⌄`. This applies to:

- Detail headers (covered above).
- Table cells that reference another entity (the related entity name is
  linked, not plain text).
- Side-panel detail sections ("Entities Affected" carries chip lists with
  links).

If the related entity is unknown / missing, render an explicit "—" or "No
data found" rather than dropping the field.

## Tone

- Direct and operational. "Update" not "Make changes". "Resolve" not
  "Mark as fixed".
- No marketing tone in product chrome. Marketing tone appears only in
  first-run welcome surfaces and "What's New" modals.
- No exclamation marks in toolbars, banners, or count lines.
- No emoji in product chrome.

## Headings

The prototype's existing pages — `routes/index.tsx`, `VmPage.tsx`,
`VmDetailsPage.tsx` — already pin the heading sizes. Match them so new
pages don't drift.

| Level | Where it appears                                                                                                                                                                                                                                      |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H1    | First-run welcome headlines and settings hub prompts only. **Not** used for normal page titles — the existing pages all use H2/H3 in the white header strip                                                                                           |
| H2    | Page title in the 50px white header strip on list / dashboard / settings pages (`<Title size={Title.SIZES.H2}>VMs</Title>`); sub-resource tab heading inside a detail page (e.g. "NICs")                                                              |
| H3    | Entity name on a detail page (next to the type chip), as in `VmDetailsPage.tsx`; widget card heading; EBR/browser count headings where the browser renders them; section heading inside a wizard form ("General", "VM Properties"); modal sub-section |
| H4    | Compact sub-headings inside dashboard widgets (e.g. `AlertsWidget.tsx`'s "New Alerts (Last 24 Hours)")                                                                                                                                                |

Do not skip levels arbitrarily. Match the existing pattern when introducing
a new page so the visual rhythm is consistent.

## Linked counts on dashboards

Counts on dashboards are almost always links to filtered list pages. Default
to making them links unless the user has explicitly asked for a static
read-only widget. The link copy is the count itself ("39"), not "View 39
alerts".

## What to avoid in copy

- "There are 0 records." → use "There are no <Entity> available." instead.
- "Click here" → use the action verb ("Get Started", "Configure", "View
  Details").
- "Loading..." as a literal user-facing string in chrome — use Prism's
  `Loader` / `Table` loading states instead.
- Sentence-cased section headings inside detail panels — these are
  **Title-Cased** in the real product ("Policies and Management", not
  "Policies and management").
