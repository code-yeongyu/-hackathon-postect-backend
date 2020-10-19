/**
 * @swagger
 * tags:
 *      name: Error
 *      description: Errors
 * definitions:
 *      error_response:
 *          type: object
 *          properties:
 *              errorType:
 *                  type: string
 *              msg:
 *                  type: string
 */

import { Router } from 'express'
import userRouter from './user'
const router = Router()

router.use('/user', userRouter)

export default router