import {
  FormItemInput,
  FormItemSelect,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { useRef } from 'react'
import type {
  VmWizardDisk,
  VmWizardDiskBusType,
  VmWizardDiskType,
} from './types'

const DISK_TYPE_OPTIONS: { key: VmWizardDiskType; label: string }[] = [
  { key: 'DISK', label: 'Disk' },
  { key: 'CDROM', label: 'CD-ROM' },
]

const BUS_TYPE_OPTIONS: { key: VmWizardDiskBusType; label: string }[] = [
  { key: 'SCSI', label: 'SCSI' },
  { key: 'SATA', label: 'SATA' },
  { key: 'PCI', label: 'PCI' },
  { key: 'IDE', label: 'IDE' },
]

const toRow = (option: { key: string; label: string }): SelectRowData => ({
  key: option.key,
  label: option.label,
})

interface VmDiskSubformProps {
  values: VmWizardDisk
  errors: Record<string, string>
  onChange: (values: VmWizardDisk) => void
}

export function VmDiskSubform({
  values,
  errors,
  onChange,
}: VmDiskSubformProps) {
  const isCdrom = values.diskType === 'CDROM'

  // Render dropdowns inside the modal subtree so the modal's focus trap does
  // not steal focus from (and cancel) option clicks.
  const containerRef = useRef<HTMLDivElement>(null)
  const getSubformPopupContainer = (): HTMLElement =>
    containerRef.current ?? document.body

  return (
    <div ref={containerRef}>
      <StackingLayout padding="0px" itemGap="L">
        <FormItemSelect
          id="disk_type_selector"
          label="Type"
          rowsData={DISK_TYPE_OPTIONS.map((option) => toRow(option))}
          selectedRow={toRow(
            DISK_TYPE_OPTIONS.find(
              (option) => option.key === values.diskType,
            ) ?? { key: values.diskType, label: values.diskType },
          )}
          getPopupContainer={getSubformPopupContainer}
          onSelectedChange={(row) =>
            onChange({
              ...values,
              diskType: String(row.key) as VmWizardDiskType,
            })
          }
          data-test="dt_disk_type_selector"
        />

        <FormItemSelect
          id="disk_bus_selector"
          label="Bus Type"
          rowsData={BUS_TYPE_OPTIONS.map((option) => toRow(option))}
          selectedRow={toRow(
            BUS_TYPE_OPTIONS.find(
              (option) => option.key === values.busType,
            ) ?? {
              key: values.busType,
              label: values.busType,
            },
          )}
          getPopupContainer={getSubformPopupContainer}
          onSelectedChange={(row) =>
            onChange({
              ...values,
              busType: String(row.key) as VmWizardDiskBusType,
            })
          }
          data-test="dt_disk_bus_selector"
        />

        <FormItemInput
          id="disk_size"
          label="Size"
          type="number"
          min={1}
          disabled={isCdrom}
          addonAfter="GiB"
          value={values.sizeGiB}
          error={Boolean(errors.sizeGiB)}
          helpText={
            isCdrom
              ? 'CD-ROM size is determined by the mounted image.'
              : errors.sizeGiB
          }
          onChange={(event) => {
            const parsed = Number(event.currentTarget.value)
            onChange({
              ...values,
              sizeGiB: Number.isFinite(parsed) ? parsed : values.sizeGiB,
            })
          }}
          data-test="storageformview_input_size"
        />
      </StackingLayout>
    </div>
  )
}
