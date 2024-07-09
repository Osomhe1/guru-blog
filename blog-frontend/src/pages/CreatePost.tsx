import React from 'react'
import RichTextEditor from '../components/RichTextEditor'
import { Box, Heading } from '@chakra-ui/react'

const CreatePost: React.FC = () => {
  return (
    <Box className='!pt-12' width={[350, 400, 800]} margin='auto'>
      <Heading paddingBottom={2}>Create a New Post</Heading>
      <RichTextEditor />
    </Box>
  )
}

export default CreatePost
