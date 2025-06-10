import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// add user property to request header
interface AuthRequest extends Request {
    user?: any;
}

// protect authorized routes by validating jwt token
export const protect = (req: AuthRequest, res: Response, next: NextFunction): any => {

    // store token received via http req request or cookies
    let token = null;

    const authHeader = req.headers.authorization;

    // get token form auth header or cookies, else return 401
    if (authHeader?.startsWith('Bearer ')) {
        // get token from auth header
        token = authHeader.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    else {
        return res.status(401).json({ error: 'No token provided. Your are not logged in! Please log in to get access.' });
    }

    // check if token exists
    /*
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // get token from auth header
    token = authHeader.split(' ')[1];
    */


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
