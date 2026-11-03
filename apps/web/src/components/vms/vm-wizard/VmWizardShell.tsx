import {
  Alert,
  Button,
  CloseIcon,
  FlexItem,
  FlexLayout,
  FullPageModal,
  Modal,
  Paragraph,
  QuestionIcon,
  StackingLayout,
  Steps,
  Title,
} from '@nutanix-ui/prism-reactjs'
import { useEffect, useMemo } from 'react'
import { VmConfigurationStep } from './VmConfigurationStep'
import { VmManagementStep } from './VmManagementStep'
import { VmResourceSubformModal } from './VmResourceSubformModal'
import { VmResourcesStep } from './VmResourcesStep'
import { VmReviewStep } from './VmReviewStep'
import './VmWizardShell.css'
import type {
  VmWizardBannerAlert,
  VmWizardMetadataValues,
  VmWizardMode,
  VmWizardSourceVm,
} from './types'
import { VM_WIZARD_STEPS, useVmWizardStore } from './useVmWizardStore'
import { validateConfigurationStep, validateManagementStep } from './validation'

export interface VmWizardCompletion {
  mode: VmWizardMode
  vmName: string
}

interface VmWizardShellProps {
  mode: VmWizardMode
  metadata?: VmWizardMetadataValues
  sourceVm?: VmWizardSourceVm
  onClose?: () => void
  onComplete?: (completion: VmWizardCompletion) => void
}

const SUBMIT_FAILURE_KEYWORD = 'fail'

const ALERT_TYPE_BY_WIZARD_TYPE = {
  error: Alert.AlertTypes.ERROR,
  warning: Alert.AlertTypes.WARNING,
  info: Alert.AlertTypes.INFO,
  success: Alert.AlertTypes.SUCCESS,
} satisfies Record<
  VmWizardBannerAlert['type'],
  (typeof Alert.AlertTypes)[keyof typeof Alert.AlertTypes]
>

function VmWizardBannerAlerts({
  alerts,
  onDismiss,
}: {
  alerts: VmWizardBannerAlert[]
  onDismiss: (id: string) => void
}) {
  if (alerts.length === 0) {
    return <></>
  }

  return (
    <StackingLayout
      itemGap="S"
      className="vm-wizard__banner-alerts"
      padding="0px"
    >
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={ALERT_TYPE_BY_WIZARD_TYPE[alert.type]}
          message={alert.message}
          showCloseIcon={true}
          onClose={() => onDismiss(alert.id)}
          data-test="vm-wizard-banner-alert"
        />
      ))}
    </StackingLayout>
  )
}

function VmWizardFooter({
  activeStepIndex,
  isSaving,
  mode,
  onBack,
  onCancel,
  onNext,
  onSubmit,
}: {
  activeStepIndex: number
  isSaving: boolean
  mode: VmWizardMode
  onBack: () => void
  onCancel: () => void
  onNext: () => void
  onSubmit: () => void
}) {
  const isFirstStep = activeStepIndex === 0
  const isLastStep = activeStepIndex === VM_WIZARD_STEPS.length - 1

  return (
    <FlexLayout justifyContent="space-between" alignItems="center">
      <FlexItem>
        {!isFirstStep && (
          <Button
            type={Button.ButtonTypes.SECONDARY}
            onClick={onBack}
            disabled={isSaving}
          >
            Back
          </Button>
        )}
      </FlexItem>
      <FlexLayout itemGap="S">
        <Button
          type={Button.ButtonTypes.SECONDARY}
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button
          type={Button.ButtonTypes.PRIMARY}
          onClick={isLastStep ? onSubmit : onNext}
          disabled={isSaving}
        >
          {isSaving
            ? 'Saving'
            : isLastStep
              ? mode === 'update'
                ? 'Save'
                : 'Create'
              : 'Next'}
        </Button>
      </FlexLayout>
    </FlexLayout>
  )
}

export function VmWizardShell({
  mode,
  metadata,
  sourceVm,
  onClose,
  onComplete,
}: VmWizardShellProps) {
  const {
    activeStepId,
    bannerAlerts,
    submitError,
    isDirtyCloseConfirmationOpen,
    isSaving,
    stepErrors,
    values,
    open,
    setActiveStep,
    setBannerAlerts,
    setSubmitError,
    setStepErrors,
    setValues,
    requestClose,
    confirmDiscard,
    cancelDiscard,
    beginSubmit,
    completeSubmit,
    failSubmit,
  } = useVmWizardStore()

  useEffect(() => {
    open(mode, metadata, sourceVm)
  }, [metadata, mode, open, sourceVm])

  const activeStepIndex = VM_WIZARD_STEPS.findIndex(
    (step) => step.id === activeStepId,
  )
  const activeStep = VM_WIZARD_STEPS[activeStepIndex] ?? VM_WIZARD_STEPS[0]
  const stepData = useMemo(
    () =>
      VM_WIZARD_STEPS.map((step, index) => ({
        title: step.title,
        disabled: index > activeStepIndex + 1,
        'aria-label': `Step ${index + 1} of ${VM_WIZARD_STEPS.length}: ${
          step.title
        }`,
      })),
    [activeStepIndex],
  )

  const closeWizard = () => {
    onClose?.()
  }

  const handleCloseRequest = () => {
    if (requestClose()) {
      closeWizard()
    }
  }

  const handleConfirmDiscard = () => {
    confirmDiscard()
    closeWizard()
  }

  const handleNext = () => {
    if (activeStepId === 'configuration') {
      const configurationErrors = validateConfigurationStep(values)

      if (Object.keys(configurationErrors).length > 0) {
        setStepErrors({ configuration: configurationErrors })
        setBannerAlerts([
          {
            id: 'configuration-validation',
            type: 'error',
            message: 'Fix the highlighted fields before continuing.',
          },
        ])
        return
      }
    }

    if (activeStepId === 'management') {
      const managementErrors = validateManagementStep(values)

      if (Object.keys(managementErrors).length > 0) {
        setStepErrors({ management: managementErrors })
        setBannerAlerts([
          {
            id: 'management-validation',
            type: 'error',
            message: 'Fix the highlighted fields before continuing.',
          },
        ])
        return
      }
    }

    // The Resources step has no required-field validation, matching the main
    // app where step 2 never blocks navigation.

    const nextStep = VM_WIZARD_STEPS[activeStepIndex + 1]
    if (nextStep) {
      setActiveStep(nextStep.id)
    }
  }

  const handleConfigurationValuesChange = (nextValues: typeof values) => {
    setValues(nextValues)

    if (!stepErrors.configuration) {
      return
    }

    const configurationErrors = validateConfigurationStep(nextValues)
    setStepErrors(
      Object.keys(configurationErrors).length > 0
        ? { ...stepErrors, configuration: configurationErrors }
        : {},
    )

    if (Object.keys(configurationErrors).length === 0) {
      setBannerAlerts(
        bannerAlerts.filter((alert) => alert.id !== 'configuration-validation'),
      )
    }
  }

  const handleManagementValuesChange = (nextValues: typeof values) => {
    setValues(nextValues)

    if (!stepErrors.management) {
      return
    }

    const managementErrors = validateManagementStep(nextValues)
    setStepErrors(
      Object.keys(managementErrors).length > 0
        ? { ...stepErrors, management: managementErrors }
        : {},
    )

    if (Object.keys(managementErrors).length === 0) {
      setBannerAlerts(
        bannerAlerts.filter((alert) => alert.id !== 'management-validation'),
      )
    }
  }

  const handleBack = () => {
    const previousStep = VM_WIZARD_STEPS[activeStepIndex - 1]
    if (previousStep) {
      setActiveStep(previousStep.id)
    }
  }

  const handleEditStep = (stepIndex: number) => {
    const step = VM_WIZARD_STEPS[stepIndex]
    if (step) {
      setActiveStep(step.id)
    }
  }

  const handleSubmit = () => {
    // Prevent duplicate submits while a request is already in flight.
    if (isSaving) {
      return
    }

    beginSubmit()

    // Simulate the async create/update request. A VM name containing "fail"
    // exercises the wizard-level error path; everything else succeeds, records
    // a TaskReference-shaped result, and closes the wizard.
    globalThis.setTimeout(() => {
      const shouldFail = values.configuration.name
        .trim()
        .toLowerCase()
        .includes(SUBMIT_FAILURE_KEYWORD)

      if (shouldFail) {
        failSubmit(
          mode === 'update'
            ? 'Unable to update the VM. Try saving again.'
            : 'Unable to create the VM. Try again.',
        )
        return
      }

      completeSubmit({
        extId: `task-${Date.now()}`,
        rel: 'task',
        href: '/api/prism/v4.0.a1/config/tasks/task-placeholder',
      })
      onComplete?.({ mode, vmName: values.configuration.name.trim() })
      closeWizard()
    }, 600)
  }

  return (
    <FullPageModal
      restoreFocus={true}
      visible={true}
      className="vm-wizard-modal"
      data-test={
        mode === 'update' ? 'update-vm-advanced-popup' : 'vm-modal-popup'
      }
      title={
        <Title tag={Title.SIZES.H2} size={Title.SIZES.H3}>
          {mode === 'update' ? 'Update VM' : 'Create VM'}
        </Title>
      }
      onClose={handleCloseRequest}
      headerActions={[
        <Button
          key="help"
          type={Button.ButtonTypes.ICON_DEFAULT}
          aria-label="Open VM wizard help"
          data-test="vm-popup-help"
        >
          <QuestionIcon />
        </Button>,
        <Button
          key="close"
          type={Button.ButtonTypes.ICON_DEFAULT}
          aria-label="Close VM wizard"
          onClick={handleCloseRequest}
          data-test="close-vm-popup"
        >
          <CloseIcon />
        </Button>,
      ]}
    >
      <StackingLayout itemGap="none" className="vm-wizard">
        <StackingLayout padding="0px-10px" itemGap="L">
          <Steps
            current={activeStepIndex}
            data={stepData}
            onStepChange={(index) => {
              const step = VM_WIZARD_STEPS[index]
              if (step) {
                setActiveStep(step.id)
              }
            }}
            panelIdPrefix="vm-wizard-step-panel"
          />

          <FlexLayout justifyContent="center" itemGap="none">
            <StackingLayout itemGap="none" className="vm-wizard__form-content">
              {submitError && (
                <StackingLayout
                  itemGap="S"
                  className="vm-wizard__banner-alerts"
                  padding="0px"
                >
                  <Alert
                    type={Alert.AlertTypes.ERROR}
                    message={submitError}
                    showCloseIcon={true}
                    onClose={() => setSubmitError(undefined)}
                    data-test="vm-popup-error-alert"
                  />
                </StackingLayout>
              )}

              <VmWizardBannerAlerts
                alerts={bannerAlerts}
                onDismiss={(alertId) =>
                  setBannerAlerts(
                    bannerAlerts.filter((alert) => alert.id !== alertId),
                  )
                }
              />

              <StackingLayout
                id={`vm-wizard-step-panel-${activeStepIndex + 1}`}
                role="tabpanel"
                aria-labelledby={String(activeStepIndex)}
                tabIndex={0}
                padding="0px"
                className="vm-wizard__step-content"
              >
                {activeStep.id === 'configuration' ? (
                  <VmConfigurationStep
                    errors={stepErrors.configuration ?? {}}
                    values={values}
                    onValuesChange={handleConfigurationValuesChange}
                  />
                ) : activeStep.id === 'resources' ? (
                  <VmResourcesStep errors={stepErrors.resources ?? {}} />
                ) : activeStep.id === 'management' ? (
                  <VmManagementStep
                    errors={stepErrors.management ?? {}}
                    values={values}
                    onValuesChange={handleManagementValuesChange}
                  />
                ) : (
                  <VmReviewStep
                    mode={mode}
                    values={values}
                    onEditStep={handleEditStep}
                  />
                )}
              </StackingLayout>

              <StackingLayout className="vm-wizard__footer" padding="20px-0px">
                <VmWizardFooter
                  activeStepIndex={activeStepIndex}
                  isSaving={isSaving}
                  mode={mode}
                  onBack={handleBack}
                  onCancel={handleCloseRequest}
                  onNext={handleNext}
                  onSubmit={handleSubmit}
                />
              </StackingLayout>
            </StackingLayout>
          </FlexLayout>
        </StackingLayout>

        <Modal
          visible={isDirtyCloseConfirmationOpen}
          title="Discard VM changes?"
          onClose={cancelDiscard}
          footer={
            <FlexLayout justifyContent="flex-end" itemGap="S">
              <Button
                type={Button.ButtonTypes.SECONDARY}
                onClick={cancelDiscard}
              >
                Continue editing
              </Button>
              <Button
                type={Button.ButtonTypes.PRIMARY}
                onClick={handleConfirmDiscard}
              >
                Discard
              </Button>
            </FlexLayout>
          }
        >
          <StackingLayout padding="20px">
            <Paragraph>
              Your VM wizard changes have not been saved. Discard them and close
              the wizard?
            </Paragraph>
          </StackingLayout>
        </Modal>

        <VmResourceSubformModal />
      </StackingLayout>
    </FullPageModal>
  )
}
