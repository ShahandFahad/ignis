import { CookieOptions, Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt, { Jwt } from 'jsonwebtoken';

// generate jwt token
const generateToken = (id: string) =>
    jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

// cookies options
function getCookiesOptions(): CookieOptions {
    return {
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 days
        httpOnly: true,
        // secure: true, TODO: Enable it later
    };
}

// create new user
export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body;

        // check if users already exists
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ error: 'Username already exists' });

        // create new user
        const user = await User.create({ username, password });

        // get jwt token
        const userId = user._id as string;
        const token = generateToken(userId);

        // add cookies to response
        const cookiesOptions = getCookiesOptions();
        res.cookie('jwt', token, cookiesOptions);

        // remove password from response
        user.password = '';

        // send jwt token in response
        res.status(201).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err}` });
    }
};

// log in user
export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body;

        // get user from db
        const user = await User.findOne({ username });

        // check wether user exists or validate password via document compare method defined in /models/user.model.js
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ error: 'Invalid credentials!' });
        }

        // get jwt token
        const userId = user._id as string;
        const token = generateToken(userId);

        // add cookies to response
        const cookiesOptions = getCookiesOptions();
        res.cookie('jwt', token, cookiesOptions);

        // remove password from response
        user.password = '';

        // send jwt token in response
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err}` });
    }
};
