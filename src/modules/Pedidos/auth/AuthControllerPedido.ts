import { Request, Response, Router } from "express";
import IPedido from "../interfaces/IPedido";
import PedidoRepository from "../repository/PedidoRepository";
import jwt from 'jsonwebtoken';

const pedidoAuthRouter = Router();

pedidoAuthRouter.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        console.log(req.body);
        const { id } = req.body;
        const pedido: IPedido = {
            id,
            usuarioId: 0,
            produtoId: 0,
            quantidade: 0
        };
        const pedidoRealizado = await PedidoRepository.getPedidoById(id);
        
        if (pedidoRealizado) {
            const pedido = {
                id: pedidoRealizado.id
            }
            const token = jwt.sign(pedido, String(process.env.secret));
            return res.status(200).json({ 
                token: token
            })
        }
        else {
            return res.status(401).json({error: 'O pedido não foi realizado'})
        }
        
})
export default pedidoAuthRouter;