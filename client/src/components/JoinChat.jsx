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
} from '@chakra-ui/react'
import { FiUser } from 'react-icons/fi'

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
      bg="#2563eb"
      align="center"
      justify="center"
      direction="column"
      p={4}
    >
      {/* Header */}
      <VStack mb={8} color="white" textAlign="center">
        <Heading size="2xl">
          Chat App
        </Heading>
        <Text fontSize="lg" opacity={0.9}>
          Connect and chat in real-time
        </Text>
      </VStack>

      {/* Login Box */}
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        w="100%"
        maxW="400px"
        boxShadow="lg"
      >
        <VStack spacing={6} align="stretch">
          <VStack spacing={2} align="flex-start">
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              Get Started
            </Text>
            <Text color="gray.600">
              Enter your name to join the conversation
            </Text>
          </VStack>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={5}>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <FiUser color="#94a3b8" />
                </InputLeftElement>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  bg="#f8fafc"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{ borderColor: 'blue.500' }}
                  _focus={{ 
                    borderColor: 'blue.500',
                    boxShadow: 'none'
                  }}
                  h="50px"
                  fontSize="md"
                />
              </InputGroup>

              <Button
                type="submit"
                w="full"
                bg="#2563eb"
                color="white"
                size="lg"
                h="50px"
                _hover={{ bg: '#1d4ed8' }}
                isDisabled={!name.trim()}
                fontSize="md"
              >
                Join Chat
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>

      {/* Footer */}
      <Text color="white" mt={6} fontSize="sm" opacity={0.8}>
        Start chatting with people from around the world
      </Text>
    </Flex>
  )
}

export default JoinChat 