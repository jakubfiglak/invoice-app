import { useAuth } from '@redwoodjs/auth'

import avatarPlaceholder from './assets/avatar.png'
import Logo from './assets/logo.svg'
import ThemeSwitch from './components/ThemeSwitch'

interface IAppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: IAppLayoutProps) => {
  const { currentUser } = useAuth()

  return (
    <>
      <header className="fixed top-0 left-0 flex w-full items-center justify-between bg-martian dark:bg-night-blue lg:h-full lg:w-24 lg:flex-col lg:rounded-tr-[20px] lg:rounded-br-[20px]">
        <div className="flex flex-grow items-center justify-between border-r border-slate-gray pr-6 sm:pr-8 lg:flex-col lg:border-b lg:border-r-0 lg:pr-0 lg:pb-8">
          <Logo className="h-[72px] w-[72px] sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
          <ThemeSwitch />
        </div>
        <div className="px-6 sm:px-8 lg:px-0 lg:py-6">
          <img
            src={currentUser?.avatarUrl || avatarPlaceholder}
            alt="User avatar"
            className="h-8 w-8 rounded-full lg:h-10 lg:w-10"
          />
        </div>
      </header>
      <main className="mt-[72px] px-6 py-8 sm:mt-20 sm:px-12 sm:py-14 lg:mx-auto lg:max-w-[730px] lg:px-0">
        {children}
      </main>
    </>
  )
}

export default AppLayout
