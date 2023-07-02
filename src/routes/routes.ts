import { Router } from "express";
import produtoRouter from "../modules/Produtos/controllers/ProdutoControllers";
import categoriaRouter from "../modules/Categoria/controllers/CategoriaControllers";
import usuarioRouter from "../modules/Usuarios/controllers/UsuarioControllers";
import pedidoRouter from "../modules/Pedidos/controllers/PedidoControllers";
import loginAuthRouter from "../modules/Usuarios/auth/loginAuthRouter";

const routers = Router();
routers.use('/produto', produtoRouter)
routers.use('/categoria', categoriaRouter)
routers.use('/pedido', pedidoRouter)
routers.use('/usuario', usuarioRouter)
routers.use('/login', loginAuthRouter)
export default routers;