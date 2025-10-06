import express from 'express';
import { controlRoomSetup } from '../controllers/controlRoom.controller';
import { verifyToken } from '../utils/token.helper';


const router = express.Router();

router.post('/setup', verifyToken, controlRoomSetup);

export default router;
