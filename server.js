/**
 * @fileoverview Punto de entrada para iniciar el servidor.
 */

const app = require('./app');
const { PORT } = require('./config/dotenv');

/**
 * Inicia el servidor en el puerto especificado.
 */
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
