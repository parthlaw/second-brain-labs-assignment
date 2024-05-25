import {Router} from "express"
import userRouter from "./user"
import authRouter from "./auth"
import fileRouter from "./file"
const router = Router()
router.use("/user",userRouter)
router.use("/auth", authRouter)
router.use("/file", fileRouter)
export default router
