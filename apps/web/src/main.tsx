import { RouterProvider, createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { initializeTheme } from '~/hooks/use-theme'
import * as TanStackQueryProvider from '~/integrations/tanstack-query/root-provider'
import { suppressLegacyAPIMessages } from '~/lib/utils'
import { routeTree } from './routeTree.gen'

import '@nutanix-core/prism-ui-themes-common/lib/definitions.css'
import '@nutanix-ui/prism-reactjs/dist/index.css'
import '@nutanix-ui/recharts/umd/recharts.css'
import './styles/index.css'

suppressLegacyAPIMessages()

// Initialize theme from localStorage
initializeTheme()

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.querySelector('#app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <TanStackQueryProvider.Provider>
      <RouterProvider router={router} />
    </TanStackQueryProvider.Provider>,
  )
}
