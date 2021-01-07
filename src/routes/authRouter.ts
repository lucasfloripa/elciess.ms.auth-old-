import { loginController } from '@useCases/login'
import { Router } from 'express'

const authRouter = Router()

authRouter.route('/login').post(loginController.handle)

export { authRouter }
