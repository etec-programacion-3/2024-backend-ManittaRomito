    import jwt from 'jsonwebtoken';
    import { JWT_SECRET } from '../config/dotenv.js';

    /**
     * Middleware para verificar el token JWT.
     * @param {Request} req - Solicitud HTTP.
     * @param {Response} res - Respuesta HTTP.
     * @param {Function} next - Siguiente middleware.
     */
    export const authMiddleware = (req, res, next) => { // Cambiado de `protect` a `authMiddleware`
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No autorizado, no se proporcionó token' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token no válido' });
        }
    };
