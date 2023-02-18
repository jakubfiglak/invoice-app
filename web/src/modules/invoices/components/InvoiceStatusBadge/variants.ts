import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
  'bg-opacity-[0.06] capitalize font-bold py-3 rounded-md flex justify-center items-center gap-2 text-sm dark:bg-opacity-[0.06]',
  {
    variants: {
      status: {
        DRAFT:
          'bg-martian text-martian dark:bg-light-steel-blue dark:text-light-steel-blue',
        PENDING: 'bg-dark-orange text-dark-orange',
        PAID: 'bg-turquoise text-turquoise',
      },
    },
  }
)

export const dotVariants = cva('w-2 h-2 rounded-full', {
  variants: {
    status: {
      DRAFT: 'bg-martian dark:bg-light-steel-blue',
      PENDING: 'bg-dark-orange',
      PAID: 'bg-turquoise',
    },
  },
})
