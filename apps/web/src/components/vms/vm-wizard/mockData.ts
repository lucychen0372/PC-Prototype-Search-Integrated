import type {
  VmWizardGpu,
  VmWizardNicProfileReference,
  VmWizardPciDevice,
  VmWizardReference,
  VmWizardSubnetReference,
} from './types'

/**
 * Category `name:value` tags, modeled on the Aphrodite `CategorySelector`
 * options (`prism.v4.config.Category`). IDs are preserved in state while the
 * `name` is rendered as the friendly tag label.
 */
export const CATEGORY_OPTIONS: VmWizardReference[] = [
  { extId: 'c-environment-production', name: 'Environment:Production' },
  { extId: 'c-environment-staging', name: 'Environment:Staging' },
  { extId: 'c-apptype-database', name: 'AppType:Database' },
  { extId: 'c-appType-webserver', name: 'AppType:WebServer' },
  { extId: 'c-department-engineering', name: 'Department:Engineering' },
  { extId: 'c-storage-default', name: 'Storage:$Default' },
]

/**
 * Guest OS options, modeled on the Aphrodite `GUEST_OS_LIST` select.
 */
export const GUEST_OS_OPTIONS: VmWizardReference[] = [
  { extId: 'rhel9', name: 'Red Hat Enterprise Linux 9' },
  { extId: 'ubuntu2204', name: 'Ubuntu 22.04 LTS' },
  { extId: 'centos8', name: 'CentOS Stream 8' },
  { extId: 'windows2022', name: 'Windows Server 2022' },
  { extId: 'windows11', name: 'Windows 11' },
]

/**
 * Hardware clock timezone options, modeled on the Aphrodite
 * `TimezoneSelector` priority list.
 */
export const TIMEZONE_OPTIONS: VmWizardReference[] = [
  { extId: 'UTC', name: '(UTC) UTC' },
  { extId: 'America/Los_Angeles', name: '(UTC-08:00) Pacific Time' },
  { extId: 'America/New_York', name: '(UTC-05:00) Eastern Time' },
  { extId: 'Europe/London', name: '(UTC+00:00) London' },
  { extId: 'Asia/Kolkata', name: '(UTC+05:30) India Standard Time' },
  { extId: 'Asia/Tokyo', name: '(UTC+09:00) Tokyo' },
]

/**
 * VM owner options, modeled on the IAM user references the main app surfaces.
 */
export const OWNER_OPTIONS: VmWizardReference[] = [
  { extId: 'user-admin', name: 'admin' },
  { extId: 'user-jdoe', name: 'jdoe@nutanix.local' },
  { extId: 'user-svc-automation', name: 'svc-automation@nutanix.local' },
]

export const DEFAULT_PROJECT_EXT_ID = '00000000-0000-0000-0000-000000000000'

/**
 * Seeded from the Playwright project list mock shape
 * (`multidomain.v4.config.Project`): `-api-multidomain-v4.3.b1-config-projects.json`.
 * The default `_internal` project is system-defined and matches the mock's
 * `isDefault eq true and isSystemDefined eq true` response.
 */
export const PROJECT_OPTIONS: VmWizardReference[] = [
  { extId: DEFAULT_PROJECT_EXT_ID, name: '_internal' },
  { extId: 'ad17b93a-e237-459a-9fb5-3e3fe358020f', name: 'gpu-proj' },
  { extId: 'f0f8ee7d-1625-5753-a6ee-43b5f554b3bd', name: 'ST_Project_1' },
  { extId: 'ef6f8b37-1a48-50f3-a9cc-7bfc6eac3061', name: 'ST_Project_10' },
  { extId: 'b666345f-053f-5b22-9f81-7bf9df5f54c7', name: 'ST_Project_100' },
]

/**
 * Seeded from the Playwright cluster list mock shape
 * (`clustermgmt.v4.config.Cluster`): `-api-clustermgmt-SDK_URL_VERSION-config-clusters.json`.
 * Only AHV hyper-converged clusters are selectable as VM placement targets;
 * the Prism Central cluster from the mock is intentionally excluded.
 */
export const CLUSTER_OPTIONS: VmWizardReference[] = [
  {
    extId: '00064dda-a0c4-c57a-2a85-74e2e7fa25d0',
    name: 'Cluster ABC',
  },
  {
    extId: '00064dda-a14c-3115-488e-78851788ce00',
    name: 'Cluster DEF',
  },
  {
    extId: '00064dda-a350-2c9d-1774-78851788cd94',
    name: 'Cluster GHI',
  },
  {
    extId: '00064de5-805e-2a1e-093e-7cc2558190de',
    name: 'Cluster JKL',
  },
]

/**
 * Seeded from the project-aware subnet mock shape
 * (`networking.v4.config.Subnet`):
 * `-api-networking-SDK_URL_VERSION-config-subnets.json`. Each option keeps the
 * project-aware fields (`projectExtId`, `sharedWithProjects`, `virtualSwitch`,
 * `subnetType`, `isAdvancedNetworking`, `isConnected`) so subform filtering and
 * Review copy can match the main app. `vlanId` mirrors the subnet `networkId`.
 */
export const SUBNET_OPTIONS: VmWizardSubnetReference[] = [
  {
    extId: '875a29ef-3523-4fdc-afb2-1546c9d1000e',
    name: 'pc-dvs-subnet-1',
    projectExtId: DEFAULT_PROJECT_EXT_ID,
    sharedWithProjects: [],
    virtualSwitch: 'pc-dvs-1',
    subnetType: 'VLAN',
    vlanId: 11,
    isAdvancedNetworking: true,
    isConnected: true,
  },
  {
    extId: '6a23c6ac-3b5d-48a1-9c27-3d5d77bd1229',
    name: 'pc-dvs-subnet-2',
    projectExtId: DEFAULT_PROJECT_EXT_ID,
    sharedWithProjects: [],
    virtualSwitch: 'pc-dvs-2',
    subnetType: 'VLAN',
    vlanId: 12,
    isAdvancedNetworking: true,
    isConnected: true,
  },
  {
    extId: '74bd11b3-5cd9-4f24-bbaf-c098facd61f8',
    name: 'vlan.1110',
    projectExtId: DEFAULT_PROJECT_EXT_ID,
    sharedWithProjects: ['ad17b93a-e237-459a-9fb5-3e3fe358020f'],
    virtualSwitch: 'vs0',
    subnetType: 'VLAN',
    vlanId: 1110,
    isAdvancedNetworking: false,
    isConnected: true,
  },
  {
    extId: '4132a28d-1831-45b9-8b14-45cab9b3715b',
    name: 'gpu-proj-overlay',
    projectExtId: 'ad17b93a-e237-459a-9fb5-3e3fe358020f',
    sharedWithProjects: [DEFAULT_PROJECT_EXT_ID],
    virtualSwitch: 'vs0',
    subnetType: 'OVERLAY',
    isAdvancedNetworking: true,
    isConnected: true,
  },
  {
    extId: 'f0a3d7c1-2b88-4a90-9d35-6b2cb1f0aa21',
    name: 'st-project-1-vlan',
    projectExtId: 'f0f8ee7d-1625-5753-a6ee-43b5f554b3bd',
    sharedWithProjects: [],
    virtualSwitch: 'vs0',
    subnetType: 'VLAN',
    vlanId: 220,
    isAdvancedNetworking: false,
    isConnected: true,
  },
]

/**
 * Replicates the mock's project-aware subnet query: a subnet is visible when it
 * belongs to the current project or is shared with the current project.
 * Mirrors `projectExtId eq '<id>' or sharedWithProjects/any(a:a eq '<id>')`.
 */
export const getSubnetOptionsForProject = (
  projectExtId: string | undefined,
): VmWizardSubnetReference[] => {
  if (!projectExtId) {
    return SUBNET_OPTIONS
  }

  return SUBNET_OPTIONS.filter(
    (subnet) =>
      subnet.projectExtId === projectExtId ||
      (subnet.sharedWithProjects ?? []).includes(projectExtId),
  )
}

/**
 * Available GPUs, seeded from the GPU/PCI update mock shape
 * (`vmm.v4.ahv.config.Gpu`). Mixes virtual (vGPU) and passthrough modes so the
 * GPU subform can render both the assignable and the "all GPUs in use" states.
 */
export const GPU_OPTIONS: VmWizardGpu[] = [
  {
    extId: 'd0f5b1a2-7c3e-4f10-8b21-9c0a1d2e3f40',
    name: 'NVIDIA A100-4Q',
    mode: 'VIRTUAL',
    deviceId: 7_864_321,
    vendor: 'NVIDIA',
  },
  {
    extId: 'a3c9e5d7-1b24-4980-bb6f-2e8d7c1f0a55',
    name: 'NVIDIA A100 (Passthrough)',
    mode: 'PASSTHROUGH_GRAPHICS',
    deviceId: 7_864_320,
    vendor: 'NVIDIA',
  },
  {
    extId: 'b8f1c2d3-4a56-4789-9c0d-1e2f3a4b5c6d',
    name: 'NVIDIA H100 (Compute)',
    mode: 'PASSTHROUGH_COMPUTE',
    deviceId: 9_043_968,
    vendor: 'NVIDIA',
  },
  {
    extId: 'c4d5e6f7-8a90-41b2-83c4-5d6e7f8a9b0c',
    name: 'AMD Instinct MI210',
    mode: 'PASSTHROUGH_COMPUTE',
    deviceId: 29_824,
    vendor: 'AMD',
  },
]

/**
 * Available host PCIe devices, seeded from the GPU/PCI update mock shape
 * (`vmm.v4.ahv.config.PcieDevice`). `backingInfo.deviceExtId` preserves the
 * host device reference and the location fields back the picker tooltip.
 */
export const PCI_DEVICE_OPTIONS: VmWizardPciDevice[] = [
  {
    extId: '2f3a4b5c-6d7e-4f80-91a2-b3c4d5e6f708',
    name: 'Mellanox ConnectX-6 Dx',
    backingInfo: {
      deviceExtId: '0000:3b:00.0',
    },
    clusterName: 'Cluster ABC',
    hostName: 'host-a-10-46-12-21',
  },
  {
    extId: '7a8b9c0d-1e2f-4304-95a6-b7c8d9e0f102',
    name: 'Intel QAT 8970',
    backingInfo: {
      deviceExtId: '0000:88:00.0',
    },
    clusterName: 'Cluster ABC',
    hostName: 'host-b-10-46-12-22',
    activeVm: 'crypto-offload-vm',
  },
  {
    extId: 'e1f2a3b4-c5d6-4e70-81f2-a3b4c5d6e7f8',
    name: 'NVMe Datacenter SSD',
    backingInfo: {
      deviceExtId: '0000:5e:00.0',
    },
    clusterName: 'Cluster GHI',
    hostName: 'host-c-10-46-12-23',
  },
]

/**
 * Available SR-IOV NIC profiles, seeded from the SR-IOV NIC list mock shape
 * (`networking.v4.config.NicProfile`). Used by the SR-IOV NIC subform picker.
 */
export const NIC_PROFILE_OPTIONS: VmWizardNicProfileReference[] = [
  {
    extId: '9d3c8b7a-6e5f-4d3c-2b1a-0f9e8d7c6b5a',
    name: 'sriov-profile-mlnx-25g',
    nicFamily: 'Mellanox ConnectX-6',
  },
  {
    extId: '1a2b3c4d-5e6f-4708-9a0b-1c2d3e4f5061',
    name: 'sriov-profile-intel-10g',
    nicFamily: 'Intel X710',
  },
  {
    extId: '5f6e7d8c-9b0a-4123-8c4d-5e6f70819203',
    name: 'sriov-profile-broadcom-100g',
    nicFamily: 'Broadcom BCM57508',
  },
]
