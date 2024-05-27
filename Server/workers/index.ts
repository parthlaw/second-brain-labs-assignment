import { Worker } from "bullmq"
import pdfWorkerHandler from "./pdfWorker"

const workerOptions = {
  connection: {
    host: process.env.REDIS_HOST||"localhost",
    port: parseInt(process.env.REDIS_PORT)||6379
  }
}
const worker = new Worker("pdfJobQueue", pdfWorkerHandler, workerOptions)
console.log("WORKER STARTED")
