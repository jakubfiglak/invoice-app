import { ReactNode } from 'react'

import { AuthProvider } from '@redwoodjs/auth'
import { RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'

import { ThemeProvider } from './theme/ThemeContext'

interface IAppProvidersProps {
  children: ReactNode
}

export const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth">
        <RedwoodApolloProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  )
}
