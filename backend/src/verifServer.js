import express from "express";
import verificationRoutes from "./routes/verification.routes.js";

import cors from "cors";

const app = express();
app.use(cors());

//middlewares
app.use(express.json());
app.use(verificationRoutes);

export default app;