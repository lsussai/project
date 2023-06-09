import "reflect-metadata"
import { DataSource } from "typeorm"
import {CriarProdutoCategoriaTabela1686159829779} from './migration/1686159829779-CriarProdutoCategoriaTabela';
import Produto from "../modules/Produtos/entities/Produto"
import Categoria from "../modules/Categoria/entities/Categoria"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "projeto",
    synchronize: true,
    logging: false,
    entities: [Produto, Categoria],
    migrations: [CriarProdutoCategoriaTabela1686159829779],
    subscribers: [],
})
