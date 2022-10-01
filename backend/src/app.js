import express from "express";
import medicosRoutes from "./routes/medicos.routes.js";
import handshakeRoutes from "./routes/handshakes.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import eventosRoutes from "./routes/eventos.routes.js";
import sincronizacionesRoutes from "./routes/sincronizaciones.routes.js"
import cors from "cors";


const app = express();
app.use(cors());

//middlewares
app.use(express.json());
app.use(medicosRoutes);
app.use(handshakeRoutes);
app.use(pacientesRoutes);
app.use(eventosRoutes);
app.use(sincronizacionesRoutes);

export default app;
