import express from 'express'
import Post from '../models/Post'
import auth from '../middlewares/auth'

const router = express.Router()

// Create a new post
router.post('/', auth, async (req: express.Request, res) => {
  const { title, content } = req.body

  try {
    const newPost = await Post.create({
      title,
      content,
      authorId: Number(req.user), // Ensure authorId is a number
    })

    res.json(newPost)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: 'author' })
    res.json(posts)
  } catch (err) {
    console.error('Error fetching posts:', err)
    res.status(500).send('Server error')
  }
})

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: 'author' })
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.json(post)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

// Update a post by ID
router.put('/:id', auth, async (req: express.Request, res) => {
  const { title, content } = req.body

  try {
    let post = await Post.findByPk(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    if (post.authorId !== Number(req.user)) {
      // Ensure authorId is a number for comparison
      return res.status(401).json({ msg: 'User not authorized' })
    }

    post = await post.update({ title, content })
    res.json(post)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

// Delete a post by ID
router.delete('/:id', auth, async (req: express.Request, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    if (post.authorId !== Number(req.user)) {
      // Ensure authorId is a number for comparison
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await post.destroy()
    res.json({ msg: 'Post removed' })
  } catch (err) {
    res.status(500).send('Server error')
  }
})

export default router
