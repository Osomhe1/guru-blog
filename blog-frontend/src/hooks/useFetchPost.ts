import { useState, useEffect } from 'react'
import apiClient from '../apiClient'

interface Post {
  id: number
  title: string
  content: string
  authorId: number
  createdAt: string
  updatedAt: string
}

const useFetchPost = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`/api/posts/${postId}`)
        setPost(response.data)
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  return { post, isLoading, error }
}

export default useFetchPost
