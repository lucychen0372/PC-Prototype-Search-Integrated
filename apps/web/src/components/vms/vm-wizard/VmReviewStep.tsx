import {
  Accordion,
  FlexItem,
  FlexLayout,
  FormLayout,
  Link,
  StackingLayout,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'
import type { ReactNode } from 'react'
import './VmReviewStep.css'
import type {
  VmWizardGcScriptType,
  VmWizardGpuMode,
  VmWizardMode,
  VmWizardValues,
} from './types'
import { bytesToGib } from './units'

const NOT_SET = '—'

const GPU_MODE_LABELS: Record<VmWizardGpuMode, string> = {
  PASSTHROUGH_GRAPHICS: 'Passthrough (Graphics)',
  PASSTHROUGH_COMPUTE: 'Passthrough (Compute)',
  VIRTUAL: 'Virtual (vGPU)',
}

const SCRIPT_TYPE_LABELS: Record<VmWizardGcScriptType, string> = {
  none: 'No Customization',
  'cloud-init': 'Cloud-init (Linux)',
  sysprep: 'Sysprep (Windows)',
}

function DetailItem({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <FlexLayout
      itemGap="M"
      alignItems="flex-start"
      className="vm-review-step__detail"
    >
      <FlexItem className="vm-review-step__detail-label">
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          {label}
        </TextLabel>
      </FlexItem>
      <FlexItem flexGrow="1">
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
          {children}
        </TextLabel>
      </FlexItem>
    </FlexLayout>
  )
}

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit: () => void
  children: ReactNode
}) {
  return (
    <Accordion
      title={title}
      expandedByDefault={true}
      headerProps={{ justifyContent: 'space-between' }}
      extraHeaderContent={
        <Link
          type={Link.LINK_TYPE.PRIMARY}
          onClick={(event) => {
            // Keep the Edit action from toggling the accordion header.
            event.stopPropagation()
            onEdit()
          }}
        >
          Edit
        </Link>
      }
    >
      <StackingLayout
        padding="20px"
        itemGap="S"
        className="vm-review-step__section-card"
      >
        {children}
      </StackingLayout>
    </Accordion>
  )
}

interface VmReviewStepProps {
  mode: VmWizardMode
  values: VmWizardValues
  onEditStep: (stepIndex: number) => void
}

export function VmReviewStep({ mode, values, onEditStep }: VmReviewStepProps) {
  const { configuration, resources, management, metadata } = values
  const totalCores = resources.numSockets * resources.numCoresPerSocket
  const referenceLabel = (
    reference: { name?: string; extId: string } | undefined,
  ) => reference?.name ?? reference?.extId ?? NOT_SET

  return (
    <FormLayout
      className="vm-review-step"
      padding="0px"
      data-test="dt_review_step_content"
    >
      <ReviewSection title="Configuration" onEdit={() => onEditStep(0)}>
        <DetailItem label="Name">{configuration.name || NOT_SET}</DetailItem>
        <DetailItem label="Description">
          {configuration.description || NOT_SET}
        </DetailItem>
        <DetailItem label="Project">
          {referenceLabel(configuration.project)}
        </DetailItem>
        <DetailItem label="Cluster">
          {referenceLabel(configuration.cluster)}
        </DetailItem>
        {mode === 'create' && (
          <DetailItem label="Number of VMs">{configuration.vmCount}</DetailItem>
        )}
        <DetailItem label="vCPUs">
          {`${resources.numSockets} vCPU × ${resources.numCoresPerSocket} core (${totalCores} total)`}
        </DetailItem>
        <DetailItem label="Memory">
          {`${bytesToGib(resources.memorySizeBytes)} GiB`}
        </DetailItem>
        <DetailItem label="Memory overcommit">
          {configuration.isMemoryOvercommitEnabled ? 'Enabled' : 'Disabled'}
        </DetailItem>
      </ReviewSection>

      <ReviewSection title="Resources" onEdit={() => onEditStep(1)}>
        <DetailItem label="Disks">
          {resources.disks.length === 0
            ? 'No disks added.'
            : resources.disks
                .map((disk) =>
                  disk.diskType === 'CDROM'
                    ? `CD-ROM (${disk.busType})`
                    : `${disk.sizeGiB} GiB ${disk.busType} disk`,
                )
                .join(', ')}
        </DetailItem>
        <DetailItem label="NICs">
          {resources.nics.length === 0
            ? 'No NICs attached.'
            : resources.nics
                .map((nic) => {
                  const subnet = nic.networkInfo.subnet
                  const vlan =
                    subnet?.subnetType === 'OVERLAY'
                      ? 'Overlay'
                      : (subnet?.vlanId ?? '—')
                  return `${referenceLabel(subnet)} (VLAN ${vlan})`
                })
                .join(', ')}
        </DetailItem>
        {resources.sriovNics.length > 0 && (
          <DetailItem label="SR-IOV NICs">
            {resources.sriovNics
              .map((nic) => {
                const profile = referenceLabel(nic.backingInfo.nicProfile)
                const vlan = nic.networkInfo.vlanId ?? '—'
                const connection = nic.backingInfo.isConnected
                  ? 'Connected'
                  : 'Disconnected'
                return `${profile} (VLAN ${vlan}, ${connection})`
              })
              .join(', ')}
          </DetailItem>
        )}
        {resources.gpus.length > 0 && (
          <DetailItem label="GPUs">
            {resources.gpus
              .map(
                (gpu) =>
                  `${gpu.name ?? gpu.extId} — ${GPU_MODE_LABELS[gpu.mode]} (${gpu.vendor})`,
              )
              .join(', ')}
          </DetailItem>
        )}
        {resources.pciDevices.length > 0 && (
          <DetailItem label="PCI Devices">
            {resources.pciDevices
              .map(
                (device) =>
                  `${device.name ?? device.extId} (${device.backingInfo.deviceExtId})${
                    device.hostName ? ` on ${device.hostName}` : ''
                  }`,
              )
              .join(', ')}
          </DetailItem>
        )}
        <DetailItem label="Boot configuration">
          {`${configuration.bootConfig.bootType}${
            configuration.bootConfig.isSecureBootEnabled ? ', Secure Boot' : ''
          }${
            configuration.bootConfig.isCredentialGuardEnabled
              ? ', Credential Guard'
              : ''
          }`}
        </DetailItem>
        <DetailItem label="vTPM">
          {configuration.vtpmConfig.isVtpmEnabled ? 'Attached' : 'Not attached'}
        </DetailItem>
      </ReviewSection>

      <ReviewSection title="Management" onEdit={() => onEditStep(2)}>
        <DetailItem label="Default-Storage policy">
          {management.isDefaultStoragePolicyEnabled ? 'Enabled' : 'Disabled'}
        </DetailItem>
        <DetailItem label="Categories">
          {management.categories.length === 0
            ? NOT_SET
            : management.categories
                .map((category) => referenceLabel(category))
                .join(', ')}
        </DetailItem>
        <DetailItem label="Guest OS">
          {management.guestOs ?? NOT_SET}
        </DetailItem>
        <DetailItem label="Timezone">
          {configuration.hardwareClockTimezone}
        </DetailItem>
        <DetailItem label="Agent VM">
          {management.isAgentVm ? 'Yes' : 'No'}
        </DetailItem>
        <DetailItem label="Guest customization">
          {SCRIPT_TYPE_LABELS[management.guestCustomization.scriptType]}
        </DetailItem>
        {management.owner && (
          <DetailItem label="Owner">
            {referenceLabel(management.owner)}
          </DetailItem>
        )}
      </ReviewSection>

      {mode === 'update' && (
        <StackingLayout padding="10px-0px" itemGap="S">
          <Title size={Title.SIZES.H4}>Update request</Title>
          <DetailItem label="VM ID">{metadata.extId ?? NOT_SET}</DetailItem>
          <DetailItem label="Version (ETag)">
            {metadata.etag ?? NOT_SET}
          </DetailItem>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            Saving sends a full-body V4 PUT using the preserved source VM
            metadata and this version identifier.
          </TextLabel>
        </StackingLayout>
      )}
    </FormLayout>
  )
}
