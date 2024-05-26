import { Route, Routes } from "react-router-dom"
import ProjectScreen from "./Project"
import ProjectsList from "./ProjectsList"
const ProjectsPage = () =>{
  return(
    <>
      <Routes>
        <Route path="/" Component={ProjectsList}/>
        <Route path="/:id" Component={ProjectScreen}/>
      </Routes>
    </>
  )
}
export default ProjectsPage
