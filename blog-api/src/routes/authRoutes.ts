import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import auth from '../middlewares/auth'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    const payload = { userId: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    })

    res.status(201).json({ token })
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const payload = { userId: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    })

    res.json({ token })
  } catch (err) {
    res.status(500).send('Server error')
  }
})

// Get current user route
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

export default router
