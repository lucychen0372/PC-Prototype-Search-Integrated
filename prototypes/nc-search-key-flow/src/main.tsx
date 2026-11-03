import ReactDOM from 'react-dom/client'
import { initializeTheme } from '~/hooks/use-theme'
import { suppressLegacyAPIMessages } from '~/lib/utils'
import { App } from './App'

import '@nutanix-core/prism-ui-themes-common/lib/definitions.css'
import '@nutanix-ui/prism-reactjs/dist/index.css'
import '@nutanix-ui/recharts/umd/recharts.css'
import '~/styles/index.css'
import './styles/prototype.css'

suppressLegacyAPIMessages()
initializeTheme()

const rootElement = document.querySelector('#app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
