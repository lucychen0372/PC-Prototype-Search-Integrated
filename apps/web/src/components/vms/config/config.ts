import { EBActionsUtil } from '@nutanix-ui/ebr-ui'
import type { EBREntityConfig } from '~/types/ebr'
import { vmActions } from './actions'
import type { VmEntity } from './types'

export const vmEntityConfig = {
  schema: {
    idAttribute: 'id',
    nameAttribute: 'name',
    attributes: {
      id: {
        type: 'string',
        displayName: 'UUID',
      },
      name: {
        type: 'string',
        displayName: 'Name',
      },
      powerState: {
        type: 'enum',
        subType: 'string',
        displayName: 'Power State',
        values: {
          On: 'On',
          Off: 'Off',
        },
      },
      status: {
        type: 'enum',
        subType: 'string',
        displayName: 'Status',
        values: {
          Running: 'Running',
          Stopped: 'Stopped',
          'Not set up': 'Not set up',
          Paused: 'Paused',
        },
      },
      cpu: {
        type: 'int',
        displayName: 'vCPUs',
        continuous: true,
      },
      numVcpus: {
        type: 'int',
        displayName: 'vCPUs',
        continuous: true,
      },
      memory: {
        type: 'string',
        displayName: 'Memory',
      },
      cpuUsage: {
        type: 'int',
        displayName: 'CPU %',
        continuous: true,
      },
      memoryUsage: {
        type: 'int',
        displayName: 'Memory %',
        continuous: true,
      },
      iops: {
        type: 'int',
        displayName: 'IOPS',
        continuous: true,
      },
      createdOn: {
        type: 'int',
        displayName: 'Created',
      },
      ipAddresses: {
        type: 'string',
        displayName: 'IP Addresses',
      },
      storage: {
        type: 'string',
        displayName: 'Storage',
      },
      cluster: {
        type: 'string',
        displayName: 'Cluster',
      },
      hypervisor: {
        type: 'string',
        displayName: 'Hypervisor',
      },
      os: {
        type: 'string',
        displayName: 'OS',
      },
      project: {
        type: 'string',
        displayName: 'Project',
      },
      owner: {
        type: 'string',
        displayName: 'Owner',
      },
      protectionStatus: {
        type: 'enum',
        subType: 'string',
        displayName: 'Protection Status',
        values: {
          Protected: 'Protected',
          Unprotected: 'Unprotected',
        },
      },
      categories: {
        type: 'string',
        displayName: 'Categories',
      },
      consistencyGroup: {
        type: 'string',
        displayName: 'Consistency Group',
      },
      syncStatus: {
        type: 'string',
        displayName: 'Sync Status',
      },
      protectionType: {
        type: 'string',
        displayName: 'Protection Type',
      },
      protectionPolicy: {
        type: 'string',
        displayName: 'Protection Policy',
      },
      recoveryPlans: {
        type: 'string',
        displayName: 'Recovery Plans',
      },
    },
  },
  perspectives: [
    {
      name: '_common_',
      label: 'Common',
      entityAttributes: {
        idAttribute: 'id',
        primaryAttribute: 'name',
        helperAttributes: [
          'id',
          'powerState',
          'cluster',
          'hypervisor',
          'os',
          'project',
          'owner',
          'status',
        ],
        filterByAttributes: [
          'name',
          'powerState',
          'status',
          'cluster',
          'hypervisor',
          'os',
          'project',
          'owner',
          'protectionStatus',
          'cpuUsage',
          'memoryUsage',
          'iops',
        ],
        groupByAttributes: [
          'powerState',
          'status',
          'cluster',
          'hypervisor',
          'os',
          'project',
          'owner',
        ],
        sortByAttributes: [
          'name',
          'powerState',
          'numVcpus',
          'memory',
          'ipAddresses',
          'cluster',
          'hypervisor',
          'os',
          'project',
          'owner',
          'cpuUsage',
          'memoryUsage',
          'iops',
          'createdOn',
        ],
        defaultSortingAttribute: 'name',
        customRenders: {
          name: {
            formatter: 'vmNameLink',
            columnWidth: '18%',
          },
          powerState: {
            formatter: 'vmPowerState',
            columnWidth: '12%',
          },
          numVcpus: {
            formatter: 'vmNumVcpus',
            columnWidth: '1%',
            align: 'right',
          },
          memory: {
            formatter: 'vmMemorySize',
            columnWidth: '1%',
            align: 'right',
          },
          ipAddresses: {
            formatter: 'vmIpAddresses',
            columnWidth: '10%',
          },
          cluster: {
            formatter: 'vmClusterName',
            columnWidth: '20%',
          },
          hypervisor: {
            formatter: 'vmHypervisor',
            columnWidth: '10%',
          },
          os: {
            formatter: 'vmGuestOs',
            columnWidth: '13%',
          },
          project: {
            formatter: 'vmProjectName',
            columnWidth: '8%',
          },
          owner: {
            formatter: 'vmOwnerUsername',
            columnWidth: '7%',
          },
          cpuUsage: {
            formatter: 'vmCpuUsage',
            columnWidth: '10%',
          },
          memoryUsage: {
            formatter: 'vmMemoryUsage',
            columnWidth: '10%',
          },
          iops: {
            formatter: 'vmIops',
            columnWidth: '10%',
          },
          createdOn: {
            formatter: 'vmCreatedDate',
            columnWidth: '10%',
          },
        },
      },
      visualizations: [
        {
          name: 'grid',
          viewName: 'Grid',
          entityAttributes: {},
        },
      ],
    },
    {
      name: 'General',
      entityAttributes: {
        displayAttributes: [
          'name',
          'powerState',
          'numVcpus',
          'memory',
          'ipAddresses',
          'cluster',
          'hypervisor',
          'os',
          'project',
          'owner',
        ],
      },
    },
    {
      name: 'Performance',
      entityAttributes: {
        displayAttributes: [
          'name',
          'cluster',
          'powerState',
          'cpuUsage',
          'memoryUsage',
          'iops',
          'createdOn',
        ],
      },
    },
    {
      name: 'Data Protection',
      entityAttributes: {
        displayAttributes: [
          'name',
          'protectionStatus',
          'consistencyGroup',
          'syncStatus',
          'protectionType',
          'protectionPolicy',
          'recoveryPlans',
        ],
      },
    },
  ],
  filters: {
    maxFilterConditions: 20,
    maxFilterConditionsPerAttribute: 5,
    pinnedFilterAttributes: ['powerState', 'cluster', 'hypervisor'],
  },
  actions: EBActionsUtil.processActionsConfig(vmActions),
  defaultPerspective: 'General',
} satisfies EBREntityConfig<VmEntity>
