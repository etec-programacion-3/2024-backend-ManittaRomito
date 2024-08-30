const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
    const { nombre, email, contraseña } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const user = await User.create({ nombre, email, contraseña: hashedPassword });
        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
};

// Inicio de sesión de usuario
exports.login = async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(contraseña, user.contraseña)) {
            const token = jwt.sign({ userId: user.user_id, role: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error });
    }
};
