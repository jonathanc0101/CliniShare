import express from "express";
import https from "https";

import forge from "node-forge";

const pki = forge.pki;

function generateRSAKeyPair(){
    return pki.rsa.generateKeyPair(2048);
}

function generateAndSignCert(keys) {
  // create a new certificate
  const cert = pki.createCertificate();

  // fill the required fields
  cert.publicKey = keys.publicKey;
  cert.serialNumber = "01";
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  // use your own attributes here, or supply a csr (check the docs)
  const attrs = [
    {
      name: "commonName",
      value: "example.org",
    },
    {
      name: "countryName",
      value: "ARG",
    },
    {
      shortName: "ST",
      value: "Chubut",
    },
    {
      name: "localityName",
      value: "-",
    },
    {
      name: "organizationName",
      value: "CliniShare",
    },
    {
      shortName: "OU",
      value: "Testing",
    },
  ];

  // here we set subject and issuer as the same one
  cert.setSubject(attrs);
  cert.setIssuer(attrs);

  // the actual certificate signing
  cert.sign(keys.privateKey);

  // now convert the Forge certificate to PEM format
  return cert;
}


const keys = generateRSAKeyPair();
const cert = generateAndSignCert(keys);

const app = express();

app.use("/", (req, res, next) => {
  res.send("Hello");
});

const sslServer = https.createServer(
  {
    key: pki.privateKeyToPem(keys.privateKey),
    cert: pki.certificateToPem(cert),
  },
  app
);

sslServer.listen(3443, () => console.log("secure server runin"));
