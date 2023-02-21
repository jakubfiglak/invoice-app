import type { ComponentMeta } from '@storybook/react'

import ProductsPage from './ProductsPage'

export const generated = () => {
  return <ProductsPage />
}

export default {
  title: 'Pages/ProductsPage',
  component: ProductsPage,
} as ComponentMeta<typeof ProductsPage>
