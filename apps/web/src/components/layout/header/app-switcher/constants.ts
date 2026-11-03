import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'

export const APPS_DATA: SelectRowData[] = [
  {
    key: 1,
    label: 'Platform Services',
    children: [
      {
        key: 11,
        label: 'Admin Center',
      },
    ],
  },
  {
    key: 2,
    label: 'Cloud Infrastructure',
    children: [
      {
        key: 21,
        label: 'Infrastructure',
      },
    ],
  },
  {
    key: 3,
    label: 'Cloud Manager',
    children: [
      {
        key: 31,
        label: 'Self Service',
      },
      {
        key: 32,
        label: 'Cost Governance',
      },
      {
        key: 33,
        label: 'Security Central',
      },
    ],
  },
]
