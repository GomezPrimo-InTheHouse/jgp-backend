const express = require('express');

require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 7000


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Microservicio gral`);
  next();
});

app.use(express.json());


app.use('/equipo', require('../routes/equipo.route.js'));
app.use('/cliente', require('../routes/cliente.route.js'));



// coma antes del req --> '_req', buena practica para evitar errores de linting si no se usa el parámetro 
app.get('/health', (_req, res) => {
  res.json({
    service: 'Microservicio gral',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Microservicio gral corriendo en http://localhost:${PORT}`);
});