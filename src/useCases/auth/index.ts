import { MongoRepository } from '@repositories/implementations/MongoRepository'
import { AuthController } from './AuthController'
import { AuthUseCase } from './AuthUseCase'

const mongoRepository = new MongoRepository()

const authUseCase = new AuthUseCase(
  mongoRepository
)

const authController = new AuthController(
  authUseCase
)

export { authUseCase, authController }
