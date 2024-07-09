import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useAuth()
  const history = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await register(username, email, password)
      history('/login')
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      bg='gray.100'
    >
      <Card maxW='sm' alignItems='center' margin='auto'>
        <CardHeader>
          <Heading size='md'>
            <Link to='/'>Register</Link>
          </Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align='stretch'>
            <Box as='form' onSubmit={handleSubmit}>
              <Input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                mb={4}
              />
              <Input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb={4}
              />
              <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                mb={4}
              />
              <Button type='submit' colorScheme='teal' isLoading={isLoading}>
                Register
              </Button>
            </Box>
            <Button onClick={() => history('/login')}>
              Already have an account? Login
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Register
