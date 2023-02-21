import { render } from '@redwoodjs/testing/web'

import InvoicesView from './InvoicesView'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InvoicesView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InvoicesView />)
    }).not.toThrow()
  })
})
