import 'dotenv/config';
import express from 'express';
import personaRoutes from './routes/persona.routes.js';
import helmet from 'helmet';
import cors  from 'cors';
import { apiLimiter } from './middlewares/rate-limit.js';
import { apiKeyAuth } from './middlewares/api-key.js';

const app = express();
const PORT = process.env.PORT || 3003;

// Mideware q permite recibir datos en formato JSON
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(apiLimiter);

app.use('/personas', personaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el Puerto ${PORT}`);
});