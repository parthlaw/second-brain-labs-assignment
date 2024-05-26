import prisma from "./data/prisma"
import { downloadFromS3 } from "./utils/s3"
import { createEmbeddings, extractTextFromPDF } from "./utils/cohere"

const processPdf=async(job)=>{
  await downloadFromS3(process.env.BUCKET_NAME,job.key,`./workers/temp/${job.key}`)
  console.log("File downloaded")
  const text = await extractTextFromPDF(`./workers/temp/${job.key}`);
  // Split text into lines and filter out empty lines
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const embeddings = (await createEmbeddings(lines)) as number[][]
  console.log("ADDING TO DATABASE")
  for await (const embedding of embeddings){
    const result = await prisma.$executeRaw`INSERT INTO "Embeddings" (tokens, embedding) VALUES (${12},${embedding})`
    console.log("Embeddings created: ", result)
  }
  // const result = await prisma.$executeRaw`INSERT INTO "Embeddings" (tokens, embedding) VALUES (${12},${embeddings})`
}
const workerHandler=async(job)=>{
  console.log(job.data)
  console.log("Starting job: ",job.name)
  await processPdf(job.data.data)
  console.log("Completed job: ",job.name)
  return
}
export default workerHandler
