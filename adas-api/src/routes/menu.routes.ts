import { Router } from 'express';
import { getMenuByRole } from '../controllers/menu.controller';
import { verifyToken } from '../middleware/auth.middleware'; // optional

const router = Router();

// ✅ Protected route (if JWT used)
router.get('/:roleId', verifyToken, getMenuByRole);

// If you don’t want to protect it yet, use:
// router.get('/:roleId', getMenuByRole);

export default router;
