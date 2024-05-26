import { createUser } from '../../data'
import { UserResponse, UserInput } from '../../types'
import { encryptString } from '../../utils/auth'

const create: Controller<UserResponse> = async (req, res, next) => {
  try {
    const user: UserInput = req.body
    user.password = await encryptString(user.password)
    const createdUser = await createUser(user)
    delete user.password
    return res.status(201).json({
      success: true,
      message: 'User Created',
      data: {
        user: { ...user, id: createdUser.id },
      },
    })
  } catch (error) {
    next(error)
  }
}
export default create
