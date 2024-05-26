import { Queue } from 'bullmq'
import { redisOptions } from './config'
export const pdfJobQueue = new Queue('pdfJobQueue', {
  connection: redisOptions,
})
export const addPdfJob = async (job: any) => {
  await pdfJobQueue.add(job.type, job)
}
