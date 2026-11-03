import {
  FormItemSelect,
  FormSection,
  Radio,
  RadioGroup,
  StackingLayout,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import type { VmWizardDisk, VmWizardValues, VmWizardVirtualNic } from './types'

const DISK_TYPE_LABELS: Record<VmWizardDisk['diskType'], string> = {
  DISK: 'Disk',
  CDROM: 'CD-ROM',
}

const DEFAULT_BOOT_DEVICE_KEY = '__default__'

const buildBootDeviceOptions = (
  disks: VmWizardDisk[],
  nics: VmWizardVirtualNic[],
): SelectRowData[] => [
  { key: DEFAULT_BOOT_DEVICE_KEY, label: 'Default Boot Order' },
  ...disks.map((disk, index) => ({
    key: disk.extId,
    label: `${DISK_TYPE_LABELS[disk.diskType]} (${disk.busType}.${index})`,
  })),
  ...nics.map((nic) => ({
    key: nic.extId,
    label:
      nic.networkInfo.subnet?.name ??
      nic.backingInfo.macAddress ??
      'Network adapter',
  })),
]

interface VmBootConfigSectionProps {
  values: VmWizardValues
  onConfigurationChange: (
    configuration: VmWizardValues['configuration'],
  ) => void
}

export function VmBootConfigSection({
  values,
  onConfigurationChange,
}: VmBootConfigSectionProps) {
  const { configuration, resources } = values
  const { bootConfig } = configuration
  const isLegacy = bootConfig.bootType === 'LEGACY'

  const handleBootTypeChange = (nextValue: string) => {
    const bootType =
      nextValue as VmWizardValues['configuration']['bootConfig']['bootType']

    onConfigurationChange({
      ...configuration,
      bootConfig: {
        ...bootConfig,
        bootType,
        // Legacy BIOS does not support Shield VM security settings.
        isSecureBootEnabled:
          bootType === 'LEGACY' ? false : bootConfig.isSecureBootEnabled,
        isCredentialGuardEnabled:
          bootType === 'LEGACY' ? false : bootConfig.isCredentialGuardEnabled,
      },
      vtpmConfig: {
        isVtpmEnabled:
          bootType === 'LEGACY'
            ? false
            : configuration.vtpmConfig.isVtpmEnabled,
      },
    })
  }

  const bootDeviceOptions = buildBootDeviceOptions(
    resources.disks,
    resources.nics,
  )
  const selectedBootDevice =
    bootDeviceOptions.find((option) => option.key === bootConfig.bootDevice) ??
    bootDeviceOptions[0]

  return (
    <FormSection
      title="Boot Configuration"
      titleProps={{ size: Title.TitleSizes.H3 }}
      description="Choose from UEFI BIOS mode or Legacy BIOS mode. UEFI BIOS Mode supports enhanced Shield VM Security Settings"
      aria-label="Boot Configuration"
      data-test="dt_boot_config"
    >
      <StackingLayout padding="0px" itemGap="M">
        <RadioGroup
          name="bootTypeRadios"
          selectedValue={bootConfig.bootType}
          onChange={handleBootTypeChange}
          aria-label="Boot Configuration"
        >
          <Radio
            key="UEFI"
            value="UEFI"
            data-test="vmcontentview__radio_uefi"
            additionalInfo={
              <TextLabel>
                UEFI BIOS Mode supports enhanced Shield VM security settings.
              </TextLabel>
            }
          >
            <div data-test="vmcontentview__radio_uefi_label">
              UEFI BIOS Mode
            </div>
          </Radio>
          <Radio
            key="LEGACY"
            value="LEGACY"
            data-test="vmcontentview__radio_legacy"
            additionalInfo={
              isLegacy ? (
                <FormItemSelect
                  id="boot_priority_select"
                  data-test="vmpopupview_select_boot"
                  label="Set Boot Priority"
                  helpText="Choose which device the VM attempts to boot from first."
                  rowsData={bootDeviceOptions}
                  selectedRow={selectedBootDevice}
                  onSelectedChange={(row) =>
                    onConfigurationChange({
                      ...configuration,
                      bootConfig: {
                        ...bootConfig,
                        bootDevice:
                          String(row.key) === DEFAULT_BOOT_DEVICE_KEY
                            ? null
                            : String(row.key),
                      },
                    })
                  }
                />
              ) : undefined
            }
          >
            <div data-test="vmcontentview__radio_legacy_label">
              Legacy BIOS Mode
            </div>
          </Radio>
        </RadioGroup>
      </StackingLayout>
    </FormSection>
  )
}
