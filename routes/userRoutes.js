import express from 'express';
import { register, login, getUserProfile } from '../controllers/authController.js';
import { authMiddleware } from '../controllers/authMiddleware.js'; 

// Crear una instancia del enrutador
const router = express.Router();

/**
 * @route POST /api/users/register
 * @desc Registra un nuevo usuario
 * @access Público
 */
router.post('/register', register);

/**
 * @route POST /api/users/login
 * @desc Autentica un usuario
 * @access Público
 */
router.post('/login', login);

/**
 * @route GET /api/users/me
 * @desc Obtiene el perfil del usuario autenticado
 * @access Privado
 */
router.get('/me', authMiddleware, getUserProfile);

export default router;
