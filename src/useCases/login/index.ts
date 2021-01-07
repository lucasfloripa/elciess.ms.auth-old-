import { MongoRepository } from '@repositories/implementations/MongoRepository'
import { LoginController } from './LoginController'
import { LoginUseCase } from './LoginUseCase'

const mongoRepository = new MongoRepository()

const loginUseCase = new LoginUseCase(
  mongoRepository
)

const loginController = new LoginController(
  loginUseCase
)

export { loginUseCase, loginController }
