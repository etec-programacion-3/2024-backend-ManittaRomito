const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/dotenv');
const { createUser } = require('../models/User');

/**
 * Registrar un nuevo usuario.
 * @param {Request} req - Solicitud HTTP.
 * @param {Response} res - Respuesta HTTP.
 */
const register = async (req, res) => {
    const { nombre, email, contraseña } = req.body;

    // Cifrar contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    try {
        // Crear usuario
        await createUser({ nombre, email, contraseña: hashedPassword, rol: 'cliente' });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

/**
 * Iniciar sesión.
 * @param {Request} req - Solicitud HTTP.
 * @param {Response} res - Respuesta HTTP.
 */
const login = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Obtener el usuario de la base de datos
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign({ userId: user.user_id, rol: user.rol }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

module.exports = { register, login };
