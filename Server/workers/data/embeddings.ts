import prisma from './prisma'

export const addEmbedding = async (
  tokens: number,
  embedding: any,
  text: string,
  projectId: number
) => {
  const result =
    await prisma.$executeRaw`INSERT INTO "Embeddings" (tokens, embedding, text, "projectId") VALUES (${tokens},${embedding},${text},${projectId})`
  return result
}
