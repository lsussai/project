import { Router } from "express";
import produtoRouter from "../modules/Produtos/controllers/ProdutoControllers";
import categoriaRouter from "../modules/Categoria/controllers/CategoriaControllers";

const routers = Router();
routers.use('/produto', produtoRouter)
routers.use('/categoria', categoriaRouter)
export default routers;