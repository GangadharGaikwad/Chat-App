import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  HStack,
  VStack,
  Badge,
} from '@chakra-ui/react'
import { FiSend, FiUsers, FiX, FiMoreVertical } from 'react-icons/fi'

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

  // Get first character safely
  const getInitial = (user) => {
    if (typeof user === 'string' && user.length > 0) {
      return user.charAt(0).toUpperCase();
    } else if (user && typeof user === 'object' && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return '?';
  }

  // Get user name safely
  const getUserName = (user) => {
    if (typeof user === 'string') {
      return user;
    } else if (user && typeof user === 'object' && user.name) {
      return user.name;
    }
    return 'Unknown User';
  }

  // Check if the current user
  const isCurrentUser = (user) => {
    const userName = getUserName(user);
    return userName === username;
  }

  const openUsersList = () => setShowUsers(true)
  const closeUsersList = () => setShowUsers(false)

  return (
    <Flex h="100vh" w="100vw" bg="#e8f0fe">
      {/* Main Chat Area */}
      <Flex flex="1" direction="column" bg="#e8f0fe" position="relative">
        {/* Header */}
        <HStack p={2} bg="#1e40af" color="white" boxShadow="md">
          <Text fontWeight="bold">Chat Room</Text>
          <Badge bg="#3b82f6" color="white" ml="auto" mr={1}>{users.length} online</Badge>
          {!showUsers && (
            <IconButton
              icon={<FiUsers />}
              onClick={openUsersList}
              variant="ghost"
              color="white"
              _hover={{ bg: '#3b82f6' }}
              size="sm"
              aria-label="Show users"
            />
          )}
          <IconButton
            icon={<FiMoreVertical />}
            variant="ghost"
            color="white"
            _hover={{ bg: '#3b82f6' }}
            size="sm"
            aria-label="More options"
          />
        </HStack>

        {/* Chat background pattern */}
        <Box 
          position="absolute" 
          top="40px" 
          left="0" 
          right="0" 
          bottom="0" 
          bg="#e8f0fe" 
          opacity="0.8" 
          backgroundSize="60px 60px"
          backgroundImage="radial-gradient(circle, #c7d9fb 1px, transparent 1px)"
          zIndex="0"
        />

        {/* Messages */}
        <VStack 
          flex="1" 
          p={3} 
          spacing={1.5} 
          overflowY="auto" 
          align="stretch"
          position="relative"
          zIndex="1"
        >
          {messages.map((msg, index) => (
            <Box key={index} mb={0.5}>
              {msg.type === 'system' ? (
                <Flex justify="center">
                  <Text
                    fontSize="xs"
                    bg="#dbeafe"
                    color="#1e3a8a"
                    textAlign="center"
                    my={1}
                    py={1}
                    px={3}
                    borderRadius="full"
                    boxShadow="sm"
                  >
                    {msg.content}
                  </Text>
                </Flex>
              ) : (
                <Flex
                  direction="column"
                  alignItems={msg.sender === username ? 'flex-end' : 'flex-start'}
                >
                  <Box
                    bg={msg.sender === username ? '#bfdbfe' : 'white'}
                    color="#1e3a8a"
                    px={3}
                    py={2}
                    borderRadius="lg"
                    maxW="75%"
                    boxShadow="sm"
                    position="relative"
                    _before={msg.sender === username && {
                      content: '""',
                      position: 'absolute',
                      top: '0',
                      right: '-8px',
                      width: '0',
                      height: '0',
                      borderTop: '8px solid #bfdbfe',
                      borderRight: '8px solid transparent',
                    }}
                    _after={msg.sender !== username && {
                      content: '""',
                      position: 'absolute',
                      top: '0',
                      left: '-8px',
                      width: '0',
                      height: '0',
                      borderTop: '8px solid white',
                      borderLeft: '8px solid transparent',
                    }}
                  >
                    <Text fontSize="xs" fontWeight="bold" color="#2563eb" mb={0.5}>
                      {msg.sender}
                    </Text>
                    <Text fontSize="sm">{msg.content}</Text>
                    <Text fontSize="10px" color="gray.500" textAlign="right" mt={1}>
                      {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Text>
                  </Box>
                </Flex>
              )}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </VStack>

        {/* Message Input */}
        <Box p={2} bg="#f1f5f9" zIndex="1">
          <form onSubmit={handleSend}>
            <HStack>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                bg="white"
                size="md"
                borderRadius="full"
                onKeyPress={(e) => e.key === 'Enter' && handleSend(e)}
              />
              <IconButton
                type="submit"
                bg="#1e40af"
                color="white"
                icon={<FiSend />}
                isDisabled={!newMessage.trim()}
                aria-label="Send message"
                size="md"
                borderRadius="full"
                _hover={{ bg: '#3b82f6' }}
              />
            </HStack>
          </form>
        </Box>
      </Flex>

      {/* Users Sidebar */}
      {showUsers && (
        <Box w="240px" bg="#ffffff" borderLeft="1px" borderColor="gray.200">
          <VStack p={2} align="stretch" spacing={1}>
            <HStack justify="space-between" align="center" pb={2} borderBottom="1px" borderColor="gray.200">
              <Text fontWeight="bold" fontSize="sm" color="#1e40af">Members</Text>
              <IconButton
                icon={<FiX />}
                onClick={closeUsersList}
                size="xs"
                variant="ghost"
                color="#1e40af"
                aria-label="Close users list"
              />
            </HStack>
            {users.map((user, index) => (
              <HStack 
                key={index} 
                fontSize="sm" 
                bg={isCurrentUser(user) ? '#f0f7ff' : 'transparent'}
                p={2}
                borderRadius="md"
                _hover={{ bg: '#f0f7ff' }}
              >
                <Flex 
                  w="40px" 
                  h="40px" 
                  borderRadius="full" 
                  bg={user.avatar || '#3b82f6'} 
                  color="white" 
                  align="center" 
                  justify="center"
                  fontWeight="bold"
                >
                  {getInitial(user)}
                </Flex>
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="sm">{getUserName(user)}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {isCurrentUser(user) ? 'You' : 'Online'}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </Box>
      )}
    </Flex>
  )
}

export default ChatRoom 