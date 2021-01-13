import { User } from '@entities/User'

export interface IAuthResponse {
  status: string
  statusCode: number
  message?: string
  error?: string
  user?: User
  token?: string
}
