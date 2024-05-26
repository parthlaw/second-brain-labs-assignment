import { Router } from 'express'
import auth from '../controllers/auth'
// import {checkToken} from "../middlewares";
const router = Router()
router.post('/login', auth.login)
router.get('/')
export default router
