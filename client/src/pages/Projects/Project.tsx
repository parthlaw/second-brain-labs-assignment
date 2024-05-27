import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneProject, receiveChatResponse } from '../../api/projects'
import useProjectStore from '../../stores/projectStore'
const ProjectScreen = () => {
  const [messages, setMessages] = useState([
    { sender: 'other', text: 'Hello! How can I help you today?' },
  ])
  const {id} = useParams()
  const [cookies] = useCookies(['access-token'])
  const [newMessage, setNewMessage] = useState('')
  const { setProject } = useProjectStore() as any
  const navigate = useNavigate()
  const {data, isLoading} = useQuery({
    queryFn: ()=>{return getOneProject({token:cookies['access-token'].token as string, data:{projectId:parseInt(id as string)}})},
    queryKey: ['project']
  })
  useEffect(()=>{
    if(!id || !parseInt(id)){
      navigate("/projects")
    }
  },[id])
  useEffect(()=>{
    if(!isLoading && data?.success){
      setProject(data.data.project)
    }
    return ()=>{setProject({})}
  },[data,isLoading])
  const {mutate} = useMutation({
    mutationFn: receiveChatResponse,
    onSuccess: (data:any)=>{
      if(!data || !data.success){
        setMessages([...messages, { sender: 'other', text: 'Error Occured in getting the response' }])
        return
      }
      setMessages([...messages, { sender: 'other', text: data.data.reply }])
    },
    onError:(err)=>{
      console.log(err)
      setMessages([...messages, { sender: 'other', text: 'Error Occured in getting the response' }])
    }
  })
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender: 'me', text: newMessage }])
      setNewMessage('')
    }
    if(!id || !parseInt(id)){
      return
    }
    mutate({token: cookies['access-token'].token, data:{projectId:parseInt(id),message:newMessage}})
  }

  return (
    <div className="flex flex-col h-full bg-base-200">
      <div className="flex-1 p-4 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message.sender === 'me' ? 'chat-end' : 'chat-start'}`}
          >
            <div
              className={`chat-bubble ${message.sender === 'me' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-base-100">
        <div className="flex space-x-2">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectScreen
