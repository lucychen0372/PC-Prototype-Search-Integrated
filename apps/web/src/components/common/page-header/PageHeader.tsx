import { FlexLayout, Title, VerticalSeparator } from '@nutanix-ui/prism-reactjs'
import type { ReactNode } from 'react'
import './PageHeader.css'

interface PageHeaderProps {
  title: string
  tabs?: ReactNode
  rightContent?: ReactNode
}

export function PageHeader({ title, tabs, rightContent }: PageHeaderProps) {
  return (
    <FlexLayout
      alignItems="center"
      padding="0px-20px"
      justifyContent="space-between"
      className="page-header"
    >
      <FlexLayout alignItems="center" itemGap="L">
        <Title size={Title.SIZES.H2}>{title}</Title>
        {tabs && (
          <>
            <VerticalSeparator />
            {tabs}
          </>
        )}
      </FlexLayout>
      {rightContent && (
        <FlexLayout alignItems="center" itemGap="M">
          {rightContent}
        </FlexLayout>
      )}
    </FlexLayout>
  )
}
