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
// async function createEmbeddingsFromPDF(filePath) {
//   try {
//     const text = await extractTextFromPDF(filePath);
//     // Split text into lines and filter out empty lines
//     const lines = text.split('\n').filter(line => line.trim().length > 0);
//     
//     const embed = await cohere.embed({
//       texts: lines,
//       model: 'embed-english-v3.0',
//       inputType: 'classification',
//     });
//     
//     console.log(embed);
//     return embed.embeddings
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
export const createEmbeddings=async(texts:string[])=>{
  try{
    const embed = await cohere.embed({
      texts: texts,
      model: "embed-english-v3.0",
      inputType: "classification"
    })
    console.log(embed)
    return embed?.embeddings
  }catch(err){
    throw err;
  }
}
