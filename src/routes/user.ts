/**
 * @swagger
 *  tags:
 *      name: User
 *      description: User와 관련한 라우트
 * definitions:
 *      user_table:
 *          type: object
 *          required:
 *              - email
 *              - password
 *              - nickname
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              nickname:
 *                  type: string
 */

/**
 * @swagger
 * /user/register:
 *      post:
 *          tags:
 *              - user
 *          description: 주어진 정보로 유저 생성
 *          produces:
 *              - applicaion/json
 *          parameters:
 *              - in: "body"
 *                required: true
 *                schema:
 *                      $ref: "#/definitions/user_table"
 *          responses:
 *              201:
 *                  description: User created
 *              400:
 *                  description: ParameterError
 */

import { Router } from 'express'
import { body } from 'express-validator'
import { register } from '../controllers/user'
import validationResultChecker from '../middlewares/validationResultChecker'

const router = Router()

const registerValidator = [
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('nickname').notEmpty(),
    validationResultChecker
]

router.post('/register', registerValidator, register)


export default router