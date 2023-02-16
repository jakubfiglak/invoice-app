import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

import type { IOption } from './Select'

export const optionFactory = Factory.define<IOption>(({ sequence }) => ({
  value: sequence.toString(),
  label: faker.random.word(),
}))
