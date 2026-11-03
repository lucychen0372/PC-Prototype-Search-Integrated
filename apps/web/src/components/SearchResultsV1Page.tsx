import {
  AIIcon,
  Alert,
  Badge,
  Button,
  ClustersLogoIcon,
  FlexLayout,
  Menu,
  MenuItem,
  NavigationIcon,
  Select,
  StackingLayout,
  TextLabel,
  Title,
} from '@nutanix-ui/prism-reactjs'
import type { SelectRowData } from '@nutanix-ui/prism-reactjs/lib/components/v2/Select/Select'
import { useState } from 'react'
import { PageHeader } from '~/components/common'
import {
  INVESTIGATION_QUERY,
  openNivaInvestigation,
} from '~/components/niva-investigation/NivaInvestigationPanel'
import './SearchResultsV1Page.css'

const FILTER_ROWS = {
  app: [{ key: 'all', label: 'All' }],
  domain: [{ key: 'all', label: 'All' }],
  filter3: [{ key: 'xxx', label: 'xxx' }],
  filter4: [{ key: 'xxx', label: 'xxx' }],
  filter5: [{ key: 'xxx', label: 'xxx' }],
}

const RELATED_LINKS = [
  {
    key: 'cluster-abc-east',
    title: 'Cluster ABC',
    metadata: 'Infrastructure · East-1',
    href: '/vms',
    icon: 'cluster',
  },
  {
    key: 'cluster-abc-west',
    title: 'Cluster ABC',
    metadata: 'Infrastructure · West-1',
    href: '/vms',
    icon: 'cluster',
  },
  {
    key: 'cluster-abc-vms-east',
    title: 'Cluster ABC › VMs',
    metadata: 'Infrastructure · East-1',
    href: '/vms',
    icon: 'detail',
  },
  {
    key: 'cluster-abc-vms-west',
    title: 'Cluster ABC › VMs',
    metadata: 'Infrastructure · West-1',
    href: '/vms',
    icon: 'detail',
  },
]

function FilterSelect({
  label,
  rowsData,
}: {
  label: string
  rowsData: SelectRowData[]
}) {
  const [selectedRow, setSelectedRow] = useState<SelectRowData | undefined>(
    rowsData[0],
  )

  return (
    <FlexLayout alignItems="center" itemGap="XS">
      <TextLabel>{label}:</TextLabel>
      <Select
        type="mini"
        autoSize={true}
        rowsData={rowsData}
        selectedRow={selectedRow}
        onSelectedChange={(row) => setSelectedRow(row)}
      />
    </FlexLayout>
  )
}

interface SearchResultsV1PageProps {
  query?: string
}

export function SearchResultsV1Page({
  query = INVESTIGATION_QUERY,
}: SearchResultsV1PageProps) {
  const handleAskNiva = () => {
    openNivaInvestigation(query)
  }

  return (
    <StackingLayout itemGap="none" className="search-results-v1-page">
      <PageHeader title="Search Results" />

      <StackingLayout itemGap="L" padding="20px">
        <Alert
          className="search-results-v1-niva-alert"
          type={Alert.AlertTypes.SUPPLEMENTARY}
          showCloseIcon={false}
          contentWrapperProps={{
            className: 'search-results-v1-banner-content',
          }}
          message={
            <FlexLayout
              alignItems="center"
              justifyContent="space-between"
              itemGap="M"
              className="search-results-v1-banner-row"
            >
              <FlexLayout alignItems="center" itemGap="S">
                <Badge
                  color={Badge.BadgeColorTypes.BLUE}
                  count="AI"
                  type={Badge.BadgeTypes.TAG}
                />
                <TextLabel>Want to have a full investigation?</TextLabel>
              </FlexLayout>
              <Button type={Button.ButtonTypes.PRIMARY} onClick={handleAskNiva}>
                <AIIcon aria-hidden={true} />
                Ask NIVA
              </Button>
            </FlexLayout>
          }
        />

        <TextLabel>about 41 results matching</TextLabel>

        <FlexLayout alignItems="center" itemGap="M" flexWrap="wrap">
          <FilterSelect label="App" rowsData={FILTER_ROWS.app} />
          <FilterSelect label="Domain" rowsData={FILTER_ROWS.domain} />
          <FilterSelect label="Filter 3" rowsData={FILTER_ROWS.filter3} />
          <FilterSelect label="Filter 4" rowsData={FILTER_ROWS.filter4} />
          <FilterSelect label="Filter 5" rowsData={FILTER_ROWS.filter5} />
        </FlexLayout>

        <StackingLayout itemGap="S">
          <Title size={Title.SIZES.H4}>RELATED LINKS</Title>
          <Menu
            className="search-results-v1-related-links"
            itemGap="S"
            role={Menu.MenuRole.MENU}
          >
            {RELATED_LINKS.map((result) => (
              (() => {
                const ResultIcon =
                  result.icon === 'cluster' ? ClustersLogoIcon : NavigationIcon

                return (
                  <MenuItem
                    key={result.key}
                    usage={MenuItem.MenuItemUsage.LINK}
                    href={result.href}
                    className="search-results-v1-result-row"
                    alignItems="center"
                    padding="15px-20px"
                  >
                    <FlexLayout alignItems="center" itemGap="M">
                      <ResultIcon aria-hidden={true} />
                      <StackingLayout itemGap="XS">
                        <TextLabel>{result.title}</TextLabel>
                        <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                          {result.metadata}
                        </TextLabel>
                      </StackingLayout>
                    </FlexLayout>
                  </MenuItem>
                )
              })()
            ))}
          </Menu>
        </StackingLayout>
      </StackingLayout>
    </StackingLayout>
  )
}

export function NivaChatStubPage({ query }: { query: string }) {
  return (
    <StackingLayout itemGap="none" className="search-results-v1-page">
      <PageHeader title="NIVA" />
      <StackingLayout itemGap="L" padding="20px">
        <StackingLayout
          itemGap="M"
          padding="20px"
          background="base"
          className="search-results-v1-chat-panel"
        >
          <FlexLayout alignItems="center" itemGap="S">
            <Badge
              color={Badge.BadgeColorTypes.BLUE}
              count="AI"
              type={Badge.BadgeTypes.TAG}
            />
            <Title size={Title.SIZES.H3}>NIVA investigation</Title>
          </FlexLayout>

          <StackingLayout itemGap="XS">
            <TextLabel>Submitted query</TextLabel>
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
              {query}
            </TextLabel>
          </StackingLayout>

          {/* TODO: Replace this stub with the real NIVA chat integration once its route/API is available. */}
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
            Preparing investigation...
          </TextLabel>
        </StackingLayout>
      </StackingLayout>
    </StackingLayout>
  )
}
