import { User } from '@entities/User'
import { ICredentials } from '@interfaces/IAuth'
import { IAuthResponse } from '@interfaces/IRepository'
import { IUserMongoModel } from '@interfaces/IUser'
import { UserMongoSchema } from '@models/UserMongo'
import { IAuthRepository } from '@repositories/IAuthRepository'
import { matchPassword } from '@utils/matchPassword'

class MongoRepository implements IAuthRepository {
  async authenticate (credentials: ICredentials): Promise<IAuthResponse> {
    const { email, password } = credentials

    const mongoUser: IUserMongoModel = await UserMongoSchema.findOne({ email }).select('+password')
      .then(data => data)
      .catch(err => err.message)

    if (typeof mongoUser === 'string') {
      return { status: 'fail', statusCode: 500, error: `Mongo Error: ${mongoUser}.` }
    }

    if (!mongoUser) {
      return { status: 'fail', statusCode: 404, error: 'Invalid e-mail.' }
    }

    const checkPassword = await matchPassword(password, mongoUser.password)

    if (!checkPassword) {
      return { status: 'fail', statusCode: 404, error: 'Password dont match.' }
    }

    const userDTO: User = { ...mongoUser }

    return { status: 'success', statusCode: 202, message: 'User authenticated!', user: userDTO }
  }
}

export { MongoRepository }
