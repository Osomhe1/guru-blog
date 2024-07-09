import React from 'react'
import { useParams } from 'react-router-dom'
import RichTextEditor from '../components/RichTextEditor'
import { Box, Spinner, Text } from '@chakra-ui/react'
import useFetchPost from '../hooks/useFetchPost'

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const { post, isLoading, error } = useFetchPost(id!)

  if (isLoading) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100vh'
      >
        <Spinner size='xl' />
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100vh'
      >
        <Text color='red.500'>{error}</Text>
      </Box>
    )
  }

  return (
    <Box className='!pt-12' width={[350, 400, 800]} margin='auto'>
      <h1>Edit Post</h1>

      <RichTextEditor
        postId={post?.id.toString()}
        existingContent={post?.content}
        existingTitle={post?.title}
      />
    </Box>
  )
}

export default EditPost
