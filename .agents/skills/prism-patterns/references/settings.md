# Settings

> **Scope note for this prototype.** The repo currently ships a placeholder
> Settings route at [`apps/web/src/routes/settings.tsx`](/apps/web/src/routes/settings.tsx)
> that is intentionally minimal. Treat the dedicated settings layout
> described below as **opt-in**: only build it when the user explicitly
> asks for the "settings menu", "settings shell", "settings hub", or
> names a specific settings page. For most prompts ("add a Tags page
> under Settings"), default to the standard list/detail/dashboard
> patterns inside the same global shell as the rest of the app — keep
> the global `SideNav` mounted, render the 50px white page-header strip,
> and put the settings content on the grey canvas.
>
> **Important:** the global `SideNav` (Dashboard, Compute, Storage,
> Network & Security, Data Protection, etc.) is **never** removed —
> not on Settings, not anywhere. Even when a user is deep inside a
> settings page, the global side nav stays where it is. The user can
> only collapse it via the hamburger toggle in the top header. Any
> settings-specific menu lives **inside the body content area**, to
> the right of the global side nav, alongside the actual settings
> content. It is a secondary nav within the page, not a replacement
> for the global one.

When the user does ask for the full settings experience, follow the rest
of this document. Settings is a layout deviation in Prism Central: the
dark top bar stays, the global `SideNav` stays, and **inside the body
content area** a secondary white "settings menu" appears that lets the
user pick which setting to configure. The right-hand portion of the
body holds the settings content itself.

Reference screenshots:

- Settings hub (no item selected): [`../assets/settings-hub-prompt.png`](../assets/settings-hub-prompt.png)
- Settings configuration empty/setup (External KMS): [`../assets/settings-config-empty-setup.png`](../assets/settings-config-empty-setup.png)
- Moved-to-Admin-Center settings panel (Licensing): [`../assets/settings-moved-panel.png`](../assets/settings-moved-panel.png)

## Default (recommended for the prototype)

For a new settings sub-page where no extra deviation is requested, just
treat it like any other route:

1. Keep the global `SideNav` exactly as it is. Don't toggle
   `leftPanelVisible` programmatically for this.
2. Add an entry under the appropriate group in
   [`SideNav/constants.ts`](/apps/web/src/components/layout/side-nav/constants.ts)'s
   `MENU_DATA` — or, if the prompt is about the existing "Settings"
   surface, route to `/settings/<slug>`.
3. In the route component, render the same 50px white page-header strip
   used by `routes/index.tsx` and `VmPage.tsx` — that is, `<PageHeader />`
   from `~/components/common`:
   ```tsx
   <PageHeader title={settingName} />
   ```
4. Below it, render the settings form/cards on the grey canvas (the
   `StackingLayout background="body"` from `__root.tsx` already provides
   the grey).

This keeps the settings page consistent with every other page in the
prototype and avoids re-implementing a parallel shell.

## Full settings shell (only when explicitly asked for)

When the prompt is specifically about the Prism Central settings menu
itself — e.g. "build the Settings hub", "add the settings left menu",
"make this look like the real Settings page" — render the layout below.

Critical: this layout **adds a secondary menu inside the body content
area**. It does **not** replace, hide, or modify the global `SideNav`.
The global side nav remains visible to its left, exactly as on every
other page. If the user collapses the global nav with the hamburger,
that is a user action; the route does not collapse it for them.

### Required vertical / horizontal layout

1. **Dark global top bar** stays — see [`global-shell.md`](global-shell.md).
2. **Global `SideNav`** stays. The Settings route does not change
   anything about it.
3. **Inside the body content area** (everything to the right of the
   global side nav), split into two regions side by side:
   - **Settings menu (left of body content):** a fixed-width white
     column directly inside the body. Contents:
     - Top of the column: H1 "Settings" title with a thin underline.
     - Below it: small-caps section labels ("General", "Setup", "Flow",
       "Security") each followed by indented menu links. Selected item
       is highlighted with a pale background and an accent left border.
     - Bottom of the column: a "More Settings" link with an info icon.
   - **Main panel (right of the settings menu):** sits on the grey
     canvas (`var(--color-background-body)`). **No separate white
     page-header strip.** The page heading is an **H2 at the top of the
     grey area**, followed by a thin horizontal separator, then the
     configuration content. When no settings item is selected at all,
     the main panel becomes the **settings hub prompt** (see below).

This is the only place in the product where the route omits the white
page-header strip between the dark top bar and the grey canvas. Don't
add one — it breaks the pattern.

To wire this up, render both regions inside the route's body component
(e.g. a `FlexLayout` with the settings menu on the left and the
configuration panel on the right). The global shell in `__root.tsx`
remains untouched.

### Settings hub prompt (no item selected)

Centered in the main panel:

- Large gear illustration.
- "Prism Central Settings" headline (`Title size={Title.SIZES.H1}`).
- Prompt copy: "Choose an item on the left to configure".

This is the landing state when the user opens Settings without picking
anything yet.

### Settings configuration empty/setup state

Used when an item is selected but its configuration hasn't been done yet
(External KMS, certain integrations).

| Slot                 | Content                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| Top of the grey area | H2 page heading (e.g. "External KMS") + thin horizontal separator                                |
| Body                 | Centered illustration + multi-column explanation paragraphs + optional "Support Portal ↗" link  |
| CTA                  | Single primary action ("+ Add External KMS"), centered or right-aligned per the specific setting |

### Moved-to-Admin-Center settings panel

Used for capabilities that have been migrated out of Prism Central
Settings into Admin Center (Licensing, monitoring-related settings).
Same shape as the moved-capability empty state in
[`empty-and-onboarding.md`](empty-and-onboarding.md):

- Optional warning banner at the top of the main panel.
- Centered illustration + headline + explanatory copy + a single primary
  CTA that navigates to Admin Center ("Manage Licenses in Admin
  Center").

### Settings configuration page (populated)

Once configuration exists, the page replaces the centered prompt with
the actual content. Patterns observed:

- 2-column grid of white configuration cards on the grey canvas (each
  card with its own H3 heading, controls, and `⋮` overflow menu).
- Or a single white form panel for simpler integrations.

### Common slot mapping (Prism React)

| Slot                                | Component(s)                                                                                                                                                                                                                                                           |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Settings menu (inside body content) | A fixed-width white column rendered as a `StackingLayout background="base"` containing grouped section labels and menu rows. Selected item carries the accent border. **Sits inside the route body, alongside the main panel — not in place of the global `SideNav`.** |
| Main panel heading                  | `Title size={Title.SIZES.H2}` + `Divider`                                                                                                                                                                                                                              |
| Settings hub prompt                 | Centered `FlexLayout` with illustration + `Title size={Title.SIZES.H1}` + `Paragraph`                                                                                                                                                                                  |
| Configuration empty/setup           | Centered `FlexLayout` with illustration + multi-column `Paragraph`s + `Link type={Link.LinkType.PRIMARY}` to Support Portal + `Button.ButtonTypes.PRIMARY`                                                                                                             |
| Moved panel                         | `Alert type={Alert.AlertTypes.WARNING}` + centered illustration + `Title` + `Paragraph` + `Button`                                                                                                                                                                     |
| Configuration cards grid            | `FlexLayout itemGap="M" flexWrap="wrap"` of `ContainerLayout` cards                                                                                                                                                                                                    |

## Anti-patterns

- Building the full settings shell when the user only asked for "a new
  settings page". Default to the regular page-header strip pattern.
- **Removing, hiding, or replacing the global `SideNav` on a settings
  route.** The global side nav is always present on every page,
  including settings. Only the user can collapse it (via the hamburger
  toggle).
- Treating the settings menu as a replacement for the global nav. It is
  a secondary, in-body menu that sits alongside the existing nav.
- Adding a white page-header strip above the grey canvas inside the full
  settings shell. It doesn't exist there; the H2 inside the grey area
  is the heading.
- Centering H1s on configuration pages where setup is done. The H1 is
  for the empty hub prompt; populated configuration pages use H2 +
  content.
- Treating "moved" settings as the same as "unconfigured" settings.
  Moved panels point to Admin Center; unconfigured panels guide setup.
- Hardcoding the grey canvas color (`#edf0f2` / `rgb(237, 240, 242)`)
  instead of `var(--color-background-body)`.
