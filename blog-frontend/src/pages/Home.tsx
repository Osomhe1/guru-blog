import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import DOMPurify from 'dompurify'
import useFetchAllPosts from '../hooks/useFetchAllPosts'
import apiClient from '../apiClient'

const Home: React.FC = () => {
  const { user, logout } = useAuth()
  const toast = useToast()

  const { posts, isLoading, error, setPosts } = useFetchAllPosts()

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

  const handleDelete = async (postId: string) => {
    try {
      await apiClient.delete(`/api/posts/${postId}`)
      setPosts(posts.filter((post) => post.id !== postId))
      toast({
        title: 'Post deleted',
        description: 'The post has been deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.msg || 'Failed to delete post',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <VStack spacing={4} align='stretch'>
      <Box
        display='flex'
        paddingTop={3}
        alignItems='center'
        justifyContent='space-around'
      >
        <Heading>Blog Posts</Heading>
        {user ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Button>
            <Link to='/login'>Login</Link>
          </Button>
        )}
      </Box>
      {posts?.length > 6 && user && (
        <Link className='flex justify-center my-4 ' to='/create-post'>
          <Button>Create New Post</Button>
        </Link>
      )}
      <Box m='auto' className='grid gap-4 '>
        {user ? (
          Array.isArray(posts) &&
          posts?.map((post) => (
            <Box
              className='hover:bg-gray-200  cursor-pointer'
              key={post?.id}
              width={[350, 400, 500]}
              p={4}
              borderWidth={1}
              borderRadius='md'
            >
              <Heading size='md'>{post?.title}</Heading>
              <Text
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post?.content),
                }}
              />
              {user && (
                <Box display='flex' justifyContent='space-between' mt={4}>
                  <Link to={`/edit-post/${post?.id}`}>
                    <Button backgroundColor='gray.400'>Edit</Button>
                  </Link>
                  <Button
                    colorScheme='red'
                    onClick={() => handleDelete(post?.id)}
                  >
                    Delete
                  </Button>
                </Box>
              )}
            </Box>
          ))
        ) : (
          <Text
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='80vh'
            textAlign='center'
            color='red'
            fontWeight='bold'
          >
            Please login to view posts
          </Text>
        )}
      </Box>
      {user && (
        <Link className='flex justify-center my-4 ' to='/create-post'>
          <Button>Create New Post</Button>
        </Link>
      )}
    </VStack>
  )
}

export default Home
