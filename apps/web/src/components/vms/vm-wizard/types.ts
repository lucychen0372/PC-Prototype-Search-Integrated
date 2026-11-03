export type VmWizardMode = 'create' | 'update'

export type VmWizardStepId =
  | 'configuration'
  | 'resources'
  | 'management'
  | 'review'

export type VmWizardAlertType = 'error' | 'warning' | 'info' | 'success'

export interface VmWizardStep {
  id: VmWizardStepId
  title: string
}

export interface VmWizardBannerAlert {
  id: string
  message: string
  type: VmWizardAlertType
}

export interface VmWizardTaskReference {
  extId: string
  rel: 'task'
  href: string
}

export interface VmWizardReference {
  extId: string
  name?: string
}

export interface VmWizardConfigurationValues {
  name: string
  description: string
  vmCount: number
  project?: VmWizardReference
  cluster?: VmWizardReference
  hardwareClockTimezone: string
  isMemoryOvercommitEnabled: boolean
  isAdvancedCpuCompatibilityEnabled: boolean
  bootConfig: {
    bootType: 'UEFI' | 'LEGACY'
    isSecureBootEnabled: boolean
    isCredentialGuardEnabled: boolean
    bootDevice: string | null
    bootOrder: string[]
  }
  vtpmConfig: {
    isVtpmEnabled: boolean
  }
  apcConfig: {
    isApcEnabled: boolean
  }
}

export type VmWizardDiskType = 'DISK' | 'CDROM'

export type VmWizardDiskBusType = 'SCSI' | 'SATA' | 'PCI' | 'IDE'

export interface VmWizardDisk {
  extId: string
  diskType: VmWizardDiskType
  busType: VmWizardDiskBusType
  sizeGiB: number
}

export type VmWizardVlanMode = 'ACCESS' | 'TRUNK'

/**
 * Project-aware subnet reference, modeled on
 * `networking.v4.config.Subnet` and `vmm.v4.ahv.config.SubnetReference`.
 */
export interface VmWizardSubnetReference {
  extId: string
  name?: string
  projectExtId?: string
  sharedWithProjects?: string[]
  virtualSwitch?: string
  subnetType?: 'VLAN' | 'OVERLAY'
  vlanId?: number
  isAdvancedNetworking?: boolean
  isConnected?: boolean
}

/**
 * Normal virtual NIC, modeled on `vmm.v4.ahv.config.VirtualEthernetNic`
 * (`backingInfo`) and `VirtualEthernetNicNetworkInfo` (`networkInfo`).
 */
export interface VmWizardVirtualNic {
  extId: string
  backingInfo: {
    macAddress?: string
    isConnected: boolean
    numQueues: number
  }
  networkInfo: {
    nicType: 'NORMAL_NIC'
    subnet?: VmWizardSubnetReference
    vlanMode: VmWizardVlanMode
    ipv4Address?: string
  }
}

export type VmWizardGpuMode =
  | 'PASSTHROUGH_GRAPHICS'
  | 'PASSTHROUGH_COMPUTE'
  | 'VIRTUAL'

export type VmWizardGpuVendor = 'NVIDIA' | 'AMD' | 'INTEL'

/**
 * GPU attachment, modeled on `vmm.v4.ahv.config.Gpu`. `deviceId`, `mode`,
 * and `vendor` are preserved so the prototype can round-trip the V4 spec.
 */
export interface VmWizardGpu {
  extId: string
  name?: string
  mode: VmWizardGpuMode
  deviceId: number
  vendor: VmWizardGpuVendor
}

/**
 * Reference to a host PCIe device, modeled on
 * `vmm.v4.ahv.config.PcieDeviceReference` (`backingInfo.deviceExtId`) plus the
 * `PcieDevice` location fields the main app surfaces in the picker.
 */
export interface VmWizardPciDevice {
  extId: string
  name?: string
  backingInfo: {
    deviceExtId: string
  }
  clusterName?: string
  hostName?: string
  activeVm?: string
}

/**
 * NIC profile reference, modeled on `networking.v4.config.NicProfile` /
 * `vmm.v4.ahv.config.NicProfileReference`.
 */
export interface VmWizardNicProfileReference {
  extId: string
  name?: string
  nicFamily?: string
}

/**
 * SR-IOV virtual NIC, modeled on `vmm.v4.ahv.config.SriovNic`
 * (`backingInfo`, `NicProfileReference`) and `SriovNicNetworkInfo`
 * (`networkInfo`).
 */
export interface VmWizardSriovNic {
  extId: string
  backingInfo: {
    macAddress?: string
    isConnected: boolean
    nicProfile?: VmWizardNicProfileReference
  }
  networkInfo: {
    nicType: 'SRIOV_NIC'
    vlanId?: number
  }
}

export interface VmWizardResourcesValues {
  numSockets: number
  numCoresPerSocket: number
  memorySizeBytes: number
  disks: VmWizardDisk[]
  nics: VmWizardVirtualNic[]
  gpus: VmWizardGpu[]
  pciDevices: VmWizardPciDevice[]
  sriovNics: VmWizardSriovNic[]
}

export type VmWizardGcScriptType = 'none' | 'cloud-init' | 'sysprep'

export type VmWizardGcConfigMethod = 'custom-script' | 'guided'

/**
 * Guest customization, modeled on the Aphrodite `GuestCustomizationInput`
 * script-type / input-method shape (`cloud_init` vs `sysprep`,
 * `custom-script` upload vs `guided` setup). `script` carries the cloud-init
 * user-data or the sysprep unattend XML; `sshKey` mirrors the
 * `AuthenticationWithSSHInput` public key field.
 */
export interface VmWizardGuestCustomization {
  scriptType: VmWizardGcScriptType
  configMethod: VmWizardGcConfigMethod
  script: string
  sshKey: string
}

export interface VmWizardManagementValues {
  isDefaultStoragePolicyEnabled: boolean
  categories: VmWizardReference[]
  guestOs?: string
  isAgentVm: boolean
  guestCustomization: VmWizardGuestCustomization
  owner?: VmWizardReference
}

export interface VmWizardMetadataValues {
  extId?: string
  etag?: string
  createTime?: string
  updateTime?: string
  sourceVm?: unknown
  lastTaskReference?: VmWizardTaskReference
}

export interface VmWizardSourceVm {
  id: string
  name?: string
  description?: string
  numVcpus?: number
  coresPerVcpu?: number
  memory?: string
  project?: string
  cluster?: string
  owner?: string
  categories?: string
  secureBoot?: boolean
  vTpm?: boolean
}

export interface VmWizardValues {
  configuration: VmWizardConfigurationValues
  resources: VmWizardResourcesValues
  management: VmWizardManagementValues
  metadata: VmWizardMetadataValues
}

export type VmWizardStepErrors = Partial<
  Record<VmWizardStepId, Record<string, string>>
>

export type VmWizardSubformType =
  | 'disk'
  | 'nic'
  | 'gpu'
  | 'pciDevice'
  | 'sriovNic'

export interface VmWizardSubformState {
  type: VmWizardSubformType
  mode: 'create' | 'update'
  entityId?: string
}

export type VmWizardSubformValues =
  | VmWizardDisk
  | VmWizardVirtualNic
  | VmWizardGpu
  | VmWizardPciDevice
  | VmWizardSriovNic

export interface VmWizardSubformDraft {
  state: VmWizardSubformState
  values: VmWizardSubformValues
  errors: Record<string, string>
  operationError?: string
}
