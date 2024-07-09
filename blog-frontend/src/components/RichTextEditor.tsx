import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import apiClient from '../apiClient'
import { useNavigate } from 'react-router-dom'

const RichTextEditor: React.FC<{
  postId?: string
  existingContent?: string
  existingTitle?: string
}> = ({ postId, existingContent, existingTitle }) => {
  const [content, setContent] = useState(existingContent || '')
  const [title, setTitle] = useState(existingTitle || '')

  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      if (postId) {
        await apiClient.put(`/api/posts/${postId}`, { title, content })
        navigate('/')
      } else {
        await apiClient.post('/api/posts', { title, content })
        navigate('/')
      }
      toast({
        title: 'Success',
        description: 'Post saved successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.msg || 'Failed to save post',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <VStack spacing={4} align='stretch'>
      <Box p={4} borderWidth={1} borderRadius='md'>
        <Input
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={4}
        />
        <ReactQuill value={content} onChange={setContent} />
      </Box>
      <Button
        colorScheme='teal'
        onClick={handleSave}
        disabled={!user}
        isLoading={isLoading}
      >
        Save
      </Button>
    </VStack>
  )
}

export default RichTextEditor
