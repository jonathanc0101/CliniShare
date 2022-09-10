import express from 'express';
import medicosRoutes from "./routes/medicos.routes.js";

const app = express();

//middlewares
app.use(express.json());

app.use(medicosRoutes);

export default app;