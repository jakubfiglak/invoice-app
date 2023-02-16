import { ComponentProps } from 'react'

import Arrow from './arrow.svg'

export interface IOption {
  value: string
  label: string
}

export interface ISelectProps extends ComponentProps<'select'> {
  label: string
  options: IOption[]
}

const Select = ({ name, className, label, options, ...rest }: ISelectProps) => {
  return (
    <div className={className}>
      <label
        className="mb-[10px] block text-sm text-steel-blue dark:text-light-steel-blue"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          {...rest}
          className="w-full cursor-pointer appearance-none rounded-[4px] border border-light-steel-blue py-4 pl-5 pr-12 text-sm font-bold outline-periwinkle placeholder:opacity-40 focus:outline focus:outline-1 dark:border-blue-sapphire dark:bg-night-blue dark:text-white"
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <Arrow className="absolute right-4 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}

export default Select
