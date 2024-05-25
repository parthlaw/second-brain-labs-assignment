import express from "express";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
function main(){
  app.use("/api",router)
  app.listen(PORT, () => console.log(`> Server running on port ${PORT}`));
}
main()
