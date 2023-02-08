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
        secondary:
          'text-steel-blue bg-whisper hover:bg-light-steel-blue dark:text-light-steel-blue dark:bg-blue-sapphire dark:hover:bg-white dark:hover:text-light-steel-blue',
        tertiary:
          'bg-martian text-light-slate-gray hover:bg-black-russian dark:text-light-steel-blue dark:hover:bg-night-blue',
        danger: 'bg-coral-red hover:bg-pastel-red',
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
