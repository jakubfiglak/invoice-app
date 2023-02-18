import { cva } from 'class-variance-authority'

export const variants = cva(
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
