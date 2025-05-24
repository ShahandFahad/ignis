import express, { Express, Request, Response } from 'express';
const morgan = require('morgan');

// init express app
const app: Express = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));


// health route
app.get('/chatbot/health', (req: Request, res: Response) => {
    res.status(200).json({ message: 'chatbot is live' });
});


export default app;
