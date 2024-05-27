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
            <Home />
          </div>
        </QueryClientProvider>
      </CookiesProvider>
    </>
  )
}

export default App
