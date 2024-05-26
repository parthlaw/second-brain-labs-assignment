import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getPresignedUrl } from './api/file';
import Login from './pages/Login';
import ProjectsPage from './pages/Projects';
import NavBar from './components/Navbar';
import ProjectScreen from './pages/Projects/Project';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages';
const queryClient = new QueryClient()
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
      <QueryClientProvider client={queryClient}>
      <div className="App h-screen flex flex-col">
      {/* <h1 className="text-3xl font-bold underline"> */}
      {/*   Hello world! */}
      {/* </h1> */}
      {/* <input type="file" className="file-input w-full max-w-xs" onChange={handleFileChange} /> */}
      {/* <button onClick={handleUpload} className="btn btn-primary"> */}
      {/*   Upload */}
      {/* </button> */}
      {/* <Login/> */}
      <NavBar/>
      {/* <div className='flex justify-center mt-9'> */}
      {/*   <div className='w-full max-w-full px-20'> */}
      {/* <ProjectsList/> */}
      {/* <div className="flex-1 overflow-hidden"> */}
      {/*     <ProjectScreen/> */}
      {/*     </div> */}
      {/* </div> */}
      <Home/>
      </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
