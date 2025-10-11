import express from 'express';
import { controlRoomSetup, getAllControlRooms } from '../controllers/controlRoom.controller';
import { verifyToken } from '../middleware/auth.middleware';



const router = express.Router();

router.post('/setup', verifyToken, controlRoomSetup);
router.get('/getAll', verifyToken, getAllControlRooms);

export default router;
