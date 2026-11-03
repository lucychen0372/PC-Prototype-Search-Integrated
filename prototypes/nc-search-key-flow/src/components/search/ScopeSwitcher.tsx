import { FlexLayout, Select } from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { useState, type SyntheticEvent } from 'react'
import '~/components/layout/header/domain-switcher/DomainSwitcher.css'
import { SCOPES } from '@proto/data/catalog'

const ROWS: SelectRowData[] = SCOPES.map(({ key, label }) => ({ key, label }))

// Sits inside the search Dropdown trigger; keep its clicks and keys from toggling search.
const stop = (event: SyntheticEvent) => event.stopPropagation()

interface ScopeSwitcherProps {
  /** `canvas` is the default bordered Select for light page surfaces (results header). */
  variant?: 'header' | 'canvas'
}

/** Template DomainSwitcher pattern (borderless Select + DomainSwitcher.css) with DND domains. */
export const ScopeSwitcher = ({ variant = 'header' }: ScopeSwitcherProps) => {
  const [selected, setSelected] = useState<SelectRowData | undefined>(ROWS[0])

  if (variant === 'canvas') {
    return (
      <Select
        className="results-scope"
        selectedRow={selected}
        rowsData={ROWS}
        onSelectedChange={(row) => setSelected(row)}
        aria-label="Scope"
      />
    )
  }

  return (
    <FlexLayout
      className="search-scope"
      alignItems="center"
      onClick={stop}
      onMouseDown={stop}
      onKeyDown={stop}
      onFocus={stop}
    >
      <Select
        className="domain-switcher"
        type="borderless"
        selectedRow={selected}
        rowsData={ROWS}
        onSelectedChange={(row) => setSelected(row)}
        placeholder="Select Domain"
        aria-label="Domain"
        dropdownProps={{ className: 'domain-switcher-dropdown' }}
      />
    </FlexLayout>
  )
}
