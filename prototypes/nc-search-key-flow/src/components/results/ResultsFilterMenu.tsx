import {
  Dropdown,
  FlexLayout,
  Link,
  Menu,
  MenuItem,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import type { MenuItemInfo } from '@nutanix-ui/prism-reactjs/lib/components/v2/Navigation/MenuItem'
import { useState } from 'react'
import { CLUSTER_NAMES } from '@proto/data/catalog'
import {
  FILTERABLE_TYPES,
  SEVERITIES,
  SORT_LABEL,
  TYPE_NAME,
  type ResultsFilters,
} from '@proto/lib/results-filters'
import type { Metric } from '@proto/lib/query-interpreter'
import '@proto/components/vms/FilterPopovers.css'

interface Option {
  key: string
  label: string
  active: boolean
}

interface Category {
  key: string
  label: string
  options: (state: ResultsFilters) => Option[]
}

const hasFilter = (state: ResultsFilters, attribute: string, value?: string) =>
  state.filters.some(
    (filter) =>
      filter.attribute === attribute &&
      (value === undefined || String(filter.value) === value),
  )

const HIGH_METRICS: Array<{ metric: Metric; label: string }> = [
  { metric: 'cpuUsage', label: 'CPU high' },
  { metric: 'memoryUsage', label: 'Memory high' },
  { metric: 'iops', label: 'IOPS high' },
]

/** Option keys: `type:vm`, `cluster:Cluster ABC`, `power:On`, `high:iops`, `severity:Critical`, `group:cluster`, `sort:iops`. */
const CATEGORIES: Category[] = [
  {
    key: 'type',
    label: 'Type',
    options: (state) =>
      FILTERABLE_TYPES.map((type) => ({
        key: `type:${type}`,
        label: TYPE_NAME[type],
        active: state.type === type,
      })),
  },
  {
    key: 'cluster',
    label: 'Cluster',
    options: (state) =>
      CLUSTER_NAMES.map((name) => ({
        key: `cluster:${name}`,
        label: name,
        active: hasFilter(state, 'cluster', name),
      })),
  },
  {
    key: 'vms',
    label: 'VMs',
    options: (state) => [
      {
        key: 'power:On',
        label: 'Power state: On',
        active: hasFilter(state, 'powerState', 'On'),
      },
      {
        key: 'power:Off',
        label: 'Power state: Off',
        active: hasFilter(state, 'powerState', 'Off'),
      },
      ...HIGH_METRICS.map(({ metric, label }) => ({
        key: `high:${metric}`,
        label,
        active: hasFilter(state, metric),
      })),
    ],
  },
  {
    key: 'alerts',
    label: 'Alerts',
    options: (state) =>
      SEVERITIES.map((severity) => ({
        key: `severity:${severity}`,
        label: `Severity: ${severity}`,
        active: state.severity === severity,
      })),
  },
  {
    key: 'group',
    label: 'Group by',
    options: (state) => [
      { key: 'group:type', label: 'Type', active: state.groupBy === 'type' },
      {
        key: 'group:cluster',
        label: 'Cluster',
        active: state.groupBy === 'cluster',
      },
    ],
  },
  {
    key: 'sort',
    label: 'Sort VMs',
    options: (state) =>
      (Object.keys(SORT_LABEL) as Metric[]).map((metric) => ({
        key: `sort:${metric}`,
        label: SORT_LABEL[metric],
        active: state.sortBy === metric,
      })),
  },
]

/**
 * The results page's "+ Filter": the Entity Browser's add-filter layout
 * (categories on the left, choices on the right) with filters that make
 * sense across result types.
 */
export const ResultsFilterMenu = ({
  state,
  onSelect,
}: {
  state: ResultsFilters
  onSelect: (key: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const [categoryKey, setCategoryKey] = useState(CATEGORIES[0]?.key ?? '')
  const category =
    CATEGORIES.find((item) => item.key === categoryKey) ?? CATEGORIES[0]

  const popup = (
    <FlexLayout
      itemGap="none"
      className="vm-filter-popover -add"
      data-test="results-filter-add"
    >
      <StackingLayout itemGap="XS" className="vm-filter-field-list">
        <TextLabel
          type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          className="vm-filter-section-label"
        >
          Filters
        </TextLabel>
        <Menu
          appearance={Menu.MenuAppearance.COMPACT}
          onClick={(item: MenuItemInfo) => setCategoryKey(String(item.key))}
          aria-label="Filter categories"
        >
          {CATEGORIES.map((item) => (
            <MenuItem key={item.key} active={item.key === category?.key}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </StackingLayout>
      <StackingLayout itemGap="XS" className="vm-filter-form">
        <TextLabel
          type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          className="vm-filter-section-label"
        >
          {category?.label}
        </TextLabel>
        <Menu
          appearance={Menu.MenuAppearance.COMPACT}
          onClick={(item: MenuItemInfo) => {
            setOpen(false)
            onSelect(String(item.key))
          }}
          aria-label={category?.label}
          className="results-filter-options"
        >
          {(category?.options(state) ?? []).map((option) => (
            <MenuItem key={option.key} active={option.active}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </StackingLayout>
    </FlexLayout>
  )

  return (
    <Dropdown
      popupVisible={open}
      onPopupVisibleChange={setOpen}
      popup={popup}
      popupPlacement="bottomLeft"
      getPopupContainer={() => document.body}
      focusOnOpen={false}
      disableKeyboardNavigation
      popupClassName="vm-filter-popup"
    >
      <div className="vm-filter-trigger">
        <Link
          type={Link.LINK_TYPE.INLINE_SECONDARY}
          underline={false}
          aria-label="Add filter"
          className="vm-interpretation-add-filter"
        >
          + Filter
        </Link>
      </div>
    </Dropdown>
  )
}
