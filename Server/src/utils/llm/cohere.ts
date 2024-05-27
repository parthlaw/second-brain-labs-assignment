import { Cohere, CohereClient } from "cohere-ai";

const cohere = new CohereClient({
    token: process.env.COHERE_TOKEN
});

export const getMessageResponse = async(embeddings:number[][],message:string) =>{
  try{
    const prompt= `
      I have vector embeddings of a pdf. I will provide you with the embeddings in array format. It is the
      array of embeddings of lines in pdf. I will also provide you with a question. Answer my question.
      Embeddings: ${embeddings}
      Question: ${message}
      `
      const resp = await cohere.chat(({
      message: prompt,
      promptTruncation: Cohere.ChatStreamRequestPromptTruncation.Auto,
      temperature: 0.3
    }))
    return resp.text
  }catch(err){
    throw err
  }
}
