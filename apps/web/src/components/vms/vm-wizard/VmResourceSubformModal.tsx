import { Alert, Button, FlexLayout, Modal } from '@nutanix-ui/prism-reactjs'
import { VmDiskSubform } from './VmDiskSubform'
import { VmGpuSubform } from './VmGpuSubform'
import { VmNicSubform } from './VmNicSubform'
import { VmPciDeviceSubform } from './VmPciDeviceSubform'
import { VmSriovNicSubform } from './VmSriovNicSubform'
import type {
  VmWizardDisk,
  VmWizardGpu,
  VmWizardPciDevice,
  VmWizardSriovNic,
  VmWizardSubformType,
  VmWizardSubformValues,
  VmWizardVirtualNic,
} from './types'
import { useVmWizardStore } from './useVmWizardStore'
import {
  validateDiskSubform,
  validateGpuSubform,
  validateNicSubform,
  validatePciDeviceSubform,
  validateSriovNicSubform,
} from './validation'

const SUBFORM_TITLES: Record<
  VmWizardSubformType,
  { create: string; update: string }
> = {
  disk: { create: 'Add Disk', update: 'Update Disk' },
  nic: { create: 'Add NIC', update: 'Update NIC' },
  gpu: { create: 'Add GPU', update: 'Update GPU' },
  pciDevice: { create: 'Add PCI Device', update: 'Update PCI Device' },
  sriovNic: { create: 'Add SR-IOV NIC', update: 'Update SR-IOV NIC' },
}

const validateSubform = (
  type: VmWizardSubformType,
  values: VmWizardSubformValues,
): Record<string, string> => {
  switch (type) {
    case 'disk':
      return validateDiskSubform(values as VmWizardDisk)
    case 'nic':
      return validateNicSubform(values as VmWizardVirtualNic)
    case 'gpu':
      return validateGpuSubform(values as VmWizardGpu)
    case 'pciDevice':
      return validatePciDeviceSubform(values as VmWizardPciDevice)
    case 'sriovNic':
      return validateSriovNicSubform(values as VmWizardSriovNic)
    default:
      return {}
  }
}

/**
 * Local equivalent of Aphrodite's resource subform `Modal` in `VmResourceForm`.
 * Subform Save merges client-side changes into the wizard values without a final
 * VM submission; Cancel/Escape discards in-progress edits.
 */
export function VmResourceSubformModal() {
  const subformDraft = useVmWizardStore((state) => state.subformDraft)
  const projectExtId = useVmWizardStore(
    (state) => state.values.configuration.project?.extId,
  )
  const setSubformValues = useVmWizardStore((state) => state.setSubformValues)
  const setSubformErrors = useVmWizardStore((state) => state.setSubformErrors)
  const closeSubform = useVmWizardStore((state) => state.closeSubform)
  const commitSubform = useVmWizardStore((state) => state.commitSubform)

  if (!subformDraft) {
    return <></>
  }

  const { state, values, errors, operationError } = subformDraft

  const subformType = state.type
  const title = SUBFORM_TITLES[subformType][state.mode]

  const handleSave = () => {
    const validationErrors = validateSubform(subformType, values)

    if (Object.keys(validationErrors).length > 0) {
      setSubformErrors(validationErrors)
      return
    }

    commitSubform()
  }

  return (
    <Modal
      visible={true}
      title={title}
      width={500}
      restoreFocus={true}
      onClose={closeSubform}
      closeButtonProps={{ 'aria-label': `Close ${title}` }}
      footer={
        <FlexLayout itemGap="S" justifyContent="flex-end">
          <Button
            type={Button.ButtonTypes.SECONDARY}
            onClick={closeSubform}
            data-test="vm-subform-cancel"
          >
            Cancel
          </Button>
          <Button
            type={Button.ButtonTypes.PRIMARY}
            onClick={handleSave}
            data-test="vm-subform-save"
          >
            Save
          </Button>
        </FlexLayout>
      }
    >
      <FlexLayout
        flexDirection="column"
        itemGap="L"
        padding="20px"
        data-test="vm-subform-content"
      >
        {operationError && (
          <Alert
            type={Alert.AlertTypes.ERROR}
            message={operationError}
            showCloseIcon={false}
            data-test="vm-subform-operation-error"
          />
        )}

        {subformType === 'disk' ? (
          <VmDiskSubform
            values={values as VmWizardDisk}
            errors={errors}
            onChange={setSubformValues}
          />
        ) : subformType === 'nic' ? (
          <VmNicSubform
            values={values as VmWizardVirtualNic}
            errors={errors}
            projectExtId={projectExtId}
            onChange={setSubformValues}
          />
        ) : subformType === 'gpu' ? (
          <VmGpuSubform
            values={values as VmWizardGpu}
            errors={errors}
            onChange={setSubformValues}
          />
        ) : subformType === 'pciDevice' ? (
          <VmPciDeviceSubform
            values={values as VmWizardPciDevice}
            errors={errors}
            onChange={setSubformValues}
          />
        ) : (
          <VmSriovNicSubform
            values={values as VmWizardSriovNic}
            errors={errors}
            onChange={setSubformValues}
          />
        )}
      </FlexLayout>
    </Modal>
  )
}
