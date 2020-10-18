import { Request, Response } from "express"
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

export { register }