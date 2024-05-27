import { getEmbeddingsByProjectId } from "../../data"
import { getMessageResponse } from "../../utils/llm/cohere"

const chat: Controller<any> = async(req, res, next)=>{
  try{
    const body = req.body
    const embeddings = await getEmbeddingsByProjectId(body.projectId)
    console.log(embeddings[0][0])
    const messgageResponse = await getMessageResponse(embeddings,req.body.message)
    return res.status(200).json({
      success: true,
      message: "Response fetched",
      data:{
        reply: messgageResponse
      }
    })
  }catch(err){
    next(err)
  }
}
export default chat
