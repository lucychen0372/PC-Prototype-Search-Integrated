import { Link as RouterLink } from '@tanstack/react-router'
import { COMPONENT_IDS, DataUtil } from '@nutanix-ui/ebr-ui'
import {
  Badge,
  FlexLayout,
  StackingLayout,
  TextLabel,
} from '@nutanix-ui/prism-reactjs'
import type { ReactNode } from 'react'
import { EBRComponentFactory as BaseEBRComponentFactory } from '~/lib/ebr-utils'
import type { EBRFormatterOptions } from '~/types/ebr'
import { ConnectedVmActionPopupContainer } from './VmActionPopupContainer'
import type { VmEntity } from './config/types'

type VmFormatterOptions = EBRFormatterOptions<VmEntity>
type VmFactoryOptions = VmFormatterOptions | VmDetailsPaneOptions

interface VmDetailsPaneOptions {
  detailsEntity: VmEntity
  detailsActions: ReactNode
  children?: ReactNode
}

const getEntityFromFormatterOptions = (
  options?: VmFactoryOptions,
): VmEntity | undefined => {
  if (!options) {
    return undefined
  }

  const formatterOptions = (options as VmFormatterOptions).options

  if (!formatterOptions) {
    return undefined
  }

  return formatterOptions.entity
}

const DataCell = ({
  children,
  dataTest,
}: {
  children: ReactNode
  dataTest: string
}) => (
  <span className="vm-truncate" data-test={dataTest} title={String(children)}>
    {children}
  </span>
)

const createdDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

const formatCreatedDate = (createdOnUsecs: number | undefined) =>
  createdOnUsecs ? createdDateFormat.format(createdOnUsecs / 1000) : '-'

const splitIpAddresses = (value: string | undefined) => {
  const [firstAddress = '-', moreText] = (value ?? '-').split(/\s+\+\s+/, 2)

  return {
    firstAddress,
    moreText: moreText ? `+ ${moreText}` : '',
  }
}

class VmFactory extends BaseEBRComponentFactory<VmFactoryOptions> {
  override getComponent(componentId: string, options?: VmFactoryOptions) {
    switch (componentId) {
      case COMPONENT_IDS.POPUP_CONTAINER:
        return (
          <ConnectedVmActionPopupContainer
            {...DataUtil.getActionComponentArgs()}
          />
        )

      case 'vmNameLink': {
        const entity = getEntityFromFormatterOptions(options)

        return (
          <RouterLink
            to="/vms/$vmId"
            params={{ vmId: entity?.id ?? '' }}
            className="vm-link"
            data-test="vm-name"
            title={entity?.name ?? '-'}
          >
            {entity?.name ?? '-'}
          </RouterLink>
        )
      }

      case 'vmPowerState': {
        const entity = getEntityFromFormatterOptions(options)
        const powerState = entity?.powerState ?? '-'
        const color =
          powerState === 'On'
            ? Badge.BADGE_COLOR_TYPES.GREEN
            : Badge.BADGE_COLOR_TYPES.GRAY

        return (
          <Badge
            color={color}
            text={powerState}
            title={powerState.toLowerCase()}
          />
        )
      }

      case 'vmNumVcpus': {
        const entity = getEntityFromFormatterOptions(options)

        return (
          <DataCell dataTest="num-vcpus">{entity?.numVcpus ?? '-'}</DataCell>
        )
      }

      case 'vmMemorySize': {
        const entity = getEntityFromFormatterOptions(options)

        return (
          <DataCell dataTest="memory-size">{entity?.memory ?? '-'}</DataCell>
        )
      }

      case 'vmIpAddresses': {
        const entity = getEntityFromFormatterOptions(options)
        const { firstAddress, moreText } = splitIpAddresses(entity?.ipAddresses)

        return (
          <button
            type="button"
            className="vm-list-more-link"
            data-test-id={`list-more-link_${entity?.id ?? ''}_nics`}
            title={entity?.ipAddresses ?? firstAddress}
          >
            <FlexLayout display="inline-flex" alignItems="center" itemGap="XS">
              <span>{firstAddress}</span>
              {moreText && <span>{moreText}</span>}
            </FlexLayout>
          </button>
        )
      }

      case 'vmClusterName': {
        const entity = getEntityFromFormatterOptions(options)

        return (
          <FlexLayout
            alignItems="baseline"
            justifyContent="flex-start"
            itemGap="S"
            className="vm-cluster-cell"
          >
            <a
              className="vm-link vm-cluster-link"
              data-test="cluster-name"
              title={entity?.cluster ?? '-'}
              href="#"
              onClick={(event) => event.preventDefault()}
            >
              {entity?.cluster ?? '-'}
            </a>
            <span className="vm-cluster-type-tag">
              <Badge
                color={Badge.BADGE_COLOR_TYPES.GRAY}
                count="HCI"
                data-test="cluster_type_tag"
              />
            </span>
          </FlexLayout>
        )
      }

      case 'vmHypervisor': {
        const entity = getEntityFromFormatterOptions(options)

        return (
          <DataCell dataTest="hypervisor">{entity?.hypervisor ?? '-'}</DataCell>
        )
      }

      case 'vmGuestOs': {
        const entity = getEntityFromFormatterOptions(options)

        return (
          <TextLabel
            type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
            className="vm-truncate"
            data-test="guest-os-name"
            title={entity?.os ?? 'Unknown'}
          >
            {entity?.os ?? 'Unknown'}
          </TextLabel>
        )
      }

      case 'vmProjectName': {
        const entity = getEntityFromFormatterOptions(options)

        return (
          <DataCell dataTest="project-name">{entity?.project ?? '-'}</DataCell>
        )
      }

      case 'vmOwnerUsername': {
        const entity = getEntityFromFormatterOptions(options)

        return (
          <DataCell dataTest="owner-username">{entity?.owner ?? '-'}</DataCell>
        )
      }

      case 'vmCpuUsage':
      case 'vmMemoryUsage': {
        const entity = getEntityFromFormatterOptions(options)
        const value =
          componentId === 'vmCpuUsage' ? entity?.cpuUsage : entity?.memoryUsage

        return (
          <DataCell dataTest="usage-percent">
            {entity?.powerState === 'On' && value !== undefined
              ? `${value}%`
              : '—'}
          </DataCell>
        )
      }

      case 'vmIops': {
        const entity = getEntityFromFormatterOptions(options)

        return <DataCell dataTest="iops">{entity?.iops ?? '-'}</DataCell>
      }

      case 'vmCreatedDate': {
        const entity = getEntityFromFormatterOptions(options)

        return (
          <DataCell dataTest="created-date">
            {formatCreatedDate(entity?.createdOn)}
          </DataCell>
        )
      }

      case 'detailsPane': {
        const detailsPaneOptions = options as VmDetailsPaneOptions | undefined

        return (
          <StackingLayout itemGap="S">
            {detailsPaneOptions?.detailsActions}
            {detailsPaneOptions?.children}
          </StackingLayout>
        )
      }

      default:
        return super.getComponent(
          componentId,
          options ?? ({} as VmFactoryOptions),
        )
    }
  }
}

let instance: VmFactory | undefined

export const vmFactory = {
  getInstance() {
    if (!instance) {
      instance = new VmFactory()
    }

    return instance
  },
}
