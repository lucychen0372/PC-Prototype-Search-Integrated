#!/usr/bin/env node

import { readFile } from 'node:fs/promises'

const [, , recordingPath] = process.argv

if (!recordingPath) {
  console.error('Usage: node scripts/mine-groups-recording.mjs <recording.json>')
  process.exitCode = 1
} else {
  const content = await readFile(recordingPath, 'utf8')
  const recording = JSON.parse(content)
  const catalog = new Map()

  for (const entry of Object.values(recording)) {
    const body = entry.reqBody ?? {}
    const entityType = body.entity_type ?? entry.resBody?.entity_type ?? 'unknown'
    const current = catalog.get(entityType) ?? {
      requestCount: 0,
      attributes: new Set(),
      filters: new Set(),
      groupingAttributes: new Set(),
      groupAttributes: new Set(),
      sortAttributes: new Set(),
      responseAttributes: new Set(),
    }

    current.requestCount += 1

    for (const attr of body.group_member_attributes ?? []) {
      if (attr.attribute) current.attributes.add(attr.attribute)
    }

    for (const attr of body.group_attributes ?? []) {
      if (attr.attribute) current.groupAttributes.add(attr.attribute)
    }

    if (body.filter_criteria) current.filters.add(body.filter_criteria)
    if (body.grouping_attribute) current.groupingAttributes.add(body.grouping_attribute)
    if (body.group_member_sort_attribute) {
      current.sortAttributes.add(body.group_member_sort_attribute)
    }

    for (const group of entry.resBody?.group_results ?? []) {
      for (const entity of group.entity_results ?? []) {
        for (const datum of entity.data ?? []) {
          if (datum.name) current.responseAttributes.add(datum.name)
        }
      }
    }

    catalog.set(entityType, current)
  }

  const output = Object.fromEntries(
    [...catalog.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([entityType, data]) => [
        entityType,
        {
          requestCount: data.requestCount,
          attributes: [...data.attributes].sort(),
          responseAttributes: [...data.responseAttributes].sort(),
          groupingAttributes: [...data.groupingAttributes].sort(),
          groupAttributes: [...data.groupAttributes].sort(),
          sortAttributes: [...data.sortAttributes].sort(),
          filters: [...data.filters].sort(),
        },
      ]),
  )

  console.log(JSON.stringify(output, null, 2))
}
