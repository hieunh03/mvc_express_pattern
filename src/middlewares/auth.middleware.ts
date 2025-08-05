import { Request, Response, NextFunction } from 'express'
import * as admin from 'firebase-admin'

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'Access token required' })
    return
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    // Only log errors in non-test environments to avoid test output noise
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error verifying token:', error)
    }
    res.status(403).json({ error: 'Invalid or expired token' })
  }
}
