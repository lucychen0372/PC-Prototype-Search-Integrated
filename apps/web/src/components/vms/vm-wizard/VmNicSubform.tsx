import {
  Checkbox,
  FlexLayout,
  FormItemInput,
  FormItemSelect,
  Radio,
  RadioGroup,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { useRef } from 'react'
import { getSubnetOptionsForProject } from './mockData'
import type {
  VmWizardSubnetReference,
  VmWizardVirtualNic,
  VmWizardVlanMode,
} from './types'

const toSubnetLabel = (subnet: VmWizardSubnetReference): string =>
  subnet.subnetType === 'OVERLAY'
    ? `${subnet.name ?? subnet.extId} (Overlay)`
    : `${subnet.name ?? subnet.extId} (VLAN ${subnet.vlanId ?? '-'})`

const toSubnetRow = (subnet: VmWizardSubnetReference): SelectRowData => ({
  key: subnet.extId,
  label: toSubnetLabel(subnet),
})

interface VmNicSubformProps {
  values: VmWizardVirtualNic
  errors: Record<string, string>
  projectExtId: string | undefined
  onChange: (values: VmWizardVirtualNic) => void
}

export function VmNicSubform({
  values,
  errors,
  projectExtId,
  onChange,
}: VmNicSubformProps) {
  const subnetOptions = getSubnetOptionsForProject(projectExtId)
  const selectedSubnet = values.networkInfo.subnet

  // Render dropdowns inside the modal subtree so the modal's focus trap does
  // not steal focus from (and cancel) option clicks.
  const containerRef = useRef<HTMLDivElement>(null)
  const getSubformPopupContainer = (): HTMLElement =>
    containerRef.current ?? document.body

  return (
    <div ref={containerRef}>
      <StackingLayout padding="0px" itemGap="L">
        <FormItemSelect
          id="nic_subnet_selector"
          label="Subnet"
          rowsData={subnetOptions.map((option) => toSubnetRow(option))}
          selectedRow={selectedSubnet ? toSubnetRow(selectedSubnet) : undefined}
          error={Boolean(errors.subnet)}
          helpText={
            errors.subnet ??
            'Only subnets in the selected project or shared with it are listed.'
          }
          placeholder="Please Select"
          getPopupContainer={getSubformPopupContainer}
          onSelectedChange={(row) => {
            const subnet = subnetOptions.find(
              (option) => option.extId === String(row.key),
            )
            onChange({
              ...values,
              networkInfo: {
                ...values.networkInfo,
                subnet,
              },
            })
          }}
          data-test="subnetformview_subnet_selector"
        />

        <FlexLayout flexDirection="column" itemGap="S">
          <TextLabel>VLAN Mode</TextLabel>
          <RadioGroup
            selectedValue={values.networkInfo.vlanMode}
            onChange={(nextValue) =>
              onChange({
                ...values,
                networkInfo: {
                  ...values.networkInfo,
                  vlanMode: nextValue as VmWizardVlanMode,
                },
              })
            }
            name="nic_vlan_mode"
          >
            <Radio value="ACCESS">Access</Radio>
            <Radio value="TRUNK">Trunk</Radio>
          </RadioGroup>
        </FlexLayout>

        <FormItemInput
          id="nic_mac_address"
          label="MAC Address (Optional)"
          value={values.backingInfo.macAddress ?? ''}
          error={Boolean(errors.macAddress)}
          helpText={
            errors.macAddress ?? 'Leave blank to auto-assign a MAC address.'
          }
          placeholder="50:6b:8d:8c:f5:e2"
          onChange={(event) =>
            onChange({
              ...values,
              backingInfo: {
                ...values.backingInfo,
                macAddress: event.currentTarget.value || undefined,
              },
            })
          }
          data-test="subnetformview_input_mac"
        />

        <FormItemInput
          id="nic_num_queues"
          label="Number of Queues"
          type="number"
          min={1}
          value={values.backingInfo.numQueues}
          error={Boolean(errors.numQueues)}
          helpText={errors.numQueues}
          onChange={(event) => {
            const parsed = Number(event.currentTarget.value)
            onChange({
              ...values,
              backingInfo: {
                ...values.backingInfo,
                numQueues: Number.isFinite(parsed)
                  ? parsed
                  : values.backingInfo.numQueues,
              },
            })
          }}
          data-test="subnetformview_input_queues"
        />

        <Checkbox
          id="nic_connection_state"
          label="Connected"
          checked={values.backingInfo.isConnected}
          onChange={(event) =>
            onChange({
              ...values,
              backingInfo: {
                ...values.backingInfo,
                isConnected: event.currentTarget.checked,
              },
            })
          }
          data-test="subnetformview_checkbox_connected"
        />
      </StackingLayout>
    </div>
  )
}
