import { FatalErrorBoundary } from '@redwoodjs/web'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import { AppProviders } from 'src/providers'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <AppProviders>
      <Routes />
    </AppProviders>
  </FatalErrorBoundary>
)

export default App
