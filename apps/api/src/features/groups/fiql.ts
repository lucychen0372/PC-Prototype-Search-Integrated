import type { Entity, FiqlClause } from './types'

const FIQL_OPS = [
  '=ge=',
  '=gt=',
  '=le=',
  '=lt=',
  '=cs=',
  '=in=',
  '!=',
  '==',
] as const

const parseFiqlClause = (clause: string): FiqlClause | undefined => {
  const normalizedClause = clause.trim().replaceAll(/^\(+|\)+$/g, '')

  for (const op of FIQL_OPS) {
    const idx = normalizedClause.indexOf(op)
    if (idx > 0) {
      return {
        attr: normalizedClause.slice(0, Math.max(0, idx)),
        op,
        value: normalizedClause.slice(Math.max(0, idx + op.length)),
      }
    }
  }

  return undefined
}

const containsRegexSyntax = (s: string): boolean => /[[\]()|\\+?{}^$]/.test(s)

const matchesClause = (
  entity: Entity,
  { attr, op, value }: FiqlClause,
): boolean => {
  const raw = entity[attr]
  if (raw === undefined) return false
  const rawValues = Array.isArray(raw) ? raw.map(String) : [String(raw)]
  const entityVal = rawValues.join('|')

  if (op === '==' || op === '!=') {
    let matches: boolean
    if (containsRegexSyntax(value)) {
      try {
        matches = new RegExp(value, 'i').test(entityVal)
      } catch {
        matches = false
      }
    } else if (value.startsWith('.*') && value.endsWith('.*')) {
      const inner = value.slice(2, -2)
      matches = entityVal.toLowerCase().includes(inner.toLowerCase())
    } else if (value.startsWith('.*')) {
      matches = entityVal.toLowerCase().endsWith(value.slice(2).toLowerCase())
    } else if (value.endsWith('.*')) {
      matches = entityVal
        .toLowerCase()
        .startsWith(value.slice(0, -2).toLowerCase())
    } else {
      matches = entityVal.toLowerCase() === value.toLowerCase()
    }
    return op === '!=' ? !matches : matches
  }

  if (op === '=cs=') {
    const expectedValues = value.split('|').map((v) => v.toLowerCase())

    return expectedValues.every((expectedValue) =>
      rawValues.some((rawValue) => rawValue.toLowerCase() === expectedValue),
    )
  }

  if (op === '=in=') {
    const expectedValues = new Set(value.split('|').map((v) => v.toLowerCase()))

    return rawValues.some((rawValue) =>
      expectedValues.has(rawValue.toLowerCase()),
    )
  }

  const numEntity = Number(entityVal)
  const numValue = Number(value)
  if (Number.isNaN(numEntity) || Number.isNaN(numValue)) return false
  if (op === '=ge=') return numEntity >= numValue
  if (op === '=gt=') return numEntity > numValue
  if (op === '=le=') return numEntity <= numValue
  if (op === '=lt=') return numEntity < numValue
  return false
}

export const applyFiqlFilter = (
  list: Entity[],
  filterCriteria: string,
): Entity[] => {
  if (!filterCriteria) return list
  const orGroups = filterCriteria
    .split(',')
    .map(
      (group) =>
        group
          .split(';')
          .map((c) => parseFiqlClause(c))
          .filter(Boolean) as FiqlClause[],
    )
    .filter((group) => group.length > 0)

  if (orGroups.length === 0) return list
  return list.filter((entity) =>
    orGroups.some((group) => group.every((c) => matchesClause(entity, c))),
  )
}
