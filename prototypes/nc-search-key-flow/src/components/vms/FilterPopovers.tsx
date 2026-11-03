import {
  Button,
  Dropdown,
  FlexLayout,
  FormItemInput,
  FormItemSelect,
  Menu,
  Link,
  MenuItem,
  StackingLayout,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'
import type { MenuItemInfo } from '@nutanix-ui/prism-reactjs/lib/components/v2/Navigation/MenuItem'
import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import type { FilterAttribute, InterpretedFilter } from '@proto/data/types'
import { vmsMatching } from '@proto/lib/nc-data'
import {
  buildFilter,
  fieldFor,
  FILTER_FIELDS,
  mergeFilters,
  OP_LABEL,
  opsFor,
  type FilterField,
  type FilterOp,
} from './filter-fields'
import './FilterPopovers.css'

interface Draft {
  attribute: FilterAttribute
  op: FilterOp
  value: string
}

const draftFor = (field: FilterField): Draft => ({
  attribute: field.attribute,
  op: opsFor(field)[0] ?? 'eq',
  value: field.options?.[0] ?? '',
})

const draftFromFilter = (filter: InterpretedFilter): Draft => ({
  attribute: filter.attribute,
  op: filter.op,
  value: String(filter.value),
})

const isComplete = (draft: Draft) =>
  fieldFor(draft.attribute)?.options
    ? draft.value !== ''
    : draft.value.trim() !== '' && Number.isFinite(Number(draft.value))

const filterFromDraft = (draft: Draft) =>
  buildFilter(draft.attribute, draft.op, draft.value.trim())

const row = (key: string, label: string) => ({ key, label })

/** Field / Operator / Value, the three parts of an EBR filter condition. */
const FilterFields = ({
  draft,
  fields,
  onChange,
  onSubmit,
}: {
  draft: Draft
  fields: FilterField[]
  onChange: (draft: Draft) => void
  onSubmit: () => void
}) => {
  const field = fieldFor(draft.attribute) ?? FILTER_FIELDS[0]
  if (!field) return
  const ops = opsFor(field)

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSubmit()
  }

  return (
    <StackingLayout itemGap="S" className="vm-filter-fields">
      <FormItemSelect
        id="vm-filter-field"
        label="Field"
        rowsData={fields.map((option) => row(option.attribute, option.label))}
        selectedRow={row(field.attribute, field.label)}
        onSelectedChange={(selected) => {
          const next = fieldFor(String(selected?.key))
          if (next) onChange(draftFor(next))
        }}
      />
      <FormItemSelect
        id="vm-filter-operator"
        label="Operator"
        rowsData={ops.map((op) => row(op, OP_LABEL[op]))}
        selectedRow={row(draft.op, OP_LABEL[draft.op])}
        onSelectedChange={(selected) =>
          onChange({ ...draft, op: String(selected?.key) as FilterOp })
        }
        disabled={ops.length === 1}
      />
      {field.options ? (
        <FormItemSelect
          id="vm-filter-value"
          label="Value"
          rowsData={field.options.map((option) => row(option, option))}
          selectedRow={row(draft.value, draft.value)}
          onSelectedChange={(selected) =>
            onChange({ ...draft, value: String(selected?.key) })
          }
        />
      ) : (
        <FormItemInput
          id="vm-filter-value"
          label="Value"
          type="number"
          value={draft.value}
          placeholder={field.label === 'IOPS' ? 'e.g. 500' : 'e.g. 80'}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange({ ...draft, value: event.target.value })
          }
          onKeyDown={onKeyDown}
        />
      )}
    </StackingLayout>
  )
}

/** Opened from a token: change any part of the condition (the token's × removes it). */
export const EditFilterPopover = ({
  filter,
  fields = FILTER_FIELDS,
  onApply,
  children,
}: {
  filter: InterpretedFilter
  fields?: FilterField[]
  onApply: (next: InterpretedFilter) => void
  children: ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(() => draftFromFilter(filter))

  const onVisibleChange = (visible: boolean) => {
    if (visible) setDraft(draftFromFilter(filter))
    setOpen(visible)
  }

  const apply = () => {
    if (!isComplete(draft)) return
    setOpen(false)
    onApply(filterFromDraft(draft))
  }

  const popup = (
    <StackingLayout
      itemGap="M"
      className="vm-filter-popover -edit"
      data-test="vm-filter-edit"
    >
      <Title size={Title.TitleSizes.H4}>Edit filter</Title>
      <FilterFields
        draft={draft}
        fields={fields}
        onChange={setDraft}
        onSubmit={apply}
      />
      <FlexLayout itemGap="S" justifyContent="flex-end">
        <Button
          type={Button.ButtonTypes.SECONDARY}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button onClick={apply} disabled={!isComplete(draft)}>
          Apply
        </Button>
      </FlexLayout>
    </StackingLayout>
  )

  return (
    <Dropdown
      popupVisible={open}
      onPopupVisibleChange={onVisibleChange}
      popup={popup}
      popupPlacement="bottomLeft"
      getPopupContainer={() => document.body}
      focusOnOpen={false}
      disableKeyboardNavigation
      popupClassName="vm-filter-popup"
    >
      {/* Dropdown attaches its trigger handlers to a DOM child */}
      <div className="vm-filter-trigger">{children}</div>
    </Dropdown>
  )
}

/** "+ Filter": pick a VM field on the left, set its condition on the right. */
export const AddFilterPopover = ({
  current,
  scope = [],
  fields = FILTER_FIELDS,
  onAdd,
}: {
  current: InterpretedFilter[]
  /** Filters implied by a parent scope; the VM count includes them. */
  scope?: InterpretedFilter[]
  fields?: FilterField[]
  onAdd: (filter: InterpretedFilter) => void
}) => {
  const [open, setOpen] = useState(false)
  const firstField = fields[0]
  const [draft, setDraft] = useState<Draft | undefined>(
    firstField && draftFor(firstField),
  )

  const onVisibleChange = (visible: boolean) => {
    if (visible && firstField) setDraft(draftFor(firstField))
    setOpen(visible)
  }

  const complete = draft !== undefined && isComplete(draft)
  const matching = complete
    ? vmsMatching([
        ...scope,
        ...mergeFilters(current, [filterFromDraft(draft)]),
      ]).length
    : undefined

  const add = () => {
    if (!draft || !complete) return
    setOpen(false)
    onAdd(filterFromDraft(draft))
  }

  const popup = draft ? (
    <FlexLayout
      itemGap="none"
      className="vm-filter-popover -add"
      data-test="vm-filter-add"
    >
      <StackingLayout itemGap="XS" className="vm-filter-field-list">
        <TextLabel
          type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          className="vm-filter-section-label"
        >
          VM fields
        </TextLabel>
        <Menu
          appearance={Menu.MenuAppearance.COMPACT}
          onClick={(item: MenuItemInfo) => {
            const field = fieldFor(String(item.key))
            if (field) setDraft(draftFor(field))
          }}
          aria-label="VM fields"
        >
          {fields.map((field) => (
            <MenuItem
              key={field.attribute}
              active={field.attribute === draft.attribute}
            >
              {field.label}
            </MenuItem>
          ))}
        </Menu>
      </StackingLayout>
      <StackingLayout itemGap="M" className="vm-filter-form">
        <Title size={Title.TitleSizes.H4}>New filter</Title>
        <FilterFields
          draft={draft}
          fields={fields}
          onChange={setDraft}
          onSubmit={add}
        />
        <FlexLayout itemGap="S" justifyContent="flex-end">
          <Button
            type={Button.ButtonTypes.SECONDARY}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={add} disabled={!complete}>
            {matching === undefined
              ? 'Add filter'
              : `Add filter · ${matching} VM${matching === 1 ? '' : 's'}`}
          </Button>
        </FlexLayout>
      </StackingLayout>
    </FlexLayout>
  ) : undefined

  return (
    <Dropdown
      popupVisible={open}
      onPopupVisibleChange={onVisibleChange}
      popup={popup}
      popupPlacement="bottomLeft"
      getPopupContainer={() => document.body}
      focusOnOpen={false}
      disableKeyboardNavigation
      popupClassName="vm-filter-popup"
    >
      <div className="vm-filter-trigger">
        <Link
          type={Link.LINK_TYPE.INLINE_SECONDARY}
          underline={false}
          aria-label="Add filter"
          className="vm-interpretation-add-filter"
        >
          + Filter
        </Link>
      </div>
    </Dropdown>
  )
}
