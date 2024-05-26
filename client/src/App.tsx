import React from 'react'
import './App.css'
import NavBar from './components/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages'
import { CookiesProvider } from 'react-cookie'
const queryClient = new QueryClient()
function App() {
  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <QueryClientProvider client={queryClient}>
          <div className="App h-screen flex flex-col">
            <NavBar />
            {/* <div className='flex justify-center mt-9'> */}
            {/*   <div className='w-full max-w-full px-20'> */}
            {/* <ProjectsList/> */}
            {/* <div className="flex-1 overflow-hidden"> */}
            {/*     <ProjectScreen/> */}
            {/*     </div> */}
            {/* </div> */}
            <Home />
          </div>
        </QueryClientProvider>
      </CookiesProvider>
    </>
  )
}

export default App
