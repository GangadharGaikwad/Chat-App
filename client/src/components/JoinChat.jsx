import { useState } from 'react'
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Flex,
  Image,
} from '@chakra-ui/react'
import { FiUser, FiMessageSquare } from 'react-icons/fi'

const JoinChat = ({ onJoin }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onJoin(name.trim())
    }
  }

  return (
    <Flex 
      h="100vh" 
      w="100vw" 
      bg="#f1f5f9"
      align="center"
      justify="center"
      direction="column"
      p={4}
    >
      <Box 
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="30vh"
        bg="#1e40af"
        zIndex="0"
      />

      {/* Login Box */}
      <Box
        bg="white"
        p={6}
        borderRadius="5px"
        w="100%"
        maxW="400px"
        boxShadow="sm"
        zIndex="1"
      >
        <VStack spacing={6} align="center">
          {/* Logo */}
          <VStack spacing={2}>
            <Box 
              w="70px" 
              h="70px" 
              bg="#3b82f6" 
              borderRadius="full" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
            >
              <FiMessageSquare color="white" size="32px" />
            </Box>
            <Heading size="md" color="#1e3a8a" textAlign="center">Chat App</Heading>
          </VStack>

          <VStack spacing={0} align="stretch" w="100%">
            <Text fontSize="sm" color="gray.600" align="center" mb={4}>
              Enter your name to start chatting
            </Text>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <InputGroup size="md">
                  <InputLeftElement pointerEvents="none">
                    <FiUser color="#6b7280" />
                  </InputLeftElement>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    bg="#f1f5f9"
                    border="none"
                    _hover={{ borderColor: 'transparent' }}
                    _focus={{ 
                      boxShadow: 'none',
                      borderBottom: '2px solid #3b82f6'
                    }}
                    borderRadius="0"
                    h="44px"
                    fontSize="md"
                  />
                </InputGroup>

                <Button
                  type="submit"
                  w="full"
                  bg="#1e40af"
                  color="white"
                  size="md"
                  h="44px"
                  _hover={{ bg: '#3b82f6' }}
                  _active={{ bg: '#1e3a8a' }}
                  isDisabled={!name.trim()}
                  fontSize="md"
                  borderRadius="3px"
                  fontWeight="medium"
                >
                  JOIN CHAT
                </Button>
              </VStack>
            </form>
          </VStack>
        </VStack>
      </Box>

      {/* Footer */}
      <Text color="#64748b" mt={6} fontSize="xs" textAlign="center" zIndex="1">
        Connect and chat with others in real-time
      </Text>
    </Flex>
  )
}

export default JoinChat 