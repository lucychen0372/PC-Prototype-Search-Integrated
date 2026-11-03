import {
  Accordion,
  Checkbox,
  FlexLayout,
  FormSection,
  StackingLayout,
  StatusIcon,
  Tooltip,
} from '@nutanix-ui/prism-reactjs'
import type { VmWizardValues } from './types'

interface VmShieldVmSectionProps {
  values: VmWizardValues
  onConfigurationChange: (
    configuration: VmWizardValues['configuration'],
  ) => void
}

export function VmShieldVmSection({
  values,
  onConfigurationChange,
}: VmShieldVmSectionProps) {
  const { configuration } = values
  const { bootConfig, vtpmConfig } = configuration
  const isUefi = bootConfig.bootType === 'UEFI'

  const isSecureBootDisabled = !isUefi
  const isCredGuardDisabled =
    isSecureBootDisabled || !bootConfig.isSecureBootEnabled
  const isVtpmDisabled = !isUefi

  return (
    <FormSection
      className="collapsible-section"
      padding="20px-0px"
      data-test="vm_resource_shield_vm_section"
    >
      <Accordion title="Shield VM Security Settings" expandedByDefault={isUefi}>
        <StackingLayout className="vm-shield-vm-section__outer">
          <StackingLayout
            className="vm-shield-vm-section__body"
            background="body"
            padding="20px"
            itemGap="M"
          >
            <Checkbox
              id="secure_boot_option"
              data-test="VMContentView_checkbox_secure_boot"
              label="Secure Boot"
              checked={bootConfig.isSecureBootEnabled}
              disabled={isSecureBootDisabled}
              onChange={(event) =>
                onConfigurationChange({
                  ...configuration,
                  bootConfig: {
                    ...bootConfig,
                    isSecureBootEnabled: event.currentTarget.checked,
                    isCredentialGuardEnabled: event.currentTarget.checked
                      ? bootConfig.isCredentialGuardEnabled
                      : false,
                  },
                })
              }
            >
              <FlexLayout itemGap="S" alignItems="center">
                <Checkbox
                  id="cred_guard_boot_option"
                  data-test="vmcontentview_checkbox_credguard"
                  label={'Windows\u00AE Defender Credential Guard'}
                  checked={bootConfig.isCredentialGuardEnabled}
                  disabled={isCredGuardDisabled}
                  onChange={(event) =>
                    onConfigurationChange({
                      ...configuration,
                      bootConfig: {
                        ...bootConfig,
                        isCredentialGuardEnabled: event.currentTarget.checked,
                      },
                    })
                  }
                />
                <StatusIcon
                  type={StatusIcon.StatusIconTypes.INFO}
                  tooltipProps={{
                    oldTooltip: false,
                    appearance: Tooltip.APPEARANCE.SECONDARY,
                    content:
                      'Credential Guard isolates and protects secrets so that only privileged system software can access them.',
                    placement: 'top-start',
                  }}
                />
              </FlexLayout>
            </Checkbox>

            <FlexLayout itemGap="S" alignItems="center">
              <Checkbox
                id="vtpm_boot_option"
                data-test="shield_vm_vtpm_checkbox"
                label="Attach vTPM"
                checked={vtpmConfig.isVtpmEnabled}
                disabled={isVtpmDisabled}
                onChange={(event) =>
                  onConfigurationChange({
                    ...configuration,
                    vtpmConfig: {
                      isVtpmEnabled: event.currentTarget.checked,
                    },
                  })
                }
              />
              <StatusIcon
                type={StatusIcon.StatusIconTypes.INFO}
                tooltipProps={{
                  oldTooltip: false,
                  appearance: Tooltip.APPEARANCE.SECONDARY,
                  content:
                    'A virtual Trusted Platform Module (vTPM) stores keys and secrets used to verify the integrity of the VM.',
                  placement: 'top-start',
                }}
              />
            </FlexLayout>
          </StackingLayout>
        </StackingLayout>
      </Accordion>
    </FormSection>
  )
}
