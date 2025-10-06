import express from 'express';
import { controlRoomSetup } from '../controllers/controlRoom.controller';
import { verifyToken } from '../utils/token.helper';


const router = express.Router();

// POST /api/controlroom/setup
router.post('/setup', verifyToken, controlRoomSetup);

export default router;
