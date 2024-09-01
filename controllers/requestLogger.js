// middlewares/requestLogger.js

/**
 * Middleware para registrar las solicitudes.
 * Muestra el método HTTP y la URL solicitada en la consola.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
function requestLogger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

module.exports = { requestLogger };
