import express from 'express';
import { registerUser } from '../controllers/authController.js';

const router = express.Router();

/**
 * @route POST /api/users/register
 * @desc Registra un nuevo usuario
 * @access Público
 */
router.post('/register', registerUser);

export default router;
