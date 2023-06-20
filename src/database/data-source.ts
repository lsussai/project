import "dotenv/config";
import "reflect-metadata"
import { DataSource } from "typeorm"
import {CriarProdutoCategoriaTabela1686159829779} from './migration/1686700690208-CriarTabelas';
import Produto from "../modules/Produtos/entities/Produto"
import Categoria from "../modules/Categoria/entities/Categoria"
import Usuario from "../modules/Usuarios/entities/Usuario";
import Pedido from "../modules/Pedidos/entities/Pedidos";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username:  process.env.MYSQL_USER,
    password:  process.env.MYSQL_PASS,
    database:  process.env.MYSQL_DBNAME,
    synchronize: true,
    logging: false,
    entities: [Produto, Categoria,Usuario, Pedido],
    migrations: [CriarProdutoCategoriaTabela1686159829779],
    subscribers: [],
})
