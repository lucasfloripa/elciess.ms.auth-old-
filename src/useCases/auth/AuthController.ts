import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { IAuthRequestDTO } from './AuthDTO'
import { AuthUseCase } from './AuthUseCase'
import { ErrorResponse } from '@utils/ErrorResponse'

class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private authUseCase: AuthUseCase
  ) { }

  handle = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    const authRequestDTO = request.body as IAuthRequestDTO

    const authResponse = await this.authUseCase.execute(authRequestDTO)

    if (authResponse.status === 'fail') {
      return next(new ErrorResponse(authResponse.error, authResponse.statusCode))
    }

    return response.json(authResponse)
  })
}

export { AuthController }
