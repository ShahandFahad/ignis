import express from 'express';
import { sendMessage } from '../controllers/chat.controller';

const router = express.Router();

router.route('/message').post(sendMessage);

export default router;
