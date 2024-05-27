import axios from 'axios'
import { BASE_API_URL } from './constants'
import { API_REQUEST } from './types'

interface CHAT_REQUEST {
  message: string,
  projectId: number
}
interface CREATE_PROJECT_REQUEST {
  name: string,
  key: string,
}
interface GET_ONE_PROJECT_REQUEST {
  projectId: number
}
export const listProjects = async (data: API_REQUEST<null>) => {
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

export const createProject = async (data: API_REQUEST<CREATE_PROJECT_REQUEST>) => {
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

export const receiveChatResponse = async (data:API_REQUEST<CHAT_REQUEST>) =>{
  try{
    const response = await axios.post(`${BASE_API_URL}/projects/chat`, data.data, {
      headers:{
        Authorization: data.token
      }
    })
    return response.data
  }catch(err){
    throw err
  }
}

export const getOneProject = async(data: API_REQUEST<GET_ONE_PROJECT_REQUEST>)=>{
  try{
    const response = await axios.get(`${BASE_API_URL}/projects/${data.data.projectId}`,{
      headers:{
        Authorization: data.token
      }
    })
    return response.data
  }catch(err){
    throw err
  }
}
