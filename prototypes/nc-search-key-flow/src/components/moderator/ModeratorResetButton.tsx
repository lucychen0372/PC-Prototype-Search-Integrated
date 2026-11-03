import {
  Button,
  FlexLayout,
  Popover,
  RefreshIcon,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { useState } from 'react'
import { usePrototypeStore } from '@proto/store/prototype-store'
import { useResetPrototype } from './use-reset-prototype'
import './ModeratorResetButton.css'

/** Moderator-only Reset, its own row at the bottom of the left nav; confirms before wiping progress. */
export const ModeratorResetButton = () => {
  const { showResetButton } = usePrototypeStore()
  const resetPrototype = useResetPrototype()
  const [confirming, setConfirming] = useState(false)

  if (!showResetButton) return

  const content = (
    <StackingLayout itemGap="M">
      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
        Clears search, NIVA and filters, and returns to the dashboard.
      </TextLabel>
      <FlexLayout itemGap="S" justifyContent="flex-end">
        <Button
          type={Button.ButtonTypes.SECONDARY}
          onClick={() => setConfirming(false)}
        >
          Cancel
        </Button>
        <Button
          type={Button.ButtonTypes.DESTRUCTIVE}
          onClick={() => {
            setConfirming(false)
            resetPrototype()
          }}
        >
          Reset
        </Button>
      </FlexLayout>
    </StackingLayout>
  )

  return (
    <FlexLayout
      padding="15px-20px"
      className={`moderator-reset${confirming ? ' -confirming' : ''}`}
    >
      <Popover
        oldPopover={false}
        visible={confirming}
        onVisibleChange={setConfirming}
        closableOnClickAway
        closeOnEscape
        placement="top-start"
        padding="20px"
        title="Reset prototype?"
        content={content}
      >
        <Button
          type={Button.ButtonTypes.NAVIGATION_SECONDARY}
          aria-label="Reset prototype"
          onClick={() => setConfirming((open) => !open)}
        >
          <RefreshIcon />
          Reset
        </Button>
      </Popover>
    </FlexLayout>
  )
}
