import userEvent from '@testing-library/user-event'

import { render as rtlRender } from '@redwoodjs/testing'

import { Providers } from './Providers'

const render: typeof rtlRender = (ui, options) =>
  rtlRender(ui, { wrapper: Providers, ...options })

export * from '@redwoodjs/testing'
export { render, userEvent }
