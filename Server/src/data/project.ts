import prisma from './prisma'

export const createProject = async (name, file_url, userId, status) => {
  try {
    const project = await prisma.projects.create({
      data: {
        name,
        file_url,
        status,
        userId,
      },
    })
    return project
  } catch (err) {
    throw err
  }
}
export const listProjects = async () => {
  try {
    const projects = await prisma.projects.findMany()
    return projects
  } catch (err) {
    throw err
  }
}
