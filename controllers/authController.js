import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/dotenv.js';

/**
 * Registrar un nuevo usuario.
 */
export const register = async (req, res) => {
    const { nombre, email, contraseña } = req.body;

    if (!nombre || !email || !contraseña) {
        return res.status(400).json({ message: 'Faltan datos obligatorios: nombre, email y contraseña' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const user = await User.create({ nombre, email, contraseña: hashedPassword, rol: 'cliente' });

        const token = jwt.sign({ user_id: user.user_id, rol: user.rol }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(201).json({ message: 'Usuario registrado exitosamente', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
};

/**
 * Iniciar sesión.
 */
export const login = async (req, res) => {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
        return res.status(400).json({ message: 'Faltan datos obligatorios: email y contraseña' });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ user_id: user.user_id, rol: user.rol }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

/**
 * Obtener el perfil del usuario autenticado.
 */
export const getUserProfile = async (req, res) => {
    try {
        const user_id = req.user.user_id; // Usamos el ID del token decodificado
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({
            user: {
                id: user.user_id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil del usuario', error: error.message });
    }
};
