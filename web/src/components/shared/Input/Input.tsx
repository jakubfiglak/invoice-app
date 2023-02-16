import { ComponentProps } from 'react'

export interface IInputProps extends ComponentProps<'input'> {
  label: string
}

const Input = ({ name, className, label, ...rest }: IInputProps) => {
  return (
    <div className={className}>
      <label
        className="mb-[10px] block text-sm text-steel-blue dark:text-light-steel-blue"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...rest}
        className="w-full rounded-[4px] border border-light-steel-blue px-5 py-4 text-sm font-bold outline-periwinkle placeholder:opacity-40 focus:outline focus:outline-1 dark:border-blue-sapphire dark:bg-night-blue dark:text-white"
      />
    </div>
  )
}

export default Input
