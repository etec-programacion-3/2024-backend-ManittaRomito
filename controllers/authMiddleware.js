import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenv.js';

/**
 * Middleware para verificar el token JWT.
 * @param {Request} req - Solicitud HTTP.
 * @param {Response} res - Respuesta HTTP.
 * @param {Function} next - Siguiente middleware.
 */
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ message: 'No autorizado, no se proporcionó token' });
    }

    try {
        // Verificar el token       
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded; // Guardar el usuario decodificado en la solicitud
        next(); // Continuar con el siguiente middleware o ruta
    } catch (error) {
        console.error('Error al verificar el token:', error.message); // Log del error
        return res.status(401).json({ message: 'Token no válido', error: error.message });
    }
};
