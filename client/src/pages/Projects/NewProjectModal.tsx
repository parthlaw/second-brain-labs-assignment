import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { getPresignedUrl } from "../../api/file";

const NewProjectModal = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {mutate, isPending} = useMutation({
    mutationFn:getPresignedUrl,
    onSuccess:(data)=>{
      if(!data||!data.url){
        alert('No Url received')
      }
    },
    onError: (err: Error) => {
      console.error('Upload error:', err);
      alert('An error occurred during the upload');
    },
  })
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile((event.target.files || [])[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }
    mutate()

    // setLoading(true);
    // try {
    //   const preSignedUrlData = await getPresignedUrl();
    //   if (!preSignedUrlData || !preSignedUrlData.data.url) {
    //     alert("No URL received");
    //   }
    //   // Handle file upload logic here using the presigned URL
    // } catch (error) {
    //   console.error("Upload error:", error);
    //   alert("An error occurred during the upload");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <dialog id="my_modal_2" className="modal" open>
        <div className="modal-box">
          <form className="flex flex-col space-y-4">
            <input type="text" className="input w-full max-w-xs" placeholder="Project Name" />
            <div>
            <input type="file" className="file-input w-full max-w-xs" onChange={handleFileChange} />
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
              // onClick={} 
              className={`btn btn-primary ${isPending ? 'loading' : ''}`}
              disabled={isPending}
            >
              {isPending ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default NewProjectModal;
