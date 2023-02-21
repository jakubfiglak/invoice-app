import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

import { testIds } from 'src/test/ids'

import PlusIcon from './icon-plus.svg'
import { variants } from './variants'

interface IButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof variants> {}

const Button = ({ children, variant, className, ...rest }: IButtonProps) => {
  return (
    <button {...rest} className={twMerge(variants({ variant, className }))}>
      {variant === 'primary-with-icon' && (
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
          data-testid={testIds.addIcon}
        >
          <PlusIcon />
        </span>
      )}
      {children}
    </button>
  )
}

export default Button
