import axios from 'axios'
import { BASE_API_URL } from './constants'

export const listProjects = async (data: any) => {
  try {
    const projects = await axios.get(`${BASE_API_URL}/projects`, {
      headers: {
        Authorization: data.token,
      },
    })
    return projects.data
  } catch (err) {
    throw err
  }
}

export const createProject = async (data: any) => {
  try {
    const createdProject = await axios.post(
      `${BASE_API_URL}/projects`,
      data.data,
      {
        headers: {
          Authorization: data.token,
        },
      }
    )
    return createdProject.data
  } catch (err) {
    throw err
  }
}
