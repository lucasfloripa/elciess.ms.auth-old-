import { Document } from 'mongoose'

export interface IUserMongoModel extends Document{
  id: string
  email: string
  password: string
}
