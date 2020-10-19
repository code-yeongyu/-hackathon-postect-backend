import ErrorType from './types'

const errorMessages = {
    [ErrorType.UnexpectedError]: "An unexpected error occurred.",
    [ErrorType.UserExists]: "The user with the email already exists.",
    [ErrorType.ValidationError]: "The data you sent is not valid."
}

export default errorMessages