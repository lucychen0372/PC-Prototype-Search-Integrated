import { connect } from '@nutanix-ui/ebr-ui'
import { useEffect } from 'react'
import type {
  EBRCurrentPopup,
  EBROwnProps,
  EBRSelectionInfo,
  EBRState,
  EBRStoreAction,
} from '~/types/ebr'
import { VM_CREATE_ACTION_ID } from './config/actions'
import { VM_ENTITY_TYPE } from './config/constants'
import type { VmEntity } from './config/types'
import type { VmWizardMode } from './vm-wizard'

export const VM_WIZARD_LAUNCH_EVENT = 'vm-wizard:launch'

export interface VmWizardLaunchDetail {
  mode: VmWizardMode
  sourceVm?: VmEntity
}

interface VmActionPopupContainerStateProps {
  currentPopup: EBRCurrentPopup
  selectedEntityType: string
  selectionInfo: EBRSelectionInfo<VmEntity>
}

interface VmActionPopupContainerDispatchProps {
  closePopup: () => void
}

type VmActionPopupContainerProps = VmActionPopupContainerStateProps &
  VmActionPopupContainerDispatchProps

const getSelectedVm = (selectionInfo: EBRSelectionInfo<VmEntity>) => {
  const [selectedVmId] =
    selectionInfo.selected.length > 0
      ? selectionInfo.selected
      : Array.isArray(selectionInfo.visibleSelectedEntities)
        ? selectionInfo.visibleSelectedEntities
        : Object.keys(selectionInfo.visibleSelectedEntities)

  return selectedVmId
    ? selectionInfo.selectedEntities?.[selectedVmId]
    : undefined
}

function VmActionPopupContainer({
  closePopup,
  currentPopup,
  selectedEntityType,
  selectionInfo,
}: VmActionPopupContainerProps) {
  useEffect(() => {
    if (!currentPopup.actionId || selectedEntityType !== VM_ENTITY_TYPE) {
      return
    }

    if (currentPopup.actionId === VM_CREATE_ACTION_ID) {
      closePopup()
      globalThis.dispatchEvent(
        new CustomEvent<VmWizardLaunchDetail>(VM_WIZARD_LAUNCH_EVENT, {
          detail: {
            mode: 'create',
          },
        }),
      )
      return
    }

    if (currentPopup.actionId === 'update') {
      const selectedVm = getSelectedVm(selectionInfo)

      if (!selectedVm) {
        closePopup()
        return
      }

      closePopup()
      globalThis.dispatchEvent(
        new CustomEvent<VmWizardLaunchDetail>(VM_WIZARD_LAUNCH_EVENT, {
          detail: {
            mode: 'update',
            sourceVm: selectedVm,
          },
        }),
      )
    }
  }, [closePopup, currentPopup.actionId, selectedEntityType, selectionInfo])

  return <></>
}

const mapStateToProps = (
  state: EBRState,
  ownProps: EBROwnProps,
): VmActionPopupContainerStateProps => ({
  currentPopup: ownProps.Getters.getCurrentPopup(state),
  selectedEntityType: ownProps.Getters.getSelectedEntityType(state),
  selectionInfo: ownProps.Getters.getCurrentSelectedEntities(
    state,
  ) as EBRSelectionInfo<VmEntity>,
})

const mapDispatchToProps = (
  dispatch: (action: EBRStoreAction) => void,
  ownProps: EBROwnProps,
): VmActionPopupContainerDispatchProps => ({
  closePopup: () => {
    dispatch(ownProps.actions.closePopup())
  },
})

export const ConnectedVmActionPopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VmActionPopupContainer)
