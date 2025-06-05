import express from 'express';
import { getHistory, sendMessage } from '../controllers/chat.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/history/:username', getHistory);
// router.route('/message').post(protect, sendMessage);
router.post('/message', protect, sendMessage);

export default router;
