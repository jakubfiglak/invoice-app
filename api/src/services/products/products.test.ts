import { faker } from '@faker-js/faker'

import type { CurrentUser } from '@redwoodjs/auth'

import { createProductInputFactory } from 'src/test/factories'

import {
  products,
  product,
  createProduct,
  updateProduct,
  deleteProduct,
} from './products'
import { type StandardScenario, testUserId } from './products.scenarios'

const currentUser = {
  id: testUserId,
  email: faker.internet.email(),
  name: faker.internet.userName(),
  avatarUrl: faker.internet.url(),
}

describe('products service', () => {
  beforeEach(() => {
    mockCurrentUser(currentUser as CurrentUser)
  })

  describe('get all', () => {
    scenario(
      'returns all products created by current user',
      async (scenario: StandardScenario) => {
        const result = await products()

        expect(result.length).toEqual(
          Object.values(scenario.product).filter(
            (product) => product.authorId === currentUser.id
          ).length
        )

        expect(result).toContainEqual(scenario.product.firstCreatedByTestUser)
        expect(result).toContainEqual(scenario.product.secondCreatedByTestUser)
        expect(result).not.toContainEqual(
          scenario.product.firstCreatedByAnotherUser
        )
        expect(result).not.toContainEqual(
          scenario.product.secondCreatedByAnotherUser
        )
      }
    )
  })

  describe('get one', () => {
    scenario(
      'returns a product created by current user',
      async (scenario: StandardScenario) => {
        const result = await product({
          id: scenario.product.firstCreatedByTestUser.id,
        })
        expect(result).toEqual(scenario.product.firstCreatedByTestUser)
      }
    )

    scenario(
      'does not return a product if created by another user',
      async (scenario: StandardScenario) => {
        const result = await product({
          id: scenario.product.firstCreatedByAnotherUser.id,
        })
        expect(result).toBe(null)
      }
    )
  })

  describe('create', () => {
    scenario('creates a product with relation to author', async () => {
      const input = createProductInputFactory.build()

      const result = await createProduct({ input })

      expect(result.name).toBe(input.name)
      expect(result.price).toBe(input.price)
      expect(result.authorId).toBe(currentUser.id)
    })

    scenario(
      'does not create a product if name is an empty string',
      async () => {
        let result

        try {
          result = await createProduct({
            input: createProductInputFactory.build({ name: '' }),
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(`
            [ZodError: [
              {
                "code": "too_small",
                "minimum": 1,
                "type": "string",
                "inclusive": true,
                "exact": false,
                "message": "String must contain at least 1 character(s)",
                "path": [
                  "name"
                ]
              }
            ]]
          `)
        }

        expect(result).toBeUndefined()
      }
    )

    scenario('does not create a product if name is too long', async () => {
      let result

      try {
        result = await createProduct({
          input: createProductInputFactory.build({
            name: faker.random.alphaNumeric(105),
          }),
        })
      } catch (error) {
        expect(error).toMatchInlineSnapshot(`
          [ZodError: [
            {
              "code": "too_big",
              "maximum": 100,
              "type": "string",
              "inclusive": true,
              "exact": false,
              "message": "String must contain at most 100 character(s)",
              "path": [
                "name"
              ]
            }
          ]]
        `)
      }

      expect(result).toBeUndefined()
    })

    scenario('does not create a product if price is negative', async () => {
      let result

      try {
        result = await createProduct({
          input: createProductInputFactory.build({
            price: -faker.datatype.number(),
          }),
        })
      } catch (error) {
        expect(error).toMatchInlineSnapshot(`
          [ZodError: [
            {
              "code": "too_small",
              "minimum": 0,
              "type": "number",
              "inclusive": false,
              "exact": false,
              "message": "Number must be greater than 0",
              "path": [
                "price"
              ]
            }
          ]]
        `)
      }

      expect(result).toBeUndefined()
    })
  })

  describe('update', () => {
    scenario(
      'updates a product if user is an author',
      async (scenario: StandardScenario) => {
        const newName = faker.random.word()
        const newPrice = faker.datatype.number()

        const result = await updateProduct({
          id: scenario.product.firstCreatedByTestUser.id,
          input: { name: newName, price: newPrice },
        })

        expect(result.name).toBe(newName)
        expect(result.price).toBe(newPrice)
      }
    )

    scenario(
      'does not update a product if name is an empty string',
      async (scenario: StandardScenario) => {
        let result

        try {
          result = await updateProduct({
            id: scenario.product.firstCreatedByTestUser.id,
            input: { name: '' },
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(`
            [ZodError: [
              {
                "code": "too_small",
                "minimum": 1,
                "type": "string",
                "inclusive": true,
                "exact": false,
                "message": "String must contain at least 1 character(s)",
                "path": [
                  "name"
                ]
              }
            ]]
          `)
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'does not update a product if name is too long',
      async (scenario: StandardScenario) => {
        let result

        try {
          result = await updateProduct({
            id: scenario.product.firstCreatedByTestUser.id,
            input: {
              name: faker.random.alphaNumeric(105),
            },
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(`
            [ZodError: [
              {
                "code": "too_big",
                "maximum": 100,
                "type": "string",
                "inclusive": true,
                "exact": false,
                "message": "String must contain at most 100 character(s)",
                "path": [
                  "name"
                ]
              }
            ]]
          `)
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'does not update a product if price is negative',
      async (scenario: StandardScenario) => {
        let result

        try {
          result = await updateProduct({
            id: scenario.product.firstCreatedByTestUser.id,
            input: { price: -faker.datatype.number() },
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(`
            [ZodError: [
              {
                "code": "too_small",
                "minimum": 0,
                "type": "number",
                "inclusive": false,
                "exact": false,
                "message": "Number must be greater than 0",
                "path": [
                  "price"
                ]
              }
            ]]
          `)
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'throws an error if user is trying to update a product created by another user',
      async (scenario: StandardScenario) => {
        const newName = faker.random.word()
        const newPrice = faker.datatype.number()

        let result

        try {
          result = await updateProduct({
            id: scenario.product.firstCreatedByAnotherUser.id,
            input: { name: newName, price: newPrice },
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(
            `[GraphQLError: You don't have permission to do that]`
          )
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'updates a product if user is an admin',
      async (scenario: StandardScenario) => {
        mockCurrentUser({ ...currentUser, role: 'ADMIN' } as CurrentUser)

        const newName = faker.random.word()
        const newPrice = faker.datatype.number()

        const result = await updateProduct({
          id: scenario.product.secondCreatedByAnotherUser.id,
          input: { name: newName, price: newPrice },
        })

        expect(result.name).toBe(newName)
        expect(result.price).toBe(newPrice)
      }
    )
  })

  describe('delete', () => {
    scenario(
      'deletes a product if user is an author',
      async (scenario: StandardScenario) => {
        const result = await deleteProduct({
          id: scenario.product.firstCreatedByTestUser.id,
        })

        expect(result.id).toBe(scenario.product.firstCreatedByTestUser.id)
        expect(result.name).toBe(scenario.product.firstCreatedByTestUser.name)
        expect(result.price).toBe(scenario.product.firstCreatedByTestUser.price)
      }
    )

    scenario(
      'throws an error if user is trying to delete a product created by another user',
      async (scenario: StandardScenario) => {
        let result

        try {
          result = await deleteProduct({
            id: scenario.product.firstCreatedByAnotherUser.id,
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(
            `[GraphQLError: You don't have permission to do that]`
          )
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'deletes a product if user is an admin',
      async (scenario: StandardScenario) => {
        mockCurrentUser({ ...currentUser, role: 'ADMIN' } as CurrentUser)

        const result = await deleteProduct({
          id: scenario.product.secondCreatedByAnotherUser.id,
        })

        expect(result.id).toBe(scenario.product.secondCreatedByAnotherUser.id)
        expect(result.name).toBe(
          scenario.product.secondCreatedByAnotherUser.name
        )
        expect(result.price).toBe(
          scenario.product.secondCreatedByAnotherUser.price
        )
      }
    )
  })
})
