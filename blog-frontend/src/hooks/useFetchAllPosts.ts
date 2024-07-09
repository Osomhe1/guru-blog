import { useState, useEffect } from 'react'
import apiClient from '../apiClient'

const useFetchAllPosts = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`/api/posts`)
        setPosts(response.data)
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [])

  return { posts, isLoading, error, setPosts }
}

export default useFetchAllPosts
