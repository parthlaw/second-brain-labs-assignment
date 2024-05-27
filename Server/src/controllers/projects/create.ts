import { ProjectStatus } from '@prisma/client'
import { addPdfJob } from '../../asyncTasks/bullMQ/queues'
import { createProject } from '../../data'
import { ProjectResponse } from '../../types'
import { createS3UrlFromKey } from '../../utils/aws/s3'

const create: Controller<ProjectResponse> = async (req, res, next) => {
  try {
    const body = req.body
    const userId = 1
    const file_url = createS3UrlFromKey(process.env.BUCKET_NAME, body.key)
    const createdProject = await createProject(
      body.name,
      file_url,
      userId,
      ProjectStatus.creating
    )
    await addPdfJob({
      type: 'pdfProcessing',
      data: {
        key: body.key,
        projectId: createdProject.id
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
