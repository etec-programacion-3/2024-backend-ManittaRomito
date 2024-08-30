const app = require('./app');
const { PORT } = require('./config/dotenv');

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
