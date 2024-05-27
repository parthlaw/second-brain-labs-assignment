import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { listProjects } from '../../api/projects'
import NewProjectModal from './NewProjectModal'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
const ProjectsList = () => {
  const [openModal, setOpenModal] = useState(false)
  const [cookies, setCookie] = useCookies(['access-token'])
  console.log(cookies['access-token'], 'TOKEN')
  const { data, isLoading } = useQuery({
    queryKey: ['projects', { token: '' }],
    queryFn: () => {
      return listProjects({ token: cookies['access-token'].token, data:null })
    },
  })
  return (
    <>
    <div className='flex justify-center mt-9'>
      <div className='w-full max-w-full px-20'>
    <div className="overflow-x-auto">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setOpenModal(true)}
      >
        Add New
      </button>
      <NewProjectModal open={openModal} onClose={() => setOpenModal(false)} />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>File Url</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.projects?.map((project: any, i: number) => (
            <tr key={`projects${i}`}>
              <Link to={`/projects/${project.id}`}>
              <th><IoChatbubbleEllipsesOutline/></th>
              </Link>
              <td>{project.name}</td>
              <td>{project.file_url}</td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
    </>
  )
}
export default ProjectsList
