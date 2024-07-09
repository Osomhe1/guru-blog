import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
    req.user = (decoded as { userId: string }).userId
    next()
  } catch (ex) {
    res.status(400).send('Invalid token.')
  }
}

export default auth
