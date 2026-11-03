import { TriangleUpDownIcon } from '@nutanix-ui/prism-reactjs'
import React from 'react'
import type { Layout, Layouts } from 'react-grid-layout'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import { useTheme } from '~/hooks/use-theme'
import { DASHBOARD_WIDGETS, LAYOUTS } from './constants'
import './DashboardPc.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface DashboardWidgetProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const DashboardWidget = React.forwardRef<HTMLDivElement, DashboardWidgetProps>(
  ({ children, className = '', style, ...props }, ref) => {
    const theme = useTheme()

    return (
      <div
        ref={ref}
        className={`dashboard-widget ${className}`}
        style={style}
        {...props}
      >
        <div className="resize-icon-wrapper">
          <TriangleUpDownIcon
            style={{
              color: theme.getVar('color-text-secondary-label') as string,
            }}
          />
        </div>
        {children}
      </div>
    )
  },
)

DashboardWidget.displayName = 'DashboardWidget'

export const DashboardPc = () => {
  return (
    <ResponsiveGridLayout
      className="dashboard-pc"
      layouts={LAYOUTS}
      cols={{ lg: 4, md: 4, sm: 3, xs: 2, xxs: 1 }}
      rowHeight={286}
      margin={[20, 20]}
      isDraggable={true}
      isResizable={true}
      draggableHandle=".ntnx-dashboard-widget-header"
      resizeHandle={<div className="react-resizable-handle" />}
      compactType="vertical"
      useCSSTransforms={true}
      onLayoutChange={(layout: Layout[], layouts: Layouts) => {
        // TODO: Handle layout change
        console.log('🚀 ~ Layout changed:', layout)
        console.log('🚀 ~ All layouts:', layouts)
      }}
    >
      {DASHBOARD_WIDGETS.map(({ id, component: Component }) => (
        <DashboardWidget key={id}>
          <Component />
        </DashboardWidget>
      ))}
    </ResponsiveGridLayout>
  )
}
