import { Router } from 'express'
import file from '../controllers/file'
import { checkToken } from '../middlewares'
const router = Router()
router.get('/getPreSignedUrl', checkToken, file.getPreSignedUrl)
export default router
