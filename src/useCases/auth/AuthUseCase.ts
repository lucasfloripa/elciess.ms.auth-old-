import { IAuthResponse } from '@interfaces/IRepository'
import { IAuthRepository } from '@repositories/IAuthRepository'
import { createToken } from '@utils/createToken'
import { IAuthRequestDTO } from './AuthDTO'

class AuthUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private authMongoRespository: IAuthRepository
  ) {}

  async execute (authRequestDTO: IAuthRequestDTO): Promise<IAuthResponse> {
    const credentials = authRequestDTO

    if (!credentials.email) {
      return { status: 'fail', error: 'Insert email.', statusCode: 400 }
    }

    if (!credentials.password) {
      return { status: 'fail', error: 'Insert password.', statusCode: 400 }
    }

    const authResponse = await this.authMongoRespository.authenticate(credentials)

    let token: string

    if (authResponse.status === 'success') {
      token = createToken(authResponse.user.id)
    }

    return { ...authResponse, token }
  }
}

export { AuthUseCase }
