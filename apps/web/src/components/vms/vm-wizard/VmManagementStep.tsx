import {
  Alert,
  Checkbox,
  FlexItem,
  FlexLayout,
  Form,
  FormItemProvider,
  FormItemSelect,
  FormLayout,
  FormSection,
  Link,
  MultiSelect,
  StackingLayout,
  StatusIcon,
  TextArea,
  TextLabel,
  Tooltip,
} from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { useRef } from 'react'
import './VmManagementStep.css'
import {
  CATEGORY_OPTIONS,
  GUEST_OS_OPTIONS,
  TIMEZONE_OPTIONS,
} from './mockData'
import type {
  VmWizardGcConfigMethod,
  VmWizardGcScriptType,
  VmWizardReference,
  VmWizardValues,
} from './types'

const CategoriesMultiSelect = FormItemProvider(MultiSelect)

interface CategoryRow {
  id: string
  label: string
}

const SCRIPT_TYPE_OPTIONS: { key: VmWizardGcScriptType; label: string }[] = [
  { key: 'none', label: 'No Customization' },
  { key: 'sysprep', label: 'Sysprep (Windows)' },
  { key: 'cloud-init', label: 'Cloud-init (Linux)' },
]

const CONFIG_METHOD_OPTIONS: {
  key: VmWizardGcConfigMethod
  label: string
}[] = [
  { key: 'custom-script', label: 'Custom Script' },
  { key: 'guided', label: 'Guided Setup' },
]

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

interface VmManagementStepProps {
  errors: Record<string, string>
  values: VmWizardValues
  onValuesChange: (values: VmWizardValues) => void
}

export function VmManagementStep({
  errors,
  values,
  onValuesChange,
}: VmManagementStepProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const getPopupContainer = (): HTMLElement =>
    containerRef.current ?? document.body

  const { management, configuration } = values
  const { guestCustomization } = management
  const isCustomizationEnabled = guestCustomization.scriptType !== 'none'

  const updateManagement = (next: VmWizardValues['management']) => {
    onValuesChange({ ...values, management: next })
  }

  const selectedCategoryRows: CategoryRow[] = management.categories.map(
    (category) => ({
      id: category.extId,
      label: category.name ?? category.extId,
    }),
  )

  const categoryRowsData: CategoryRow[] = CATEGORY_OPTIONS.map((option) => ({
    id: option.extId,
    label: option.name ?? option.extId,
  }))

  return (
    <div ref={containerRef}>
      <Form data-test="dt_vm_mgmt_form" id="vmManagementForm">
        <FormLayout className="vm-management-step" padding="0px">
          <FormSection title="Categories" padding="0px">
            <StackingLayout padding="0px" itemGap="L">
              <StackingLayout
                background="body"
                padding="20px"
                itemGap="M"
                className="vm-management-step__policy-card"
              >
                <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                  Enable &lsquo;Default-Storage&rsquo; policy to manage the
                  storage configurations across all VM disks. The policy applies
                  via category &lsquo;Storage:$Default&rsquo;.
                </TextLabel>
                <FlexLayout
                  justifyContent="space-between"
                  alignItems="center"
                  itemGap="M"
                >
                  <Checkbox
                    id="default_storage_policy_toggle"
                    type={Checkbox.CheckboxTypes.TOGGLE}
                    label="Enable &lsquo;Default-Storage&rsquo; policy"
                    checked={management.isDefaultStoragePolicyEnabled}
                    onChange={(event) =>
                      updateManagement({
                        ...management,
                        isDefaultStoragePolicyEnabled:
                          event.currentTarget.checked,
                      })
                    }
                    data-test="dt_default_storage_policy_toggle"
                  />
                  <Link
                    type={Link.LINK_TYPE.PRIMARY}
                    href="https://portal.nutanix.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </Link>
                </FlexLayout>
                <FlexLayout itemGap="S" alignItems="center">
                  <StatusIcon type={StatusIcon.StatusIconTypes.INFO} />
                  <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                    Applies to VMs on clusters with AOS 6.1 or above only.
                  </TextLabel>
                </FlexLayout>
              </StackingLayout>

              <CategoriesMultiSelect
                id="categories_mapping"
                label="Categories"
                rowsData={categoryRowsData}
                selectedRows={selectedCategoryRows}
                error={Boolean(errors.categories)}
                helpText={
                  errors.categories ??
                  'Tag the VM with Category: Value to assign policies associated with value'
                }
                placeholder="Type to search..."
                getPopupContainer={getPopupContainer}
                onSelectedChange={(
                  rows: { id?: string | number; label: string }[],
                ) =>
                  updateManagement({
                    ...management,
                    categories: rows.map((row) => ({
                      extId: String(row.id),
                      name: row.label,
                    })),
                  })
                }
                data-test="dt_categories_mapping"
              />

              <FormItemSelect
                id="guest_os"
                label="Guest OS (Optional)"
                rowsData={GUEST_OS_OPTIONS.map((option) => toSelectRow(option))}
                selectedRow={toSelectedRow(
                  management.guestOs
                    ? GUEST_OS_OPTIONS.find(
                        (option) => option.extId === management.guestOs,
                      )
                    : undefined,
                  GUEST_OS_OPTIONS,
                )}
                placeholder="Please Select"
                getPopupContainer={getPopupContainer}
                onSelectedChange={(row) =>
                  updateManagement({
                    ...management,
                    guestOs: String(row.key),
                  })
                }
                data-test="dt_guest_os"
              />
            </StackingLayout>
          </FormSection>

          <FormSection title="Timezone and Agent VM">
            <StackingLayout padding="0px" itemGap="L">
              <FormItemSelect
                id="hardware_clock_timezone"
                label="Timezone"
                rowsData={TIMEZONE_OPTIONS.map((option) => toSelectRow(option))}
                selectedRow={toSelectedRow(
                  TIMEZONE_OPTIONS.find(
                    (option) =>
                      option.extId === configuration.hardwareClockTimezone,
                  ),
                  TIMEZONE_OPTIONS,
                )}
                helpText="Use UTC timezone for Linux VMs and local timezone for Windows VMs."
                placeholder="Please Select"
                getPopupContainer={getPopupContainer}
                onSelectedChange={(row) =>
                  onValuesChange({
                    ...values,
                    configuration: {
                      ...configuration,
                      hardwareClockTimezone: String(row.key),
                    },
                  })
                }
                data-test="dt_timezone"
              />

              <FlexLayout itemGap="S" alignItems="center">
                <Checkbox
                  id="agent_vm"
                  label="Use this VM as an Agent VM"
                  checked={management.isAgentVm}
                  onChange={(event) =>
                    updateManagement({
                      ...management,
                      isAgentVm: event.currentTarget.checked,
                    })
                  }
                  data-test="vmcontentview_checkbox_agent_vm"
                />
                <StatusIcon
                  type={StatusIcon.StatusIconTypes.QUESTION}
                  tooltipProps={{
                    oldTooltip: false,
                    appearance: Tooltip.APPEARANCE.SECONDARY,
                    content:
                      'Agent VMs start before other VMs on a host and are not migrated during maintenance.',
                    placement: 'top-start',
                  }}
                />
              </FlexLayout>
            </StackingLayout>
          </FormSection>

          <FormSection title="Guest Customization">
            <StackingLayout padding="0px" itemGap="L">
              <Alert
                type={Alert.AlertTypes.INFO}
                inline={true}
                showCloseIcon={false}
                data-test="dt_guest_customization_reccommended_info"
                message="To customize a Windows guest OS, Nutanix recommends to use Guest Customization Profiles during cloning a VM or deploying a VM from a template."
              />

              <FlexLayout
                itemFlexBasis="100pc"
                alignItems="flex-start"
                itemGap="L"
              >
                <FormItemSelect
                  id="gc_script_type"
                  label="Script Type"
                  rowsData={SCRIPT_TYPE_OPTIONS.map((option) => ({
                    key: option.key,
                    label: option.label,
                  }))}
                  selectedRow={{
                    key: guestCustomization.scriptType,
                    label:
                      SCRIPT_TYPE_OPTIONS.find(
                        (option) =>
                          option.key === guestCustomization.scriptType,
                      )?.label ?? 'No Customization',
                  }}
                  getPopupContainer={getPopupContainer}
                  onSelectedChange={(row) =>
                    updateManagement({
                      ...management,
                      guestCustomization: {
                        ...guestCustomization,
                        scriptType: row.key as VmWizardGcScriptType,
                        script: '',
                      },
                    })
                  }
                  data-test="dt_script_type"
                />

                <FormItemSelect
                  id="gc_input_method"
                  label="Configuration Method"
                  rowsData={CONFIG_METHOD_OPTIONS.map((option) => ({
                    key: option.key,
                    label: option.label,
                  }))}
                  selectedRow={{
                    key: guestCustomization.configMethod,
                    label:
                      CONFIG_METHOD_OPTIONS.find(
                        (option) =>
                          option.key === guestCustomization.configMethod,
                      )?.label ?? 'Custom Script',
                  }}
                  disabled={!isCustomizationEnabled}
                  getPopupContainer={getPopupContainer}
                  onSelectedChange={(row) =>
                    updateManagement({
                      ...management,
                      guestCustomization: {
                        ...guestCustomization,
                        configMethod: row.key as VmWizardGcConfigMethod,
                      },
                    })
                  }
                  data-test="dt_input_method"
                />
              </FlexLayout>

              {isCustomizationEnabled &&
                guestCustomization.configMethod === 'custom-script' && (
                  <StackingLayout padding="0px" itemGap="L">
                    <FlexLayout flexDirection="column" itemGap="XS">
                      <TextLabel id="gc_script_label">
                        {guestCustomization.scriptType === 'cloud-init'
                          ? 'Cloud-init user data'
                          : 'Sysprep unattend.xml'}
                      </TextLabel>
                      <TextArea
                        id="gc_script"
                        aria-labelledby="gc_script_label"
                        rows={6}
                        value={guestCustomization.script}
                        error={Boolean(errors.script)}
                        placeholder={
                          guestCustomization.scriptType === 'cloud-init'
                            ? '#cloud-config'
                            : '<unattend>...</unattend>'
                        }
                        onChange={(event) =>
                          updateManagement({
                            ...management,
                            guestCustomization: {
                              ...guestCustomization,
                              script: event.currentTarget.value,
                            },
                          })
                        }
                        data-test="dt_gc_script"
                      />
                      {errors.script && (
                        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.ERROR}>
                          {errors.script}
                        </TextLabel>
                      )}
                    </FlexLayout>

                    <FlexLayout flexDirection="column" itemGap="XS">
                      <TextLabel id="gc_ssh_label">
                        Public SSH key (Optional)
                      </TextLabel>
                      <TextArea
                        id="gc_ssh_key"
                        aria-labelledby="gc_ssh_label"
                        rows={2}
                        value={guestCustomization.sshKey}
                        error={Boolean(errors.sshKey)}
                        placeholder="ssh-ed25519 AAAA..."
                        onChange={(event) =>
                          updateManagement({
                            ...management,
                            guestCustomization: {
                              ...guestCustomization,
                              sshKey: event.currentTarget.value,
                            },
                          })
                        }
                        data-test="dt_gc_ssh_key"
                      />
                      {errors.sshKey && (
                        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.ERROR}>
                          {errors.sshKey}
                        </TextLabel>
                      )}
                    </FlexLayout>
                  </StackingLayout>
                )}

              {isCustomizationEnabled &&
                guestCustomization.configMethod === 'guided' && (
                  <FlexItem>
                    <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                      Guided setup collects locale, hostname, and user details
                      on later screens.
                    </TextLabel>
                  </FlexItem>
                )}
            </StackingLayout>
          </FormSection>
        </FormLayout>
      </Form>
    </div>
  )
}
