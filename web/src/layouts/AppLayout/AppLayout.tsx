import type { ReactNode } from 'react'

import Header from './components/Header'

interface IAppLayoutProps {
  children: ReactNode
}

const AppLayout = ({ children }: IAppLayoutProps) => {
  return (
    <>
      <Header className="fixed top-0 left-0 w-full" />
      <main className="mt-[72px] px-6 py-8 sm:mt-20 sm:px-12 sm:py-14 lg:mx-auto lg:max-w-[730px] lg:px-0">
        {children}
      </main>
    </>
  )
}

export default AppLayout
