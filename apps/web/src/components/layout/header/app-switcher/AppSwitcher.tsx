import { Select } from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import './AppSwitcher.css'
import { APPS_DATA } from './constants'

export interface AppSwitcherProps {
  selectedApp: SelectRowData | undefined
  onAppChange: (app: SelectRowData | undefined) => void
}

export const AppSwitcher = ({ selectedApp, onAppChange }: AppSwitcherProps) => {
  return (
    <Select
      className="app-switcher"
      type="borderless"
      selectedRow={selectedApp}
      rowsData={APPS_DATA}
      onSelectedChange={(row) => onAppChange(row)}
      placeholder="Select App"
      dropdownProps={{
        className: 'app-switcher-dropdown',
      }}
    />
  )
}
