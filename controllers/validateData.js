// middlewares/validateData.js

/**
 * Middleware para validar datos requeridos.
 * Verifica si los campos especificados en el esquema están presentes en el cuerpo de la solicitud.
 * @param {Object} schema - Esquema de validación (usando un validador como Joi, yup, etc.).
 * @returns {Function} Middleware de validación de datos.
 */
function validateData(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, error: error.details[0].message });
        }
        next();
    };
}

module.exports = { validateData };
