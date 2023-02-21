import { twMerge } from 'tailwind-merge'

interface ISkeletonProps {
  className?: string
  count?: number
}

const Skeleton = ({ count, className }: ISkeletonProps) => {
  return (
    <>
      {Array.from(Array(count || 1).keys()).map((key) => (
        <div
          key={key}
          className={twMerge(
            'h-6 animate-pulse rounded-lg bg-light-steel-blue dark:bg-light-slate-gray',
            className
          )}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  )
}

export default Skeleton
