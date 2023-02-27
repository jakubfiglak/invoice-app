import { render } from '@redwoodjs/testing/web'

import InvoiceStatusFilterSelect from './InvoiceStatusFilterSelect'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InvoiceStatusFilterSelect', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <InvoiceStatusFilterSelect
          onChange={(value) => console.log(value)}
          value="ALL"
        />
      )
    }).not.toThrow()
  })
})
