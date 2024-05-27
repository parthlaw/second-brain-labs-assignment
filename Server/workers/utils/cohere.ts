import { CohereClient } from "cohere-ai";
import fs from "fs"
import PdfParse from "pdf-parse";
const cohere = new CohereClient({
    token: process.env.COHERE_TOKEN
});
export const extractTextFromPDF=async(pdfPath:string)=>{
  const dataBuffer = fs.readFileSync(pdfPath)
  const data = await PdfParse(dataBuffer)
  console.log(data.text)
  return data.text
}

export const createEmbeddings=async(texts:string[])=>{
  try{
    const embed = await cohere.embed({
      texts: texts,
      model: "embed-english-v3.0",
      inputType: "classification"
    })
    console.log(embed.embeddings)
    return embed?.embeddings
  }catch(err){
    throw err;
  }
}

export const countTokens=(text:string)=> {
  const tokens = text.match(/\b\w+\b/g);
  return tokens ? tokens.length : 0;
}
