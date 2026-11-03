import {
  Alert,
  FlexLayout,
  FormItemSelect,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { useRef } from 'react'
import { PCI_DEVICE_OPTIONS } from './mockData'
import type { VmWizardPciDevice } from './types'

const toPciRow = (device: VmWizardPciDevice): SelectRowData => ({
  key: device.extId,
  label: device.name ?? device.backingInfo.deviceExtId,
})

interface VmPciDeviceSubformProps {
  values: VmWizardPciDevice
  errors: Record<string, string>
  onChange: (values: VmWizardPciDevice) => void
}

export function VmPciDeviceSubform({
  values,
  errors,
  onChange,
}: VmPciDeviceSubformProps) {
  const selectedDevice = PCI_DEVICE_OPTIONS.find(
    (device) => device.extId === values.extId,
  )

  // Render dropdowns inside the modal subtree so the modal's focus trap does
  // not steal focus from (and cancel) option clicks.
  const containerRef = useRef<HTMLDivElement>(null)
  const getSubformPopupContainer = (): HTMLElement =>
    containerRef.current ?? document.body

  return (
    <div ref={containerRef}>
      <StackingLayout padding="0px" itemGap="L">
        {selectedDevice?.activeVm && (
          <Alert
            type={Alert.AlertTypes.WARNING}
            message={`This device is currently attached to ${selectedDevice.activeVm}. Attaching it here will detach it from that VM.`}
            showCloseIcon={false}
            data-test="dt-select-pci-in-use"
          />
        )}

        <FormItemSelect
          id="pci_device_selector"
          label="PCI Device"
          rowsData={PCI_DEVICE_OPTIONS.map((option) => toPciRow(option))}
          selectedRow={selectedDevice ? toPciRow(selectedDevice) : undefined}
          error={Boolean(errors.deviceExtId)}
          helpText={
            errors.deviceExtId ??
            'Select an available host PCI device on the cluster.'
          }
          placeholder="Please Select"
          getPopupContainer={getSubformPopupContainer}
          onSelectedChange={(row) => {
            const device = PCI_DEVICE_OPTIONS.find(
              (option) => option.extId === String(row.key),
            )
            if (device) {
              onChange({ ...values, ...device })
            }
          }}
          data-test="generic-pci-device-selector"
        />

        {selectedDevice && (
          <FlexLayout flexDirection="column" itemGap="XS">
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {`Device: ${selectedDevice.backingInfo.deviceExtId}`}
            </TextLabel>
            {selectedDevice.hostName && (
              <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                {`Host: ${selectedDevice.hostName}`}
              </TextLabel>
            )}
            {selectedDevice.clusterName && (
              <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                {`Cluster: ${selectedDevice.clusterName}`}
              </TextLabel>
            )}
          </FlexLayout>
        )}
      </StackingLayout>
    </div>
  )
}
