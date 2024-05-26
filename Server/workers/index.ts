import { Worker } from "bullmq"
import pdfWorkerHandler from "./pdfWorker"

const workerOptions = {
  connection: {
    host: "localhost",
    port: 6379
  }
}
const worker = new Worker("pdfJobQueue", pdfWorkerHandler, workerOptions)
