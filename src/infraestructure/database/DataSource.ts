import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./entities/UserEntity";
import { BookEntity } from "./entities/BookEntity";
import { PurchaseEntity } from "./entities/PurchaseEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "dpg-cpjkmc2cn0vc73ant4n0-a.oregon-postgres.render.com",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "admin",
  password: process.env.DB_PASSWORD || "oGEZVB1TBSpNXX3zu1Xxao4lIY6qI9OR",
  database: process.env.DB_NAME || "proyectolibreria",
  entities: [UserEntity, BookEntity, PurchaseEntity],
  synchronize: true,
  connectTimeoutMS: 30000, // 30 seconds timeout
  ssl: {
    rejectUnauthorized: false, // Ajusta según tus necesidades
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
