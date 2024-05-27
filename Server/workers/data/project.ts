import { ProjectStatus } from '@prisma/client'
import prisma from './prisma'

export const changeProjectStatus = async (
  id: number,
  status: ProjectStatus
) => {
  const project = await prisma.projects.update({
    where: { id },
    data: {
      status: status,
    },
  })
  return project
}
