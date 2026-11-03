# Wizard And Modal

Use this for any prompt that involves "creating", "setting up", "enabling",
"configuring", or "introducing" — anything where the user is making a
multi-step or first-encounter decision.

Reference screenshots:

- Full-page create wizard (Create VM): [`../assets/wizard-create-vm.png`](../assets/wizard-create-vm.png)
- "What's New" / first-run modal: [`../assets/modal-whats-new.png`](../assets/modal-whats-new.png)
- Enablement / prerequisite modal (Enable DR): [`../assets/modal-enablement-dr.png`](../assets/modal-enablement-dr.png)
- Top-bar status popover (Tasks): [`../assets/popover-tasks-topbar.png`](../assets/popover-tasks-topbar.png)

## Pick by intent

| Intent                                                                                    | Variant                                                                                               |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Multi-step creation of a real product object (VM, cluster, policy, template)              | **Full-page wizard**                                                                                  |
| First-time intro to a feature or capability before the user starts using it               | **"What's New" / first-run modal**                                                                    |
| Turning on a feature that has prerequisites, often launched from a settings or empty page | **Enablement / prerequisite modal**                                                                   |
| Compact global status surface launched from a top-bar icon (tasks, alerts, events)        | **Top-bar popover** (see also [`side-panels-popovers-overflow.md`](side-panels-popovers-overflow.md)) |

## Full-page wizard

**Canonical implementation:** [`apps/web/src/components/vms/vm-wizard/`](/apps/web/src/components/vms/vm-wizard/)

- Shell: [`VmWizardShell.tsx`](/apps/web/src/components/vms/vm-wizard/VmWizardShell.tsx)
- Steps: `VmConfigurationStep.tsx`, `VmResourcesStep.tsx`, `VmManagementStep.tsx`, `VmReviewStep.tsx`
- State: [`useVmWizardStore.ts`](/apps/web/src/components/vms/vm-wizard/useVmWizardStore.ts) (Zustand store; `VM_WIZARD_STEPS` defines the step order)
- Launch point: [`VmPage.tsx`](/apps/web/src/components/vms/VmPage.tsx) renders `<VmWizardShell mode="create" | "update" />` conditionally based on `wizardLaunch` state; the EBR action dispatcher fires a `vm-wizard:launch` custom event (see `VmActionPopupContainer.tsx`)

Used when creation has multiple stages. Inside the body content area,
the wizard owns the surface — the grey canvas is replaced with a fully
white wizard panel that fills the body. The dark top bar and the global
`SideNav` stay mounted on every page in this product (the user can
collapse the side nav with the hamburger toggle, but the wizard route
does not unmount it). Treat the wizard as a full-bleed body experience
inside the standard shell, not as a takeover of the entire viewport.

The Prism component used is `FullPageModal` (not a route). It is mounted
inside `VmPage` alongside the EBR, conditioned on the launch state. The
`mode` prop drives both the title ("Create VM" vs "Update VM") and the
final submit label ("Create" vs "Save").

Vertical sequence:

1. **Wizard top bar (white)** — rendered by `FullPageModal`:
   - `title` prop: `<Title tag={Title.SIZES.H2} size={Title.SIZES.H3}>Create VM</Title>`
   - `headerActions`: `?` help `Button` (icon-only) + `×` close `Button` (icon-only). Closing a dirty wizard triggers the discard-confirm `Modal`.
2. Thin horizontal separator (built into `FullPageModal`).
3. **Centered horizontal stepper** — `<Steps current={activeStepIndex} data={stepData} onStepChange={...} />`. Steps: Configuration → Resources → Management → Review. Future steps beyond `activeStepIndex + 1` are `disabled`; past steps remain clickable.
4. **Banner alerts** — `<Alert>` stack above the form content for validation errors and submit failures; each is dismissible.
5. **Form content** centered in a narrow column (`.vm-wizard__form-content`), with grouped section headings and inline field hints.
6. **Footer actions** directly below the form column (`.vm-wizard__footer`), NOT pinned to the viewport bottom:
   - Left: `Back` (`Button.ButtonTypes.SECONDARY`), hidden on the first step.
   - Right cluster: `Cancel` (`SECONDARY`) + `Next` / `Create` / `Save` (`PRIMARY`). Final-step label is `"Create"` (create mode) or `"Save"` (update mode).

Inputs follow normal Prism conventions: required name, optional description,
project / cluster `Select`s, numeric inputs for VM count / CPU / cores /
memory, etc. (see `prism-craft`).

### Discard-confirm dialog

When the user closes a dirty wizard, a `Modal` overlays the `FullPageModal`:

```
title: "Discard VM changes?"
footer: "Continue editing" (SECONDARY) | "Discard" (PRIMARY)
```

Implemented inline in `VmWizardShell.tsx` using `<Modal visible={isDirtyCloseConfirmationOpen} ... />`.

### Resource subform modals (nested `Modal` inside the wizard)

Resources step rows (disks, NICs, GPUs, PCI devices, SR-IOV NICs) each open
a standard `Modal` on top of the `FullPageModal`. Implemented in
[`VmResourceSubformModal.tsx`](/apps/web/src/components/vms/vm-wizard/VmResourceSubformModal.tsx):

- `width={500}`, `restoreFocus={true}`
- Title driven by subform type + mode (e.g. "Add Disk" / "Update NIC")
- Footer: `Cancel` (SECONDARY) + `Save` (PRIMARY), right-aligned via `FlexLayout justifyContent="flex-end"`
- Optional `<Alert type={ERROR}>` at the top of the body for operation errors
- On Save: runs per-type validation; commits to wizard store on success, sets field errors on failure

## "What's New" / first-run modal

Centered over a dimmed product page. The product page stays visible but
darkened underneath. Structure:

| Slot   | Content                                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Header | Title left + `×` close at top-right                                                                                                              |
| Body   | Illustration / diagram + headline + multi-paragraph explanation (often broken into H3 sub-sections) + optional "Learn more" / documentation link |
| Footer | A single primary action at the bottom-right ("Got it", "Get Started", "Done", "Take Tour")                                                       |

Use for: "first time you see this dashboard", "we changed how X works",
"feature has shipped". After dismissal, some pages retain an inline alert/
banner explaining the prerequisite or change.

## Enablement / prerequisite modal

Centered over the current page; commonly launched from a settings page or an
empty feature page. Structure:

| Slot                     | Content                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Header                   | Title + `×` close                                                                                                                    |
| Optional tabs / sections | Below the header (precheck, configure) when the enablement has multiple stages but doesn't warrant a full wizard                     |
| Body                     | Requirement copy, illustration, any input fields needed to enable                                                                    |
| Footer                   | Secondary "Cancel" / "Skip for now" on the left of the right-aligned cluster, primary action ("Enable", "Continue") on the far right |

The primary action **stays disabled until prerequisites are met** (e.g. the
required cluster has been picked, the Network Controller has been
configured). Disabled-but-visible is the pattern — do not hide it.

## Top-bar popover

Anchored beneath the triggering top-bar icon, near the top-right corner. Has
a small downward arrow tail toward its trigger. Compact rectangular panel
with rounded corners. Does **not** take over the page.

| Slot   | Content                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------ |
| Header | Panel title + summary status counts (e.g. tasks badge: red `× 2`, green `✓ 0`, blue `⟳ 6`)       |
| Body   | Scrollable list of rows: entity name, related target, percentage / status indicator, inline icon |
| Footer | Split-button row with two equal actions ("Clean up" / "View All")                                |

Use this for global status items where the user wants a quick check without
leaving their current page. The "View All" action navigates to the equivalent
full list (Tasks list, Alerts list, etc.).

## Common slot mapping (Prism React)

| Slot             | Component(s)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full-page wizard | `FullPageModal` (`@nutanix-ui/prism-reactjs`) with `title={<Title>}` + `headerActions={[helpButton, closeButton]}`. Inside: `Steps` for the stepper, narrow-column form content, `Alert` stack for banner errors, footer via `FlexLayout justifyContent="space-between"` (Back left / Cancel+Next right). Discard confirmation uses a plain `Modal` nested inside. Resource subform rows open a second `Modal` (`width={500}`) on top. State managed by a Zustand store (`useVmWizardStore`). |
| First-run modal  | `Modal` with `title`, body content, `footer` containing a single primary `Button`                                                                                                                                                                                                                                                                                                                                                                                                             |
| Enablement modal | `Modal` (or `ConfirmModal` for short flows) with optional `Tabs` in the body, `footer` with Cancel + primary Button (often `disabled`)                                                                                                                                                                                                                                                                                                                                                        |
| Top-bar popover  | `Popover` anchored to the top-bar icon, containing a header `FlexLayout`, a scrollable rows region, and a `ButtonGroup` footer                                                                                                                                                                                                                                                                                                                                                                |

## Anti-patterns

- Using a `Modal` for multi-step creation. Multi-step creation belongs in a
  full-page wizard.
- Pinning the wizard footer actions to the viewport bottom. They sit
  directly under the form column.
- Hiding the dark top bar or the global `SideNav` in any wizard or
  modal. Both stay mounted at all times — the wizard or modal occupies
  the body content area, not the whole viewport.
- Using a popover for content that requires a long sustained interaction —
  promote to a side panel or a full page in that case.
- Hiding the disabled primary action on an enablement modal. Keep it visible
  to teach what becomes possible once prerequisites are met.
- Using the discard confirmation pattern for read-only or trivial flows.
  Reserve it for dirty creation/edit workflows.
