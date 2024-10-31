import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenv.js';

/**
 * Middleware para verificar el token JWT.
 * @param {Request} req - Solicitud HTTP.
 * @param {Response} res - Respuesta HTTP.
 * @param {Function} next - Siguiente middleware.
 */
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log('Token no proporcionado.');
        return res.status(401).json({ message: 'No autorizado, no se proporcionó token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Guardar la información del usuario en `req.user`
        console.log('Usuario decodificado:', req.user); // Añadir esto para verificar el contenido del token decodificado
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        return res.status(401).json({ message: 'Token no válido', error: error.message });
    }
};
