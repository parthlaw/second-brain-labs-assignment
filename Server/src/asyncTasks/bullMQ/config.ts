import { ConnectionOptions } from 'bullmq'
export const redisOptions: ConnectionOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
}
