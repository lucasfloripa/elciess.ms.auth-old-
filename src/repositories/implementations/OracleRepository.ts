import { ICredentials } from '@interfaces/IAuth'
import { IAuthResponse } from '@interfaces/IRepository'
import { UserOracle } from '@models/UserOracle'
import { IAuthRepository } from '@repositories/IAuthRepository'
import { createToken } from '@utils/createToken'
import { matchPassword } from '@utils/matchPassword'
import { getConnection } from 'typeorm'

class OracleRepository implements IAuthRepository {
  async authenticate (credentials: ICredentials): Promise<IAuthResponse> {
    const { email, password } = credentials

    const usersRepository = getConnection().getRepository(UserOracle)

    const oracleUser: UserOracle = await usersRepository.findOne({ email })
      .then(data => data)
      .catch(err => err.message)

    if (typeof oracleUser === 'string') {
      return { status: 'fail', statusCode: 500, error: `Oracle Error: ${oracleUser}.` }
    }

    if (!oracleUser) {
      return { status: 'fail', statusCode: 400, error: `User Oracle with email: ${email} not found.` }
    }

    const checkPassword = await matchPassword(password, oracleUser.password)

    if (!checkPassword) {
      return { status: 'fail', statusCode: 404, error: 'Password dont match.' }
    }

    const token: string = createToken(oracleUser.id)

    return { status: 'success', statusCode: 202, message: 'User authenticated!', token }
  }
}

export { OracleRepository }
