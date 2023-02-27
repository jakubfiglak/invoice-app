import { Router, Route, Private } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Private unauthenticated="login" wrap={AppLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/invoices" page={InvoicesPage} name="invoices" />
        <Route path="/invoices/{id:String}" page={InvoicePage} name="invoice" />
        <Route path="/products" page={ProductsPage} name="products" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
