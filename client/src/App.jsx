import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { io } from 'socket.io-client'

// Components
import ChatRoom from './components/ChatRoom'
import JoinChat from './components/JoinChat'

// Initialize socket connection
const socket = io('https://chat-app-330d.onrender.com')

function App() {
  const [username, setUsername] = useState('')
  const [joined, setJoined] = useState(false)
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Listen for messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    // Listen for user list updates
    socket.on('user_list', (userList) => {
      setUsers(userList)
    })

    return () => {
      socket.off('message')
      socket.off('user_list')
    }
  }, [])

  const handleJoin = (name) => {
    setUsername(name)
    socket.emit('user_join', name)
    setJoined(true)
  }

  const handleSendMessage = (message) => {
    socket.emit('message', message)
  }

  return (
    <ChakraProvider>
      {!joined ? (
        <JoinChat onJoin={handleJoin} />
      ) : (
        <ChatRoom
          username={username}
          messages={messages}
          users={users}
          onSendMessage={handleSendMessage}
        />
      )}
    </ChakraProvider>
  )
}

export default App
