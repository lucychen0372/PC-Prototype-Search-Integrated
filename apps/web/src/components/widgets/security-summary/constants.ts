import type { ChartSizes, SecurityIssue } from './types'

export const MOCK_SECURITY_DATA: SecurityIssue[] = [
  {
    key: 'securityHardening',
    label: 'Security Hardening Issues',
    count: 4,
    color: 'var(--color-primitives-green-600)',
  },
  {
    key: 'stig',
    label: 'STIG Issues',
    count: 39,
    color: 'var(--color-primitives-blue-600)',
  },
  {
    key: 'vulnerabilities',
    label: 'Vulnerabilities',
    count: 5,
    color: 'var(--color-primitives-red-600)',
  },
  {
    key: 'passwordSummary',
    label: 'System Account Passwords Issues',
    count: 3,
    color: 'var(--color-primitives-yellow-600)',
  },
]

export const TOTAL_ISSUES = MOCK_SECURITY_DATA.reduce(
  (sum, item) => sum + item.count,
  0,
)
export const CURRENT_DATE = 'Nov 13, 2025'

// Chart sizes configuration
export const CHART_SIZES: ChartSizes = {
  donutSize: 60,
  width: 70,
  height: 70,
  thickness: 5,
  boxPadding: 5,
}
