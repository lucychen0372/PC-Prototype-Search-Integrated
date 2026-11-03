import type {
  VmWizardDisk,
  VmWizardGpu,
  VmWizardPciDevice,
  VmWizardSriovNic,
  VmWizardStepErrors,
  VmWizardValues,
  VmWizardVirtualNic,
} from './types'
import { gibToBytes } from './units'

const MAX_VM_NAME_LENGTH = 80
const MAX_DESCRIPTION_LENGTH = 1024
const MAX_TOTAL_CORES = 240
const MIN_MEMORY_SIZE_BYTES = gibToBytes(1)
const VM_NAME_INVALID_CHARACTERS = /["'*,[\]?%$]/
const MIN_DISK_SIZE_GIB = 1
const MAX_DISK_SIZE_GIB = 18_874_368
const MAC_ADDRESS_PATTERN = /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/

const isPositiveInteger = (value: number) =>
  Number.isInteger(value) && Number.isFinite(value) && value > 0

export const validateConfigurationStep = (
  values: VmWizardValues,
): NonNullable<VmWizardStepErrors['configuration']> => {
  const errors: Record<string, string> = {}
  const name = values.configuration.name.trim()
  const description = values.configuration.description.trim()
  const totalCores =
    values.resources.numSockets * values.resources.numCoresPerSocket

  if (!name) {
    errors.name = 'Enter a VM name.'
  } else if (name.length > MAX_VM_NAME_LENGTH) {
    errors.name = `VM name must be ${MAX_VM_NAME_LENGTH} characters or fewer.`
  } else if (VM_NAME_INVALID_CHARACTERS.test(name)) {
    errors.name = 'VM name contains unsupported characters.'
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`
  }

  if (!values.configuration.project) {
    errors.project = 'Select a project.'
  }

  if (!values.configuration.cluster) {
    errors.cluster = 'Select a cluster.'
  }

  if (!isPositiveInteger(values.configuration.vmCount)) {
    errors.vmCount = 'Enter at least 1 VM.'
  }

  if (!isPositiveInteger(values.resources.numSockets)) {
    errors.numSockets = 'Enter at least 1 vCPU socket.'
  }

  if (!isPositiveInteger(values.resources.numCoresPerSocket)) {
    errors.numCoresPerSocket = 'Enter at least 1 core per socket.'
  }

  if (totalCores > MAX_TOTAL_CORES) {
    errors.numSockets = `Total vCPU cores must be ${MAX_TOTAL_CORES} or fewer.`
  }

  if (
    !Number.isFinite(values.resources.memorySizeBytes) ||
    values.resources.memorySizeBytes < MIN_MEMORY_SIZE_BYTES
  ) {
    errors.memorySizeBytes = 'Enter at least 1 GiB of memory.'
  }

  return errors
}

export const validateDiskSubform = (
  disk: VmWizardDisk,
): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (!Number.isFinite(disk.sizeGiB) || disk.sizeGiB < MIN_DISK_SIZE_GIB) {
    errors.sizeGiB = `Enter a disk size of at least ${MIN_DISK_SIZE_GIB} GiB.`
  } else if (disk.sizeGiB > MAX_DISK_SIZE_GIB) {
    errors.sizeGiB = 'Disk size is too large.'
  }

  return errors
}

export const validateNicSubform = (
  nic: VmWizardVirtualNic,
): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (!nic.networkInfo.subnet) {
    errors.subnet = 'Select a subnet.'
  }

  if (
    nic.backingInfo.macAddress &&
    !MAC_ADDRESS_PATTERN.test(nic.backingInfo.macAddress)
  ) {
    errors.macAddress = 'Enter a valid MAC address (e.g. 50:6b:8d:8c:f5:e2).'
  }

  if (
    !Number.isInteger(nic.backingInfo.numQueues) ||
    nic.backingInfo.numQueues < 1
  ) {
    errors.numQueues = 'Enter at least 1 queue.'
  }

  return errors
}

export const validateGpuSubform = (
  gpu: VmWizardGpu,
): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (!gpu.deviceId || !gpu.name) {
    errors.deviceId = 'Select a GPU.'
  }

  return errors
}

export const validatePciDeviceSubform = (
  pciDevice: VmWizardPciDevice,
): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (!pciDevice.backingInfo.deviceExtId) {
    errors.deviceExtId = 'Select a PCI device.'
  }

  return errors
}

export const validateSriovNicSubform = (
  sriovNic: VmWizardSriovNic,
): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (!sriovNic.backingInfo.nicProfile) {
    errors.nicProfile = 'Select a NIC profile.'
  }

  if (
    sriovNic.backingInfo.macAddress &&
    !MAC_ADDRESS_PATTERN.test(sriovNic.backingInfo.macAddress)
  ) {
    errors.macAddress = 'Enter a valid MAC address (e.g. 50:6b:8d:8c:f5:e2).'
  }

  if (
    sriovNic.networkInfo.vlanId !== undefined &&
    (!Number.isInteger(sriovNic.networkInfo.vlanId) ||
      sriovNic.networkInfo.vlanId < 0 ||
      sriovNic.networkInfo.vlanId > 4094)
  ) {
    errors.vlanId = 'Enter a VLAN ID between 0 and 4094.'
  }

  return errors
}

const MAX_CATEGORIES = 200
const SSH_KEY_PATTERN = /^(ssh-rsa|ssh-ed25519|ecdsa-sha2-\S+)\s+\S+/

export const validateManagementStep = (
  values: VmWizardValues,
): NonNullable<VmWizardStepErrors['management']> => {
  const errors: Record<string, string> = {}
  const { categories, guestCustomization } = values.management

  if (categories.length > MAX_CATEGORIES) {
    errors.categories = `Assign ${MAX_CATEGORIES} categories or fewer.`
  }

  if (guestCustomization.scriptType !== 'none') {
    if (
      guestCustomization.configMethod === 'custom-script' &&
      !guestCustomization.script.trim()
    ) {
      errors.script = 'Enter a customization script.'
    }

    if (
      guestCustomization.sshKey.trim() &&
      !SSH_KEY_PATTERN.test(guestCustomization.sshKey.trim())
    ) {
      errors.sshKey = 'Enter a valid public SSH key.'
    }
  }

  return errors
}

export const validateResourcesStep = (
  values: VmWizardValues,
): NonNullable<VmWizardStepErrors['resources']> => {
  const errors: Record<string, string> = {}

  if (values.resources.disks.length === 0) {
    errors.disks = 'Add at least one disk.'
  }

  const hasInvalidNic = values.resources.nics.some(
    (nic) => Object.keys(validateNicSubform(nic)).length > 0,
  )

  if (hasInvalidNic) {
    errors.nics = 'One or more NICs are missing a subnet. Fix them to continue.'
  }

  return errors
}
