import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const InvoicesPage = () => {
  return (
    <>
      <MetaTags title="Invoices" description="Invoices page" />

      <h1>InvoicesPage</h1>
      <p>
        Find me in <code>./web/src/pages/InvoicesPage/InvoicesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>invoices</code>, link to me with `
        <Link to={routes.invoices()}>Invoices</Link>`
      </p>
    </>
  )
}

export default InvoicesPage
