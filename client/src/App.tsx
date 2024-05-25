import React, { ChangeEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getPresignedUrl } from './api/file';

function App() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile((event.target.files || [])[0]);
  };
  const handleUpload=async()=>{
    if(!file){
      alert("Please Select a file")
      return;
    }
    const preSignedUrlData = await getPresignedUrl()
    if(!preSignedUrlData || !preSignedUrlData.data.url){
      alert("No url")
    }
  }
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <input type="file" className="file-input w-full max-w-xs" onChange={handleFileChange} />
      <button onClick={handleUpload} className="btn btn-primary">
        Upload
      </button>
    </>
  );
}

export default App;
