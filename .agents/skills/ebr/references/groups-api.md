# Groups API Data For EBR

Read this whenever creating or changing an EBR that uses `GroupsV3UQDC` in this prototype. The frontend schema and perspectives are only half of the work; the local API must also return the attributes EBR asks for.

## Local Endpoint

The prototype registers the mock Groups endpoint here:

```ts
app.route('/api/nutanix/v3/groups', groupsRoutes)
```

Source files:

- `apps/api/src/features/groups/data.ts` — in-memory entity rows.
- `apps/api/src/features/groups/types.ts` — entity and request-body types.
- `apps/api/src/features/groups/routes.ts` — request handling, projection, filtering, sorting, grouping, response envelope.
- `apps/api/src/features/groups/results.ts` — Groups API-shaped `group_results` and `entity_results`.
- `apps/api/src/features/groups/fiql.ts` — FIQL-style filter parsing.

## Request Shape Supported Locally

`GroupsV3UQDC` sends a Groups-style POST body. The local mock supports:

```ts
{
  entity_type?: string,
  group_member_offset?: number,
  group_member_count?: number,
  group_member_attributes?: Array<{ attribute: string }>,
  filter_criteria?: string,
  group_member_sort_attribute?: string,
  group_member_sort_order?: 'ASCENDING' | 'DESCENDING',
  grouping_attribute?: string,
  group_offset?: number,
  group_count?: number
}
```

The route defaults `entity_type` to `sample-entity`, offset to `0`, count to `20`, and projected attributes to the local `DEFAULT_ATTRIBUTES` when EBR does not request explicit attributes.

## Response Shape

The local response is:

```ts
{
  entity_type,
  group_results: [
    {
      group_by_column_value,
      entity_results: [
        {
          entity_id,
          data: [
            {
              name,
              values: [
                { values: [stringValue] }
              ]
            }
          ]
        }
      ],
      total_entity_count
    }
  ],
  total_group_count,
  filtered_group_count,
  filtered_entity_count,
  total_entity_count
}
```

Every entity attribute value is converted to a string in `results.ts`, so frontend renderers should parse numbers/dates when needed.

## Add Data For A New EBR

When creating a new entity browser:

1. Add rows to `apps/api/src/features/groups/data.ts`, or split data by entity type if the current single `entities` array becomes too limiting.
2. Update `Entity` in `types.ts` so TypeScript allows every attribute the EBR schema uses.
3. Update `DEFAULT_ATTRIBUTES` in `routes.ts` if the entity should return useful columns even when no projection is sent.
4. Ensure every attribute in EBR `displayAttributes`, `helperAttributes`, `filterByAttributes`, `groupByAttributes`, `sortByAttributes`, action checkers, custom renderers, and export functions exists in the API rows.
5. Exercise filter, sort, group, pagination, and empty-result behavior with realistic sample rows.

Keep attribute names identical between the API rows and the EBR schema. Do not create display-only frontend names unless the query processor or renderer explicitly maps them.

## Example Data

For an EBR schema using:

```ts
attributes: {
  uuid: { type: 'string', displayName: 'UUID' },
  name: { type: 'string', displayName: 'Name' },
  power_state: { type: 'enum', displayName: 'Power State' },
  cluster_name: { type: 'string', displayName: 'Cluster' },
  created_time_usecs: { type: 'int', subType: 'datetime', displayName: 'Created' },
  alert_count: { type: 'int', displayName: 'Alerts' }
}
```

the mock row should include those exact keys:

```ts
{
  uuid: 'widget-1',
  name: 'Widget 1',
  power_state: 'ON',
  cluster_name: 'Cluster 1',
  created_time_usecs: 1_775_263_170_450,
  alert_count: 3
}
```

If `uuid` is the schema `idAttribute`, either use `idAttribute: 'id'` to match the current mock response behavior or update `results.ts` to derive `entity_id` from the selected schema/id field. The current local helper emits `entity_id: entity.id`.

## Filtering

The local FIQL helper supports:

- equality / inequality: `==`, `!=`
- numeric comparisons: `=ge=`, `=gt=`, `=le=`, `=lt=`
- AND with `;`
- OR with `,`
- basic string contains/starts/ends behavior using `.*`
- regex-like values when syntax is present

Make sample values varied enough to validate filters:

- multiple enum states;
- multiple clusters/groups;
- enough rows for pagination;
- at least one row that should be excluded by common filters.

## Grouping And Sorting

`routes.ts` sorts by `group_member_sort_attribute` before grouping and paging. `results.ts` groups by `grouping_attribute` and returns one `group_result` per distinct value.

When adding EBR `groupByAttributes` or `sortByAttributes`, make sure:

- the attribute exists on every row or has a deliberate fallback;
- values are strings or numbers;
- sample data includes multiple group values;
- numeric values are actual numbers, not formatted strings.

## Gotchas

- The local API currently uses one shared `entities` array. If multiple EBRs need different entity shapes, introduce entity-type routing instead of mixing unrelated rows.
- `entity_id` currently comes from `entity.id`; align schema `idAttribute` with that or update the mock response builder.
- Projection is strict: if EBR requests an attribute missing from a row, the response value becomes an empty string.
- Filtering ignores unknown attributes because `matchesClause` returns false when the row lacks the field.
- The local mock is for development fidelity, not a full Groups API implementation. Keep it just complete enough for the EBR behaviors you are building.
