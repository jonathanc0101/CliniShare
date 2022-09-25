import express from 'express';
import medicosRoutes from "./routes/medicos.routes.js";
import handshakeRoutes from "./routes/handshakes.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import eventosRoutes from "./routes/eventos.routes.js";
import sincronizacionesRoutes from "./routes/sincronizaciones.routes.js"
import cors from 'cors';

const app = express();
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:5000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//middlewares
app.use(express.json());
app.use(medicosRoutes);
app.use(handshakeRoutes);
app.use(pacientesRoutes);
app.use(eventosRoutes);
app.use(sincronizacionesRoutes)


export default app;