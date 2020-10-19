/**
 * @swagger
 * tags:
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
 *      user_auth_request:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *      user_auth_response:
 *          type: object
 *          properties:
 *              user:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      nickname:
 *                          type: string
 *              token:
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
 * /user/auth/token:
 *      post:
 *          tags:
 *              - user
 *          description: 주어진 정보로 인증 후 토큰 생성
 *          produces:
 *              - applicaion/json
 *          parameters:
 *              - in: "body"
 *                required: true
 *                schema:
 *                      $ref: "#/definitions/user_auth_request"
 *          responses:
 *              200:
 *                  schema:
 *                      $ref: "#/definitions/user_auth_response"
 *              400:
 *                  schema:
 *                      $ref: "#/definitions/error_response"
 */

import { Router } from 'express'
import { body } from 'express-validator'
import { register, createToken } from '../controllers/user'
import validationResultChecker from '../middlewares/validationResultChecker'

const router = Router()

const registerValidator = [
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('nickname').notEmpty(),
    validationResultChecker
]
const authValidator = [
    body('email').notEmpty(),
    body('password').notEmpty(),
    validationResultChecker
]

router.post('/register', registerValidator, register)
router.post('/auth/token', authValidator, createToken)

export default router