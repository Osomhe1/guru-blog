import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/edit-post/:id' element={<EditPost />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
