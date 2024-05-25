import { Router } from "express";
import user from "../controllers/user"
// import {checkToken} from "../middlewares";
const router = Router()
router.post("/",user.create)
router.get("/")
export default router
