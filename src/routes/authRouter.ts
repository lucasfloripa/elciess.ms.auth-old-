import { authController } from '@useCases/auth'
import { Router } from 'express'

const authRouter = Router()

authRouter.route('/auth').post(authController.handle)

export { authRouter }
