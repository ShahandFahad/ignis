import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// add user property to request header
interface AuthRequest extends Request {
    user?: any;
}

// protect authorized routes by validating jwt token
export const protect = (req: AuthRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;

    // check if token exists
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // get token from auth header
    const token = authHeader.split(' ')[1];


    // check token validation
    try {
        // get user id from decoded token and if token is invalid it will throw error
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        // add user id to req, to acces later in other controllers
        req.user = decoded;

        // proceed to next middleware
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
