import { getProjectById } from '../../data'
import { ProjectResponse } from '../../types'
const getOne: Controller<ProjectResponse> = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req['decode'].userId
    const project = await getProjectById(parseInt(id), userId)
    return res.status(200).json({
      success: true,
      message: 'Project fetched',
      data: {
        project,
      },
    })
  } catch (err) {
    next(err)
  }
}
export default getOne
