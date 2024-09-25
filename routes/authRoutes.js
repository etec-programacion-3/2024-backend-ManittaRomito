/**
 * @file authRoutes.js
 * @description Rutas relacionadas con la autenticación de usuarios.
 */

import express from 'express';
import { loginUser, registerUser, getUserProfile } from '../controllers/authController.js';
import { authMiddleware } from '../controllers/authMiddleware.js';
import { validateData } from '../controllers/validateData.js';
import { loginSchema, registerSchema } from '../controllers/authValidators.js';

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

export default router;
