# Common Composition Patterns

## Page Layout

```tsx
import {
  MainPageLayout,
  NavBarLayout,
  StackingLayout,
  FlexLayout,
  Menu,
  MenuItem,
  Title,
  NutanixLogoIcon,
  MenuIcon,
} from '@nutanix-ui/prism-reactjs'

function AppShell() {
  return (
    <MainPageLayout
      header={
        <NavBarLayout
          layout="left"
          menuIcon={<MenuIcon />}
          logoIcon={<NutanixLogoIcon />}
          title="App Name"
          accountInfo={<FlexLayout itemGap="S">...</FlexLayout>}
        />
      }
      leftPanel={
        <StackingLayout padding="10px" itemGap="none">
          <Menu type={Menu.MenuType.PRIMARY}>
            <MenuItem key="dash" label="Dashboard" />
            <MenuItem key="settings" label="Settings" />
          </Menu>
        </StackingLayout>
      }
      body={<Outlet />}
    />
  )
}
```

## Form with Validation

```tsx
import {
  StackingLayout,
  FlexLayout,
  Input,
  Select,
  TextLabel,
  Button,
} from '@nutanix-ui/prism-reactjs'

function MyForm() {
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  return (
    <StackingLayout itemGap="L" padding="20px">
      {/* Text field with label + error */}
      <StackingLayout itemGap="XS">
        <TextLabel id="name-label">Name</TextLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-labelledby="name-label"
          aria-describedby={errors.name ? 'name-error' : undefined}
          error={!!errors.name}
          errorType={Input.ErrorType.CRITICAL}
          placeholder="Enter name"
        />
        {errors.name && (
          <TextLabel id="name-error" type={TextLabel.TextLabelType.ERROR}>
            {errors.name}
          </TextLabel>
        )}
      </StackingLayout>

      {/* Select field */}
      <StackingLayout itemGap="XS">
        <TextLabel id="region-label">Region</TextLabel>
        <Select
          aria-labelledby="region-label"
          rowsData={[
            { key: 'us', label: 'US West' },
            { key: 'eu', label: 'EU Central' },
          ]}
          selectedRow={{ key: 'us', label: 'US West' }}
          onSelectedChange={(row) => setRegion(row)}
        />
      </StackingLayout>

      <FlexLayout justifyContent="flex-end" itemGap="S">
        <Button type={Button.ButtonTypes.SECONDARY} onClick={onCancel}>
          Cancel
        </Button>
        <Button type={Button.ButtonTypes.PRIMARY} onClick={onSubmit}>
          Save
        </Button>
      </FlexLayout>
    </StackingLayout>
  )
}
```

## FormItem Pattern (Auto Label + Error)

```tsx
import {
  FormItemInput,
  FormItemSelect,
  FormSection,
} from '@nutanix-ui/prism-reactjs'
;<FormSection title="Connection Details" itemGap="L">
  <FormItemInput
    id="host"
    label="Hostname"
    value={host}
    onChange={(e) => setHost(e.target.value)}
    error={!!errors.host}
    helpText={errors.host}
  />
  <FormItemSelect
    id="protocol"
    label="Protocol"
    rowsData={[
      { key: 'https', label: 'HTTPS' },
      { key: 'http', label: 'HTTP' },
    ]}
    selectedRow={protocol}
    onSelectedChange={setProtocol}
  />
</FormSection>
```

## Modal with Form

```tsx
import {
  Modal,
  StackingLayout,
  Input,
  TextLabel,
  FlexLayout,
  Button,
} from '@nutanix-ui/prism-reactjs'

function EditModal({ visible, onClose, onSave }) {
  const [name, setName] = useState('')

  return (
    <Modal
      visible={visible}
      title="Edit Item"
      onClose={onClose}
      closeOnEscape={true}
      restoreFocus={true}
      footer={
        <FlexLayout justifyContent="flex-end" itemGap="S">
          <Button type={Button.ButtonTypes.SECONDARY} onClick={onClose}>
            Cancel
          </Button>
          <Button
            type={Button.ButtonTypes.PRIMARY}
            onClick={() => onSave(name)}
          >
            Save
          </Button>
        </FlexLayout>
      }
    >
      <StackingLayout itemGap="L" padding="20px">
        <StackingLayout itemGap="XS">
          <TextLabel id="name-label">Name</TextLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-labelledby="name-label"
          />
        </StackingLayout>
      </StackingLayout>
    </Modal>
  )
}
```

## Confirm Modal (Delete)

```tsx
import { ConfirmModal } from '@nutanix-ui/prism-reactjs'
;<ConfirmModal
  visible={showConfirm}
  title="Delete Item?"
  message="This action cannot be undone."
  confirmLabel="Delete"
  type="destructive"
  onConfirm={handleDelete}
  onClose={() => setShowConfirm(false)}
/>
```

## Data Table with Selection & Actions

```tsx
import {
  StackingLayout,
  FlexLayout,
  Table,
  Button,
  Dropdown,
  Menu,
  MenuItem,
  Badge,
  Title,
  PlusIcon,
} from '@nutanix-ui/prism-reactjs'

function DataPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const columns = [
    { key: 'name', title: 'Name' },
    {
      key: 'status',
      title: 'Status',
      render: (val) => (
        <Badge color={val === 'active' ? 'green' : 'gray'}>{val}</Badge>
      ),
    },
  ]

  return (
    <StackingLayout itemGap="L" padding="20px">
      <FlexLayout justifyContent="space-between" alignItems="center">
        <Title size={Title.SIZES.H2}>Items</Title>
        <FlexLayout itemGap="S">
          <Button type={Button.ButtonTypes.PRIMARY}>
            <PlusIcon /> Create
          </Button>
          <Dropdown
            popup={
              <Menu>
                <MenuItem key="export" label="Export" />
                <MenuItem key="delete" label="Delete" />
              </Menu>
            }
          >
            Actions
          </Dropdown>
        </FlexLayout>
      </FlexLayout>

      <Table
        dataSource={items}
        columns={columns}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />
    </StackingLayout>
  )
}
```

## Empty State

```tsx
import {
  StackingLayout,
  Title,
  Paragraph,
  Button,
  PlusIcon,
} from '@nutanix-ui/prism-reactjs'
;<StackingLayout itemGap="L" padding="40px" style={{ textAlign: 'center' }}>
  <img src={emptyIllustration} alt="" aria-hidden="true" />
  <Title size={Title.SIZES.H2}>No Items Yet</Title>
  <Paragraph>Create your first item to get started.</Paragraph>
  <Button type={Button.ButtonTypes.PRIMARY}>
    <PlusIcon /> Create Item
  </Button>
</StackingLayout>
```

## Controlled Components

### Controlled Input

```tsx
const [value, setValue] = useState('')
<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

### Controlled Checkbox

```tsx
const [checked, setChecked] = useState(false)
<Checkbox id="agree" checked={checked} onChange={(e) => setChecked(e.target.checked)} label="I agree" />
```

### Controlled Select

```tsx
const [selected, setSelected] = useState(null)
<Select
  selectedRow={selected}
  rowsData={options}
  onSelectedChange={(row) => setSelected(row)}
/>
```

### Controlled MultiSelect

```tsx
const [selectedRows, setSelectedRows] = useState([])
<MultiSelect
  selectedRows={selectedRows}
  rowsData={options}
  onSelectedChange={(rows) => setSelectedRows(rows)}
/>
```

## Tabs Navigation

```tsx
import { Tabs } from '@nutanix-ui/prism-reactjs'
;<Tabs
  data={[
    { key: 'overview', label: 'Overview' },
    { key: 'details', label: 'Details' },
    { key: 'settings', label: 'Settings' },
  ]}
  defaultActiveKey="overview"
  onTabClick={(key) => navigate(key)}
/>
```

## Steps Wizard (in Modal)

```tsx
import {
  Modal,
  Steps,
  StackingLayout,
  FlexLayout,
  Button,
} from '@nutanix-ui/prism-reactjs'

function WizardModal({ visible, onClose }) {
  const [step, setStep] = useState(0)

  return (
    <Modal visible={visible} title="Setup Wizard" onClose={onClose}>
      <StackingLayout itemGap="L" padding="20px">
        <Steps
          current={step}
          data={[
            { label: 'Configure' },
            { label: 'Review' },
            { label: 'Confirm' },
          ]}
        />
        {step === 0 && <ConfigStep />}
        {step === 1 && <ReviewStep />}
        {step === 2 && <ConfirmStep />}
        <FlexLayout justifyContent="flex-end" itemGap="S">
          {step > 0 && (
            <Button
              type={Button.ButtonTypes.SECONDARY}
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          <Button
            type={Button.ButtonTypes.PRIMARY}
            onClick={() => setStep(step + 1)}
          >
            {step < 2 ? 'Next' : 'Finish'}
          </Button>
        </FlexLayout>
      </StackingLayout>
    </Modal>
  )
}
```

## Side Panel

```tsx
import {
  SidePanel,
  StackingLayout,
  Title,
  Paragraph,
} from '@nutanix-ui/prism-reactjs'
;<SidePanel
  visible={panelOpen}
  title="Details"
  onClose={() => setPanelOpen(false)}
  size={SidePanel.SidePanelSize.SMALL}
  enableFocusTrap={true}
  restoreFocus={true}
>
  <StackingLayout itemGap="L" padding="20px">
    <Title size={Title.SIZES.H3}>Item Details</Title>
    <Paragraph>{description}</Paragraph>
  </StackingLayout>
</SidePanel>
```

## Dashboard Widget

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
} from '@nutanix-ui/prism-reactjs'

// TODO: Replace ChartPlaceholder with your charting library implementation
;<DashboardWidgetLayout
  header={<DashboardWidgetHeader title="CPU Usage" showCloseIcon />}
  bodyContent={
    <ChartPlaceholder
      chartType="line"
      title="CPU Usage"
      dataShape="{ timestamp: string; value: number }[]"
    />
  }
  loading={isLoading}
  loadingTip="Loading..."
/>
```

## Data Visualization Placeholder

Prism does **not** ship charting components. When you detect a chart in a Figma design, emit the `ChartPlaceholder` component below wrapped in a `DashboardWidgetLayout`. The developer replaces it with their charting library of choice (e.g. recharts, visx, nivo).

### Recognized chart types

`bar` | `horizontal-bar` | `stacked-bar` | `grouped-bar` | `line` | `area` | `stacked-area` | `donut` | `meter` | `sparkline`

### ChartPlaceholder component

```tsx
import { StackingLayout, Paragraph, Title } from '@nutanix-ui/prism-reactjs'

interface ChartPlaceholderProps {
  chartType: string
  title: string
  dataShape?: string
}

function ChartPlaceholder({
  chartType,
  title,
  dataShape,
}: ChartPlaceholderProps) {
  return (
    <StackingLayout
      itemGap="S"
      padding="40px"
      style={{
        textAlign: 'center',
        border: '2px dashed var(--color-border-default)',
        borderRadius: '4px',
        background: 'var(--color-background-secondary)',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Title size={Title.SIZES.H3}>{title}</Title>
      <Paragraph>
        [{chartType} chart] — Replace with your charting library
      </Paragraph>
      {dataShape && (
        <Paragraph
          style={{
            fontSize: '12px',
            color: 'var(--color-text-secondary-paragraph)',
          }}
        >
          Expected data shape: {dataShape}
        </Paragraph>
      )}
    </StackingLayout>
  )
}
```

### Full widget example

```tsx
import {
  DashboardWidgetLayout,
  DashboardWidgetHeader,
  StackingLayout,
  Paragraph,
  Title,
} from '@nutanix-ui/prism-reactjs'

// TODO: Replace ChartPlaceholder with your charting library (recharts, visx, nivo, etc.)
;<DashboardWidgetLayout
  header={
    <DashboardWidgetHeader
      title="Storage Usage"
      supplementaryInfo="Last 7 days"
    />
  }
  bodyContent={
    <ChartPlaceholder
      chartType="bar"
      title="Storage Usage"
      dataShape="{ category: string; value: number }[]"
    />
  }
/>
```

### Sparkline (inline, no widget wrapper)

```tsx
// TODO: Replace with a sparkline from your charting library
<ChartPlaceholder chartType="sparkline" title="Trend" dataShape="number[]" />
```
