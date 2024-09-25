import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js'; // Asegúrate de tener el nombre correcto del controlador
import { protect } from '../middlewares/authMiddleware.js'; // Middleware para proteger rutas privadas

const router = express.Router();

/**
 * @route POST /api/users/register
 * @desc Registra un nuevo usuario
 * @access Público
 */
router.post('/register', registerUser);

/**
 * @route POST /api/users/login
 * @desc Autentica un usuario
 * @access Público
 */
router.post('/login', loginUser);

/**
 * @route GET /api/users/me
 * @desc Obtiene el perfil del usuario autenticado
 * @access Privado
 */
router.get('/me', protect, getUserProfile);

export default router;
