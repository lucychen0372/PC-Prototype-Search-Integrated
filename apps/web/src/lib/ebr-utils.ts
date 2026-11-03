import type { ReactNode } from 'react'
import type { EBRComponentFactoryLike, EBRFilterParser } from '~/types/ebr'

export const ACTION_STATES = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  HIDDEN: 'hidden',
} as const

export interface ActionState {
  state: (typeof ACTION_STATES)[keyof typeof ACTION_STATES]
  reason?: string
}

export interface EBRFormatter<TOptions> {
  name: string
  formatter: (options: TOptions) => ReactNode
}

export interface EBRJoinedDataOptions<TEntity = unknown> {
  joinedData?: Record<string, TEntity[]>
}

export const actionState: {
  (
    state: typeof ACTION_STATES.ENABLED | typeof ACTION_STATES.HIDDEN,
  ): ActionState
  (state: typeof ACTION_STATES.DISABLED, reason: string): ActionState
  (state: ActionState['state'], reason?: string): ActionState
} = (state: ActionState['state'], reason?: string): ActionState => ({
  state,
  ...(reason ? { reason } : {}),
})

export class EBRComponentFactory<TOptions> {
  private defaultFactory?: EBRComponentFactoryLike<TOptions>

  getComponent(componentId: string, options: TOptions): ReactNode {
    return this.getDefaultFactory().getComponent(componentId, options)
  }

  getFilterParser(): EBRFilterParser {
    return this.getDefaultFactory().getFilterParser()
  }

  setDefaultFactory(factory: EBRComponentFactoryLike<TOptions>): void {
    this.defaultFactory = factory
  }

  getDefaultFactory(): EBRComponentFactoryLike<TOptions> {
    if (this.defaultFactory) {
      return this.defaultFactory
    }

    throw new Error('Default factory was accessed before it was set')
  }
}

export const createFormatter = <TOptions>(
  name: string,
  formatter: (options: TOptions) => ReactNode,
): EBRFormatter<TOptions> => ({
  name,
  formatter,
})

export const createFormatterWithColId = <TOptions>(
  name: string,
  formatter: (options: TOptions, componentId: string) => ReactNode,
): EBRFormatter<TOptions> => ({
  name,
  formatter: (options) => formatter(options, name),
})

export const getJoinedEntityData = <TEntity>(
  options: EBRJoinedDataOptions<TEntity>,
  joinedDataKey: string,
  joinedEntityIdValue: unknown,
  joinedEntityIdProp = 'id',
): TEntity | undefined =>
  options.joinedData?.[joinedDataKey]?.find(
    (entity) =>
      (entity as Record<string, unknown> | undefined)?.[joinedEntityIdProp] ===
      joinedEntityIdValue,
  )

export const getOneToManyJoinedEntityData = <TEntity>(
  options: EBRJoinedDataOptions<TEntity>,
  joinedDataKey: string,
  joinedEntityIdValues: unknown[],
  joinedEntityIdProp = 'id',
): Array<TEntity | undefined> => {
  const joinedEntityData = options.joinedData?.[joinedDataKey] ?? []
  const joinedEntityDataMap = new Map<unknown, TEntity>()

  for (const entity of joinedEntityData) {
    joinedEntityDataMap.set(
      (entity as Record<string, unknown> | undefined)?.[joinedEntityIdProp],
      entity,
    )
  }

  return joinedEntityIdValues.map((entityId) =>
    joinedEntityDataMap.get(entityId),
  )
}
