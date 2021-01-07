import { IAuthResponse } from '@interfaces/IRepository'
import { IAuthRepository } from '@repositories/IAuthRepository'
import { ILoginRequestDTO } from './LoginDTO'

class LoginUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private authMongoRespository: IAuthRepository
  ) {}

  async execute (loginDTO: ILoginRequestDTO): Promise<IAuthResponse> {
    const credentials = loginDTO

    const authResponse = await this.authMongoRespository.authenticate(credentials)

    return authResponse
  }
}

export { LoginUseCase }
