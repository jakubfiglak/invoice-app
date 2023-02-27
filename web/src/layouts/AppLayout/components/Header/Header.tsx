import { DocumentIcon, CubeIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'

import { Link, NavLink, routes } from '@redwoodjs/router'

import { testIds } from 'src/test/ids'

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
        'z-20 flex items-center justify-between bg-martian dark:bg-night-blue lg:h-full lg:w-24 lg:flex-col lg:rounded-tr-[20px] lg:rounded-br-[20px]',
        className
      )}
    >
      <div className="flex flex-grow items-center justify-between border-r border-slate-gray pr-6 sm:pr-8 lg:flex-col lg:border-b lg:border-r-0 lg:pr-0 lg:pb-8">
        <nav>
          <ul className="flex items-center gap-4 lg:flex-col lg:gap-8">
            <li>
              <Link to={routes.home()}>
                <Logo
                  className="h-[72px] w-[72px] sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                  data-testid={testIds.logo}
                />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li>
              <NavLink
                to={routes.invoices()}
                activeClassName="[&_svg]:text-light-steel-blue"
              >
                <DocumentIcon className="h-6 w-6 text-steel-blue transition-colors hover:text-light-steel-blue lg:h-8 lg:w-8" />
                <span className="sr-only">Invoices</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.products()}
                activeClassName="[&_svg]:text-light-steel-blue"
              >
                <CubeIcon className="h-6 w-6 text-steel-blue transition-colors hover:text-light-steel-blue lg:h-8 lg:w-8" />
                <span className="sr-only">Products</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <ThemeSwitch />
      </div>
      <div className="px-6 sm:px-8 lg:px-0 lg:py-6">
        <UserAvatar />
      </div>
    </header>
  )
}

export default Header
