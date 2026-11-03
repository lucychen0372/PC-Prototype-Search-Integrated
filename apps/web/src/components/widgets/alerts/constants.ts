import type { TableColumn } from '@nutanix-ui/prism-reactjs/lib/components/v2/Tables/Table'

// Mock data
export const MOCK_DATA = {
  openAlertsCountBySeverity: {
    critical: 12,
    warning: 45,
    info: 8,
  },
  openAlertsCount: 65,
  last24Alerts: {
    critical: 3,
    warning: 12,
    info: 2,
  },
}

export const SEVERITY_KEYS = ['critical', 'warning', 'info'] as const

export const SEVERITY_LABELS = {
  critical: 'Critical',
  warning: 'Warning',
  info: 'Info',
}

export const SEVERITY_COLORS = {
  critical: 'var(--color-primitives-red-800)',
  warning: 'var(--color-primitives-yellow-600)',
  info: 'var(--color-primitives-grey-500)',
}

export const ALERT_COLUMN_OPTIONS: TableColumn[] = [
  {
    title: 'Severity',
    key: 'label',
    rowHeader: true,
  },
  {
    title: 'Severity Count',
    key: 'value',
    textAlign: 'right' as const,
  },
]
