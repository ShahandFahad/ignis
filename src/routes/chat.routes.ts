import express from 'express';
import { getHistory, sendMessage } from '../controllers/chat.controller';

const router = express.Router();

router.get('/history/:username', getHistory);
router.route('/message').post(sendMessage);

export default router;
