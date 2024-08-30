const { connection } = require('../config/db');

/**
 * @typedef {Object} User
 * @property {number} user_id - Identificador único para cada usuario.
 * @property {string} nombre - Nombre del usuario.
 * @property {string} email - Dirección de correo electrónico, única.
 * @property {string} contraseña - Contraseña cifrada.
 * @property {string} dirección - Dirección de envío.
 * @property {string} teléfono - Número de contacto.
 * @property {Date} fecha_registro - Fecha en que el usuario se registró.
 * @property {string} rol - Rol del usuario (cliente, administrador).
 */

/**
 * Crear un nuevo usuario.
 * @param {User} user - Datos del usuario.
 * @returns {Promise<void>}
 */
const createUser = async (user) => {
    const query = 'INSERT INTO users SET ?';
    await connection.execute(query, [user]);
};

module.exports = { createUser };
