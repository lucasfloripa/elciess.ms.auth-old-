import { ICredentials } from '@interfaces/IAuth'
import { IAuthResponse } from '@interfaces/IRepository'

interface IAuthRepository {
  authenticate(credentials: ICredentials): Promise<IAuthResponse>
}

export { IAuthRepository }
