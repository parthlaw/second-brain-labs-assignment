import { UserInput } from '../types'
import prisma from './prisma'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({ where: { email: email } })
    return user
  } catch (e) {
    console.log(e)
  }
}

export const createUser = async (user: UserInput) => {
  try {
    const newUser = await prisma.user.create({
      data: { email: user.email, name: user.name, password: user.password },
    })
    return newUser
  } catch (e) {
    console.log(e)
  }
}
