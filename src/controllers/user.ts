import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import passport from 'passport'
import { User } from "../models"
import { ErrorType } from "../errors"
import getErrorMessage from "../utils/errors"

const register = async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body
    const hashedPassword = await User.prototype.createPassword(password)

    const existingUser = await User.findAll(
        { where: { email: email } }
    )
    if (existingUser.length === 1) {
        return res.status(400).json(getErrorMessage(ErrorType.UserExists)).send()
    }

    await User.create({
        email: email,
        password: hashedPassword,
        nickname: nickname
    })

    res.status(201).send()
}

const createToken = (req: Request, res: Response) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            const errorMessage = getErrorMessage(ErrorType.LoginFailed)
            const response = {
                errorType: errorMessage.errorType,
                msg: errorMessage.msg
            }
            return res.status(400).json(response).send()
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                const errorMessage = getErrorMessage(ErrorType.LoginFailed)
                const response = {
                    errorType: errorMessage.errorType,
                    msg: errorMessage.msg,
                    details: err
                }
                return res.status(400).json(response).send()
            }
            const token = jwt.sign(user, process.env.JWT_SECRET || 'default')
            return res.json({ user, token }).send()
        })
    })(req, res);
}

export { register, createToken }