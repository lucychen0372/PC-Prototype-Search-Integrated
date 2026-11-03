import {
  Alert,
  ChevronDownIcon,
  ChevronUpIcon,
  Dropdown,
  FlexLayout,
  FormLayout,
  FormSection,
  Link,
  Menu,
  MenuItem,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import type { TableColumn } from '@nutanix-ui/prism-reactjs/lib/components/v2/Tables/Table'
import { useState } from 'react'
import { VmBootConfigSection } from './VmBootConfigSection'
import { VmResourceFormTable } from './VmResourceFormTable'
import './VmResourcesStep.css'
import { VmShieldVmSection } from './VmShieldVmSection'
import type { VmWizardDisk, VmWizardGpuMode } from './types'
import {
  createDefaultDisk,
  createDefaultGpu,
  createDefaultNic,
  createDefaultPciDevice,
  createDefaultSriovNic,
  useVmWizardStore,
} from './useVmWizardStore'

const DISK_TYPE_LABELS: Record<VmWizardDisk['diskType'], string> = {
  DISK: 'Disk',
  CDROM: 'CD-ROM',
}

const GPU_MODE_LABELS: Record<VmWizardGpuMode, string> = {
  PASSTHROUGH_GRAPHICS: 'Passthrough (Graphics)',
  PASSTHROUGH_COMPUTE: 'Passthrough (Compute)',
  VIRTUAL: 'Virtual (vGPU)',
}

const DISK_COLUMNS: TableColumn[] = [
  { title: '#', key: 'index' },
  { title: 'Type', key: 'type' },
  { title: 'Size', key: 'size' },
  { title: 'Bus Type', key: 'bus' },
]

const NIC_COLUMNS: TableColumn[] = [
  { title: '#', key: 'index' },
  { title: 'Subnet', key: 'subnet' },
  { title: 'VLAN ID', key: 'vlan' },
  { title: 'MAC Address', key: 'mac' },
  { title: 'Connection', key: 'connection' },
]

const GPU_COLUMNS: TableColumn[] = [
  { title: '#', key: 'index' },
  { title: 'Name', key: 'name' },
  { title: 'Mode', key: 'mode' },
  { title: 'Vendor', key: 'vendor' },
]

const PCI_COLUMNS: TableColumn[] = [
  { title: '#', key: 'index' },
  { title: 'Name', key: 'name' },
  { title: 'Device', key: 'device' },
  { title: 'Host', key: 'host' },
]

const SRIOV_COLUMNS: TableColumn[] = [
  { title: '#', key: 'index' },
  { title: 'NIC Profile', key: 'profile' },
  { title: 'VLAN ID', key: 'vlan' },
  { title: 'MAC Address', key: 'mac' },
  { title: 'Connection', key: 'connection' },
]

interface VmResourcesStepProps {
  errors: Record<string, string>
}

export function VmResourcesStep({ errors }: VmResourcesStepProps) {
  const values = useVmWizardStore((state) => state.values)
  const setValues = useVmWizardStore((state) => state.setValues)
  const disks = values.resources.disks
  const nics = values.resources.nics
  const gpus = values.resources.gpus
  const pciDevices = values.resources.pciDevices
  const sriovNics = values.resources.sriovNics
  const projectExtId = values.configuration.project?.extId
  // GPU, PCI, and SR-IOV resources are cluster/host scoped, so they can only be
  // attached once a placement cluster is chosen (matches the main app, which
  // gates these pickers on cluster capability data).
  const canAttachAdvancedResources = Boolean(values.configuration.cluster)
  const openSubform = useVmWizardStore((state) => state.openSubform)
  const removeDisk = useVmWizardStore((state) => state.removeDisk)
  const removeNic = useVmWizardStore((state) => state.removeNic)
  const removeGpu = useVmWizardStore((state) => state.removeGpu)
  const removePciDevice = useVmWizardStore((state) => state.removePciDevice)
  const removeSriovNic = useVmWizardStore((state) => state.removeSriovNic)

  const [isMoreNetworkOptionsOpen, setIsMoreNetworkOptionsOpen] =
    useState(false)
  const [isStoragePolicyAlertVisible, setIsStoragePolicyAlertVisible] =
    useState(true)

  const updateConfiguration = (
    configuration: (typeof values)['configuration'],
  ) => {
    setValues({ ...values, configuration })
  }

  const diskRows = disks.map((disk, index) => ({
    key: disk.extId,
    index: index + 1,
    type: DISK_TYPE_LABELS[disk.diskType],
    size: disk.diskType === 'CDROM' ? '-' : `${disk.sizeGiB} GiB`,
    bus: disk.busType,
  }))

  const nicRows = nics.map((nic, index) => {
    const subnet = nic.networkInfo.subnet
    return {
      key: nic.extId,
      index: index + 1,
      subnet: subnet?.name ?? subnet?.extId ?? '-',
      vlan:
        subnet?.subnetType === 'OVERLAY' ? 'Overlay' : (subnet?.vlanId ?? '-'),
      mac: nic.backingInfo.macAddress ?? 'Auto',
      connection: nic.backingInfo.isConnected ? 'Connected' : 'Disconnected',
    }
  })

  const handleDiskCreate = () => {
    openSubform({ type: 'disk', mode: 'create' }, createDefaultDisk())
  }

  const handleDiskEdit = (extId: string) => {
    const disk = disks.find((item) => item.extId === extId)
    if (disk) {
      openSubform({ type: 'disk', mode: 'update', entityId: extId }, disk)
    }
  }

  const handleNicCreate = () => {
    openSubform({ type: 'nic', mode: 'create' }, createDefaultNic(projectExtId))
  }

  const handleNicEdit = (extId: string) => {
    const nic = nics.find((item) => item.extId === extId)
    if (nic) {
      openSubform({ type: 'nic', mode: 'update', entityId: extId }, nic)
    }
  }

  const gpuRows = gpus.map((gpu, index) => ({
    key: gpu.extId,
    index: index + 1,
    name: gpu.name ?? gpu.extId,
    mode: GPU_MODE_LABELS[gpu.mode],
    vendor: gpu.vendor,
  }))

  const pciRows = pciDevices.map((device, index) => ({
    key: device.extId,
    index: index + 1,
    name: device.name ?? device.extId,
    device: device.backingInfo.deviceExtId || '-',
    host: device.hostName ?? '-',
  }))

  const sriovRows = sriovNics.map((nic, index) => ({
    key: nic.extId,
    index: index + 1,
    profile:
      nic.backingInfo.nicProfile?.name ??
      nic.backingInfo.nicProfile?.extId ??
      '-',
    vlan: nic.networkInfo.vlanId ?? '-',
    mac: nic.backingInfo.macAddress ?? 'Auto',
    connection: nic.backingInfo.isConnected ? 'Connected' : 'Disconnected',
  }))

  const handleGpuCreate = () => {
    openSubform({ type: 'gpu', mode: 'create' }, createDefaultGpu())
  }

  const handleGpuEdit = (extId: string) => {
    const gpu = gpus.find((item) => item.extId === extId)
    if (gpu) {
      openSubform({ type: 'gpu', mode: 'update', entityId: extId }, gpu)
    }
  }

  const handlePciCreate = () => {
    openSubform({ type: 'pciDevice', mode: 'create' }, createDefaultPciDevice())
  }

  const handlePciEdit = (extId: string) => {
    const device = pciDevices.find((item) => item.extId === extId)
    if (device) {
      openSubform(
        { type: 'pciDevice', mode: 'update', entityId: extId },
        device,
      )
    }
  }

  const handleSriovCreate = () => {
    openSubform({ type: 'sriovNic', mode: 'create' }, createDefaultSriovNic())
  }

  const handleSriovEdit = (extId: string) => {
    const nic = sriovNics.find((item) => item.extId === extId)
    if (nic) {
      openSubform({ type: 'sriovNic', mode: 'update', entityId: extId }, nic)
    }
  }

  const handleMoreNetworkOption = ({ key }: { key?: string | number }) => {
    if (key === 'sriov') {
      handleSriovCreate()
      return
    }
    // Traffic-mirroring and network-function NICs are advanced attachments
    // that reuse the standard NIC subform in this prototype.
    if (key === 'traffic-mirroring' || key === 'network_function') {
      handleNicCreate()
    }
  }

  const clusterRequiredHint = (
    <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
      Select a cluster on the Configuration step to attach this resource.
    </TextLabel>
  )

  const moreNetworkOptionsLink = (
    <FlexLayout
      justifyContent="center"
      alignItems="center"
      data-test="dt_more_network_options_container"
    >
      <Dropdown
        action="click"
        popupPlacement="bottomLeft"
        onPopupVisibleChange={setIsMoreNetworkOptionsOpen}
        popup={
          <Menu
            onClick={handleMoreNetworkOption}
            appearance={Menu.MenuAppearance.COMPACT}
            background="base"
          >
            <MenuItem
              key="sriov"
              data-test="dt_sriov_opt"
              disabled={!canAttachAdvancedResources}
            >
              Add SR-IOV NIC
            </MenuItem>
            <MenuItem
              key="traffic-mirroring"
              data-test="dt_traffic_mirroring_opt"
            >
              Add Traffic Mirroring NIC
            </MenuItem>
            <MenuItem
              key="network_function"
              data-test="dt_network_function_opt"
            >
              Add Network Function NIC
            </MenuItem>
          </Menu>
        }
      >
        <Link type={Link.LINK_TYPE.PRIMARY} data-test="dt_more_network_options">
          <FlexLayout alignItems="center" itemGap="XS">
            More Network Options
            {isMoreNetworkOptionsOpen ? (
              <ChevronUpIcon size="small" />
            ) : (
              <ChevronDownIcon size="small" />
            )}
          </FlexLayout>
        </Link>
      </Dropdown>
    </FlexLayout>
  )

  return (
    <FormLayout className="vm-resources-step" padding="0px">
      {isStoragePolicyAlertVisible && (
        <Alert
          type={Alert.AlertTypes.INFO}
          inline={true}
          data-test="dt_storage_policy_info"
          onClose={() => setIsStoragePolicyAlertVisible(false)}
          message={
            <StackingLayout padding="15px-0px">
              Any storage policy applied later, will manage the storage
              properties for all VM disks. Data placement will remain
              unaffected.{' '}
              <Link
                type={Link.LINK_TYPE.PRIMARY}
                href="https://portal.nutanix.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </Link>
            </StackingLayout>
          }
        />
      )}

      <FormSection aria-label="Disks" padding="0px">
        <StackingLayout padding="0px" itemGap="S">
          {errors.disks && (
            <Alert
              type={Alert.AlertTypes.WARNING}
              message={errors.disks}
              showCloseIcon={false}
              data-test="vm-resources-disks-error"
            />
          )}
          <VmResourceFormTable
            title="Disks"
            createText="Add Disk"
            emptyCreateText="Attach Disk"
            createDataTest="vmAddStorageBtn"
            dataTest="dt_disk_input"
            ariaLabel="Disks"
            columns={DISK_COLUMNS}
            dataSource={diskRows}
            noDataText="No disks added."
            onCreate={handleDiskCreate}
            onEdit={(row) => handleDiskEdit(String(row.key))}
            onRemove={(row) => removeDisk(String(row.key))}
          />
        </StackingLayout>
      </FormSection>

      <FormSection aria-label="Network" padding="0px">
        <StackingLayout padding="0px" itemGap="S">
          {errors.nics && (
            <Alert
              type={Alert.AlertTypes.WARNING}
              message={errors.nics}
              showCloseIcon={false}
              data-test="vm-resources-nics-error"
            />
          )}
          <VmResourceFormTable
            title="Network"
            createText="Attach to Subnet"
            emptyCreateText="Attach to Subnet"
            showEmptyCreateIcon={true}
            createDataTest="vmCreateNetworkBtn"
            dataTest="dt_vm_network_input"
            ariaLabel="Network"
            columns={NIC_COLUMNS}
            dataSource={nicRows}
            noDataText="No NICs attached."
            onCreate={handleNicCreate}
            onEdit={(row) => handleNicEdit(String(row.key))}
            onRemove={(row) => removeNic(String(row.key))}
            emptyExtra={moreNetworkOptionsLink}
          />
          {nicRows.length > 0 && moreNetworkOptionsLink}
        </StackingLayout>
      </FormSection>

      {sriovNics.length > 0 && (
        <FormSection aria-label="SR-IOV NICs" padding="0px">
          <VmResourceFormTable
            title="SR-IOV NICs"
            createText="Add SR-IOV NIC"
            emptyCreateText="Add SR-IOV NIC"
            createDataTest="vmAddSriovNicBtn"
            dataTest="dt_sriov_nic_input"
            ariaLabel="SR-IOV NICs"
            columns={SRIOV_COLUMNS}
            dataSource={sriovRows}
            noDataText="No SR-IOV NICs attached."
            canCreate={canAttachAdvancedResources}
            onCreate={handleSriovCreate}
            onEdit={(row) => handleSriovEdit(String(row.key))}
            onRemove={(row) => removeSriovNic(String(row.key))}
          />
        </FormSection>
      )}

      <FormSection aria-label="GPUs" padding="0px">
        <VmResourceFormTable
          title="GPUs"
          createText="Add GPU"
          emptyCreateText="Add GPU"
          createDataTest="vmAddGpuBtn"
          dataTest="dt_gpu_input"
          ariaLabel="GPUs"
          columns={GPU_COLUMNS}
          dataSource={gpuRows}
          noDataText="No GPUs added."
          canCreate={canAttachAdvancedResources}
          onCreate={handleGpuCreate}
          onEdit={(row) => handleGpuEdit(String(row.key))}
          onRemove={(row) => removeGpu(String(row.key))}
          emptyExtra={
            canAttachAdvancedResources ? undefined : clusterRequiredHint
          }
        />
      </FormSection>

      <FormSection aria-label="PCI Devices" padding="0px">
        <VmResourceFormTable
          title="PCI Devices"
          createText="Add PCI Device"
          emptyCreateText="Add PCI Device"
          createDataTest="vmAddPciDeviceBtn"
          dataTest="dt_pci_device_input"
          ariaLabel="PCI Devices"
          columns={PCI_COLUMNS}
          dataSource={pciRows}
          noDataText="No PCI devices added."
          canCreate={canAttachAdvancedResources}
          onCreate={handlePciCreate}
          onEdit={(row) => handlePciEdit(String(row.key))}
          onRemove={(row) => removePciDevice(String(row.key))}
          emptyExtra={
            canAttachAdvancedResources ? undefined : clusterRequiredHint
          }
        />
      </FormSection>

      <VmBootConfigSection
        values={values}
        onConfigurationChange={updateConfiguration}
      />

      <VmShieldVmSection
        values={values}
        onConfigurationChange={updateConfiguration}
      />
    </FormLayout>
  )
}
