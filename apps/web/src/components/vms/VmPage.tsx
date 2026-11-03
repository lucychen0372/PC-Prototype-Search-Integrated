import { Alert, StackingLayout, Tabs, Title } from '@nutanix-ui/prism-reactjs'
import { useEffect, useRef, useState } from 'react'
import { PageHeader } from '~/components/common'
import { VM_TABS } from './config/constants'
import { VM_WIZARD_LAUNCH_EVENT } from './VmActionPopupContainer'
import type { VmWizardLaunchDetail } from './VmActionPopupContainer'
import { VmEbr } from './VmEbr'
import type { VmEbrOverrides } from './VmEbr'
import { VmWizardShell } from './vm-wizard'
import type { VmWizardCompletion } from './vm-wizard/VmWizardShell'
import './VmPage.css'

const SUCCESS_ALERT_DISMISS_MS = 6000

interface VmPageProps {
  defaultPerspective?: string
  ebrOverrides?: VmEbrOverrides
}

export function VmPage({ defaultPerspective, ebrOverrides }: VmPageProps = {}) {
  const [activeTab, setActiveTab] = useState('list')
  const [wizardLaunch, setWizardLaunch] = useState<VmWizardLaunchDetail>()
  const [successMessage, setSuccessMessage] = useState<string>()
  const successTimerRef = useRef<ReturnType<typeof globalThis.setTimeout>>()

  const dismissSuccess = () => {
    if (successTimerRef.current) {
      globalThis.clearTimeout(successTimerRef.current)
    }
    setSuccessMessage(undefined)
  }

  const handleWizardComplete = ({ mode, vmName }: VmWizardCompletion) => {
    const name = vmName || 'VM'
    setSuccessMessage(
      mode === 'update'
        ? `Update of ${name} initiated successfully.`
        : `Creation of ${name} initiated successfully.`,
    )

    if (successTimerRef.current) {
      globalThis.clearTimeout(successTimerRef.current)
    }
    successTimerRef.current = globalThis.setTimeout(() => {
      setSuccessMessage(undefined)
    }, SUCCESS_ALERT_DISMISS_MS)
  }

  useEffect(
    () => () => {
      if (successTimerRef.current) {
        globalThis.clearTimeout(successTimerRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    const handleWizardLaunch = (event: Event) => {
      setWizardLaunch((event as CustomEvent<VmWizardLaunchDetail>).detail)
    }

    globalThis.addEventListener(VM_WIZARD_LAUNCH_EVENT, handleWizardLaunch)

    return () => {
      globalThis.removeEventListener(VM_WIZARD_LAUNCH_EVENT, handleWizardLaunch)
    }
  }, [])

  return (
    <StackingLayout itemGap="none" className="vm-page">
      <PageHeader
        title="VMs"
        tabs={
          <Tabs
            data={VM_TABS}
            activeKey={activeTab}
            onTabClick={(tabKey) => setActiveTab(tabKey as string)}
            aria-label="VMs navigation tabs"
            padding="0px"
          />
        }
      />

      {activeTab === 'list' ? (
        <StackingLayout className="vm-content">
          <VmEbr
            defaultPerspective={defaultPerspective}
            overrides={ebrOverrides}
          />
        </StackingLayout>
      ) : (
        <StackingLayout padding="20px">
          <Title size={Title.SIZES.H3}>
            {VM_TABS.find((tab) => tab.key === activeTab)?.title} View
          </Title>
        </StackingLayout>
      )}

      {successMessage && (
        <div className="vm-page__success-toast">
          <Alert
            type={Alert.AlertTypes.SUCCESS}
            message={successMessage}
            showCloseIcon={true}
            onClose={dismissSuccess}
            data-test="vm-create-success-alert"
          />
        </div>
      )}

      {wizardLaunch && (
        <VmWizardShell
          mode={wizardLaunch.mode}
          metadata={
            wizardLaunch.sourceVm
              ? {
                  extId: wizardLaunch.sourceVm.id,
                  etag: `W/"${wizardLaunch.sourceVm.id}"`,
                  sourceVm: wizardLaunch.sourceVm,
                }
              : undefined
          }
          sourceVm={wizardLaunch.sourceVm}
          onClose={() => setWizardLaunch(undefined)}
          onComplete={handleWizardComplete}
        />
      )}
    </StackingLayout>
  )
}
