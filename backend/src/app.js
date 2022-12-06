import express from "express";
import medicosRoutes from "./routes/medicos.routes.js";
import handshakeRoutes from "./routes/handshakes.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import eventosRoutes from "./routes/eventos.routes.js";
import userRoutes from "./routes/user.routes.js";
import conflictosRoutes from "./routes/conflictos.routes.js";
import cors from "cors";

import { ComputadoraLocalService } from "./services/computadoraLocal.service.js";
import { utils } from "./encripcion/utils.js";
const cryptoData = await ComputadoraLocalService.getKeysAndCertPEM();

const app = express();
app.use(cors());

//middlewares
app.use(express.json());
app.use(medicosRoutes);
app.use(handshakeRoutes);
app.use(pacientesRoutes);
app.use(eventosRoutes);
app.use(userRoutes);
app.use(conflictosRoutes);

const server = utils.createHTTPSserver(
  cryptoData.privateKey,
  cryptoData.certificateSigned,
  app
);

export default server;
