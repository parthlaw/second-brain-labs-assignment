import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import ProjectsPage from './Projects'
import Register from './Register'
const Home = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/projects/*" Component={ProjectsPage} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Home
