import type { Layout, Layouts } from 'react-grid-layout'
import { AlertsWidget } from '../widgets/alerts'
import { ClusterCpuUsageWidget } from '../widgets/cluster-cpu-usage'
import { ClusterLatencyWidget } from '../widgets/cluster-latency'
import { ClusterMemoryUsageWidget } from '../widgets/cluster-memory-usage'
import { ClusterQuickAccessWidget } from '../widgets/cluster-quick-access'
import { ControllerIopsWidget } from '../widgets/controller-iops'
import { SecuritySummaryWidget } from '../widgets/security-summary'

type ResizeHandle = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'

// Configuration for layout generation
export const LAYOUT_CONFIG = {
  cols: 4,
  defaultWidth: 1,
  defaultHeight: 1,
  resizeHandles: ['s'] as ResizeHandle[],
}

// Dashboard widget configuration
export const DASHBOARD_WIDGETS = [
  { id: 'box1', component: AlertsWidget },
  { id: 'box2', component: ClusterQuickAccessWidget },
  { id: 'box3', component: ClusterLatencyWidget },
  { id: 'box4', component: ClusterMemoryUsageWidget },
  { id: 'box5', component: ClusterCpuUsageWidget },
  { id: 'box6', component: ControllerIopsWidget },
  { id: 'box7', component: SecuritySummaryWidget },
]

/**
 * Generates a grid layout configuration for dashboard widgets
 * @returns Array of layout configurations
 */
function generateLayout(): Layout[] {
  return DASHBOARD_WIDGETS.map(({ id }, i) => {
    // Calculate position in grid
    const x = (i * LAYOUT_CONFIG.defaultWidth) % LAYOUT_CONFIG.cols
    const y =
      Math.floor((i * LAYOUT_CONFIG.defaultWidth) / LAYOUT_CONFIG.cols) *
      LAYOUT_CONFIG.defaultHeight

    return {
      i: id,
      x,
      y,
      w: LAYOUT_CONFIG.defaultWidth,
      h: LAYOUT_CONFIG.defaultHeight,
      resizeHandles: LAYOUT_CONFIG.resizeHandles,
    }
  })
}

// Initial layout configuration based on generated layout
export const LAYOUTS: Layouts = {
  lg: generateLayout(),
  md: generateLayout(),
  sm: generateLayout(),
  xs: generateLayout(),
  xxs: generateLayout(),
}
