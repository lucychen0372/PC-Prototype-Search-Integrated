import {
  Accordion,
  Checkbox,
  FlexLayout,
  Form,
  FormItemInput,
  FormItemSelect,
  FormLayout,
  FormSection,
  StackingLayout,
  StatusIcon,
  Tooltip,
} from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { CLUSTER_OPTIONS, PROJECT_OPTIONS } from './mockData'
import type { VmWizardReference, VmWizardValues } from './types'
import { bytesToGib, gibToBytes } from './units'
import './VmConfigurationStep.css'

const toSelectRow = (reference: VmWizardReference): SelectRowData => ({
  key: reference.extId,
  label: reference.name ?? reference.extId,
})

const toSelectedRow = (
  reference: VmWizardReference | undefined,
  options: VmWizardReference[],
) => {
  if (reference) {
    const option = options.find((item) => item.extId === reference.extId)
    return toSelectRow(option ?? reference)
  }
}

const findReference = (
  row: SelectRowData,
  options: VmWizardReference[],
): VmWizardReference | undefined =>
  options.find(
    (option) =>
      option.extId === String(row.key) ||
      option.name === row.label ||
      option.extId === row.label,
  )

const parsePositiveNumber = (value: string, fallback: number) => {
  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : fallback
}

interface VmConfigurationStepProps {
  errors: Record<string, string>
  values: VmWizardValues
  onValuesChange: (values: VmWizardValues) => void
}

export function VmConfigurationStep({
  errors,
  values,
  onValuesChange,
}: VmConfigurationStepProps) {
  const updateValues = (nextValues: VmWizardValues) => {
    onValuesChange(nextValues)
  }

  const updateConfiguration = (
    configuration: VmWizardValues['configuration'],
  ) => {
    updateValues({
      ...values,
      configuration,
    })
  }

  const updateResources = (resources: VmWizardValues['resources']) => {
    updateValues({
      ...values,
      resources,
    })
  }

  return (
    <Form data-test="dt_vm_config_form" id="vmConfigForm">
      <FormLayout
        className="vm-configuration-step"
        padding="0px"
        data-test="vm-wizard-configuration-step"
      >
        <FormSection title="General" padding="0px">
          <StackingLayout padding="0px" itemGap="L">
            <FormItemInput
              id="name"
              label="Name"
              value={values.configuration.name}
              error={Boolean(errors.name)}
              helpText={errors.name}
              onChange={(event) =>
                updateConfiguration({
                  ...values.configuration,
                  name: event.currentTarget.value,
                })
              }
              data-test="vmcontentview_input_name"
            />

            <FormItemInput
              id="description"
              label="Description (Optional)"
              value={values.configuration.description}
              error={Boolean(errors.description)}
              helpText={errors.description}
              onChange={(event) =>
                updateConfiguration({
                  ...values.configuration,
                  description: event.currentTarget.value,
                })
              }
              data-test="vmDescInput"
            />

            <FormItemSelect
              id="project_selector"
              label="Project"
              rowsData={PROJECT_OPTIONS.map((option) => toSelectRow(option))}
              selectedRow={toSelectedRow(
                values.configuration.project,
                PROJECT_OPTIONS,
              )}
              error={Boolean(errors.project)}
              helpText={
                errors.project ??
                'All associated entities will be available based on the selected project.'
              }
              placeholder="Please Select"
              searchable={true}
              onSelectedChange={(row) =>
                updateConfiguration({
                  ...values.configuration,
                  project: findReference(row, PROJECT_OPTIONS),
                })
              }
              data-test="dt_project_selector"
            />

            <FormItemSelect
              id="cluster_selector"
              label="Cluster"
              rowsData={CLUSTER_OPTIONS.map((option) => toSelectRow(option))}
              selectedRow={toSelectedRow(
                values.configuration.cluster,
                CLUSTER_OPTIONS,
              )}
              error={Boolean(errors.cluster)}
              helpText={errors.cluster}
              placeholder="Please Select"
              searchable={true}
              onSelectedChange={(row) =>
                updateConfiguration({
                  ...values.configuration,
                  cluster: findReference(row, CLUSTER_OPTIONS),
                })
              }
              data-test="dt_cluster_selector"
            />

            <FormItemInput
              id="no_of_vms"
              label="Number of VMs"
              type="number"
              min={1}
              value={values.configuration.vmCount}
              error={Boolean(errors.vmCount)}
              helpText={errors.vmCount}
              onChange={(event) =>
                updateConfiguration({
                  ...values.configuration,
                  vmCount: parsePositiveNumber(
                    event.currentTarget.value,
                    values.configuration.vmCount,
                  ),
                })
              }
              data-test="vm-wizard-vm-count"
            />
          </StackingLayout>
        </FormSection>

        <FormSection title="VM Properties">
          <FlexLayout
            itemFlexBasis="100pc"
            alignItems="flex-start"
            itemGap="L"
            padding="0px"
            className="vm-configuration-step__section-body"
          >
            <FormItemInput
              id="num_sockets"
              label="CPUs"
              type="number"
              min={1}
              value={values.resources.numSockets}
              error={Boolean(errors.numSockets)}
              helpText={errors.numSockets}
              addonAfter="vCPU"
              onChange={(event) =>
                updateResources({
                  ...values.resources,
                  numSockets: parsePositiveNumber(
                    event.currentTarget.value,
                    values.resources.numSockets,
                  ),
                })
              }
              data-test="vmcontentview_input_vcpus"
            />

            <FormItemInput
              id="num_vcpus_per_socket"
              label="Cores Per CPU"
              type="number"
              min={1}
              value={values.resources.numCoresPerSocket}
              error={Boolean(errors.numCoresPerSocket)}
              helpText={errors.numCoresPerSocket}
              addonAfter="Core"
              onChange={(event) =>
                updateResources({
                  ...values.resources,
                  numCoresPerSocket: parsePositiveNumber(
                    event.currentTarget.value,
                    values.resources.numCoresPerSocket,
                  ),
                })
              }
              data-test="vmcontentview_input_cores_per_vcpu"
            />

            <FormItemInput
              id="memory_size_mib"
              label="Memory"
              type="number"
              min={1}
              value={bytesToGib(values.resources.memorySizeBytes)}
              error={Boolean(errors.memorySizeBytes)}
              helpText={errors.memorySizeBytes}
              addonAfter="GiB"
              onChange={(event) =>
                updateResources({
                  ...values.resources,
                  memorySizeBytes: gibToBytes(
                    parsePositiveNumber(
                      event.currentTarget.value,
                      bytesToGib(values.resources.memorySizeBytes),
                    ),
                  ),
                })
              }
              data-test="vmcontentview_input_memory"
            />
          </FlexLayout>
        </FormSection>

        <FormSection className="collapsible-section" padding="20px-0px">
          <Accordion
            title="Advanced Settings"
            data-test="dt_vm_config_advance_settings"
            expandedByDefault={
              values.configuration.isMemoryOvercommitEnabled ||
              values.configuration.isAdvancedCpuCompatibilityEnabled
            }
          >
            <StackingLayout className="vm-configuration-step__advanced-outer">
              <StackingLayout
                className="vm-configuration-step__advanced-body"
                background="body"
                padding="20px"
              >
                <FlexLayout
                  flexDirection="column"
                  alignItems="flex-start"
                  itemGap="M"
                >
                  <FlexLayout itemGap="S" alignItems="center">
                    <Checkbox
                      id="mem_overcommit_checkbox"
                      data-test="dt_vmconfigview_mem_overcommit"
                      label="Enable memory overcommit"
                      checked={values.configuration.isMemoryOvercommitEnabled}
                      onChange={(event) =>
                        updateConfiguration({
                          ...values.configuration,
                          isMemoryOvercommitEnabled:
                            event.currentTarget.checked,
                        })
                      }
                    />
                    <StatusIcon
                      type={StatusIcon.StatusIconTypes.INFO}
                      tooltipProps={{
                        oldTooltip: false,
                        appearance: Tooltip.APPEARANCE.SECONDARY,
                        content:
                          'Allow assigned VM memory to exceed the physical memory available on hosts.',
                        placement: 'top-start',
                      }}
                    />
                  </FlexLayout>
                </FlexLayout>
              </StackingLayout>
            </StackingLayout>
          </Accordion>
        </FormSection>
      </FormLayout>
    </Form>
  )
}
