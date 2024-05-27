import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getPresignedUrl } from '../../api/file'
import { createProject } from '../../api/projects'

const NewProjectModal = (props: any) => {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [cookies, setCookie] = useCookies(['access-token'])
  const { mutate, isPending } = useMutation({
    mutationFn: getPresignedUrl,
    onSuccess: async (data) => {
      if (!data || !data.success) {
        alert('No Url received')
        return
      }
      if (data?.data?.url) {
        await fetch(data.data.url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file?.type || '',
          },
        })
        alert('File Uploaded Successfully')
      }
    },
    onError: (err: Error) => {
      console.error('Upload error:', err)
      alert('An error occurred during the upload')
    },
  })
  const { mutate: saveMutate, isPending: savePending } = useMutation({
    mutationFn: createProject,
    onSuccess: async (data) => {
      if (!data || !data.success) {
        alert('Error occured while saving')
        return
      }
      alert('Saved')
    },
    onError: (err) => {
      console.log(err)
      alert('Error occured')
    },
  })
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile((event.target.files || [])[0])
  }

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file')
      return
    }
    mutate({ token: cookies['access-token'].token, name: file.name })
  }
  const handleSave = () => {
    saveMutate({
      data: { name: name || "", key: file?.name||"" },
      token: cookies['access-token'].token,
    })
  }
  return (
    <>
      <dialog
        id="my_modal_2"
        className="modal"
        open={props.open}
        onClose={props.onClose}
      >
        <div className="modal-box">
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              className="input w-full max-w-xs"
              placeholder="Project Name"
              onChange={(e) => setName(e.target.value)}
            />
            <div>
              <input
                type="file"
                className="file-input w-full max-w-xs"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handleUpload}
                className={`btn btn-primary ${isPending ? 'loading' : ''}`}
                disabled={isPending}
              >
                {isPending ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            <button
              type="button"
              onClick={handleSave}
              className={`btn btn-primary ${isPending ? 'loading' : ''}`}
              disabled={isPending}
            >
              Save
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default NewProjectModal
