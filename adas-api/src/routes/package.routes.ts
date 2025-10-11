import express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { getAllPackages, packageSetup } from '../controllers/package.controller';



const router = express.Router();

router.post('/setup', verifyToken, packageSetup);
router.get('/getAll', verifyToken, getAllPackages);

export default router;
