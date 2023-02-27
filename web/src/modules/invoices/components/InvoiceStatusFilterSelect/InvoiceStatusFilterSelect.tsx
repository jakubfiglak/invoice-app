import { Fragment } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

import { InvoiceFilterStatus } from 'src/modules/invoices/types'

import Chevron from '../../assets/chevron.svg'

import Check from './assets/check.svg'

const options: InvoiceFilterStatus[] = ['ALL', 'DRAFT', 'PENDING', 'PAID']

interface IInvoiceStatusFilterSelectProps {
  value: InvoiceFilterStatus
  onChange: (status: InvoiceFilterStatus) => void
}

const InvoiceStatusFilterSelect = ({
  value,
  onChange,
}: IInvoiceStatusFilterSelectProps) => {
  return (
    <div className="">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="relative flex w-full items-center gap-4 focus:outline-none">
              <span className="block text-sm font-bold">Filter by status</span>
              <span className="">
                <Chevron
                  className={twMerge(
                    'h-3 w-3 -rotate-90 transition',
                    open && 'rotate-90'
                  )}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="text-base absolute z-10 mt-6 max-h-60 w-48 space-y-4 overflow-auto rounded-lg bg-white py-6 px-6 text-sm shadow-lg dark:bg-blue-sapphire">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    value={option}
                    className="group relative cursor-pointer select-none"
                  >
                    {({ selected }) => (
                      <div className="flex items-center gap-3">
                        <span
                          className={twMerge(
                            'flex h-4 w-4 items-center justify-center rounded-sm border border-transparent bg-light-steel-blue group-hover:border-lavender-purple dark:bg-night-blue',
                            selected &&
                              'dark:bg-lavender-blue bg-lavender-purple'
                          )}
                        >
                          <Check
                            className={twMerge(
                              'h-3 w-3',
                              !selected && 'hidden'
                            )}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="font-bold capitalize">
                          {option.toLowerCase()}
                        </span>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  )
}

export default InvoiceStatusFilterSelect
