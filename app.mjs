import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import methodOverride from 'method-override'; 
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

//sprint 3. Etapa 3
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configura EJS como el motor de vistas en Extress. Sprint 3. tp 3. Etapa 2. Requerimiento 1.
app.set('view engine', 'ejs');
// Configura EJS como el DIRECTORIO de vistas en Extress. Sprint 3. tp 3.
app.set('views', path.join(__dirname, 'views'));

//Middleware para procesar datos del formulario. Permite leer las peticiones. Sprint 3. tp 3. Etapa 5.
app.use(express.urlencoded({ extended: false }));

// Middleware para parsear JSON:
app.use(express.json());

// sprint 3 tp 3 Etapa 5.
app.use(methodOverride('_method'));

// Conexión a MongoDB:
connectDB();

// Configuración de rutas:
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas:
app.use((req, res) => {
    res.status(404).send({ mensaje: 'Ruta no encontrada' });
});

// Iniciar el servidor:
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});