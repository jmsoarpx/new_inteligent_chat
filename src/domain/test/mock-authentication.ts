import { AuthenticationParams } from '../usecases/authentication'
import { faker } from '@faker-js/faker'

export const MockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})