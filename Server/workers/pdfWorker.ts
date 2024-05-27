import { downloadFromS3 } from './utils/s3'
import {
  countTokens,
  createEmbeddings,
  extractTextFromPDF,
} from './utils/cohere'
import { changeProjectStatus } from './data/project'
import { ProjectStatus } from '@prisma/client'
import { addEmbedding } from './data/embeddings'

const processPdf = async (job) => {
  try {
    await downloadFromS3(
      process.env.BUCKET_NAME,
      job.key,
      `./workers/temp/${job.key}`
    )
    console.log('File downloaded')
    const text = await extractTextFromPDF(`./workers/temp/${job.key}`)
    // Split text into lines and filter out empty lines
    const lines = text.split('\n').filter((line) => line.trim().length > 0)
    const embeddings = (await createEmbeddings(lines)) as number[][]
    console.log('ADDING TO DATABASE')
    let i = 0
    for await (const embedding of embeddings) {
      const tokens = countTokens(lines[i])
      const result = await addEmbedding(
        tokens,
        embedding,
        lines[i],
        job.projectId
      )
      console.log('Embeddings created: ', result)
      i++
    }
    await changeProjectStatus(job.projectId, ProjectStatus.created)
  } catch (err) {
    await changeProjectStatus(job.projectId, ProjectStatus.failed)
    console.log(err)
    throw err
  }
}
const workerHandler = async (job) => {
  console.log(job.data)
  console.log('Starting job: ', job.name)
  await processPdf(job.data.data)
  console.log('Completed job: ', job.name)
  return
}
export default workerHandler
