const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Esto permite todas las solicitudes CORS
// Middleware
app.use(express.json());

// Conexión a MongoDB
console.log('process.env.MONGODB_URI',process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Importar rutas
const vehiculosRoutes = require('./routes/vehiculos');
const movimientosRoutes = require('./routes/movimientos');

// Usar rutas
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/movimientos', movimientosRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});