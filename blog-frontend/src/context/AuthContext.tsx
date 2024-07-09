import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { useToast } from '@chakra-ui/react'
import apiClient from '../apiClient'

interface AuthContextProps {
  user: any
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null)
  const toast = useToast()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Fetch the current user with the token
      apiClient
        .get('/api/auth/me')
        .then((response) => setUser(response.data))
        .catch(() => {
          toast({
            title: 'Error',
            description: 'Failed to fetch user information',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
          logout()
        })
    }
  }, [toast])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/auth/login', {
        email,
        password,
      })
      const { token } = response.data
      localStorage.setItem('token', token)
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(response.data.user)
      apiClient.get('/api/auth/me').then((response) => setUser(response.data))
      toast({
        title: 'Success',
        description: 'Logged in successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.msg || 'Failed to login',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await apiClient.post('/api/auth/register', {
        username,
        email,
        password,
      })
      const { token } = response.data
      localStorage.setItem('token', token)
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(response.data.user)
      toast({
        title: 'Success',
        description: 'Registered successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.msg || 'Failed to register',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }
  const logout = () => {
    localStorage.removeItem('token')
    apiClient.defaults.headers.common['Authorization'] = ''
    setUser(null)
    toast({
      title: 'Success',
      description: 'Logged out successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
