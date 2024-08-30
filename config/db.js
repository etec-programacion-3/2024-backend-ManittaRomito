const mysql = require('mysql2/promise');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = require('./dotenv');

let connection;

const connectDB = async () => {
    try {
        connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            port: DB_PORT
        });
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
};

module.exports = { connectDB, connection };
