import { Router } from 'express'
import { checkToken } from '../middlewares'
import projects from '../controllers/projects'
const router = Router()
router.get('/', checkToken, projects.list)
router.post('/', checkToken, projects.create)
router.get('/:id', checkToken, projects.getOne)
router.post('/chat', checkToken, projects.chat)
export default router
