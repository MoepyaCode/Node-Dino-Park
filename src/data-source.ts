import "reflect-metadata"
import { DataSource } from "typeorm"
import { Dino, Zone } from "./entities"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "rootpassword",
    database: "dino-park",
    synchronize: true,
    logging: false,
    entities: [Dino, Zone],
    migrations: [],
    subscribers: [],
})
