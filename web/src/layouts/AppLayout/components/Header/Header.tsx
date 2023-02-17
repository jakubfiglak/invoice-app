import { twMerge } from 'tailwind-merge'

import Logo from '../../assets/logo.svg'
import ThemeSwitch from '../ThemeSwitch'
import UserAvatar from '../UserAvatar'

interface IHeaderProps {
  className?: string
}

const Header = ({ className }: IHeaderProps) => {
  return (
    <header
      className={twMerge(
        'flex items-center justify-between bg-martian dark:bg-night-blue lg:h-full lg:w-24 lg:flex-col lg:rounded-tr-[20px] lg:rounded-br-[20px]',
        className
      )}
    >
      <div className="flex flex-grow items-center justify-between border-r border-slate-gray pr-6 sm:pr-8 lg:flex-col lg:border-b lg:border-r-0 lg:pr-0 lg:pb-8">
        <Logo
          className="h-[72px] w-[72px] sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          data-testid="logo"
        />
        <ThemeSwitch />
      </div>
      <div className="px-6 sm:px-8 lg:px-0 lg:py-6">
        <UserAvatar />
      </div>
    </header>
  )
}

export default Header
