import { Projects } from '@prisma/client'
export interface ProjectResponse {
  project: Projects
}
export interface ProjectListResponse {
  projects: Projects[]
}
