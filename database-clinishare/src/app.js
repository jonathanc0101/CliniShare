import express from 'express';
import medicosRoutes from "./routes/medicos.routes.js";
import handshakeRoutes from "./routes/handshakes.routes.js";
const app = express();

//middlewares
app.use(express.json());
app.use(medicosRoutes);
app.use(handshakeRoutes);

export default app;