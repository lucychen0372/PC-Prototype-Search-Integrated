import {
  Checkbox,
  FormItemInput,
  FormItemSelect,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { useRef } from 'react'
import { NIC_PROFILE_OPTIONS } from './mockData'
import type { VmWizardNicProfileReference, VmWizardSriovNic } from './types'

const toProfileRow = (profile: VmWizardNicProfileReference): SelectRowData => ({
  key: profile.extId,
  label: profile.nicFamily
    ? `${profile.name ?? profile.extId} (${profile.nicFamily})`
    : (profile.name ?? profile.extId),
})

interface VmSriovNicSubformProps {
  values: VmWizardSriovNic
  errors: Record<string, string>
  onChange: (values: VmWizardSriovNic) => void
}

export function VmSriovNicSubform({
  values,
  errors,
  onChange,
}: VmSriovNicSubformProps) {
  const selectedProfile = values.backingInfo.nicProfile

  // Render dropdowns inside the modal subtree so the modal's focus trap does
  // not steal focus from (and cancel) option clicks.
  const containerRef = useRef<HTMLDivElement>(null)
  const getSubformPopupContainer = (): HTMLElement =>
    containerRef.current ?? document.body

  return (
    <div ref={containerRef}>
      <StackingLayout padding="0px" itemGap="L">
        <FormItemSelect
          id="sriov_nic_profile_selector"
          label="NIC Profile"
          rowsData={NIC_PROFILE_OPTIONS.map((option) => toProfileRow(option))}
          selectedRow={
            selectedProfile ? toProfileRow(selectedProfile) : undefined
          }
          error={Boolean(errors.nicProfile)}
          helpText={
            errors.nicProfile ?? 'Select an SR-IOV capable NIC profile.'
          }
          placeholder="Please Select"
          getPopupContainer={getSubformPopupContainer}
          onSelectedChange={(row) => {
            const profile = NIC_PROFILE_OPTIONS.find(
              (option) => option.extId === String(row.key),
            )
            onChange({
              ...values,
              backingInfo: {
                ...values.backingInfo,
                nicProfile: profile,
              },
            })
          }}
          data-test="nic-profile-selector"
        />

        <FormItemInput
          id="sriov_vlan_id"
          label="Associate VLAN ID (Optional)"
          type="number"
          min={0}
          max={4094}
          value={values.networkInfo.vlanId ?? ''}
          error={Boolean(errors.vlanId)}
          helpText={errors.vlanId}
          placeholder="Enter VLAN ID"
          onChange={(event) => {
            const raw = event.currentTarget.value
            const parsed = Number(raw)
            onChange({
              ...values,
              networkInfo: {
                ...values.networkInfo,
                vlanId:
                  raw === '' || !Number.isFinite(parsed) ? undefined : parsed,
              },
            })
          }}
          data-test="dt_vlan_id"
        />

        <FormItemInput
          id="sriov_mac_address"
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
          data-test="sriov_input_mac"
        />

        <Checkbox
          id="sriov_connection_state"
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
          data-test="sriov_checkbox_connected"
        />
      </StackingLayout>
    </div>
  )
}
