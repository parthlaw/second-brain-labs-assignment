import prisma from "./prisma"

export const getEmbeddingsByProjectId=async(projectId:number)=>{
  try{
    const result:[any] = await prisma.$queryRaw`SELECT "text" from "Embeddings" where "projectId"=${projectId}`
    const embeddings: number[][] = []
    result?.forEach(r=>{
      embeddings.push(r.text)
    })
    return embeddings
  }catch(err){
    throw err
  }
}
