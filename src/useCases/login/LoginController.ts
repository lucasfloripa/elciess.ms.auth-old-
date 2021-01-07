import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ILoginRequestDTO } from './LoginDTO'
import { LoginUseCase } from './LoginUseCase'
import { ErrorResponse } from '@utils/ErrorResponse'

class LoginController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private loginUseCase: LoginUseCase
  ) { }

  handle = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    const loginRequestDTO = request.body as ILoginRequestDTO

    const { email, password } = loginRequestDTO

    if (!email) {
      return next(new ErrorResponse('Insert email.', 400))
    }

    if (!password) {
      return next(new ErrorResponse('Insert password.', 400))
    }

    const loginResponse = await this.loginUseCase.execute(loginRequestDTO)

    if (loginResponse.status === 'fail') {
      return next(new ErrorResponse(loginResponse.error, loginResponse.statusCode))
    }

    return response.json(loginResponse)
  })
}

export { LoginController }
