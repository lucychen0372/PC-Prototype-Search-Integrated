import {
  Button,
  Checkbox,
  Modal,
  Slider,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import { useEffect } from 'react'
import { usePrototypeStore } from '@proto/store/prototype-store'
import { useResetPrototype } from './use-reset-prototype'

export const ModeratorPanel = () => {
  const {
    moderatorOpen,
    setModeratorOpen,
    showResetButton,
    setShowResetButton,
    topMatchDelayMs,
    setTopMatchDelayMs,
    interpretationDelayMs,
    setInterpretationDelayMs,
    nivaDelayMs,
    setNivaDelayMs,
    forceTopMatchFail,
    setForceTopMatchFail,
  } = usePrototypeStore()
  const resetPrototype = useResetPrototype()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.altKey && event.code === 'KeyD') {
        event.preventDefault()
        setModeratorOpen((open) => !open)
      }
    }

    globalThis.addEventListener('keydown', onKeyDown)
    return () => globalThis.removeEventListener('keydown', onKeyDown)
  }, [setModeratorOpen])

  return (
    <Modal
      visible={moderatorOpen}
      title="Moderator controls"
      onClose={() => setModeratorOpen(false)}
      footer={
        <Button
          type={Button.ButtonTypes.SECONDARY}
          onClick={() => setModeratorOpen(false)}
        >
          Close
        </Button>
      }
    >
      <StackingLayout itemGap="L" padding="10px-0px">
        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          Hidden from participants. Shortcut is Shift+Option+D (Shift+Alt+D).
        </TextLabel>
        <Button type={Button.ButtonTypes.PRIMARY} onClick={resetPrototype}>
          Reset to start
        </Button>
        <Checkbox
          id="show-reset-button"
          type={Checkbox.CheckboxTypes.TOGGLE}
          checked={showResetButton}
          onChange={(event) =>
            setShowResetButton(Boolean(event.target.checked))
          }
          label="Show Reset button (bottom left)"
        />
        <Slider
          label="Top Match delay (milliseconds)"
          min={0}
          max={5000}
          step={100}
          value={topMatchDelayMs}
          onChange={(value) => setTopMatchDelayMs(Number(value))}
        />
        <Slider
          label="Interpretation delay (milliseconds)"
          min={0}
          max={5000}
          step={100}
          value={interpretationDelayMs}
          onChange={(value) => setInterpretationDelayMs(Number(value))}
        />
        <Slider
          label="NIVA delay (milliseconds)"
          min={0}
          max={5000}
          step={100}
          value={nivaDelayMs}
          onChange={(value) => setNivaDelayMs(Number(value))}
        />
        <Checkbox
          id="force-top-match-fail"
          type={Checkbox.CheckboxTypes.TOGGLE}
          checked={forceTopMatchFail}
          onChange={(event) =>
            setForceTopMatchFail(Boolean(event.target.checked))
          }
          label="Force Top Match to fail"
        />
      </StackingLayout>
    </Modal>
  )
}
