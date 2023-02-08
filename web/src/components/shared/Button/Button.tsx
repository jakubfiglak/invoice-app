import type { ComponentProps } from 'react'

import { cva, VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

import PlusIcon from './icon-plus.svg'

const buttonVariants = cva(
  'px-6 py-4 rounded-3xl text-sm font-bold text-white transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-lavender-purple hover:bg-periwinkle',
        'primary-with-icon':
          'bg-lavender-purple hover:bg-periwinkle flex items-center gap-4 py-2 px-2 pr-4',
      },
    },
    defaultVariants: { variant: 'primary' },
  }
)

interface IButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ children, variant, className, ...rest }: IButtonProps) => {
  return (
    <button
      {...rest}
      className={twMerge(buttonVariants({ variant, className }))}
    >
      {variant === 'primary-with-icon' && (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <PlusIcon />
        </span>
      )}
      {children}
    </button>
  )
}

export default Button
