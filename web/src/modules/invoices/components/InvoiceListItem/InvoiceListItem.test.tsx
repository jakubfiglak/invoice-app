import { invoiceFactory, invoiceItemFactory } from 'src/test/factories'
import { render } from 'src/test/utils'

import InvoiceListItem from './InvoiceListItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InvoiceListItem', () => {
  it('renders successfully', () => {
    const { id, paymentDue, customer, status } = invoiceFactory.build({
      items: invoiceItemFactory.buildList(3),
    })

    render(
      <InvoiceListItem
        id={id}
        status={status}
        customerName={customer?.name}
        dueDate={paymentDue}
        totalAmount={1000}
      />
    )
  })
})
