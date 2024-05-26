import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface userData {
  userId: number;
  username: string;
  isAdmin: boolean;
  givenName:string
}

// generate token
export const generateToken = (user: userData) => {
  const payload = user;
  return jwt.sign(payload, 'SECRET_KEY_123##', {
    expiresIn: '1m',
  });
};

export interface customUserRequest extends Request {
  user?: userData;
}

// Decode token
export const decodeToken = (req: customUserRequest,res: Response,next: NextFunction) => {
  try {
    const token=req.headers.authorization?.startsWith('Bearer') && req.headers.authorization?.split(' ')[1];
    if (!token)
      return res.json({
        isSuccess: false,
        message: 'unauthorized'.toUpperCase(),
      });
    const decode: userData | any = jwt.verify(token, 'SECRET_KEY_123##');
    req.user = { ...decode };
    next();
  } catch (error) {
    res.json({
      isSuccess: false,
      message: 'unauthorized'.toUpperCase(),
    });
  }
};
