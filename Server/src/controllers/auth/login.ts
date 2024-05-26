import { getUserByEmail } from '../../data'
import { LoginInput, LoginResponse } from '../../types'
import { UnauthorizedError } from '../../types/error'
import { checkHash } from '../../utils/auth'
import { createToken } from '../../utils/auth'

const login: Controller<LoginResponse> = async (req, res, next) => {
  try {
    const creds: LoginInput = req.body
    console.log(creds)
    const user = await getUserByEmail(creds.email)
    console.log('USER', user)
    if (!user) {
      res.status(401).json({
        success: false,
        error: true,
        message: 'User does not exist',
      })
    }
    const check = await checkHash(creds.password, user.password)
    if (!check) {
      throw new UnauthorizedError(
        "Passwords don't match",
        'controllers.auth.login'
      )
    }
    const token = createToken(true, user.id)
    return res
      .status(200)
      .cookie('token', token.refreshToken, {
        maxAge: 172800000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .json({
        success: true,
        message: 'Login Success',
        data: {
          user: user,
          accessToken: token.accessToken,
        },
      })
  } catch (err) {
    next(err)
  }
}
export default login
