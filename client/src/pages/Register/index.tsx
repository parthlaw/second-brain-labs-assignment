import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { createNewUser } from '../../api/user'

const Register = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const { mutate, isPending } = useMutation({
    mutationFn: createNewUser,
    onSuccess: (data) => {
      if (!data || !data.success) {
        alert('Login Failed')
      }
      alert('User created. Please Login')
    },
  })
  const handleSubmit = (e: any) => {
    e.preventDefault()
    mutate({
      name,
      email,
      password,
    })
  }
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          Chat with Pdf
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forget Password?
          </a>
          <div>
            <button
              className="btn btn-primary"
              disabled={isPending}
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Register
