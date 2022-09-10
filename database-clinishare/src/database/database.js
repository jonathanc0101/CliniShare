import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    "clinisharedb", 
    "postgres", 
    "password", 
    {
    host: "localhost",
    dialect: "postgres",
    }
);
