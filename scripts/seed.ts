import { db } from 'api/src/lib/db'
import {
  addressInputFactory,
  customerInputFactory,
  productCreateArgsDataFactory,
  invoiceItemInputFactory,
} from 'api/src/test/factories'
import type { InvoiceStatus } from 'api/types/graphql'

import { hashPassword } from '@redwoodjs/api'

export default async () => {
  try {
    // Seed test user
    console.log('Seeding test user... 🌱')

    const [hashedPassword, salt] = hashPassword('Password123')

    const user = await db.user.create({
      data: {
        name: 'John',
        avatarUrl:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
        email: 'john@example.com',
        hashedPassword,
        salt,
      },
    })

    console.log('Seeded test user ✅')

    // We want to seed 6 invoices - 2 of each status so we create a helper array like so
    const statuses: InvoiceStatus[] = [
      'DRAFT',
      'DRAFT',
      'PAID',
      'PAID',
      'PENDING',
      'PENDING',
    ]

    // Seed addresses for customers
    console.log('Seeding customer addresses... 🌱')

    const customerAddresses = await Promise.all(
      statuses.map((_) =>
        db.address.create({ data: addressInputFactory.build() })
      )
    )

    console.log('Seeded customer addresses ✅')

    // Seed customers
    console.log('Seeding customers... 🌱')

    const customers = await Promise.all(
      statuses.map((_, idx) =>
        db.customer.create({
          data: {
            ...customerInputFactory.build({
              addressId: customerAddresses[idx].id,
            }),
            authorId: user.id,
          },
        })
      )
    )

    console.log('Seeded customers ✅')

    // Seed sender addresses for invoices
    console.log('Seeding sender addresses... 🌱')

    const senderAddresses = await Promise.all(
      statuses.map((_) =>
        db.address.create({ data: addressInputFactory.build() })
      )
    )

    console.log('Seeded sender addresses ✅')

    // Seed invoices
    console.log('Seeding invoices... 🌱')

    const invoices = await Promise.all(
      statuses.map((status, idx) =>
        db.invoice.create({
          data: {
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            issueDate: new Date('2023-02-02'),
            paymentTerms: 14,
            paymentDue: new Date('2023-02-16'),
            status,
            customerId: customers[idx].id,
            senderAddressId: senderAddresses[idx].id,
            authorId: user.id,
          },
        })
      )
    )

    console.log('Seeded invoices ✅')

    // Seed products for invoice items
    console.log('Seeding products... 🌱')

    const products = await Promise.all(
      statuses.map((_) =>
        db.product.create({
          data: productCreateArgsDataFactory.build({ authorId: user.id }),
        })
      )
    )

    console.log('Seeded products ✅')

    // Seed invoice items
    console.log('Seeding invoice items... 🌱')

    await Promise.all(
      statuses.map((_, idx) =>
        db.invoiceItem.createMany({
          data: products.map((product) =>
            invoiceItemInputFactory.build({
              productId: product.id,
              invoiceId: invoices[idx].id,
            })
          ),
        })
      )
    )

    console.log('Seeded invoice items ✅')
  } catch (error) {
    console.error(error)
  }
}
