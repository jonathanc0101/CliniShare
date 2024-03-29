import app from "./app.js";

import { sequelize } from "./database/database.js";
import { SERVER_BD_PORT,REACT_SERVER_BD_PORT } from "./UDP/constants.js";
import emitter from "./eventos/eventEmitter.js";

export async function main() {
  try {
    await sequelize.sync({force: false}) //sincronización con la bd
    // await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(SERVER_BD_PORT, () => {
      console.log("Server is listening on port", SERVER_BD_PORT);

      emitter.emit("db_connected");

    });
    
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}


