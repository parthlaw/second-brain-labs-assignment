import { listProjects } from '../../data'
import { ProjectListResponse } from '../../types'

const list: Controller<ProjectListResponse> = async (req, res, next) => {
  try {
    const userId = req["decode"].userId
    const projects = await listProjects(userId)
    return res.status(200).json({
      success: true,
      message: 'Projects fetched',
      data: {
        projects,
      },
    })
  } catch (err) {
    next(err)
  }
}
export default list
