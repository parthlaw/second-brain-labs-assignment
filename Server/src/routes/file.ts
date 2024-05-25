import { Router } from "express";
import file from "../controllers/file"
const router = Router()
router.get("/upload",file.upload)
router.get("/getPreSignedUrl", file.getPreSignedUrl)
export default router
