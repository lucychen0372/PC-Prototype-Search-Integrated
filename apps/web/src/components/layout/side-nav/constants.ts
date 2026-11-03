import type { MenuItemNode } from './types'

export const MENU_DATA: MenuItemNode[] = [
  {
    type: 'group',
    key: 'main',
    children: [
      {
        type: 'item',
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        exact: true,
      },
      {
        type: 'divider',
        key: 'divider-1',
      },
      {
        type: 'group',
        key: 'compute',
        title: 'Compute',
        collapsible: true,
        children: [
          {
            type: 'item',
            key: 'vms',
            label: 'VMs',
            path: '/vms',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'templates',
            label: 'Templates',
            path: '/templates',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'kubernetes',
            label: 'Kubernetes Clusters',
            path: '/kubernetes',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'ovas',
            label: 'OVAs',
            path: '/ovas',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'images',
            label: 'Images',
            path: '/images',
            isFavorite: true,
          },
        ],
      },
      {
        type: 'group',
        key: 'storage',
        title: 'Storage',
        collapsible: true,
        children: [
          {
            type: 'item',
            key: 'storage-containers',
            label: 'Storage Containers',
            path: '/storage-containers',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'volume-groups',
            label: 'Volume Groups',
            path: '/volume-groups',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'storage-policies',
            label: 'Storage Policies',
            path: '/storage-policies',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'external-storage',
            label: 'External Storage',
            path: '/external-storage',
            isFavorite: true,
          },
        ],
      },

      {
        type: 'group',
        key: 'networking',
        title: 'Network & Security',
        collapsible: true,
        children: [
          {
            type: 'item',
            key: 'virtual-switches',
            label: 'Virtual Switches',
            path: '/virtual-switches',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'subnets',
            label: 'Subnets',
            path: '/subnets',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'virtual-cloud',
            label: 'Virtual Private Cloud',
            path: '/virtual-cloud',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'floating-ips',
            label: 'Floating IPs',
            path: '/floating-ips',
            isFavorite: true,
          },
        ],
      },

      {
        type: 'group',
        key: 'protection',
        title: 'Data Protection',
        collapsible: true,
        children: [
          {
            type: 'item',
            key: 'protection-summary',
            label: 'Protection Summary',
            path: '/protection-summary',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'protection-policies',
            label: 'Protection Policies',
            path: '/protection-policies',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'recovery-plans',
            label: 'Recovery Plans',
            path: '/recovery-plans',
            isFavorite: true,
          },
          {
            type: 'item',
            key: 'vm-recovery-points',
            label: 'VM Recovery Points',
            path: '/vm-recovery-points',
            isFavorite: true,
          },
        ],
      },
      {
        type: 'divider',
        key: 'divider-2',
      },
      {
        type: 'item',
        key: 'prism-central-settings',
        label: 'Prism Central Settings',
        path: '/settings',
        isFavorite: false,
      },
    ],
  },
]
