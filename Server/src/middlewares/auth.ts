import { verifyToken } from '../utils/auth'
export const checkToken: Middleware<any> = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization']
    if (!token) {
      return res.status(400).json({ error: true, message: 'No token provided' })
    }
    console.log(token)
    if (token.toString().startsWith('Bearer')) {
      token = token.slice(7, token.length)
    }
    const verified = verifyToken(token as string)
    if (!verified) {
      return res.status(400).json({ error: true, message: 'Incorrect Token' })
    }
    req['decode'] = verified
    return next()
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ error: true, message: 'Internal Server Error', data: { err } })
  }
}
