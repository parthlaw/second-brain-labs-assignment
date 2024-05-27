import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/user'
import useUserStore from '../../stores/userStore'

const Login = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [logindone, setLogindone] = useState<boolean>(false)
  const [cookies, setCookie] = useCookies(['access-token'])
  const { setUser } = useUserStore() as any
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess(data) {
      if (!data || !data.success) {
        alert('Login Failed')
      }
      setCookie('access-token', data.data.accessToken, { path: '/' })
      setUser(data.data.user)
      setLogindone(true)
    },
    onError: (err) => {
      console.log(err)
      alert('Error occured')
    },
  })
  const handleSubmit = (e: any) => {
    e.preventDefault()
    mutate({
      password,
      email,
    })
  }
  useEffect(() => {
    if (logindone) {
      navigate('/projects')
    }
  }, [logindone])
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          Chat with PDF
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
