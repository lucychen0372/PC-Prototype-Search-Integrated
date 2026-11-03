import {
  AlertIcon,
  DeviceIcon,
  NavigationIcon,
  OpenFolderIcon,
  RackIcon,
  VMIcon,
} from '@nutanix-ui/prism-reactjs'
import type { EntityType } from '@proto/data/types'

export const TypeIcon = ({ type }: { type: EntityType }) => {
  const props = { 'aria-hidden': true as const }

  switch (type) {
    case 'vm':
      return <VMIcon {...props} />
    case 'cluster':
      return <RackIcon {...props} />
    case 'host':
      return <DeviceIcon {...props} />
    case 'alert':
      return <AlertIcon {...props} />
    case 'page':
      return <OpenFolderIcon {...props} />
    case 'domain':
      return <NavigationIcon {...props} />
  }
}
