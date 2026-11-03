import {
  FlexLayout,
  FormItemSelect,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { useRef } from 'react'
import { GPU_OPTIONS } from './mockData'
import type { VmWizardGpu, VmWizardGpuMode } from './types'

const GPU_MODE_LABELS: Record<VmWizardGpuMode, string> = {
  PASSTHROUGH_GRAPHICS: 'Passthrough (Graphics)',
  PASSTHROUGH_COMPUTE: 'Passthrough (Compute)',
  VIRTUAL: 'Virtual (vGPU)',
}

const toGpuRow = (gpu: VmWizardGpu): SelectRowData => ({
  key: gpu.extId,
  label: gpu.name ?? gpu.extId,
})

interface VmGpuSubformProps {
  values: VmWizardGpu
  errors: Record<string, string>
  onChange: (values: VmWizardGpu) => void
}

export function VmGpuSubform({ values, errors, onChange }: VmGpuSubformProps) {
  const selectedGpu = GPU_OPTIONS.find((gpu) => gpu.extId === values.extId)

  // Render dropdowns inside the modal subtree so the modal's focus trap does
  // not steal focus from (and cancel) option clicks.
  const containerRef = useRef<HTMLDivElement>(null)
  const getSubformPopupContainer = (): HTMLElement =>
    containerRef.current ?? document.body

  return (
    <div ref={containerRef}>
      <StackingLayout padding="0px" itemGap="L">
        <FormItemSelect
          id="gpu_selector"
          label="GPU"
          rowsData={GPU_OPTIONS.map((option) => toGpuRow(option))}
          selectedRow={selectedGpu ? toGpuRow(selectedGpu) : undefined}
          error={Boolean(errors.deviceId)}
          helpText={
            errors.deviceId ?? 'Select an available GPU on the cluster.'
          }
          placeholder="Please Select"
          getPopupContainer={getSubformPopupContainer}
          onSelectedChange={(row) => {
            const gpu = GPU_OPTIONS.find(
              (option) => option.extId === String(row.key),
            )
            if (gpu) {
              onChange({ ...values, ...gpu })
            }
          }}
          data-test="vgpulistview_gpu_selector"
        />

        {selectedGpu && (
          <FlexLayout flexDirection="column" itemGap="XS">
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {`Mode: ${GPU_MODE_LABELS[selectedGpu.mode]}`}
            </TextLabel>
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {`Vendor: ${selectedGpu.vendor}`}
            </TextLabel>
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {`Device ID: ${selectedGpu.deviceId}`}
            </TextLabel>
          </FlexLayout>
        )}
      </StackingLayout>
    </div>
  )
}
