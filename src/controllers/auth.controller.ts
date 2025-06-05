import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import { error } from 'console';

// generate jwt token
const generateToken = (id: string) =>
    jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

// create new user
export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body;

        // check if users already exists
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ error: 'Username already exists' });

        // create new user
        const user: Document = await User.create({ username, password });

        // get jwt token
        const userId = user._id as string;
        const token = generateToken(userId);

        // send jwt token in response
        res.status(201).json({ token });
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

        // send jwt token in response
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err}` });
    }
};
