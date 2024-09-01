/**
 * @file authRoutes.js
 * @description Rutas relacionadas con la autenticación de usuarios.
 */

const express = require('express');
const { loginUser, registerUser, getUserProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { validateData } = require('../middlewares/validateData');
const { loginSchema, registerSchema } = require('../validators/authValidators');

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @description Registrar un nuevo usuario.
 * @access Público
 * @param {Object} req.body - Los datos de registro del usuario.
 * @returns {Object} - Datos del usuario registrado.
 * @middleware validateData(registerSchema)
 */
router.post('/register', validateData(registerSchema), registerUser);

/**
 * @route POST /api/auth/login
 * @description Iniciar sesión de usuario.
 * @access Público
 * @param {Object} req.body - Las credenciales de inicio de sesión.
 * @returns {Object} - Token de autenticación y datos del usuario.
 * @middleware validateData(loginSchema)
 */
router.post('/login', validateData(loginSchema), loginUser);

/**
 * @route GET /api/auth/profile
 * @description Obtener el perfil del usuario autenticado.
 * @access Privado
 * @returns {Object} - Datos del perfil del usuario.
 * @middleware authMiddleware
 */
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
