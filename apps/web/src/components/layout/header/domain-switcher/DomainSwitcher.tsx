import { Select } from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { DOMAINS_DATA } from './constants'
import './DomainSwitcher.css'

export interface DomainSwitcherProps {
  selectedDomain: SelectRowData | undefined
  onDomainChange: (domain: SelectRowData | undefined) => void
}

export const DomainSwitcher = ({
  selectedDomain,
  onDomainChange,
}: DomainSwitcherProps) => {
  return (
    <Select
      className="domain-switcher"
      type="borderless"
      selectedRow={selectedDomain}
      rowsData={DOMAINS_DATA}
      onSelectedChange={(row) => onDomainChange(row)}
      placeholder="Select Domain"
      dropdownProps={{
        className: 'domain-switcher-dropdown',
      }}
    />
  )
}
