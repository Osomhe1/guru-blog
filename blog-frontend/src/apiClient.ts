// src/apiClient.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Ensure this matches your backend server URL
})

export default apiClient
