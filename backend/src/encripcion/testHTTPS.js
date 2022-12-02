import https from "https";
import express from "express";

import { utils } from "./utils.js";

import comprobar from "../routes/comprobadorToken.js";

import forge from "node-forge";

const pki = forge.pki;

const keys = utils.generateRSAKeyPair();
const cert = utils.generateAndSelfSignCert(keys);

const app = express();

app.use(comprobar);

app.use("/", (req, res, next) => {
  console.log(req.headers.token);
  res.send("Hello");
});



const sslServer = https.createServer(
  {
    requestCert: true,
    rejectUnauthorized: false,
    key: pki.privateKeyToPem(keys.privateKey),
    cert: pki.certificateToPem(cert),
  },
  app
);

sslServer.listen(3000, () => console.log("secure server runin"));
