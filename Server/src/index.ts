import express from 'express'
import cors from 'cors'
import router from './routes'
import cookieParser from 'cookie-parser'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ExpressAdapter } from '@bull-board/express'
import { pdfJobQueue } from './asyncTasks/bullMQ/queues'
const PORT = process.env.PORT || 8000
const serverAdapter = new ExpressAdapter()
createBullBoard({
  queues: [new BullMQAdapter(pdfJobQueue)],
  serverAdapter: serverAdapter,
})
serverAdapter.setBasePath('/admin')
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
function main() {
  app.use('/admin', serverAdapter.getRouter())
  app.use('/api', router)
  app.listen(PORT, () => console.log(`> Server running on port ${PORT}`))
}
main()
