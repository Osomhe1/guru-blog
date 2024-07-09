import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Input,
  VStack,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const history = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password)
      history('/')
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
            <Link to='/'>Login</Link>
          </Heading>
        </CardHeader>
        <CardBody>
          <Box paddingBottom={4} as='p'>
            Login to your account
          </Box>
          <VStack spacing={4} align='stretch'>
            <Box as='form' onSubmit={handleSubmit}>
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
                Login
              </Button>
            </Box>
            <Button onClick={() => history('/register')}>
              Don't have an account? Sign up
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Login
