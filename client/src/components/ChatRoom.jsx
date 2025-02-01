import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { FiSend, FiUsers, FiX } from 'react-icons/fi'

const ChatRoom = ({ username, messages, users, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('')
  const [showUsers, setShowUsers] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage('')
    }
  }

  const openUsersList = () => setShowUsers(true)
  const closeUsersList = () => setShowUsers(false)

  return (
    <Flex h="100vh" w="100vw">
      {/* Main Chat Area */}
      <Flex flex="1" direction="column" bg="gray.50">
        {/* Header */}
        <HStack p={3} bg="blue.500" color="white">
          <Text fontWeight="bold">Chat Room</Text>
          <Text fontSize="sm" ml="auto">{users.length} online</Text>
          {!showUsers && (
            <IconButton
              icon={<FiUsers />}
              onClick={openUsersList}
              variant="ghost"
              color="white"
              _hover={{ bg: 'blue.600' }}
              size="sm"
              aria-label="Show users"
            />
          )}
        </HStack>

        {/* Messages */}
        <VStack 
          flex="1" 
          p={4} 
          spacing={4} 
          overflowY="auto" 
          align="stretch"
        >
          {messages.map((msg, index) => (
            <Box key={index}>
              {msg.type === 'system' ? (
                <Text
                  fontSize="xs"
                  color="gray.500"
                  textAlign="center"
                >
                  {msg.content}
                </Text>
              ) : (
                <Flex
                  direction="column"
                  alignItems={msg.sender === username ? 'flex-end' : 'flex-start'}
                >
                  <Text fontSize="xs" color="gray.500">
                    {msg.sender}
                  </Text>
                  <Box
                    bg={msg.sender === username ? 'blue.500' : 'white'}
                    color={msg.sender === username ? 'white' : 'black'}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    maxW="70%"
                    boxShadow="sm"
                  >
                    <Text>{msg.content}</Text>
                  </Box>
                </Flex>
              )}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </VStack>

        {/* Message Input */}
        <Box p={3} bg="white">
          <form onSubmit={handleSend}>
            <HStack>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                bg="white"
                onKeyPress={(e) => e.key === 'Enter' && handleSend(e)}
              />
              <IconButton
                type="submit"
                colorScheme="blue"
                icon={<FiSend />}
                isDisabled={!newMessage.trim()}
                aria-label="Send message"
              />
            </HStack>
          </form>
        </Box>
      </Flex>

      {/* Users Sidebar */}
      {showUsers && (
        <Box w="200px" bg="white" borderLeft="1px" borderColor="gray.200">
          <VStack p={3} align="stretch" spacing={2}>
            <HStack justify="space-between" align="center">
              <Text fontWeight="bold" fontSize="sm">Online Users</Text>
              <IconButton
                icon={<FiX />}
                onClick={closeUsersList}
                size="sm"
                variant="ghost"
                aria-label="Close users list"
              />
            </HStack>
            {users.map((user, index) => (
              <HStack 
                key={index} 
                fontSize="sm" 
                bg={user === username ? 'blue.50' : 'transparent'}
                p={2}
                borderRadius="md"
              >
                <Box w="2" h="2" borderRadius="full" bg="green.400" />
                <Text>{user}</Text>
                {user === username && (
                  <Text fontSize="xs" color="blue.500" ml="auto">
                    (You)
                  </Text>
                )}
              </HStack>
            ))}
          </VStack>
        </Box>
      )}
    </Flex>
  )
}

export default ChatRoom 