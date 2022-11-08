import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    // process.env.DATABASE_URL
    "clinisharedb", 
    "clinishare", 
    "password", 
    {
    host: "localhost",
    dialect: "postgres",
    }
);
