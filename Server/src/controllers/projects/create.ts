import { addPdfJob } from '../../asyncTasks/bullMQ/queues'
import { createProject } from '../../data'
import { createS3UrlFromKey } from '../../utils/aws/s3'

const create: Controller<any> = async (req, res, next) => {
  try {
    const body = req.body
    const userId = 1
    const file_url = createS3UrlFromKey(process.env.BUCKET_NAME, body.key)
    const createdProject = await createProject(
      body.name,
      file_url,
      userId,
      'creating'
    )
    await addPdfJob({
      type: 'pdfProcessing',
      data: {
        key: body.key,
      },
    })
    return res.status(201).json({
      success: true,
      message: 'Project Saved',
      data: {
        project: createdProject,
      },
    })
  } catch (err) {
    next(err)
  }
}
export default create
