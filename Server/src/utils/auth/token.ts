import jwt from 'jsonwebtoken'
import { UnIdentifiedError } from '../../types/error'
export const createToken = (refresh: boolean, id: string | number) => {
  const exp = '168h'

  const token = jwt.sign({ userId: id }, process.env.JWT_KEY, {
    expiresIn: exp,
  })
  const accessToken = { token, exp }
  if (refresh) {
    const refreshToken = jwt.sign({ userId: id }, process.env.JWT_KEY, {
      expiresIn: '7d',
    })
    return { accessToken, refreshToken }
  }
  return { accessToken }
}

export const verifyToken = (token: string) => {
  const data = jwt.verify(token, process.env.JWT_KEY)
  return data
}
