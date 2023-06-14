import "reflect-metadata"
import { DataSource } from "typeorm"
import {CriarProdutoCategoriaTabela1686159829779} from './migration/1686700690208-CriarTabelas';
import Produto from "../modules/Produtos/entities/Produto"
import Categoria from "../modules/Categoria/entities/Categoria"
import Usuario from "../modules/Usuarios/entities/Usuario";
import Pedido from "../modules/Pedidos/entities/Pedidos";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "projeto_db",
    synchronize: true,
    logging: false,
    entities: [Produto, Categoria,Usuario, Pedido],
    migrations: [CriarProdutoCategoriaTabela1686159829779],
    subscribers: [],
})
