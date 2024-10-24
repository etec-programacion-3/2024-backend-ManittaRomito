import express from 'express';
import { register, login } from '../controllers/authController.js'; // Importa los controladores de autenticación
import { authMiddleware } from '../controllers/authMiddleware.js'; // Importa el middleware de autenticación

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Registra un nuevo usuario
 * @access Public
 * @param {object} req - La solicitud HTTP
 * @param {object} res - La respuesta HTTP
 * @returns {object} 200 - Un objeto que indica el éxito del registro
 * @returns {object} 400 - Un objeto que indica un error de validación
 */
router.post('/register', register);

/**
 * @route POST /api/auth/login
 * @desc Inicia sesión para un usuario existente
 * @access Public
 * @param {object} req - La solicitud HTTP
 * @param {object} res - La respuesta HTTP
 * @returns {object} 200 - Un objeto que contiene el token de acceso y los datos del usuario
 * @returns {object} 401 - Un objeto que indica que las credenciales son inválidas
 */
router.post('/login', login);

/**
 * Middleware de autenticación aplicado a las rutas que requieren que el usuario esté autenticado
 */
router.use(authMiddleware);

/**
 * @route GET /api/auth/profile
 * @desc Obtiene el perfil del usuario autenticado
 * @access Private
 * @param {object} req - La solicitud HTTP, debe contener el token de autenticación
 * @param {object} res - La respuesta HTTP
 * @returns {object} 200 - Un objeto que contiene la información del perfil del usuario
 * @returns {object} 401 - Un objeto que indica que el usuario no está autenticado
 */
router.get('/profile', (req, res) => {
    res.json({ success: true, data: req.user }); // Ejemplo de respuesta
});

// Exporta el router para ser utilizado en app.js
export default router;
