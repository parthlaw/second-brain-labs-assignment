import { listProjects } from '../../data'

const list: Controller<any> = async (req, res, next) => {
  try {
    const projects = await listProjects()
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
