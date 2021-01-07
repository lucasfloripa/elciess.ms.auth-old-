import { Schema, Model, model } from 'mongoose'
import { IUserMongoModel } from '@interfaces/IUser'

const userOptions = {
  timestamps: true
}

const UserSchema: Schema<IUserMongoModel> = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
      select: false
    }
  },
  userOptions
)

const UserMongoSchema: Model<IUserMongoModel> = model<IUserMongoModel>('User', UserSchema)

export { UserMongoSchema }
