import { Router } from 'express'
import userRouter from './user'
import authRouter from './auth'
import fileRouter from './file'
import projectRouter from './projects'
const router = Router()
router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/file', fileRouter)
router.use('/projects', projectRouter)
export default router
