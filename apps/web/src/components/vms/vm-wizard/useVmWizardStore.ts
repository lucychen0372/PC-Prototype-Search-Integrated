import { create } from 'zustand'
import { DEFAULT_PROJECT_EXT_ID, getSubnetOptionsForProject } from './mockData'
import type {
  VmWizardBannerAlert,
  VmWizardDisk,
  VmWizardGpu,
  VmWizardMetadataValues,
  VmWizardMode,
  VmWizardPciDevice,
  VmWizardSourceVm,
  VmWizardSriovNic,
  VmWizardStepErrors,
  VmWizardStepId,
  VmWizardSubformDraft,
  VmWizardSubformState,
  VmWizardSubformValues,
  VmWizardTaskReference,
  VmWizardValues,
  VmWizardVirtualNic,
} from './types'
import { gibToBytes } from './units'

const upsertById = <T extends { extId: string }>(items: T[], next: T): T[] =>
  items.some((item) => item.extId === next.extId)
    ? items.map((item) => (item.extId === next.extId ? next : item))
    : [...items, next]

const createId = (): string =>
  typeof globalThis.crypto.randomUUID === 'function'
    ? globalThis.crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}-${Date.now()}`

export const createDefaultDisk = (): VmWizardDisk => ({
  extId: createId(),
  diskType: 'DISK',
  busType: 'SCSI',
  sizeGiB: 20,
})

export const createDefaultNic = (
  projectExtId: string | undefined,
): VmWizardVirtualNic => {
  const [defaultSubnet] = getSubnetOptionsForProject(projectExtId)

  return {
    extId: createId(),
    backingInfo: {
      isConnected: true,
      numQueues: 1,
    },
    networkInfo: {
      nicType: 'NORMAL_NIC',
      subnet: defaultSubnet,
      vlanMode: 'ACCESS',
    },
  }
}

export const createDefaultGpu = (): VmWizardGpu => ({
  extId: createId(),
  name: undefined,
  mode: 'PASSTHROUGH_GRAPHICS',
  deviceId: 0,
  vendor: 'NVIDIA',
})

export const createDefaultPciDevice = (): VmWizardPciDevice => ({
  extId: createId(),
  name: undefined,
  backingInfo: {
    deviceExtId: '',
  },
})

export const createDefaultSriovNic = (): VmWizardSriovNic => ({
  extId: createId(),
  backingInfo: {
    isConnected: true,
    nicProfile: undefined,
  },
  networkInfo: {
    nicType: 'SRIOV_NIC',
  },
})

export const VM_WIZARD_STEPS = [
  { id: 'configuration', title: 'Configuration' },
  { id: 'resources', title: 'Resources' },
  { id: 'management', title: 'Management' },
  { id: 'review', title: 'Review' },
] as const

const createDefaultValues = (
  metadata: VmWizardMetadataValues = {},
): VmWizardValues => ({
  configuration: {
    name: '',
    description: '',
    vmCount: 1,
    project: {
      extId: DEFAULT_PROJECT_EXT_ID,
      name: '_internal',
    },
    cluster: undefined,
    hardwareClockTimezone: 'UTC',
    isMemoryOvercommitEnabled: false,
    isAdvancedCpuCompatibilityEnabled: false,
    bootConfig: {
      bootType: 'UEFI',
      isSecureBootEnabled: false,
      isCredentialGuardEnabled: false,
      bootDevice: null,
      bootOrder: ['DISK', 'CDROM', 'NETWORK'],
    },
    vtpmConfig: {
      isVtpmEnabled: false,
    },
    apcConfig: {
      isApcEnabled: false,
    },
  },
  resources: {
    numSockets: 1,
    numCoresPerSocket: 1,
    memorySizeBytes: gibToBytes(4),
    disks: [],
    nics: [],
    gpus: [],
    pciDevices: [],
    sriovNics: [],
  },
  management: {
    isDefaultStoragePolicyEnabled: false,
    categories: [],
    guestOs: undefined,
    isAgentVm: false,
    guestCustomization: {
      scriptType: 'none',
      configMethod: 'custom-script',
      script: '',
      sshKey: '',
    },
    owner: undefined,
  },
  metadata: {
    lastTaskReference: undefined,
    ...metadata,
  },
})

const parseMemorySizeBytes = (memory?: string) => {
  const parsedMemory = Number.parseFloat(memory ?? '')

  return gibToBytes(Number.isFinite(parsedMemory) ? parsedMemory : 4)
}

// Source VM numeric fields can arrive as strings from the EBR entity data, so
// coerce them to a positive integer; the validators require real integers.
const parsePositiveInt = (value: unknown, fallback: number): number => {
  const parsed = Number.parseInt(String(value), 10)

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

const createUpdateValues = (
  sourceVm: VmWizardSourceVm,
  metadata: VmWizardMetadataValues = {},
): VmWizardValues => {
  const defaultValues = createDefaultValues({
    extId: sourceVm.id,
    sourceVm,
    ...metadata,
  })

  return {
    ...defaultValues,
    configuration: {
      ...defaultValues.configuration,
      name: sourceVm.name ?? '',
      description: sourceVm.description ?? '',
      project: sourceVm.project
        ? {
            extId: sourceVm.project,
            name: sourceVm.project,
          }
        : undefined,
      cluster: sourceVm.cluster
        ? {
            extId: sourceVm.cluster,
            name: sourceVm.cluster,
          }
        : undefined,
      bootConfig: {
        ...defaultValues.configuration.bootConfig,
        isSecureBootEnabled: sourceVm.secureBoot ?? true,
      },
      vtpmConfig: {
        isVtpmEnabled: sourceVm.vTpm ?? false,
      },
    },
    resources: {
      ...defaultValues.resources,
      numSockets: parsePositiveInt(sourceVm.numVcpus, 1),
      numCoresPerSocket: parsePositiveInt(sourceVm.coresPerVcpu, 1),
      memorySizeBytes: parseMemorySizeBytes(sourceVm.memory),
    },
    management: {
      ...defaultValues.management,
      categories: sourceVm.categories
        ? sourceVm.categories.split(',').map((category) => ({
            extId: category.trim(),
            name: category.trim(),
          }))
        : [],
      owner: sourceVm.owner
        ? {
            extId: sourceVm.owner,
            name: sourceVm.owner,
          }
        : undefined,
    },
  }
}

interface VmWizardStoreState {
  mode: VmWizardMode
  activeStepId: VmWizardStepId
  values: VmWizardValues
  stepErrors: VmWizardStepErrors
  bannerAlerts: VmWizardBannerAlert[]
  submitError?: string
  activeSubform?: VmWizardSubformState
  subformDraft?: VmWizardSubformDraft
  isSaving: boolean
  isDirty: boolean
  isDirtyCloseConfirmationOpen: boolean
  open: (
    mode: VmWizardMode,
    metadata?: VmWizardMetadataValues,
    sourceVm?: VmWizardSourceVm,
  ) => void
  setActiveStep: (stepId: VmWizardStepId) => void
  setValues: (values: VmWizardValues) => void
  setStepErrors: (stepErrors: VmWizardStepErrors) => void
  setBannerAlerts: (alerts: VmWizardBannerAlert[]) => void
  setSubmitError: (submitError?: string) => void
  setSaving: (isSaving: boolean) => void
  openSubform: (
    state: VmWizardSubformState,
    values: VmWizardSubformValues,
  ) => void
  setSubformValues: (values: VmWizardSubformValues) => void
  setSubformErrors: (errors: Record<string, string>) => void
  setSubformOperationError: (operationError?: string) => void
  closeSubform: () => void
  commitSubform: () => void
  removeDisk: (extId: string) => void
  removeNic: (extId: string) => void
  removeGpu: (extId: string) => void
  removePciDevice: (extId: string) => void
  removeSriovNic: (extId: string) => void
  requestClose: () => boolean
  confirmDiscard: () => void
  cancelDiscard: () => void
  beginSubmit: () => void
  completeSubmit: (taskReference: VmWizardTaskReference) => void
  failSubmit: (message: string) => void
}

export const useVmWizardStore = create<VmWizardStoreState>((set, get) => ({
  mode: 'create',
  activeStepId: 'configuration',
  values: createDefaultValues(),
  stepErrors: {},
  bannerAlerts: [],
  submitError: undefined,
  activeSubform: undefined,
  subformDraft: undefined,
  isSaving: false,
  isDirty: false,
  isDirtyCloseConfirmationOpen: false,
  open: (mode, metadata, sourceVm) =>
    set({
      mode,
      activeStepId: 'configuration',
      values:
        mode === 'update' && sourceVm
          ? createUpdateValues(sourceVm, metadata)
          : createDefaultValues(metadata),
      stepErrors: {},
      bannerAlerts: [],
      submitError: undefined,
      activeSubform: undefined,
      subformDraft: undefined,
      isSaving: false,
      isDirty: false,
      isDirtyCloseConfirmationOpen: false,
    }),
  setActiveStep: (stepId) =>
    set({
      activeStepId: stepId,
      bannerAlerts: [],
      stepErrors: {},
    }),
  setValues: (values) =>
    set({
      values,
      isDirty: true,
    }),
  setStepErrors: (stepErrors) => set({ stepErrors }),
  setBannerAlerts: (bannerAlerts) => set({ bannerAlerts }),
  setSubmitError: (submitError) => set({ submitError }),
  setSaving: (isSaving) => set({ isSaving }),
  openSubform: (state, values) =>
    set({
      activeSubform: state,
      subformDraft: {
        state,
        values,
        errors: {},
        operationError: undefined,
      },
    }),
  setSubformValues: (values) =>
    set((current) =>
      current.subformDraft
        ? {
            subformDraft: {
              ...current.subformDraft,
              values,
              errors: {},
            },
          }
        : {},
    ),
  setSubformErrors: (errors) =>
    set((current) =>
      current.subformDraft
        ? { subformDraft: { ...current.subformDraft, errors } }
        : {},
    ),
  setSubformOperationError: (operationError) =>
    set((current) =>
      current.subformDraft
        ? { subformDraft: { ...current.subformDraft, operationError } }
        : {},
    ),
  closeSubform: () =>
    set({ activeSubform: undefined, subformDraft: undefined }),
  commitSubform: () =>
    set((current) => {
      const draft = current.subformDraft
      if (!draft) {
        return {}
      }

      const { resources } = current.values
      let nextResources = resources

      switch (draft.state.type) {
        case 'disk': {
          const disk = draft.values as VmWizardDisk
          nextResources = {
            ...resources,
            disks: upsertById(resources.disks, disk),
          }
          break
        }
        case 'nic': {
          const nic = draft.values as VmWizardVirtualNic
          nextResources = {
            ...resources,
            nics: upsertById(resources.nics, nic),
          }
          break
        }
        case 'gpu': {
          const gpu = draft.values as VmWizardGpu
          nextResources = {
            ...resources,
            gpus: upsertById(resources.gpus, gpu),
          }
          break
        }
        case 'pciDevice': {
          const pciDevice = draft.values as VmWizardPciDevice
          nextResources = {
            ...resources,
            pciDevices: upsertById(resources.pciDevices, pciDevice),
          }
          break
        }
        case 'sriovNic': {
          const sriovNic = draft.values as VmWizardSriovNic
          nextResources = {
            ...resources,
            sriovNics: upsertById(resources.sriovNics, sriovNic),
          }
          break
        }
        default:
          break
      }

      return {
        values: { ...current.values, resources: nextResources },
        isDirty: true,
        activeSubform: undefined,
        subformDraft: undefined,
      }
    }),
  removeDisk: (extId) =>
    set((current) => ({
      values: {
        ...current.values,
        resources: {
          ...current.values.resources,
          disks: current.values.resources.disks.filter(
            (item) => item.extId !== extId,
          ),
        },
      },
      isDirty: true,
    })),
  removeNic: (extId) =>
    set((current) => ({
      values: {
        ...current.values,
        resources: {
          ...current.values.resources,
          nics: current.values.resources.nics.filter(
            (item) => item.extId !== extId,
          ),
        },
      },
      isDirty: true,
    })),
  removeGpu: (extId) =>
    set((current) => ({
      values: {
        ...current.values,
        resources: {
          ...current.values.resources,
          gpus: current.values.resources.gpus.filter(
            (item) => item.extId !== extId,
          ),
        },
      },
      isDirty: true,
    })),
  removePciDevice: (extId) =>
    set((current) => ({
      values: {
        ...current.values,
        resources: {
          ...current.values.resources,
          pciDevices: current.values.resources.pciDevices.filter(
            (item) => item.extId !== extId,
          ),
        },
      },
      isDirty: true,
    })),
  removeSriovNic: (extId) =>
    set((current) => ({
      values: {
        ...current.values,
        resources: {
          ...current.values.resources,
          sriovNics: current.values.resources.sriovNics.filter(
            (item) => item.extId !== extId,
          ),
        },
      },
      isDirty: true,
    })),
  requestClose: () => {
    if (!get().isDirty) {
      return true
    }

    set({ isDirtyCloseConfirmationOpen: true })
    return false
  },
  confirmDiscard: () =>
    set({
      isDirty: false,
      isDirtyCloseConfirmationOpen: false,
    }),
  cancelDiscard: () => set({ isDirtyCloseConfirmationOpen: false }),
  beginSubmit: () => set({ isSaving: true, submitError: undefined }),
  completeSubmit: (taskReference) =>
    set((state) => ({
      isSaving: false,
      isDirty: false,
      submitError: undefined,
      values: {
        ...state.values,
        metadata: {
          ...state.values.metadata,
          lastTaskReference: taskReference,
        },
      },
    })),
  failSubmit: (message) => set({ isSaving: false, submitError: message }),
}))
