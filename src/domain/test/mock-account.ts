import { AuthenticationParams } from 'domain/usecases'
import { AccountModel } from '../models'
import { faker } from '@faker-js/faker'

export const MockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const MockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
