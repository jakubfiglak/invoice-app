import { ReactNode } from 'react'

import { MockProviders } from '@redwoodjs/testing'

import { ThemeProvider } from 'src/providers/theme/ThemeContext'

interface IProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: IProvidersProps) => {
  return (
    <MockProviders>
      <ThemeProvider>{children}</ThemeProvider>
    </MockProviders>
  )
}
