import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const InvoicePage = () => {
  return (
    <>
      <MetaTags title="Invoice" description="Invoice page" />

      <h1>InvoicePage</h1>
      <p>
        Find me in <code>./web/src/pages/InvoicePage/InvoicePage.tsx</code>
      </p>
      <p>
        My default route is named <code>invoice</code>, link to me with `
        <Link to={routes.invoice({ id: '123' })}>Invoice</Link>`
      </p>
    </>
  )
}

export default InvoicePage
