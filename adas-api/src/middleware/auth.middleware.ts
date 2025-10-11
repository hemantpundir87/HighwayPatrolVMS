import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { AuthenticatedUser } from '../models/auth.model';

const SECRET: Secret = process.env.JWT_SECRET || 'softomation_secret_key';

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.method === 'OPTIONS') return next();

    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('❌ Missing Authorization header');
      return res.status(401).json({ message: 'Access token missing' });
    }

    const token = authHeader.split(' ')[1] as string;

    //console.log('🔹 Incoming token:', token.slice(0, 20) + '...');

    // ✅ Verify token safely
    const decoded = jwt.verify(token, SECRET) as JwtPayload;

    // ✅ Map only expected fields to your AuthenticatedUser model
    req.user = {
      UserId: (decoded as any).UserId,
      UserName: (decoded as any).UserName,
      RoleId: (decoded as any).RoleId,
    } as AuthenticatedUser;

    //console.log('✅ Token verified for user:', req.user);
    next();
  } catch (err: any) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
