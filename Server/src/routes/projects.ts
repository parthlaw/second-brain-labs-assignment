import { Router } from 'express'
import { checkToken } from '../middlewares'
import projects from '../controllers/projects'
const router = Router()
router.get('/', checkToken, projects.list)
router.post('/', checkToken, projects.create)
export default router
