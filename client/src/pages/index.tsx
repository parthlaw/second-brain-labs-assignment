import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login"
import ProjectsPage from "./Projects"
const Home=()=>{
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login}/>
          <Route path="/projects/*" Component={ProjectsPage} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Home
