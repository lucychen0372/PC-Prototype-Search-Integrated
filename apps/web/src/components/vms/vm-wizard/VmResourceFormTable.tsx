import {
  Button,
  FlexLayout,
  PlusIcon,
  StackingLayout,
  Table,
  Title,
} from '@nutanix-ui/prism-reactjs'
import type {
  TableColumn,
  TableRowAlertConfig,
  TableRowData,
} from '@nutanix-ui/prism-reactjs/lib/components/v2/Tables/Table'
import type { ReactNode } from 'react'
import './VmResourceFormTable.css'

/**
 * Local equivalent of Aphrodite's `FormTable` (from
 * `@react16/components/forms/FormTable`). It renders a titled resource section
 * with an empty-state card (centered primary create button, matching the VM
 * wizard design) and a bordered table with per-row edit/remove actions once
 * resources exist.
 */
interface VmResourceFormTableProps {
  title: string
  createText: string
  emptyCreateText?: string
  showEmptyCreateIcon?: boolean
  createDataTest?: string
  dataTest?: string
  ariaLabel?: string
  columns: TableColumn[]
  dataSource: TableRowData[]
  rowAlerts?: TableRowAlertConfig[]
  noDataText: string
  canCreate?: boolean
  onCreate: () => void
  onEdit: (row: TableRowData) => void
  onRemove: (row: TableRowData) => void
  emptyExtra?: ReactNode
}

export function VmResourceFormTable({
  title,
  createText,
  emptyCreateText,
  showEmptyCreateIcon = false,
  createDataTest,
  dataTest,
  ariaLabel,
  columns,
  dataSource,
  rowAlerts,
  noDataText,
  canCreate = true,
  onCreate,
  onEdit,
  onRemove,
  emptyExtra,
}: VmResourceFormTableProps) {
  const isEmpty = dataSource.length === 0

  return (
    <StackingLayout padding="0px" itemGap="S" data-test={dataTest}>
      <FlexLayout
        justifyContent="space-between"
        alignItems="center"
        itemGap="S"
      >
        <Title size={Title.SIZES.H3}>{title}</Title>
        {!isEmpty && (
          <Button
            type={Button.ButtonTypes.TEXT_NORMAL}
            onClick={onCreate}
            disabled={!canCreate}
            data-test={createDataTest}
          >
            <PlusIcon size="small" />
            {createText}
          </Button>
        )}
      </FlexLayout>

      {isEmpty ? (
        <FlexLayout
          className="vm-resource-empty-card"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          itemGap="S"
          aria-label={ariaLabel ?? title}
        >
          <Button
            type={Button.ButtonTypes.PRIMARY}
            onClick={onCreate}
            disabled={!canCreate}
            data-test={createDataTest}
          >
            {showEmptyCreateIcon && <PlusIcon size="small" />}
            {emptyCreateText ?? createText}
          </Button>
          {emptyExtra}
        </FlexLayout>
      ) : (
        <Table
          aria-label={ariaLabel ?? title}
          border={true}
          columns={columns}
          dataSource={dataSource}
          rowKey="key"
          rowAlerts={rowAlerts}
          customMessages={{ noData: noDataText }}
          rowAction={{
            actions: () => [
              { key: 'edit', value: 'Edit' },
              { key: 'remove', value: 'Remove' },
            ],
            onRowAction: (key, rowData) => {
              if (key === 'edit') {
                onEdit(rowData)
              } else if (key === 'remove') {
                onRemove(rowData)
              }
            },
          }}
        />
      )}
    </StackingLayout>
  )
}
