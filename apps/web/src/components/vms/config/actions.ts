import type { EBRRawActionsConfig } from '~/types/ebr'

export const VM_CREATE_ACTION_ID = 'createVm'
export const VM_MORE_DETAILS_ACTIONS_ID = 'moreDetailsActions'

export const vmActions: EBRRawActionsConfig = {
  actions: {
    primary: [VM_CREATE_ACTION_ID, 'createFromTemplate'],
    secondary: [
      'update',
      'launchConsole',
      'powerOperations',
      'clone',
      'createTemplate',
      'delete',
    ],
    dropdowns: [],
    details: [
      'update',
      'launchConsole',
      'powerOperations',
      'clone',
      'createTemplate',
    ],
    detailsDropdowns: [VM_MORE_DETAILS_ACTIONS_ID],
    right_click: [
      'update',
      'launchConsole',
      'powerOperations',
      'clone',
      'createTemplate',
      'delete',
    ],
  },
  actionProps: {
    [VM_CREATE_ACTION_ID]: {
      id: VM_CREATE_ACTION_ID,
      label: 'Create VM',
      componentProps: {},
      criteria: {
        checks: ['canWrite'],
        match: 'all',
      },
    },
    createFromTemplate: {
      id: 'createFromTemplate',
      label: 'Create VM from Template',
      componentProps: {},
      criteria: {
        checks: ['canWrite'],
        match: 'all',
      },
    },
    update: {
      id: 'update',
      label: 'Update',
      componentProps: {},
      criteria: {
        checks: ['onlyOneSelected', 'canWrite'],
        match: 'all',
      },
    },
    [VM_MORE_DETAILS_ACTIONS_ID]: {
      id: VM_MORE_DETAILS_ACTIONS_ID,
      label: 'More',
      componentProps: {},
      criteria: {
        checks: ['canWrite'],
        match: 'all',
      },
      children: ['delete'],
    },
    launchConsole: {
      id: 'launchConsole',
      label: 'Launch Console',
      componentProps: {},
      criteria: {
        checks: ['onlyOneSelected', 'isPoweredOn'],
        match: 'all',
      },
    },
    powerOperations: {
      id: 'powerOperations',
      label: 'Power Operations',
      componentProps: {},
      criteria: {
        checks: ['onlyOneSelected'],
        match: 'all',
      },
    },
    clone: {
      id: 'clone',
      label: 'Clone',
      componentProps: {},
      criteria: {
        checks: ['onlyOneSelected'],
        match: 'all',
      },
    },
    createTemplate: {
      id: 'createTemplate',
      label: 'Create VM Template',
      componentProps: {},
      criteria: {
        checks: ['onlyOneSelected'],
        match: 'all',
      },
    },
    delete: {
      id: 'delete',
      label: 'Delete',
      componentProps: {},
      criteria: {
        checks: ['onlyOneSelected', 'canDelete'],
        match: 'all',
      },
      needsConfirmation: true,
      confirmationMessage: 'Delete the selected VM?',
    },
  },
} satisfies EBRRawActionsConfig
