import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, Router, NextFunction } from 'express';

const Authenticate = Router();

Authenticate.use('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
       res.status(401).json({ error: 'Please authenticate' });
    } else {
      const decoded = jwt.verify(token, String(process.env.SECRET)) as JwtPayload;
      console.log(decoded);
      next();
    }
  } catch (err) {
     res.status(401).json({ error: 'Please authenticate' });
  }
});

export default Authenticate;