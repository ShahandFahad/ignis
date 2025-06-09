import express, { Express, Request, Response } from 'express';
const morgan = require('morgan');
import chatRoutes from './routes/chat.routes';
import authRoutes from './routes/auth.routes';
const cors = require('cors');

// init express app
const app: Express = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// health route
app.get('/chatbot/health', (req: Request, res: Response) => {
    res.status(200).json({ message: 'chatbot is live' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);


export default app;
