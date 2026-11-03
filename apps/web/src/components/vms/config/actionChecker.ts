import { EBActionsUtil } from '@nutanix-ui/ebr-ui'
import { ACTION_STATES, actionState } from '~/lib/ebr-utils'
import type { EBRActionChecker } from '~/types/ebr'
import type { VmEntity } from './types'

export const vmActionChecker = {
  onlyOneSelected: EBActionsUtil.onlyOneSelected,

  canWrite: (() =>
    actionState(ACTION_STATES.ENABLED)) satisfies EBRActionChecker,

  canDelete: (() =>
    actionState(ACTION_STATES.ENABLED)) satisfies EBRActionChecker,

  isPoweredOn: ((_action, _entityType, selectedEntities) => {
    const [entity] = selectedEntities as unknown as VmEntity[]

    return entity?.powerState === 'On'
      ? actionState(ACTION_STATES.ENABLED)
      : actionState(ACTION_STATES.DISABLED, 'The selected VM is powered off.')
  }) satisfies EBRActionChecker,
}
